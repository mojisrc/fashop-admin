import React from 'react';
import { connect } from 'dva';
import { Form, Input } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import DrawerWrapper from '@/components/drawer-wrapper';
import { IUser } from '../models/system-user';

export type TType = 'create' | 'update';

interface IProps extends FormComponentProps {
  type?: TType;
  currentUser?: IUser;
  visible?: boolean;
  onClose?: () => void;
  onSubmit?: (values) => void;
}

const { TextArea } = Input;

const UserDrawer: React.FC<IProps> = (props) => {
  const { visible, onClose, onSubmit, form, type, currentUser } = props;
  const { getFieldDecorator } = form;

  const [title, setTitle] = React.useState<string>('');

  React.useEffect(() => {
    setTitle(type === 'create' ? '添加用户' : '更新用户');
  }, [props.type]);

  React.useEffect(() => {
    if (!visible) {
      form.resetFields();
    }
  }, [props.visible]);

  const handleConfirm = () => {
    form.validateFields((error, values) => {
      if (!error) {
        const data = { ...values };

        if (type === 'update') {
          data.id = currentUser.id;
        }

        onSubmit && onSubmit(data);
      }
    });
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 15 },
    },
  };

  return (
    <DrawerWrapper
      visible={visible}
      onClose={onClose}
      onCancel={onClose}
      onConfirm={handleConfirm}
      width={600}
      title={title}
    >
      <Form>
        <Form.Item {...formItemLayout} label="用户名">
          {getFieldDecorator('username', {
            initialValue: currentUser.username,
            rules: [
              {
                required: true,
                message: '用户名不能为空'
              },
            ]
          })(
            <Input placeholder="请输入用户名" />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="手机号">
          {getFieldDecorator('mobile', {
            initialValue: currentUser.mobile,
            rules: [
              {
                required: true,
                message: '手机号不能为空'
              },
            ]
          })(
            <Input placeholder="请输入手机号" />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="邮箱地址">
          {getFieldDecorator('email', {
            initialValue: currentUser.email,
            rules: [
              {
                required: true,
                message: '邮箱地址不能为空'
              },
            ]
          })(
            <Input placeholder="请输入邮箱" />
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="备注">
          {getFieldDecorator('remark', {
            initialValue: currentUser.remark,
            rules: []
          })(
            <TextArea rows={3} />
          )}
        </Form.Item>
      </Form>
    </DrawerWrapper>
  )
};

UserDrawer.defaultProps = {
  visible: false,
  currentUser: {}
};

export default connect()(Form.create()(UserDrawer));
