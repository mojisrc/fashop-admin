import React from 'react';
import { Row } from 'antd';
import classNames from 'classnames';
import Description, { IDescriptionProps } from './Description';
import './description-list.less';

export interface DescriptionListProps {
  prefixCls?: string;
  className?: string;
  col?: number;
  description?: IDescriptionProps[];
  gutter?: number;
  layout?: 'horizontal' | 'vertical';
  size?: 'large' | 'small';
  style?: React.CSSProperties;
  title?: React.ReactNode;
}

export type IDescriptionListComponent = React.FC<DescriptionListProps> & {
  Description: typeof Description;
};

const DescriptionList: IDescriptionListComponent = (props) => {
  const {
    prefixCls,
    className,
    title,
    col,
    layout,
    gutter,
    size,
    children,
    ...rest
  } = props;

  const column = col > 4 ? 4 : col;

  return (
    <div
      className={classNames(className, {
        [`${prefixCls}`]: true,
        [`${prefixCls}--small`]: size === 'small',
        [`${prefixCls}--large`]: size === 'large',
        [`${prefixCls}--vertical`]: layout === 'vertical'
      })}
      {...rest}
    >
      {title && (
        <div className={`${prefixCls}__title`}>
          {title}
        </div>
      )}
      <Row gutter={gutter}>
        {React.Children.map(children as any, (child: React.ReactElement<IDescriptionProps>) =>
          child ? React.cloneElement<IDescriptionProps>(child, { column }) : child,
        )}
      </Row>
    </div>
  )
};

DescriptionList.defaultProps = {
  prefixCls: 'lotus-description-list',
  layout: 'horizontal',
  col: 3,
  gutter: 32
};

DescriptionList.Description = Description;

export default DescriptionList;
