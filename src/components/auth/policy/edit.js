import React, { Component } from "react";
import { Drawer, Input, Button, Form, Switch, message, Transfer, Select } from "antd";
import { connect } from "dva";
import policy from "@/utils/policy"
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
        onEditSuccess: () => {
        }
    };
    state = {
        id: 0,
        visible: false,
        targetKeys: [],
        actionList:[]
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { dispatch } = this.props;
                let payload = {
                    id:this.state.id,
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
                    type: "auth/policyEdit",
                    payload,
                    callback: (response) => {
                        if (response.code === 0) {
                            message.success("保存成功");
                            this.props.onEditSuccess();
                        } else {
                            message.error(response.msg);
                        }
                    }
                });
            }
        });
    };

    show({ id }) {
        this.reset()
        this.setState({
            id,
            visible: true
        },()=>{
            this.intPolicyInfo()
        });
        // 有就不加载了 模块新增需要编译 所以用已经加载的即可
        if(this.props.moduleList.length === 0){
            this.getModule();
        }

    }

    close() {
        this.setState({
            visible: false
        });
    }

    intPolicyInfo() {
        const { dispatch } = this.props;
        dispatch({
            type: "auth/policyInfo",
            payload: {
                id: this.state.id
            },
            callback: (response) => {
                if (response.code === 0) {
                    const { info } = response.result;
                    const actions = policy.getActionList(info.structure);
                    const effect = policy.getEffect(info.structure);
                    const module =  actions[0].split("/")[0]
                    this.props.form.setFieldsValue({
                        name: info.name,
                        effect: effect === "Allow",
                        actions,
                        module
                    });
                    // 特殊
                    this.setState({
                        targetKeys: actions
                    });
                    // 首次需要渲染出来action的列表
                    this.getAction(module)
                } else {
                    message.error("策略详情获取失败");
                }
            }
        });
    }
    reset(){
        this.props.form.resetFields();
        // 由于不是全部由form元素控制所以
        this.setState({ targetKeys: [] ,actionList:[]});
    }
    getModule() {
        const { dispatch } = this.props;
        dispatch({
            type: "auth/moduleList",
        });
    }
    getAction(module){
        const { dispatch } = this.props;
        dispatch({
            type: "auth/actionList",
            payload: {
                module
            },
            callback:(e)=>{
                this.setState({actionList:e.result.list})
        }
        });
    }
    handleChange = (targetKeys) => {
        this.setState({ targetKeys });
    };

    render() {

        const { policyAddLoading } = this.props;

        const { getFieldDecorator } = this.props.form;

        const { targetKeys ,actionList} = this.state;

        const actionListData = actionList.map((item) => {
            return {
                key: item.value,
                title: item.name
            };
        });


        return (
          <Drawer
            title="修改策略"
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
                    label='允许或禁止访问'
                    help='用于限制授权的组是否能访问或者禁止访问'
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
                                  this.getAction(value)
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
