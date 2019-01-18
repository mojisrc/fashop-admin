import React, { Component } from "react";
import { View } from "@/components/flexView";
import { Button, Form, Input, Spin, message, Icon, Modal, Checkbox } from "antd";
import styles from "./index.css";
import AgreementView from "../../components/agreementView";
import InstallApi from "@/services/install";

const FormItem = Form.Item;
@Form.create()
export default class ParamConfig extends Component {
    state = {
        confirmDirty: false,
        loading: false
    };
    handleSubmit = async (e) => {
        e.preventDefault();
        const { changeState, form } = this.props;
        form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
                let newValues = Object.assign({}, values);
                delete newValues.confirm;
                let dbValue = { ...newValues };
                delete dbValue.account;
                delete dbValue.pwd;
                let accountValue = {
                    username: newValues.account,
                    password: newValues.pwd,
                    repassword: values.confirm,
                    agree: values.agree === true ? 1 : 0
                };
                const result = await InstallApi.checkDb(dbValue);
                if (result.code !== 0) {
                    return message.warn(result.msg);
                }
                const result2 = await InstallApi.checkAdminAccount(accountValue);

                if (result2.code === 0) {
                    this.setState({
                        loading: true
                    });
                    const runResult = await InstallApi.run(accountValue);
                    if (runResult.code === 0) {
                        changeState(3);
                    } else {
                        message.warn(runResult.msg);
                    }
                    this.setState({
                        loading: false
                    });
                } else {
                    message.warn(result2.msg);
                }
            }
        });
    };
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue("pwd")) {
            callback("两次密码输入不一致!");
        } else {
            callback();
        }
    };
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(["confirm"], { force: true });
        }
        callback();
    };

    render() {
        const { changeState, form } = this.props;
        const { getFieldDecorator, setFieldsValue, getFieldValue } = form;
        const { loading } = this.state;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 24 },
                style: {
                    textAlign: "left"
                }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 24 }
            }
        };
        return (
            <Spin spinning={loading}>
                <View className={styles.paramConfigWarp}>
                    <Form
                        onSubmit={this.handleSubmit}
                        hideRequiredMark
                    >
                        <View className={styles.modalView}>
                            <FormItem
                                colon={false}
                                {...formItemLayout}
                            >
                                {getFieldDecorator("account", {
                                    rules: [{
                                        required: true, message: "请输入账号!"
                                    }]
                                })(
                                    <Input size='large'
                                           prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                                           placeholder="管理员账号" />
                                )}
                            </FormItem>
                            <FormItem
                                colon={false}
                                {...formItemLayout}
                            >
                                {getFieldDecorator("pwd", {
                                    rules: [{
                                        required: true, message: "请输入密码!"
                                    }, {
                                        validator: this.checkConfirm
                                    }]
                                })(
                                    <Input size='large' type="password"
                                           prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                                           placeholder="管理员密码" />
                                )}
                            </FormItem>
                            <FormItem
                                colon={false}
                                {...formItemLayout}
                            >
                                {getFieldDecorator("confirm", {
                                    rules: [{
                                        required: true, message: "请确认密码!"
                                    }, {
                                        validator: this.checkPassword
                                    }]
                                })(
                                    <Input size='large' type="password"
                                           prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                                           placeholder="再次确认密码" onBlur={this.handleConfirmBlur} />
                                )}
                            </FormItem>

                            <View className={styles.paramConfigFooter}>
                                <Form.Item>
                                    {getFieldDecorator("agree", {
                                        valuePropName: "checked",
                                        initialValue: false
                                    })(
                                        <Checkbox>同意并阅读了</Checkbox>
                                    )}
                                    <a onClick={() => {
                                        Modal.confirm({
                                            width: 900,
                                            title: "FaShop使用协议",
                                            okText: "同意",
                                            cancelText: "取消",
                                            content: (
                                                <AgreementView />
                                            ),
                                            onOk() {
                                                setFieldsValue({ agree: true });
                                            }
                                        });
                                    }}>《FaShop使用协议》</a>
                                </Form.Item>

                                <div className={styles.paramConfigFooterBtnArea}>
                                    <Button
                                        disabled={loading}
                                        size='large'
                                        onClick={() => {
                                            changeState(1);
                                        }}
                                    >
                                        &nbsp;&nbsp;上一步&nbsp;&nbsp;
                                    </Button>
                                    <Button
                                        disabled={!getFieldValue("agree") || loading}
                                        size='large'
                                        htmlType="submit"
                                        type='primary'
                                        style={{ marginLeft: 15 }}
                                    >
                                        &nbsp;&nbsp;&nbsp;&nbsp;安&nbsp;&nbsp;装&nbsp;&nbsp;&nbsp;&nbsp;
                                    </Button>
                                </div>
                            </View>
                        </View>

                    </Form>
                </View>
            </Spin>
        );
    }
}
