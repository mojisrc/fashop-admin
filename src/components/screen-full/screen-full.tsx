import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Icon } from 'antd';
import screenfull from 'screenfull';
import './screen-full.less';

interface IProps {
  className?: string;
  prefixCls?: string;
  style?: React.CSSProperties;
}

const ScreenFull: React.FC<IProps> = (props) => {
  const { className, prefixCls, style } = props;
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  useEffect(() => {
    screenfull['on']('change', change);

    return () => {
      screenfull['off']('change', change);
    }
  }, [1]);

  const change = () => {
    setIsFullScreen(screenfull['isFullscreen']);
  };

  const handleClick = () => {
    if (!screenfull['enabled']) return;
    screenfull['toggle']()
  };

  return (
    <div
      className={classNames(className, {
        [`${prefixCls}`]: true
      })}
      style={style}
      onClick={handleClick}
    >
      {!isFullScreen && (
        <Icon type="fullscreen" />
      )}
      {isFullScreen && (
        <Icon type="fullscreen-exit" />
      )}
    </div>
  )
};

ScreenFull.defaultProps = {
  prefixCls: 'lotus-screen-full'
};

export default ScreenFull;
