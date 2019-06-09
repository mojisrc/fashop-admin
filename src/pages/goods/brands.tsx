import React from 'react';
import { connect } from 'dva';
import { ConnectProps, ConnectState } from '@/models/connect';

const GoodsBrands: React.FC = () => {
  return <div>GoodsBrands</div>;
};

// @ts-ignore
export default connect(({  }: ConnectState) => ({}))(GoodsBrands);
