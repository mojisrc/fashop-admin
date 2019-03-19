import React from 'react';
import { connect } from 'dva';
import { FormComponentProps } from 'antd/es/form';
import LoginForm from './components/login-form';
import '@/styles/pages/login.scss';

interface IProps extends FormComponentProps {
  prefixCls?: string;
  loading?: boolean;
  dispatch?: (args: any) => void;
}

const LoginPage: React.FC<IProps> = (props) => {
  const {
    prefixCls,
    loading,
    dispatch,
  } = props;

  const handleSubmit = (values) => {
    dispatch({
      type: 'login/fetchLogin',
      payload: values
    });
  };

  return (
    <div className={prefixCls}>
      <LoginForm
        loading={loading}
        onSubmit={handleSubmit}
      />
    </div>
  )
};

LoginPage.defaultProps = {
  prefixCls: 'fa-login-page'
};

export default connect(({ loading }) => ({
  loading: loading.effects['login/fetchLogin']
}))(LoginPage);
