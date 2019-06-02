import React from 'react';
import { Dropdown } from 'antd';
import { DropDownProps } from 'antd/es/dropdown';
import classNames from 'classnames';
import './header-dropdown.less';

interface IProps extends DropDownProps {
  prefixCls?: string;
}

export const HeaderDropdown: React.FC<IProps> = (props) => {
  const { prefixCls, overlayClassName, ...restProps } = props;

  return (
    <Dropdown
      overlayClassName={classNames(prefixCls, overlayClassName)}
      {...restProps}
    />
  )
};

HeaderDropdown.defaultProps = {
  prefixCls: 'lotus-header-dropdown'
};
