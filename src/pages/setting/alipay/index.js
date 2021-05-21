import { Form } from '@ant-design/compatible';
import React, { Component } from "react";
import { connect } from "umi";
import { Card } from "antd";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import { Switch,  Input, Button, message, Spin } from "antd";

const FormItem = Form.Item;

@Form.create()
@connect(({ loading }) => ({
    settingInfoLoading: loading.effects["alipay/settingInfo"],
    settingEditLoading: loading.effects["alipay/settingEdit"]
}))
class Payment extends Component {
    static defaultProps = {
        settingInfoLoading: true,
        settingInfo: {
            info: {
                config: {
                    app_id: "",
                    alipay_public_key: "",
                    merchant_private_key: "",
                    callback_domain: ""
                }
            }
        }
    };
    state = {
        app_id: "",
        alipay_public_key: "",
        merchant_private_key: "",
        callback_domain: ""
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: "alipay/settingInfo",
            callback: (response) => {
                if (response.code === 0) {
                    // 项目初始化的时候为空
                    const { config, status } = response.result.info;
                    if (config) {
                        this.setState({
                            app_id: config.app_id,
                            alipay_public_key: config.alipay_public_key,
                            merchant_private_key: config.merchant_private_key,
                            callback_domain: config.callback_domain,
                            status
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
                const { app_id, alipay_public_key, merchant_private_key, callback_domain, status } = values;
                const { dispatch } = this.props;
                dispatch({
                    type: "alipay/settingEdit",
                    payload: {
                        config: {
                            app_id,
                            alipay_public_key,
                            merchant_private_key,
                            callback_domain
                        },
                        status: status ? 1 : 0
                    },
                    callback: (response) => {
                        if (response.code === 0) {
                            message.success("已保存");
                        } else {
                            message.warn(response.msg);
                        }
                    }
                });
            }
        });
    };

    render() {
        const { app_id, alipay_public_key, merchant_private_key, callback_domain, status } = this.state;
        const { form, settingEditLoading, settingInfoLoading } = this.props;
        const { getFieldDecorator } = form;
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true} policy={'alipay/settingEdit'}>
                <Card bordered={false}>
                    <Spin size="large" spinning={settingInfoLoading}>
                        <Form
                            onSubmit={this.handleSubmit}
                            style={{
                                width: "88%",
                                marginTop: 24
                            }}
                        >
                            <FormItem
                                {...formItemLayout}
                                label="支付宝AppId"
                            >
                                {getFieldDecorator("app_id", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入"
                                        }
                                    ],
                                    initialValue: app_id
                                })(<Input placeholder="请输入" />)}
                            </FormItem>
                            <FormItem {...formItemLayout} label="支付宝公钥">
                                {getFieldDecorator("alipay_public_key", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入"
                                        }
                                    ],
                                    initialValue: alipay_public_key
                                })(<Input placeholder="请输入" />)}
                            </FormItem>
                            <FormItem {...formItemLayout} label="商户私钥">
                                {getFieldDecorator("merchant_private_key", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入"
                                        }
                                    ],
                                    initialValue: merchant_private_key
                                })(<Input placeholder="请输入" />)}
                            </FormItem>
                            <FormItem {...formItemLayout} label="回调域名" extra="使用场景：支付宝支付异步通知、退款原路返回"
                            >
                                {getFieldDecorator("callback_domain", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入回调域名"
                                        }
                                    ],
                                    initialValue: callback_domain
                                })(<Input placeholder="请输入回调域名，如：https://www.domain.com" />)}
                            </FormItem>
                            <FormItem {...formItemLayout} label="支付开关">
                                {getFieldDecorator("status", {
                                    valuePropName: "checked",
                                    initialValue: status === 1
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
        sm: { span: 10 }
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
