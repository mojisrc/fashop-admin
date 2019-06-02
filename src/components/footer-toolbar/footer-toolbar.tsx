import React from 'react';
import classNames from 'classnames';
import './footer-toolbar.less';

interface IProps {
  prefixCls?: string;
  className?: string;
  extra?: React.ReactNode;
  style?: React.CSSProperties;
}

const FooterToolbar: React.FC<IProps> = (props) => {
  const { prefixCls, className, style, extra, children } = props;
  const [width, setWidth] = React.useState<number | string>(undefined);

  React.useEffect(() => {
    const handler = () => {
      const width = `calc(100% - 80)`;
      setWidth(width);
    };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [1]);

  return (
    <div
      className={classNames(className, {
        [`${prefixCls}`]: true
      })}
      style={{
        ...style,
        width
      }}
    >
      <div className="left">
        {extra}
      </div>
      <div className="right">
        {children}
      </div>
    </div>
  )
};

FooterToolbar.defaultProps = {
  prefixCls: 'lotus-footer-toolbar'
};

export default FooterToolbar;
