import React, { useState, useEffect, useRef } from 'react';
import isString from 'lodash/isString';
import classNames from 'classnames';
import { EllipsisText } from './ellipsis-text';
import { TooltipPlus } from './tooltip';
import '@/styles/common/ellipsis.scss';

interface IProps {
  className?: string;
  prefixCls?: string;
  style?: React.CSSProperties;
  // 移动到文本展示完整内容的提示
  tooltip?: boolean;
  // 按照长度截取下的文本最大字符数，超过则截取省略
  length?: number;
  // 按照行数截取的最大行数，超过则截取省略
  lines?: number;
  // 是否将全角字符的长度视为2来计算字符串长度
  fullWidthRecognition?: boolean;
}

const isSupportLineClamp = document.body.style['webkitLineClamp'] !== undefined;

export const Ellipsis: React.FC<IProps> = (props) => {
  const rootEl = useRef(null);
  const shadowEl = useRef(null);
  const nodeEl = useRef(null);
  const contentEl = useRef(null);
  const shadowChildrenEl = useRef(null);
  const {
    className,
    prefixCls,
    lines,
    length,
    tooltip,
    fullWidthRecognition,
    children
  } = props;
  const [text, setText] = useState<string>('');
  const [targetCount, setTargetCount] = useState<number>(0);

  useEffect(() => {
    if (rootEl && rootEl.current) {
      computeLine();
    }
  }, [props.lines]);

  const computeLine = () => {
    if (lines && !isSupportLineClamp) {
      const shadow: HTMLElement = shadowEl.current;
      const shadowChildren: HTMLElement = shadowChildrenEl.current;
      const root: HTMLElement = rootEl.current;
      const content: HTMLElement = contentEl.current;

      const text = shadowChildren.innerText || shadowChildren.textContent;
      const lineHeight = parseInt(getComputedStyle(root).lineHeight);
      const targetHeight = lines * lineHeight;

      content.style.height = `${targetHeight}px`;

      const totalHeight = shadowChildren.offsetHeight;
      const shadowNode = shadow.firstChild;

      if (totalHeight <= targetHeight) {
        setText(text);
        setTargetCount(text.length);
        return;
      }

      // bisection
      const len = text.length;
      const mid = Math.ceil(len / 2);

      const count = bisection(targetHeight, mid, 0, len, text, shadowNode);

      setText(text);
      setTargetCount(count);
    }
  };

  const bisection = (th, m, b, e, text, shadowNode) => {
    const suffix = '...';
    let mid = m;
    let end = e;
    let begin = b;

    shadowNode.innerHTML = text.substring(0, mid) + suffix;
    let sh = shadowNode.offsetHeight;
    if (sh <= th) {
      shadowNode.innerHTML = text.substring(0, mid + 1) + suffix;
      sh = shadowNode.offsetHeight;
      if (sh > th || mid === begin) {
        return mid;
      }
      begin = mid;
      if (end - begin === 1) {
        mid = 1 + begin;
      } else {
        mid = Math.floor((end - begin) / 2) + begin;
      }
      return bisection(th, mid, begin, end, text, shadowNode);
    }
    if (mid - 1 < 0) {
      return mid;
    }
    shadowNode.innerHTML = text.substring(0, mid - 1) + suffix;
    sh = shadowNode.offsetHeight;
    if (sh <= th) {
      return mid - 1;
    }
    end = mid;
    mid = Math.floor((end - begin) / 2) + begin;

    return bisection(th, mid, begin, end, text, shadowNode);
  };

  const cls = classNames(className, {
    [`${prefixCls}`]: true,
    [`is-lines`]: lines && !isSupportLineClamp,
    [`is-line-clamp`]: lines && isSupportLineClamp
  });

  // 无需截取
  if (!lines && !length) {
    return (
      <span className={cls}>
        {children}
      </span>
    );
  }

  // 按照长度截取
  if (!lines) {
    if (isString(children)) {
      return (
        <EllipsisText
          className={cls}
          length={length}
          text={children || ''}
          tooltip={tooltip}
          fullWidthRecognition={fullWidthRecognition}
        />
      );
    } else {
      throw new Error('Ellipsis children must be string.');
    }
  }

  // support document.body.style.webkitLineClamp
  // 支持-webkit-line-clamp
  if (isSupportLineClamp) {
    return (
      <TooltipPlus
        tooltip={tooltip}
        title={children}
      >
        <div
          className={cls}
          style={{
            WebkitLineClamp: lines,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {children}
        </div>
      </TooltipPlus>
    );
  }

  return (
    <div className={cls} ref={rootEl}>
      <div ref={contentEl}>
        <TooltipPlus
          tooltip={tooltip}
          title={text}
        >
          <span ref={nodeEl}>
            {targetCount > 0 && text.substring(0, targetCount)}
            {targetCount > 0 && targetCount < text.length && '...'}
          </span>
        </TooltipPlus>
        <div className="shadow" ref={shadowChildrenEl}>
          {children}
        </div>
        <div className="shadow" ref={shadowEl}>
          <span>{text}</span>
        </div>
      </div>
    </div>
  )
};

Ellipsis.defaultProps = {
  prefixCls: 'lotus-ellipsis',
  tooltip: false
};
