import React from 'react';
import { Form, Input, Icon, Button } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import '@/styles/pages/login.scss';

interface IProps extends FormComponentProps {
  prefixCls?: string;
}

const FormItem = Form.Item;

const LoginPage: React.FC<IProps> = (props) => {
  const {
    prefixCls,
    form: { getFieldDecorator }
  } = props;

  return (
    <div className={prefixCls}>
      <Form>
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
            htmlType="submit"
          >登录</Button>
        </FormItem>

      </Form>
    </div>
  )
};

LoginPage.defaultProps = {
  prefixCls: 'fa-login-page'
};

export default Form.create()(LoginPage);
