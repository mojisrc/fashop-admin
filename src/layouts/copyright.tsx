import React from 'react';
import { Icon } from 'antd';
import defaultSettings from '@/config/default-settings';

const { company } = defaultSettings;

const Copyright = () => {
  return (
    <div>
      Copyright <Icon type="copyright" /> 2019{company}技术部出品
    </div>
  )
};

export default Copyright;
