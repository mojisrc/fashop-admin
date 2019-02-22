import React, { Component } from "react";
import { Drawer, Input, Button, Form, Switch, message } from "antd";
import { connect } from "dva";

const FormItem = Form.Item;
@Form.create()
@connect(({ loading }) => ({
    memberAddLoading: loading.effects["auth/memberAdd"]
}), null, null, {
    withRef: true
})
export default class AuthGroupAdd extends Component {
    static defaultProps = {
        memberAddLoading: false,
        onAddSuccess: () => {

        }
    };
    state = {
        visible: false
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { dispatch } = this.props;
                let payload = {
                    username: values.username,
                    password: values.password,
                    name: values.name,
                    status: values.status ? 1 : 0
                };
                dispatch({
                    type: "member/add",
                    payload,
                    callback: (response) => {
                        if (response.code === 0) {
                            this.props.form.resetFields();
                            message.success("添加成功");
                            this.props.onAddSuccess();
                        } else {
                            message.error(response.msg);
                        }
                    }
                });
            }
        });
    };

    show() {
        this.setState({
            visible: true
        });
    }

    close() {
        this.setState({
            visible: false
        });
    }

    render() {
        const { memberAddLoading } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
          <Drawer
            title="新建用户"
            width={400}
            closable={false}
            onClose={() => {
                this.setState({
                    visible: false
                });
            }}
            visible={this.state.visible}
          >
              <Form onSubmit={this.handleSubmit}>
                  <FormItem
                    label='登录账号'
                    help='该字段创建后不可修改'
                  >
                      {getFieldDecorator("username", {
                          rules: [{ required: true, message: "请输入名称" }]
                      })(
                        <Input
                          placeholder="请输入名称"
                        />
                      )}
                  </FormItem>
                  <FormItem
                    label='密码'
                  >
                      {getFieldDecorator("password", {
                          rules: [{ required: true, message: "请输入密码" }]
                      })(
                        <Input
                          placeholder="请输入密码"
                        />
                      )}
                  </FormItem>
                  <FormItem
                    label='昵称或姓名'
                  >
                      {getFieldDecorator("name", {
                          rules: [{ required: true, message: "请输入昵称或姓名" }]
                      })(
                        <Input
                          placeholder="请输入名称"
                        />
                      )}
                  </FormItem>
                  <FormItem
                    label='是否开启'
                  >
                      {getFieldDecorator("status", {
                          initialValue: true,
                          valuePropName: "checked",
                          rules: [{ required: true, message: "请选择是否开启" }]
                      })(
                        <Switch />
                      )}
                  </FormItem>
                  <FormItem>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={memberAddLoading}
                      >
                          确定
                      </Button>
                  </FormItem>
              </Form>
          </Drawer>
        );
    }
}
