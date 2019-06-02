import React from 'react';
import RightContent from './right-content';
import { ICurrentUser } from '@/models/user';
import './global-header.less';

interface IProps {
  prefixCls?: string;
  isMobile?: boolean;
  onMenuClick?: (key: string) => void;
  currentUser?: ICurrentUser;
}

const GlobalHeader: React.FC<IProps> = (props) => {
  const { prefixCls, onMenuClick, currentUser } = props;

  return (
    <div className={prefixCls}>
      <RightContent
        prefixCls={prefixCls}
        onMenuClick={onMenuClick}
        currentUser={currentUser}
      />
    </div>
  )
};

GlobalHeader.defaultProps = {
  prefixCls: 'lotus-global-header'
};

export default GlobalHeader;
