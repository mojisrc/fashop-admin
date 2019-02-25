import React from 'react';
import { Spin } from 'antd';

class PageLoading extends React.PureComponent {
  render() {
    return (
      <div style={{ paddingTop: 100, textAlign: 'center' }}>
        <Spin size="large" />
      </div>
    );
  }
}

export default PageLoading;
