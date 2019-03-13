import React from 'react';
import Link from 'umi/link';
import { GlobalFooter } from '@/components/global-footer';
import { SelectLang } from '@/components/select-lang';
import logo from '@/assets/logo.png';
import { Copyright } from './copyright';
import '@/styles/layouts/user-layout.scss';

interface IProps {
  prefixCls?: string;
}

const UserLayout: React.FC<IProps> = (props) => {
  const { prefixCls, children } = props;

  return (
    <div className={`${prefixCls}`}>
      <div className={`${prefixCls}__lang`}>
        <SelectLang />
      </div>
      <div className={`${prefixCls}__container`}>
        <div className={`${prefixCls}__header`}>
          <Link to="/">
            <img alt="logo" src={logo} />
            <span className="title">后台管理系统</span>
          </Link>
        </div>
        {children}
      </div>
      <GlobalFooter
        copyright={<Copyright />}
      />
    </div>
  )
};

UserLayout.defaultProps = {
  prefixCls: 'fa-user-layout'
};

export default UserLayout;
