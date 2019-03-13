import React from 'react';
import { Tooltip } from 'antd';
interface IProps {
  tooltip: boolean;
  title: string | React.ReactNode;
}

export const TooltipPlus: React.FC<IProps> = (props) => {
  const { tooltip, title, children } = props;

  if (tooltip) {
    return (
      <Tooltip
        overlayStyle={{
          overflowWrap: 'break-word',
          wordWrap: 'break-word',
        }}
        title={title}
      >
        {children}
      </Tooltip>
    );
  }

  return (
    <span>{children}</span>
  );
};
