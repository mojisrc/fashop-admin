import React from 'react';
import { Form, Input, Select } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import DrawerWrapper from '@/components/drawer-wrapper';
import { IModule, IAction } from '@/models/action';

export type TFormType = 'create' | 'update';

interface IProps extends FormComponentProps {
  formType: TFormType;
  visible: boolean;
  modules: IModule[];
  currentAction: IAction;
  onClose: () => void;
  onSubmit: (values) => void;
}

const FormItem  = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

const ActionDrawer: React.FC<IProps> = (props) => {
  const {
    visible,
    modules,
    onClose,
    onSubmit,
    formType,
    form,
    currentAction
  } = props;
  const { getFieldDecorator } = form;
  const [title, setTitle] = React.useState<string>('');

  React.useEffect(() => {
    if (formType) {
      setTitle(formType === 'create' ? '创建操作' : '更新操作');
    }
  }, [props.formType]);

  React.useEffect(() => {
    if (!visible) {
      form.resetFields();
    }
  }, [props.visible]);

  const handleConfirm = () => {
    form.validateFields((error, values) => {
      const data = { ...values };

      if (formType === 'update') {
        data.id = currentAction.id;
      }

      onSubmit && onSubmit(data);
    })
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

  const moduleOptions = React.useMemo(() => {
    return (
      modules.map(item => (
        <Option key={item.id} value={item.id}>
          {item.name}
        </Option>
      ))
    )
  }, [props.modules]);

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
        <FormItem {...formItemLayout} label="操作名称">
          {getFieldDecorator('name', {
            initialValue: currentAction.name,
            rules: [
              {
                required: true,
                message: '名称不能为空'
              },
            ],
          })(<Input placeholder="请输入操作名称" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="显示名称">
          {getFieldDecorator('displayName', {
            initialValue: currentAction.displayName,
            rules: [
              {
                required: true,
                message: '显示名称不能为空'
              },
            ],
          })(<Input placeholder="请输入显示名称" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="所属模块">
          {getFieldDecorator('moduleId', {
            initialValue: (currentAction.module || {}).id,
            rules: [
              {
                required: true,
                message: '所属模块不能为空'
              },
            ],
          })(
            <Select
              showSearch
              placeholder="请选择所属模块"
              optionFilterProp="children"
            >
              {moduleOptions}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="备注">
          {getFieldDecorator('remark', {
            initialValue: currentAction.remark,
            rules: []
          })(
            <TextArea rows={3} />
          )}
        </FormItem>
      </Form>
    </DrawerWrapper>
  )
};

ActionDrawer.defaultProps = {
  modules: []
};

export default Form.create()(ActionDrawer);
