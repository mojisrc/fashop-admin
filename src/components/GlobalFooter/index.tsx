import React from 'react';
import ClassNames from 'classnames';
import styles from './index.less';

interface GlobalFooterProps {
  className?: string;
  links?: Array<any>;
  copyright?: React.ReactNode;
}

class GlobalFooter extends React.Component<GlobalFooterProps, any> {
  render() {
    const { className, links, copyright } = this.props;
    const cls = ClassNames(styles.globalFooter, className);

    return (
      <div className={cls}>
        {links && (
          <div className={styles.links}>
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
        {copyright && <div className={styles.copyright}>{copyright}</div>}
      </div>
    );
  }
}

export default GlobalFooter;
