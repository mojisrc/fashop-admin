import React from 'react';
import { Dropdown } from 'antd';
import { DropDownProps } from 'antd/es/dropdown';
import classNames from 'classnames';
import '@/styles/components/header-dropdown.scss';

export const HeaderDropDown: React.FC<DropDownProps> = (props) => {
  const { overlayClassName, ...restProps } = props;

  return (
    <Dropdown
      overlayClassName={classNames(overlayClassName, )}
      {...restProps}
    />
  )
};
