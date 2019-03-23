import React, { Component } from "react";
import { Drawer, Input, Button, Form, message } from "antd";
import { connect } from "dva";

const FormItem = Form.Item;
@Form.create()
@connect(({ loading }) => ({
    groupAddLoading: loading.effects["auth/groupAdd"]
}), null, null, {
    withRef: true
})
export default class AuthGroupAdd extends Component {
    static defaultProps = {
        groupAddLoading: false,
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
                    name: values.name,
                };
                dispatch({
                    type: "auth/groupAdd",
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
        const { groupAddLoading } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
          <Drawer
            title="新建用户组"
            width={520}
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
                    label='用户组名称'
                  >
                      {getFieldDecorator("name", {
                          rules: [{ required: true, message: "请输入组名称" }]
                      })(
                        <Input
                          placeholder="请输入组名称"
                        />
                      )}
                  </FormItem>
                  <FormItem>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={groupAddLoading}
                      >
                          添加
                      </Button>
                  </FormItem>
              </Form>
          </Drawer>
        );
    }
}
