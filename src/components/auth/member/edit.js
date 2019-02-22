import React, { Component } from "react";
import { Input, Button, Form, Switch, message ,Drawer} from "antd";
import { connect } from "dva";

const FormItem = Form.Item;

@Form.create()
@connect(({ member, loading }) => ({
    memberInfo: member.info.result,
    memberInfoLoading: loading.effects["member/info"],
    memberEditLoading: loading.effects["member/edit"]
}), null, null, {
    withRef: true
})
class AuthMemberEdit extends Component {
    static defaultProps = {
        memberEditLoading: false,
        onEditSuccess: () => {

        }
    };

    state = {
        memberId: 0,
        visible: false
    };

    show({ memberId }) {
        this.setState({
            memberId,
            visible: true
        }, () => {
            this.initMemberInfo();
        });
    }

    close() {
        this.setState({
            visible: false
        });
    }

    initMemberInfo() {
        const { dispatch } = this.props;
        const { memberId } = this.state;
        dispatch({
            type: "member/info",
            payload: {
                id: memberId
            },
            callback: (response) => {
                if (response.code === 0) {
                    this.props.form.setFieldsValue({
                        name: response.result.info.name,
                        status: !!response.result.info.status
                    });
                } else {
                    message.warning("详情获取失败");
                }
            }
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values)
            if (!err) {
                const { dispatch } = this.props;
                let payload = {
                    id: this.state.memberId,
                    name: values.name,
                    password: values.password,
                    status: values.status ? 1 : 0
                };
                dispatch({
                    type: "member/edit",
                    payload,
                    callback: (response) => {
                        if (response.code === 0) {
                            message.success("修改成功");
                            this.props.onEditSuccess();
                        } else {
                            message.error(response.msg);
                        }
                    }
                });
            }
        });
    };

    render() {
        const { memberEditLoading,memberInfo } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
          <Drawer
            title="修改用户"
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
                  >
                      {memberInfo.info.username}
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
                        loading={memberEditLoading}
                      >
                          确定
                      </Button>
                  </FormItem>
              </Form>
          </Drawer>
        );
    }
}

export default AuthMemberEdit;
