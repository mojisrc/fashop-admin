import React, { Component } from "react";
import { connect } from "dva";
import { Alert, Form, Switch, Input, Button, message } from 'antd';
import { View } from "@/components/flexView";
import styles from './index.css'

import { PaymentApi } from "@/services/payment";
const FormItem = Form.Item;

//
// type States = {
//     checked: boolean,
//     app_id: string,
//     app_secret: string,
//     status: number
// }
@Form.create()
@connect(({ app: { setting: { areaList } } }) => ({ areaList }))
export default class WechatMiniPay extends Component {
    state = {
        checked: true,
        app_secret: '',
        app_id: '',
        status: 0
    }
    handleSubmit = async (e:any) => {
        e.preventDefault()
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            const { app_id, app_secret, status } = values
            if (!err) {
                const e = await Fetch.fetch({
                    api: PaymentApi.edit,
                    params: {
                        type: 'wechat_mini',
                        config: {
                            app_id,
                            app_secret,
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
            params: { type: 'wechat_mini' }
        })

        if (paymentInfo.code === 0) {
            const { config, status } = paymentInfo.result.info
            this.setState({
                app_id: config.app_id,
                app_secret: config.app_secret,
                status,
            })
        } else {
            message.warning(paymentInfo.msg)
        }
    }

    render() {
        const { checked, app_id, app_secret, status } = this.state
        const { form } = this.props
        const { getFieldDecorator } = form

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
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
                    offset: 4,
                },
            },
        };
        return (
            <View className={styles.wechatPay}>
                <Alert
                    message="微信支付设置"
                    description={(
                        <p>
                            还没开通微信小程序支付？申请链接： <a href={`https://mp.weixin.qq.com/`} target="_blank">开通微信支付接口</a>
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
                            label="AppID(小程序ID)"
                        >
                            {getFieldDecorator('app_id', {
                                rules: [{
                                    required: true, message: '请输入 AppID',
                                }],
                                initialValue: app_id
                            })(
                                <Input placeholder='请输入' />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="AppSecret(小程序密钥)	"
                        >
                            {getFieldDecorator('app_secret', {
                                rules: [{
                                    required: true, message: '请输入 AppSecret',
                                }],
                                initialValue: app_secret
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
