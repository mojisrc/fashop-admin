import React from 'react';
import Link from 'umi/link';
import { Form, Input, Icon, Button } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';

interface IProps extends FormComponentProps {
  prefixCls: string;
  loading?: boolean;
  onLogin?: (values) => void;
  onChangeType?: (type: string) => void;
}

const FormItem = Form.Item;

const PasswordLoginForm: React.FC<IProps> = (props) => {
  const {
    prefixCls,
    loading,
    onLogin,
    onChangeType,
    form: { validateFields, getFieldDecorator }
  } = props;

  // 触发登录
  const handleSubmit = (e) => {
    e.preventDefault();

    validateFields((error, values) => {
      if (error) return;
      onLogin && onLogin({
        ...values,
        type: 'password'
      });
    })
  };

  // 切换短信验证码登录
  const handleChangeLoginType = () => {
    onChangeType && onChangeType('sms');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormItem>
        {getFieldDecorator('username', {
          initialValue: 'admin',
          rules: [
            {
              required: true,
              message: formatMessage({ id: 'validation.username.required' })
            }
          ]
        })(
          <Input
            size="large"
            prefix={<Icon type="user" />}
            placeholder={`${formatMessage({ id: 'app.login.username' })}`}
          />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('password', {
          initialValue: '123456',
          rules: [
            {
              required: true,
              message: formatMessage({ id: 'validation.password.required' })
            }
          ]
        })(
          <Input
            size="large"
            prefix={<Icon type="lock" />}
            autoComplete="off"
            type="password"
            placeholder={`${formatMessage({ id: 'app.login.password' })}`}
            suffix={
              <span className="forgot-link">
                <Link to="/user/password-reset">
                  <FormattedMessage id="app.login.forgot-password" />
                </Link>
              </span>
            }
          />
        )}
      </FormItem>
      <FormItem>
        <Button
          loading={loading}
          type="primary"
          htmlType="submit"
          size="large"
          block
        >
          <FormattedMessage id="app.login.login" />
        </Button>
        <div className={`${prefixCls}__switch`}>
          <span onClick={handleChangeLoginType}>
            <FormattedMessage id="app.login.login-type-sms" />
          </span>
        </div>
      </FormItem>
    </Form>
  )
};

PasswordLoginForm.defaultProps = {
  loading: false
};

export default Form.create()(PasswordLoginForm);
