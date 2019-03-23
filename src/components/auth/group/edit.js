import React, { Component } from "react";
import { Input, Button, Form, message ,Drawer} from "antd";
import { connect } from "dva";

const FormItem = Form.Item;

@Form.create()
@connect(({ auth, loading }) => ({
    groupInfo: auth.groupInfo.result,
    groupInfoLoading: loading.effects["auth/groupInfo"],
    groupEditLoading: loading.effects["auth/groupEdit"]
}), null, null, {
    withRef: true
})
class AuthGroupEdit extends Component {
    static defaultProps = {
        groupEditLoading: false,
        onEditSuccess: () => {

        }
    };

    state = {
        groupId: 0,
        visible: false
    };

    show({ groupId }) {
        this.setState({
            groupId,
            visible: true
        }, () => {
            this.initGroupInfo();
        });
    }

    close() {
        this.setState({
            visible: false
        });
    }

    initGroupInfo() {
        const { dispatch } = this.props;
        const { groupId } = this.state;
        dispatch({
            type: "auth/groupInfo",
            payload: {
                id: groupId
            },
            callback: (response) => {
                if (response.code === 0) {
                    this.props.form.setFieldsValue({
                        name: response.result.info.name,
                    });
                } else {
                    message.warning("组详情获取失败");
                }
            }
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { dispatch } = this.props;
                let payload = {
                    id: this.state.groupId,
                    name: values.name,
                    status: values.status ? 1 : 0
                };
                dispatch({
                    type: "auth/groupEdit",
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
        const { groupEditLoading } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
          <Drawer
            title="修改用户组"
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
                        loading={groupEditLoading}
                      >
                          修改
                      </Button>
                  </FormItem>
              </Form>
          </Drawer>
        );
    }
}

export default AuthGroupEdit;
