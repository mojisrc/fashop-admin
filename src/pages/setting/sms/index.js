import React, { Component } from "react";
import { connect } from "dva";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import { Switch, Form, Input, Button, message, Spin, Alert, Card, Table } from "antd";

const FormItem = Form.Item;

@Form.create()
@connect(({ setting, loading }) => ({
    settingInfoLoading: loading.effects["setting/info"],
    settingEditLoading: loading.effects["setting/edit"]
}))
class Payment extends Component {
    static defaultProps = {
        settingInfoLoading: true,
        settingInfo: { info: {} }
    };
    state = {
        info: {
            key: "alidayu_template",
            status: 1,
            config: {
                access_key_id: "xxxxxxxxxx",
                access_key_secret: "xxxxxxxxxx",
                signature: "FaShop",
                template_list: {
                    "register": {
                        "template_id": "SMS_xxxxx",
                        "template_name": "注册验证码",
                        "template_variable": "code",
                        "template_status": 1
                    },
                    "find_password": {
                        "template_id": "SMS_xxxxx",
                        "template_name": "找回密码验证码",
                        "template_variable": "code",
                        "template_status": 1
                    }
                }
            }
        }
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: "setting/info",
            payload: {
                type: "alidayu"
            },
            callback: (response) => {
                if (response.code === 0) {
                    const { config } = response.result.info;
                    if (config) {
                        this.setState({
                            info: response.result.info
                        });
                    }
                } else {
                    message.warning(response.msg);
                }
            }
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const { app_id, public_key, private_key, callback_domain } = values;
                const { dispatch } = this.props;
                dispatch({
                    type: "setting/edit",
                    payload: {
                        type: "alipay",
                        config: {
                            app_id,
                            public_key,
                            private_key,
                            callback_domain
                        },
                        status: status ? 1 : 0
                    },
                    callback: (response) => {
                        if (response.code === 0) {
                            message.success("修改成功");
                        } else {
                            message.warn(response.msg);
                        }
                    }
                });
            }
        });
    };

    render() {
        const { info } = this.state;
        const { form, settingEditLoading, settingInfoLoading } = this.props;
        const { getFieldDecorator } = form;
        const columns = [{
            title: "模板名称",
            dataIndex: "name"
        }, {
            title: "模板ID",
            dataIndex: "age"
        }, {
            title: "模板内容",
            dataIndex: "address"
        }];
        const data = [{
            key: "1",
            name: "注册",
            age: 32,
            address: "您的注册码：${code}，如非本人操作，请忽略本短信！"
        }, {
            key: "2",
            name: "找回密码",
            age: 42,
            address: "验证码为：${code}，您正在尝试变更重要信息，请妥善保管账户信息。"
        }];
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true}>
                <Card title={<div>
                    阿里云短信
                    <a href={`https://www.fashop.cn/help/sms`} target="_blank" style={{fontSize:14,marginLeft:15,fontWeight:400}}>
                        如何申请？
                    </a>
                </div>} bordered={false}>
                    <Spin size="large" spinning={settingInfoLoading}>
                        <Form
                            onSubmit={this.handleSubmit}
                            style={{
                            }}
                        >
                            <FormItem
                                {...formItemLayout}
                                label="Access KeyID"
                            >
                                {getFieldDecorator("access_key_id", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入"
                                        }
                                    ],
                                    initialValue: info.access_key_id
                                })(<Input placeholder="请输入" style={{ width: "auto", minWidth: 300 }} />)}
                            </FormItem>
                            <FormItem {...formItemLayout} label="Access KeySecret">
                                {getFieldDecorator("access_key_secret", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入"
                                        }
                                    ],
                                    initialValue: info.access_key_secret
                                })(<Input placeholder="请输入" style={{ width: "auto", minWidth: 300 }} />)}
                            </FormItem>
                            <FormItem {...formItemLayout} label="短信签名">
                                {getFieldDecorator("private_key", {
                                    initialValue: info.signature
                                })(<Input placeholder="请输入，如FaShop" style={{ width: "auto", minWidth: 100 }} />)}
                            </FormItem>
                            <FormItem {...formItemLayout} label="使用场景">
                                {getFieldDecorator("private_key", {
                                    initialValue: info.signature
                                })(<Table columns={columns} dataSource={data} pagination={false} />)}
                                <a href={`https://www.fashop.cn/help/sms#如何获得模板ID`} target="_blank">
                                    如何获取模板ID？
                                </a>
                            </FormItem>
                            <FormItem {...formItemLayout} label="是否开启" extra={"关闭后，短信提醒功能将不可使用"}>
                                {getFieldDecorator("status", {
                                    valuePropName: "checked",
                                    initialValue: info.status === 1
                                })(<Switch />)}
                            </FormItem>
                            <FormItem {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit" loading={settingEditLoading}>
                                    保存
                                </Button>
                            </FormItem>
                        </Form>
                    </Spin>
                </Card>
            </PageHeaderWrapper>
        );
    }
}

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 3 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
    }
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0
        },
        sm: {
            span: 10,
            offset: 3
        }
    }
};
export default Payment;
