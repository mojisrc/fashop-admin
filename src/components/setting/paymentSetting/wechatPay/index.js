//@flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { Alert, Switch, Form, Input, Button, message } from 'antd';
import { View } from "react-web-dom";
import styles from './index.css'
import Fetch from "../../../../utils/fetch";
import { PaymentApi } from "../../../../config/api/payment";

type Props = {
    form: {
        validateFieldsAndScroll: Function,
        getFieldDecorator: Function,
    },
}
type States = {
    checked: boolean,
    app_id: string,
    app_secret: string,
    miniapp_id: string,
    mch_id: string,
    key: string,
    status: number
}
const FormItem = Form.Item;
@Form.create()
@connect()
export default class WechatPay extends Component<Props, States> {
    state = {
        checked: true,
        app_secret: '',
        app_id: '',
        miniapp_id: '',
        mch_id: '',
        key: '',
        status: 0
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            const {app_id, app_secret, status, miniapp_id, mch_id, key } = values
            if (!err) {
                const e = await Fetch.fetch({
                    api: PaymentApi.edit,
                    params: {
                        type: 'wechat',
                        config: {
                            app_id,
                            app_secret,
                            miniapp_id,
                            mch_id,
                            key
                        },
                        status: status ? 1 : 0
                    }
                })
                if (e.code === 0) {
                    message.success('修改成功')
                } else {
                    message.warn(e.msg)
                }
            }
        });
    }
    async componentDidMount() {
        const paymentInfo = await Fetch.fetch({
            api: PaymentApi.info,
            params: { type: 'wechat' }
        })

        if (paymentInfo.code === 0) {
            // 项目初始化的时候为空
            const { config, status } = paymentInfo.result.info
            if(config){
                this.setState({
                    app_id: config.app_id,
                    app_secret: config.app_secret,
                    miniapp_id: config.miniapp_id,
                    mch_id: config.mch_id,
                    key: config.key,
                    status,
                })
            }
        } else {
            message.warning(paymentInfo.msg)
        }
    }
    render() {
        const { checked, app_id,  status, miniapp_id, mch_id, key } = this.state
        const { form } = this.props
        const { getFieldDecorator } = form

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 3 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 10 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 10,
                    offset: 3,
                },
            },
        };
        return (
            <View className={styles.wechatPay}>
                <Alert
                    message="微信支付设置"
                    description={(
                        <p>
                            还没开通微信支付？申请链接： <a href={`https://mp.weixin.qq.com/`} target="_blank">开通微信支付接口</a>
                        </p>
                    )}
                    type="info"
                    showIcon
                />
                {
                    checked &&
                    <Form
                        onSubmit={this.handleSubmit}
                        style={{
                            width: '88%',
                            marginTop: 48
                        }}
                    >
                        <FormItem
                            {...formItemLayout}
                            label="微信商户ID"
                            // extra="微信支付商户号，审核通过后，会发送到申请时的邮箱"
                        >
                            {getFieldDecorator('mch_id', {
                                rules: [{
                                    required: true,
                                    message: '请输入',
                                }],
                                initialValue: mch_id
                            })(
                                <Input placeholder='请输入' />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="微信商户API密钥"
                        >
                            {getFieldDecorator('key', {
                                rules: [{
                                    required: true,
                                    message: '请输入',
                                }],
                                initialValue: key
                            })(
                                <Input placeholder='请输入' />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="小程序APPID"
                        >
                            {getFieldDecorator('miniapp_id', {
                                initialValue: miniapp_id
                            })(
                                <Input placeholder='请输入' />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="公众号APPID"
                        >
                            {getFieldDecorator('app_id', {
                                initialValue: app_id
                            })(
                                <Input placeholder='请输入' />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="是否启用"
                        >
                            {getFieldDecorator('status', {
                                valuePropName: 'checked',
                                initialValue: status === 1
                            })(
                                <Switch />,
                            )}
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">保存</Button>
                        </FormItem>
                    </Form>
                }
            </View>
        )
    }
}
