import React from 'react';
import classNames from 'classnames';
import '@/styles/components/global-footer.scss';

export type TLink = {
  key?: string;
  title: React.ReactNode;
  href: string;
  blankTarget?: boolean;
}

interface IProps {
  className?: string;
  prefixCls?: string;
  links?: TLink[];
  copyright?: React.ReactNode;
}

export const GlobalFooter: React.FC<IProps> = (props) => {
  const { className, prefixCls, links, copyright } = props;

  return (
    <footer
      className={classNames(className, {
        [`${prefixCls}`]: true
      })}
    >
      {links && (
        <div className={`${prefixCls}__links`}>
          {links.map((link) => (
            <a
              key={link.key}
              title={link.key}
              target={link.blankTarget ? '_blank' : '_self'}
              href={link.href}
            >
              {link.title}
            </a>
          ))}
        </div>
      )}
      {copyright && <div className={`${prefixCls}__copyright`}>{copyright}</div>}
    </footer>
  );
};

GlobalFooter.defaultProps = {
  prefixCls: 'fa-global-footer'
};
