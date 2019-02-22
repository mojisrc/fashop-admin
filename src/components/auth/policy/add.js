import React, { Component } from "react";
import { Drawer, Input, Button, Form, Switch, message, Transfer, Select } from "antd";
import { connect } from "dva";

const Option = Select.Option;
const FormItem = Form.Item;
@Form.create()
@connect(({ auth, loading }) => ({
    moduleList: auth.moduleList.result.list,
    actionList: auth.actionList.result.list,
    policyAddLoading: loading.effects["auth/policyAdd"]
}), null, null, {
    withRef: true
})
export default class PolicyAdd extends Component {
    static defaultProps = {
        policyAddLoading: false,
        onAddSuccess: () => {
        }
    };
    state = {
        visible: false,
        targetKeys: [],
        actionList: []
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { dispatch } = this.props;
                let payload = {
                    name: values.name,
                    structure: {
                        Statement: [
                            {
                                Effect: values.effect ? "Allow" : "Deny",
                                Action: this.state.targetKeys
                            }
                        ]
                    }
                };
                dispatch({
                    type: "auth/policyAdd",
                    payload,
                    callback: (response) => {
                        if (response.code === 0) {
                            this.reset();
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
        this.reset();
        this.setState({
            visible: true,
            targetKeys: []
        }, () => {
            this.props.form.resetFields();
            // 有就不加载了 模块新增需要编译 所以用已经加载的即可
            if(this.props.moduleList.length === 0){
                this.getModule();
            }
        });

    }

    close() {
        this.setState({
            visible: false
        });
    }

    reset() {
        this.props.form.resetFields();
        // 由于不是全部由form元素控制所以
        this.setState({ targetKeys: [], actionList: [] });
    }

    getModule() {
        const { dispatch } = this.props;
        dispatch({
            type: "auth/moduleList"
        });
    }

    handleChange = (targetKeys) => {
        this.setState({ targetKeys });
    };

    render() {

        const { policyAddLoading } = this.props;
        const { getFieldDecorator } = this.props.form;

        const { targetKeys, actionList } = this.state;

        const actionListData = actionList.map((item) => {
            return {
                key: item.value,
                title: item.name
            };
        });


        return (
          <Drawer
            title="新建策略"
            width={600}
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
                    label='策略名称'
                  >
                      {getFieldDecorator("name", {
                          rules: [{ required: true, message: "请输入组名称" }]
                      })(
                        <Input
                          placeholder="请输入组名称"
                        />
                      )}
                  </FormItem>
                  <FormItem
                    label='允许或禁止'
                  >
                      {getFieldDecorator("effect", {
                          initialValue: true,
                          valuePropName: "checked",
                          rules: [{ required: true, message: "请选择是否开启" }]
                      })(
                        <Switch />
                      )}
                  </FormItem>
                  <FormItem
                    label='选择模块'
                  >
                      {getFieldDecorator("module", {
                          rules: [{ required: true, message: "请选择模块" }]
                      })(
                        <Select
                          showSearch
                          style={{ width: 200 }}
                          placeholder="请选择"
                          onChange={(value) => {
                              this.setState({
                                  targetKeys: []
                              }, () => {
                                  const { dispatch } = this.props;
                                  dispatch({
                                      type: "auth/actionList",
                                      payload: {
                                          module: value
                                      },
                                      callback: (e) => {
                                          this.setState({ actionList: e.result.list });
                                      }
                                  });
                              });
                          }}
                        >
                            {this.props.moduleList.map((item) => {
                                return <Option key={item.value} value={item.value}>{item.name}</Option>;

                            })}
                        </Select>
                      )}
                  </FormItem>
                  <FormItem
                  >
                      {getFieldDecorator("actions", {
                          rules: [{ required: true, message: "请选择权限节点" }]
                      })(<Transfer
                        titles={["权限列表", "已选中"]}
                        dataSource={actionListData}
                        showSearch
                        listStyle={{
                            width: 220,
                            height: 300
                        }}
                        targetKeys={targetKeys}
                        onChange={this.handleChange}
                        render={item => `${item.title}`}
                      />)}
                  </FormItem>
                  <FormItem>
                      <Button
                        type="primary"
                        htmlType="submit"
                        loading={policyAddLoading}
                      >
                          确定
                      </Button>
                  </FormItem>
              </Form>
          </Drawer>
        );
    }
}
