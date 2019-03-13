import React from 'react';
import ClassNames from 'classnames';
import { Menu, Icon } from 'antd';
import { formatMessage, setLocale, getLocale } from 'umi/locale';
import HeaderDropdown from '@/components/header-dropdown';
import styles from './index.less';

interface IProps {
  className?: string;
}

export const SelectLang: React.FC<IProps> = (props) => {
  const { className } = props;
  const selectedLang = getLocale();

  const changeLang = ({ key }) => {
    setLocale(key);
  };

  const locales = {
    'zh-CN': {
      label: '简体中文',
      icon: '🇨🇳'
    },
    'en-US': {
      label: 'English',
      icon: '🇬🇧'
    }
  };

  const langMenu = (
    <Menu
      className={styles.menu}
      selectedKeys={[selectedLang]}
      onClick={changeLang}
    >
      {Object.keys(locales).map((locale) => {
        const data = locales[locale];
        return (
          <Menu.Item key={locale}>
              <span role="img" aria-label={data.label}>
                {data.icon}
              </span>{' '}
            {data.label}
          </Menu.Item>
        );
      })}
    </Menu>
  );

  return (
    <HeaderDropdown
      overlay={langMenu}
      placement="bottomRight"
    >
      <Icon
        type="global"
        className={ClassNames(styles.dropDown, className)}
        title={formatMessage({ id: 'navBar.lang' })}
      />
    </HeaderDropdown>
  );
};
