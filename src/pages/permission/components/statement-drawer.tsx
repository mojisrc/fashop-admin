import React from 'react';
import { connect } from 'dva';
import { Form, Radio, Select } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import DrawerWrapper from '@/components/drawer-wrapper';
import { ConnectProps } from '@/models/connect';
import { IModule, IAction } from '@/models/action';

export type TFormType = 'create' | 'update';

interface IProps extends ConnectProps, FormComponentProps {
  formType: TFormType;
  visible: boolean;
  modules: IModule[];
  actions: IAction[];
  onConfirm: (values) => void;
  onClose: () => void;
}

const RadioGroup = Radio.Group;
const { Option } = Select;

const StatementDrawer: React.FC<IProps> = (props) => {
  const {
    dispatch,
    visible,
    formType,
    onClose,
    onConfirm,
    form,
    modules,
    actions
  } = props;
  const { getFieldDecorator } = form;
  const [title, setTitle] = React.useState<string>('');
  const [type, setType] = React.useState<string>('all');
  const [currentModule, setCurrentModule] = React.useState<IModule>(null);

  React.useEffect(() => {
    if (formType) {
      setTitle(formType === 'create' ? '添加授权语句' : '更新授权语句');
    }
  }, [props.formType]);

  React.useEffect(() => {
    if (!visible) {
      form.resetFields();
    }
  }, [props.visible]);

  const handleClose = () => {
    onClose && onClose();
  };

  const handleTypeChange = (e) => {
    const value = e.target.value;
    setType(value);
  };

  const handleModuleSelect = (data) => {
    setCurrentModule({
      id: data.key,
      name: data.label
    });
    dispatch({
      type: 'action/fetchList',
      payload: {
        moduleId: data.key
      }
    });
  };

  const handleConfirm = () => {
    form.validateFields((error, values) => {
      if (!error) {
        if (!currentModule) return;
        const { effect, type, actions } = values;
        const moduleName = currentModule.name;
        const actionData = type === 'all'
          ? [`${moduleName}/*`]
          : actions.map(item => `${moduleName}/${item.label}`);
        onConfirm && onConfirm({
          effect,
          action: actionData
        });
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
      onClose={handleClose}
      onConfirm={handleConfirm}
      onCancel={handleClose}
      width={600}
      title={title}
    >
      <Form>
        <Form.Item {...formItemLayout} label="权限效力">
          {getFieldDecorator('effect', {
            initialValue: 'allow',
            rules: [
              {
                required: true,
                message: '权限效力不能为空'
              },
            ],
          })(
            <RadioGroup>
              <Radio value="allow">允许</Radio>
              <Radio value="deny">拒绝</Radio>
            </RadioGroup>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="所属模块">
          {getFieldDecorator('module', {
            rules: [
              {
                required: true,
                message: '所属模块不能为空'
              },
            ],
          })(
            <Select
              showSearch
              labelInValue
              placeholder="请选择所属模块"
              optionFilterProp="children"
              onSelect={handleModuleSelect}
            >
              {moduleOptions}
            </Select>
          )}
        </Form.Item>
        <Form.Item {...formItemLayout} label="操作名称">
          {getFieldDecorator('type', {
            initialValue: type,
            rules: [
              {
                required: true,
                message: '所属模块不能为空'
              },
            ],
          })(
            <RadioGroup onChange={handleTypeChange}>
              <Radio value="all">所有操作</Radio>
              <Radio value="other">特定操作</Radio>
            </RadioGroup>
          )}
        </Form.Item>
        {(type !== 'all') && (
          <Form.Item {...formItemLayout} label="特定操作">
            {getFieldDecorator('actions', {
              rules: [
                {
                  required: true,
                  message: '操作不能为空'
                },
              ],
            })(
              <Select
                showSearch
                labelInValue
                placeholder="请选择操作"
                mode="multiple"
                optionFilterProp="children"
              >
                {actions.map(item => (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
        )}
      </Form>
    </DrawerWrapper>
  )
};

StatementDrawer.defaultProps = {
  modules: [],
  actions: []
};

export default connect()(Form.create()(StatementDrawer));
