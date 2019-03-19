import React from 'react';
import { FormComponentProps } from 'antd/es/form';
import { Button, Form, Icon, Input } from 'antd';

interface IProps extends FormComponentProps {
  loading?: boolean;
  onSubmit: (values) => void;
}

const FormItem = Form.Item;

const LoginForm: React.FC<IProps> = (props) => {
  const {
    loading,
    onSubmit,
    form: { getFieldDecorator, validateFields }
  } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields((error, values) => {
      if (error) return;
      onSubmit && onSubmit(values);
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormItem>
        {getFieldDecorator('username', {
          rules: [
            { required: true, message: '请输入用户名！' }
          ],
        })(
          <Input
            type="text"
            size="large"
            prefix={<Icon type="user" />}
            placeholder="用户名"
          />
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('password', {
          rules: [
            { required: true, message: '请输入密码！' }
          ],
        })(
          <Input.Password
            size="large"
            prefix={<Icon type="lock" />}
            placeholder="密码"
          />
        )}
      </FormItem>
      <FormItem>
        <Button
          type="primary"
          size="large"
          block
          loading={loading}
          htmlType="submit"
        >登录</Button>
      </FormItem>

    </Form>
  )
};

LoginForm.defaultProps = {
  loading: false
};

export default Form.create()(LoginForm);
