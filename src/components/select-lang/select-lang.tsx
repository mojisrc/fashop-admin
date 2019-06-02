import React from 'react';
import classNames from 'classnames';
import { Menu, Icon } from 'antd';
import { formatMessage, getLocale, setLocale } from 'umi-plugin-react/locale';
import HeaderDropdown from '@/components/header-dropdown';
import './select-lang.less';

interface IProps {
  className?: string;
  prefixCls?: string;
}

const locales = {
  'zh-CN': { label: '简体中文', icon: '🇨🇳' },
  'en-US': { label: 'English', icon: '🇬🇧' }
};

export const SelectLang: React.FC<IProps> = (props) => {
  const { className, prefixCls } = props;
  const selectedLang = getLocale();

  const changeLang = ({ key }) => {
    setLocale(key);
  };

  const langMenu = (
    <Menu
      className={`${prefixCls}__menu`}
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
      <span
        className={classNames(className, {
          [`${prefixCls}__dropdown`]: true
        })}
      >
        <Icon
          type="global"
          title={formatMessage({
            id: 'navBar.lang'
          })}
        />
      </span>
    </HeaderDropdown>
  )
};

SelectLang.defaultProps = {
  prefixCls: 'lotus-select-lang'
};
