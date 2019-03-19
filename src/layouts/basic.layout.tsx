import React from 'react';

interface IProps {

}

const BasicLayout: React.FC<IProps> = (props) => {
  const { children } = props;

  return (
    <div>
      {children}
    </div>
  )
};

export default BasicLayout;
