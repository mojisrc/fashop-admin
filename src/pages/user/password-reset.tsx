import React from 'react';
import { connect } from 'dva';
import PasswordResetForm from './components/password-reset-form';
import './password-reset.less';

interface IProps {
  prefixCls?: string;
  loading: boolean;
  dispatch: (args: any) => void;
}

const PasswordReset: React.FC<IProps> = (props) => {
  const { prefixCls } = props;

  return (
    <div className={prefixCls}>
      <PasswordResetForm
        prefixCls={prefixCls}
      />
    </div>
  )
};

PasswordReset.defaultProps = {
  prefixCls: 'user-password-reset-page'
};

export default connect(({ loading }) => ({
  loading: loading.effects['login/fetchRegister']
}))(PasswordReset);
