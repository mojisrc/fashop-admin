import React, { Component } from "react";
import { connect } from "dva";
import { Card } from "antd";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import { Alert, Switch, Form, Input, Button, message, Upload, Icon, Spin } from "antd";

const FormItem = Form.Item;

@Form.create()
@connect(({ payment, loading }) => ({
    paymentInfoLoading: loading.effects["payment/info"],
    paymentEditLoading: loading.effects["payment/edit"]
}))
class Payment extends Component {
    static defaultProps = {
        paymentInfoLoading: true,
        paymentInfo: {
            info: {
                config: {
                    app_secret: "",
                    app_id: "",
                    mini_app_id: "",
                    mini_app_secret: "",
                    mch_id: "",
                    key: "",
                    status: 0,
                    apiclient_cert: "",
                    apiclient_key: "",
                    apiclientCert: [],
                    apiclientKey: []
                }
            }
        }
    };
    state = {
        app_secret: "",
        app_id: "",
        mini_app_id: "",
        mini_app_secret: "",
        mch_id: "",
        key: "",
        status: 0,
        apiclient_cert: "",
        apiclient_key: "",
        apiclientCert: [],
        apiclientKey: []
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: "payment/info",
            payload: {
                type: "wechat"
            },
            callback: (response) => {
                if (response.code === 0) {
                    // 项目初始化的时候为空
                    const { config, status } = response.result.info;
                    if (config) {
                        this.setState({
                            app_id: config.app_id,
                            app_secret: config.app_secret,
                            mini_app_id: config.mini_app_id,
                            mini_app_secret: config.mini_app_secret,
                            mch_id: config.mch_id,
                            key: config.key,
                            status,
                            apiclient_cert: config.apiclient_cert,
                            apiclient_key: config.apiclient_key,
                            apiclientCert: config.apiclient_cert
                                ? [
                                    {
                                        uid: "-1",
                                        name: "证书",
                                        status: "done",
                                        path: config.apiclient_cert
                                    }
                                ]
                                : [],
                            apiclientKey: config.apiclient_key
                                ? [
                                    {
                                        uid: "-1",
                                        name: "证书",
                                        status: "done",
                                        path: config.apiclient_key
                                    }
                                ]
                                : []
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
                const { apiclientCert, apiclientKey } = this.state;
                const { app_id, app_secret, status, mini_app_id, mch_id, key } = values;
                const { dispatch } = this.props;
                dispatch({
                    type: "payment/edit",
                    payload: {
                        type: "wechat",
                        config: {
                            app_id,
                            app_secret,
                            mini_app_id,
                            mch_id,
                            key,
                            apiclient_cert:
                                typeof apiclientCert[0]["path"] !== "undefined"
                                    ? apiclientCert[0].path
                                    : "",
                            apiclient_key:
                                typeof apiclientKey[0]["path"] !== "undefined"
                                    ? apiclientKey[0].path
                                    : ""
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
        const { app_id, app_secret, status, mini_app_id, mini_app_secret, mch_id, key, apiclientCert, apiclientKey } = this.state;
        const { form, paymentEditLoading, paymentInfoLoading } = this.props;
        const name = "cert";
        const action = "admin/upload/addCert";
        const { getFieldDecorator } = form;
        const token = JSON.parse(localStorage.getItem("token"));
        const headers = { "Access-Token": token.accessToken };
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true}>
                <Card bordered={false}>
                    <Spin size="large" spinning={paymentInfoLoading}>
                        <Alert
                            message="微信支付设置"
                            description={
                                <p>
                                    还没开通微信支付？申请链接：{" "}
                                    <a href={`https://mp.weixin.qq.com/`} target="_blank">
                                        开通微信支付接口
                                    </a>
                                </p>
                            }
                            type="info"
                            showIcon
                        />
                        <Form
                            onSubmit={this.handleSubmit}
                            style={{
                                width: "88%",
                                marginTop: 48
                            }}
                        >
                            <FormItem
                                {...formItemLayout}
                                label="微信商户ID"
                                // extra="微信支付商户号，审核通过后，会发送到申请时的邮箱"
                            >
                                {getFieldDecorator("mch_id", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入"
                                        }
                                    ],
                                    initialValue: mch_id
                                })(<Input placeholder="请输入" />)}
                            </FormItem>
                            <FormItem {...formItemLayout} label="微信商户API密钥">
                                {getFieldDecorator("key", {
                                    rules: [
                                        {
                                            required: true,
                                            message: "请输入"
                                        }
                                    ],
                                    initialValue: key
                                })(<Input placeholder="请输入" />)}
                            </FormItem>
                            <FormItem {...formItemLayout} label="小程序App Id">
                                {getFieldDecorator("mini_app_id", {
                                    initialValue: mini_app_id
                                })(<Input placeholder="请输入" />)}
                            </FormItem>
                            <FormItem {...formItemLayout} label="小程序App Secret">
                                {getFieldDecorator("mini_app_secret", {
                                    initialValue: mini_app_secret
                                })(<Input placeholder="请输入" />)}
                            </FormItem>
                            <FormItem {...formItemLayout} label="公众号App Id">
                                {getFieldDecorator("app_id", {
                                    initialValue: app_id
                                })(<Input placeholder="请输入" />)}
                            </FormItem>
                            <FormItem {...formItemLayout} label="公众号App Secret">
                                {getFieldDecorator("app_secret", {
                                    initialValue: app_secret
                                })(<Input placeholder="请输入" />)}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="CERT证书"
                                extra="下载证书 cert.zip 中的 apiclient_cert.pem 文件，微信退款原路退回时所需"
                            >
                                {getFieldDecorator("apiclient_cert", {})(
                                    <Upload
                                        name={name}
                                        action={action}
                                        headers={headers}
                                        onChange={e => {
                                            this.onApiclientCertChange(e);
                                        }}
                                        fileList={apiclientCert}
                                    >
                                        <Button>
                                            <Icon type="upload" /> 上传证书
                                        </Button>
                                        {Array.isArray(apiclientCert) && apiclientCert.length > 0 ? (
                                            <span style={{ marginLeft: 10, color: "green" }}>
                                                    已上传
                                                </span>
                                        ) : (
                                            <span style={{ marginLeft: 10 }}>未上传</span>
                                        )}
                                    </Upload>
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="KEY密钥文件"
                                extra="下载证书 cert.zip 中的 apiclient_key.pem 文件，微信退款原路退回时所需"
                            >
                                {getFieldDecorator("apiclient_key", {})(
                                    <Upload
                                        name={name}
                                        action={action}
                                        headers={headers}
                                        onChange={e => {
                                            this.onApiclientKeyChange(e);
                                        }}
                                        fileList={apiclientKey}
                                    >
                                        <Button>
                                            <Icon type="upload" /> 上传证书
                                        </Button>
                                        {Array.isArray(apiclientKey) && apiclientKey.length > 0 ? (
                                            <span style={{ marginLeft: 10, color: "green" }}>
                                                    已上传
                                                </span>
                                        ) : (
                                            <span style={{ marginLeft: 10 }}>未上传</span>
                                        )}
                                    </Upload>
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout} label="是否启用">
                                {getFieldDecorator("status", {
                                    valuePropName: "checked",
                                    initialValue: status === 1
                                })(<Switch />)}
                            </FormItem>
                            <FormItem {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit" loading={paymentEditLoading}>
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
