import React from 'react';
import isEqual from 'lodash/isEqual';
import uniqueId from 'lodash/uniqueId';
import { connect } from 'dva';
import router from 'umi/router';
import { Button, Card, Tooltip, Form, Input, Tag } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import PageHeaderWrapper from '@/components/page-header-wrapper';
import FooterToolbar from '@/components/footer-toolbar';
import StandardTable from '@/components/standard-table';
import { IStatement } from '@jiumao/policy';
import { IModule, IAction } from '@/models/action';
import { ConnectProps } from '@/models/connect';
import StatementDrawer from '../components/statement-drawer';

interface IProps extends ConnectProps, FormComponentProps {
  modules: IModule[];
  actions: IAction[];
}

const CreatePolicy: React.FC<IProps> = (props) => {
  const { dispatch, form, modules, actions } = props;
  const { getFieldDecorator } = form;
  const [visible, setVisible] = React.useState<boolean>(false);
  const [statements, setStatement] = React.useState<IStatement[]>([]);

  React.useState(() => {
    dispatch({
      type: 'action/fetchModules'
    })
  });

  const showCreateView = () => {
    setVisible(true);
  };

  const closeCreateView = () => {
    setVisible(false);
  };

  const handleCreate = () => {
    form.validateFields((error, values) => {
      if (!error) {
        dispatch({
          type: 'policy/fetchCreate',
          payload: {
            ...values,
            document: statements
          },
          callback: () => {
            setStatement([]);
            form.resetFields();
            handelCancel();
          }
        })
      }
    });
  };

  const handleStatementCreate = (value) => {
    setStatement([...statements, value]);
    setVisible(false);
  };

  const handleStatementRemove = (value) => {
    setStatement(statements.filter(item => !isEqual(item, value)));
  };

  const handelCancel = () => {
    router.push('/permission/policies');
  };

  const columns = [
    {
      title: '权限效力',
      dataIndex: 'effect',
      render: (text) => {
        return text === 'allow' ? '允许' : '禁止';
      }
    },
    {
      title: '模块',
      dataIndex: 'module',
      render: (text, record) => {
        const action = record.action[0];
        return action.split('/')[0];
      }
    },
    {
      title: '操作名称',
      dataIndex: 'action',
      render: (text) => {
        return (
          text.map((item, index) => (
            <Tag key={index} color="#2db7f5">{item}</Tag>
          ))
        );
      }
    },
    {
      title: '操作',
      key: 'buttons',
      render: (text, record) => (
        <Tooltip placement="top" title="删除">
          <Button
            type="danger"
            size="small"
            icon="delete"
            onClick={() => handleStatementRemove(record)}
          />
        </Tooltip>
      )
    }
  ];

  return (
    <React.Fragment>
      <PageHeaderWrapper
        title="新建自定义权限策略"
        extra={[
          <Button key="1" type="primary" onClick={showCreateView}>
            添加授权语句
          </Button>
        ]}
      >
        <Form layout="inline">
          <Form.Item label="策略名称">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '策略名称不能为空'
                },
              ],
            })(<Input placeholder="请输入策略名称" />)}
          </Form.Item>
          <Form.Item label="策略备注">
            {getFieldDecorator('remark', {

            })(<Input placeholder="请输入策略备注" />)}
          </Form.Item>
        </Form>
      </PageHeaderWrapper>

      <StatementDrawer
        visible={visible}
        formType="create"
        modules={modules}
        actions={actions}
        dispatch={dispatch}
        onConfirm={handleStatementCreate}
        onClose={closeCreateView}
      />

      <Card bordered={false}>
        <StandardTable
          data={{
            list: statements
          }}
          columns={columns}
          rowKey={() => uniqueId()}
        />
      </Card>

      <FooterToolbar>
        <Button
          type="primary"
          disabled={!statements.length}
          onClick={handleCreate}
        >确定</Button>
        <Button onClick={handelCancel}>返回</Button>
      </FooterToolbar>
    </React.Fragment>
  )
};

CreatePolicy.defaultProps = {
  modules: []
};

export default connect(({ action }) => ({
  modules: action.modules,
  actions: action.list
}))(Form.create()(CreatePolicy));
