import React from 'react';
import { Col } from 'antd';
import { ColProps } from 'antd/es/col';
import responsive from './responsive';
import './description.less';

export interface IDescriptionProps extends ColProps {
  prefixCls?: string;
  column?: number;
  key?: string | number;
  style?: React.CSSProperties;
  term?: React.ReactNode;
}

const Description: React.FC<IDescriptionProps> = (props) => {
  const { prefixCls, column, term, children, ...rest } = props;

  return (
    <Col {...responsive[column]} {...rest}>
      {term && (
        <div className={`${prefixCls}__term`}>
          {term}
        </div>
      )}
      {children && (
        <div className={`${prefixCls}__detail`}>
          {children}
        </div>
      )}
    </Col>
  )
};

Description.defaultProps = {
  prefixCls: 'lotus-description'
};

export default Description;
