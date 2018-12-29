import React, { Component } from "react";
import { connect } from "dva";
import { Card } from "antd";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import { Switch, Form, Input, Button, message, Spin } from "antd";

const FormItem = Form.Item;

@Form.create()
@connect(({ setting, loading }) => ({
    settingInfoLoading: loading.effects["setting/info"],
    settingEditLoading: loading.effects["setting/edit"]
}))
class Payment extends Component {
    static defaultProps = {
        settingInfoLoading: true,
        settingInfo: {
            info: {
                config: {
                    app_id: "",
                    public_key: "",
                    private_key: "",
                    callback_domain: ""
                }
            }
        }
    };
    state = {
        app_id: "",
        public_key: "",
        private_key: "",
        callback_domain: ""
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
                    // 项目初始化的时候为空
                    const { config, status } = response.result.info;
                    if (config) {
                        this.setState({
                            app_id: config.app_id,
                            public_key: config.public_key,
                            private_key: config.private_key,
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
        const { app_id, public_key, private_key, callback_domain } = this.state;
        const { form, settingEditLoading, settingInfoLoading } = this.props;
        const { getFieldDecorator } = form;
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true}>
                <Card bordered={false}>
                    <Spin size="large" spinning={settingInfoLoading}>
                        <Form
                            onSubmit={this.handleSubmit}
                            style={{
                                width: "88%",
                                marginTop: 48
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
                                {getFieldDecorator("public_key", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入"
                                        }
                                    ],
                                    initialValue: public_key
                                })(<Input placeholder="请输入" />)}
                            </FormItem>
                            <FormItem {...formItemLayout} label="支付宝私钥">
                                {getFieldDecorator("private_key", {
                                    initialValue: private_key
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
                                })(<Input placeholder="请输入回调域名，如：https://www.fashop.cn" />)}
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

    onApiclientCertChange = info => {
        let fileList = info.fileList;
        fileList = fileList.slice(-1);
        fileList = fileList.map(file => {
            if (file.response) {
                file.path = file.response.result.path;
                file.name = "证书";
            }
            return file;
        });
        fileList = fileList.filter(file => {
            if (file.response) {
                return file.response.code === 0;
            }
            return true;
        });
        this.setState({ apiclientCert: fileList });
    };
    onApiclientKeyChange = info => {
        let fileList = info.fileList;
        fileList = fileList.slice(-1);
        fileList = fileList.map(file => {
            if (file.response) {
                file.path = file.response.result.path;
                file.name = "证书";
            }
            return file;
        });
        fileList = fileList.filter(file => {
            if (file.response) {
                return file.response.code === 0;
            }
            return true;
        });
        this.setState({ apiclientKey: fileList });
    };
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
