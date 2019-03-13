import React from 'react';
import { GlobalFooter } from '@/components/global-footer';
import { SelectLang } from '@/components/select-lang';
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
        {children}
      </div>
      <GlobalFooter
        copyright={<Copyright />}
      />
    </div>
  )
};

UserLayout.defaultProps = {
  prefixCls: 'fs-user-layout'
};

export default UserLayout;
