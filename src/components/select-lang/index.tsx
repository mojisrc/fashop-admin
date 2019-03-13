import React from 'react';
import { Menu, Icon } from 'antd';
import { formatMessage, setLocale, getLocale } from 'umi/locale';
import { HeaderDropDown } from '@/components/header-dropdown';
import '@/styles/components/select-lang.scss';

interface IProps {
  className?: string;
  prefixCls?: string;
}

export const SelectLang: React.FC<IProps> = (props) => {
  const { className, prefixCls } = props;
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
      className={`${prefixCls}`}
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
    <HeaderDropDown
      overlay={langMenu}
      placement="bottomRight"
    >
      <Icon
        type="global"
        className={className}
        title={formatMessage({ id: 'navBar.lang' })}
      />
    </HeaderDropDown>
  );
};

SelectLang.defaultProps = {
  prefixCls: 'fa-select-lang'
};
