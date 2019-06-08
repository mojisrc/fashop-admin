import React from 'react';
import router from 'umi/router';
import { Form, Input, Icon, Button } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { formatMessage, FormattedMessage } from 'umi-plugin-react/locale';

interface IProps extends FormComponentProps {
  prefixCls?: string;
  loading?: boolean;
  onSubmit?: (values) => void;
}

const FormItem = Form.Item;

const PasswordResetForm: React.FC<IProps> = props => {
  const {
    prefixCls,
    loading,
    onSubmit,
    form: { validateFields, getFieldDecorator },
  } = props;

  const handleSubmit = e => {
    e.preventDefault();

    validateFields((error, values) => {
      if (!error) return;
      onSubmit && onSubmit(values);
    });
  };

  const handleReturnLogin = () => {
    router.push('/user/login');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormItem>
        {getFieldDecorator('username', {
          rules: [
            {
              required: true,
              message: formatMessage({ id: 'validation.username.required' }),
            },
          ],
        })(
          <Input
            size="large"
            prefix={<Icon type="user" />}
            placeholder={`${formatMessage({ id: 'app.login.username' })}`}
          />,
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('oldPassword', {
          rules: [
            {
              required: true,
              message: formatMessage({ id: 'validation.verification-code.required' }),
            },
          ],
        })(
          <Input
            size="large"
            prefix={<Icon type="lock" />}
            placeholder={`${formatMessage({ id: 'app.password-reset.old-password' })}`}
          />,
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('password', {
          rules: [
            {
              required: true,
              message: formatMessage({ id: 'validation.verification-code.required' }),
            },
          ],
        })(
          <Input
            size="large"
            type="password"
            autoComplete="off"
            prefix={<Icon type="lock" />}
            placeholder={`${formatMessage({ id: 'app.password-reset.new-password' })}`}
          />,
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('confirmPassword', {
          rules: [
            {
              required: true,
              message: formatMessage({ id: 'validation.verification-code.required' }),
            },
          ],
        })(
          <Input
            size="large"
            type="password"
            autoComplete="off"
            prefix={<Icon type="lock" />}
            placeholder={`${formatMessage({ id: 'app.password-reset.confirm-password' })}`}
          />,
        )}
      </FormItem>
      <FormItem>
        <Button loading={loading} type="primary" htmlType="submit" size="large" block>
          <FormattedMessage id="app.password-reset.button" />
        </Button>
        <div className={`${prefixCls}__tools`}>
          <span onClick={handleReturnLogin}>
            <FormattedMessage id="app.password-reset.login" />
          </span>
        </div>
      </FormItem>
    </Form>
  );
};

PasswordResetForm.defaultProps = {
  loading: false,
};

export default Form.create<IProps>()(PasswordResetForm);
