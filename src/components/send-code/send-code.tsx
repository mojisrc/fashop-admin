import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { NativeButtonProps } from 'antd/es/button/button';
import { isPromise } from '@/utils/utils';

export interface IProps extends NativeButtonProps {
  // 倒计时时长（秒）默认60
  second?: number;
  // 初始化按钮显示文本
  initText?: string;
  // 运行时显示文本
  // 自己设置必须包含{%s}
  runText?: string;
  // 运行结束后显示文本
  resetText?: string;
  // 储存倒计时剩余时间sessionStorage的键值
  // 设置不为空后，刷新页面倒计时将继续
  storageKey?: string;
  // 倒计时结束执行函数
  onEnd?: () => void;
  // 获取验证码执行函数
  // 会根据返回结果决定是否执行倒计时
  onCaptcha?: () => boolean | Promise<any>;
}

export const SendCode: React.FC<IProps> = (props) => {
  let timer: NodeJS.Timer = null;
  let lastSecond: number = 0;
  const {
    second,
    initText,
    runText,
    resetText,
    onCaptcha,
    storageKey,
    onEnd,
    ...rest
  } = props;
  const [buttonText, setButtonText] = useState<string>(initText);
  const [start, setStart] = useState<boolean>(false);
  // 倒计时最后结束的秒数
  const [runSecond] = useState<number>(second);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const second = sessionStorage.getItem(storageKey);
    if (storageKey && second) {
      const newLastSecond = ~~((Number(second) - new Date().getTime()) / 1000);

      if (newLastSecond > 0) {
        lastSecond = newLastSecond;
        setButtonText(getTemplateText(newLastSecond));
        startCountdown();
      }
    }

    return () => {
      timer && clearInterval(timer);
    }
  }, []);

  // 触发获取验证码
  function handleClick(event) {
    event.preventDefault();
    setLoading(true);
    const result = onCaptcha ? onCaptcha() : null;

    if (isPromise(result)) {
      result
        .then(() => {
          setLoading(false);
          startCountdown();
        })
        .catch(() => {
          setLoading(false);
          console.log('获取验证码失败');
        });
      return;
    }

    if (result) {
      setLoading(false);
      startCountdown();
    }
  }

  // 获取格式化的模板文本
  function getTemplateText(second: number): string {
    return runText.replace(/\{([^{]*?)%s(.*?)\}/g, second.toString());
  }

  // 开始倒计时
  function startCountdown() {
    setStart(true);
    let second = lastSecond ? lastSecond : runSecond;

    if (storageKey) {
      const runSecond = new Date().getTime() + second * 1000;
      sessionStorage.setItem(storageKey, runSecond.toString());
    }

    if (!lastSecond) {
      setButtonText(getTemplateText(second));
    }

    timer = setInterval(() => {
      second--;
      setButtonText(getTemplateText(second));

      if (second <= 0) {
        timeout();
      }
    }, 1000)
  }

  // 倒计时结束处理函数
  function timeout() {
    // 设置为运行结束后文本
    setButtonText(resetText);
    setStart(false);
    // 清除定时器
    timer && clearInterval(timer);
    // 删除sessionStorage
    if (storageKey) {
      sessionStorage.removeItem(storageKey);
    }
    // 发出倒计时结束事件
    onEnd && onEnd();
  }

  return (
    <Button
      {...rest}
      onClick={handleClick}
      loading={loading}
      disabled={start}
    >
      {buttonText}
    </Button>
  )
};

SendCode.defaultProps = {
  second: 60,
  initText: '获取验证码',
  runText: '{%s}秒后重新获取',
  resetText: '重新获取验证码'
};
