import React from 'react';
import { Button } from 'antd';
import Link from 'umi/link';
import classNames from 'classnames';
import config from './config';
import './exception.less';

interface IProps {
  prefixCls?: string;
  className?: string;
  style?: React.CSSProperties;
  type?: '403' | '404' | '500';
  title?: React.ReactNode;
  desc?: React.ReactNode;
  img?: string;
  actions?: React.ReactNode;
  linkElement?: string | typeof Link;
  backText?: React.ReactNode;
  redirect?: string;
}

const Exception: React.FC<IProps> = (props) => {
  const {
    prefixCls,
    className,
    style,
    type,
    img,
    title,
    desc,
    actions,
    redirect,
    linkElement,
    backText
  } = props;
  const pageType = type in config ? type : '404';

  return (
    <div
      className={classNames(className, {
        [`${prefixCls}`]: true
      })}
      style={style}
    >
      <div className={`${prefixCls}__img-block`}>
        <div style={{ backgroundImage: `url(${img || config[pageType].img})` }} />
      </div>

      <div className={`${prefixCls}__content`}>
        <h1>{title || config[pageType].title}</h1>
        <div className="desc">{desc || config[pageType].desc}</div>
        <div className="actions">
          {actions ||
          React.createElement(
            linkElement,
            {
              to: redirect,
              href: redirect,
            },
            <Button type="primary">{backText}</Button>,
          )}
        </div>
      </div>
    </div>
  )

};

Exception.defaultProps = {
  prefixCls: 'lotus-exception',
  backText: 'back to home',
  linkElement: 'a',
  type: '404',
  redirect: '/'
};

export default Exception;
