import { Form } from "@ant-design/compatible";
import React, { Component } from "react";
import { connect } from "umi";
import { Card } from "antd";
import { Alert, Switch, Input, Button, message, Upload, Spin } from "antd";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import CloudUploadOutlined from "@ant-design/icons/CloudUploadOutlined";

const FormItem = Form.Item;

@Form.create()
@connect(({ loading }) => ({
    settingInfoLoading: loading.effects["wechat/settingInfo"],
    settingEditLoading: loading.effects["wechat/settingEdit"]
}))
class Payment extends Component {
    static defaultProps = {
        settingInfoLoading: true,
        settingInfo: {
            info: {
                config: {
                    app_secret: "",
                    app_id: "",
                    appid: "",
                    mini_app_id: "",
                    mini_app_secret: "",
                    mch_id: "",
                    key: "",
                    status: 0,
                    apiclient_cert: "",
                    apiclient_key: "",
                    apiclientCert: [],
                    apiclientKey: [],
                    callback_domain: ""
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
        appid: "",
        key: "",
        status: 0,
        apiclient_cert: "",
        apiclient_key: "",
        apiclientCert: [],
        apiclientKey: [],
        callback_domain: ""
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: "wechat/settingInfo",
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
                            appid: config.appid,
                            key: config.key,
                            status,
                            callback_domain: config.callback_domain,
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
                const { app_id, app_secret, status, mini_app_id, mini_app_secret, mch_id, key, callback_domain, appid } = values;
                const { dispatch } = this.props;
                dispatch({
                    type: "wechat/settingEdit",
                    payload: {
                        config: {
                            app_id,
                            app_secret,
                            mini_app_id,
                            mini_app_secret,
                            appid,
                            mch_id,
                            key,
                            apiclient_cert:
                              Array.isArray(apiclientCert) && apiclientCert.length > 0 && typeof apiclientCert[0]["path"] !== "undefined"
                                ? apiclientCert[0].path
                                : "",
                            apiclient_key:
                              Array.isArray(apiclientKey) && apiclientKey.length > 0 && typeof apiclientKey[0]["path"] !== "undefined"
                                ? apiclientKey[0].path
                                : "",
                            callback_domain
                        },
                        status: status ? 1 : 0
                    },
                    callback: (response) => {
                        if (response.code === 0) {
                            message.success("已保存");
                        } else {
                            message.error(response.msg);
                        }
                    }
                });
            } else {
                console.log(err);
            }
        });
    };

    render() {
        const { app_id, app_secret, status, mini_app_id, appid, mini_app_secret, mch_id, key, apiclientCert, apiclientKey, callback_domain } = this.state;
        const { form, settingEditLoading, settingInfoLoading } = this.props;
        const name = "cert";
        // TODO 封装起来，这儿我认为是umi.js的一个bug，自动索引出来的域名是http的
        let action = "/admin/upload/addCert";
        action = process.env.NODE_ENV === "production" ? process.env.production.api.url + action : action;

        const { getFieldDecorator } = form;
        const token = JSON.parse(localStorage.getItem("token"));
        const headers = { "Access-Token": token.accessToken };
        return (
          <PageHeaderWrapper hiddenBreadcrumb={true} policy={"wechat/settingEdit"}>
              <Card bordered={false}>
                  <Spin size="large" spinning={settingInfoLoading}>
                      <Alert
                        message="注意：App手机登录、微信登录用户打通"
                        description={
                            <span>
                                    如果您使用了App并且使用了手机登录和微信登录方式，请去配置微信开放平台绑定它们之间的关系。
                                {/*<a href={`https://www.domain.com/help/login-ways`} target="_blank">*/}
                                {/*详情请见*/}
                                {/*</a>*/}
                                </span>
                        }
                        type="info"
                        showIcon
                      />
                      <Form
                        onSubmit={this.handleSubmit}
                        style={{
                            marginTop: 24
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
                          <FormItem {...formItemLayout} label="开放平台App Id" help={"用于App内微信支付、微信登陆"}>
                              {getFieldDecorator("appid", {
                                  initialValue: appid
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
                                        <CloudUploadOutlined /> 上传证书
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
                                        <CloudUploadOutlined /> 上传证书
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
                          <FormItem {...formItemLayout} label="回调域名" extra="使用场景：微信支付异步通知、退款原路返回"
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
