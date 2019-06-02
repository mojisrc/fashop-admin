import React from 'react';
import { Layout } from 'antd';
import GlobalFooter from '@/components/global-footer';
import Copyright from './copyright';

const { Footer } = Layout;

const FooterView: React.FC = () => {
  return (
    <Footer style={{ padding: 0 }}>
      <GlobalFooter
        copyright={<Copyright />}
      />
    </Footer>
  )
};

export default FooterView;
