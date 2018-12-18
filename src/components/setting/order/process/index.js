import React, { Component } from "react";
import { connect } from "dva";
import { Alert, Form, InputNumber, Row, Col, Button, message } from "antd";
import { View } from "@/components/flexView";
import styles from "./index.css";
import ShopApi from "@/services/shop";

const FormItem = Form.Item;
// type Props = {
//     location: { state: { state_type: string } },
//     history: { push: Function },
//     form: {
//         validateFieldsAndScroll: Function,
//         getFieldDecorator: Function,
//     }
// }
// type States = {
//     order_auto_close_expires_day: number,
//     order_auto_close_expires_hour: number,
//     order_auto_close_expires_minute: number,
//     order_auto_confirm_expires_day: number,
//     order_auto_close_refound_expires_day: number
// }
@Form.create()
@connect()
export default class OrderProcess extends Component {
    state = {
        order_auto_close_expires_day: 0,
        order_auto_close_expires_hour: 0,
        order_auto_close_expires_minute: 0,
        order_auto_confirm_expires_day: 0,
        order_auto_close_refound_expires_day: 0
    };
    handleSubmit = async (e) => {
        e.preventDefault();
        const { form } = this.props;
        form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                const {
                    order_auto_close_expires_day,
                    order_auto_close_expires_hour,
                    order_auto_close_expires_minute,
                    order_auto_confirm_expires_day,
                    order_auto_close_refound_expires_day
                } = values;

                if (!err) {
                    const e = await ShopApi.setOrderExpires({
                        order_auto_close_expires: order_auto_close_expires_day * 86400 + order_auto_close_expires_hour * 3600 + order_auto_close_expires_minute * 60,
                        order_auto_confirm_expires: order_auto_confirm_expires_day * 86400,
                        order_auto_close_refound_expires: order_auto_close_refound_expires_day * 86400
                    });
                    if (e.code === 0) {
                        message.success("修改成功");
                    } else {
                        message.warn(e.msg);
                    }
                }
            }

        });
    };

    async componentDidMount() {
        const shopInfo = await ShopApi.info();
        if (shopInfo.code === 0) {
            const { order_auto_close_expires, order_auto_confirm_expires, order_auto_close_refound_expires } = shopInfo.result.info;
            this.setState({
                order_auto_close_expires_day: parseInt(order_auto_close_expires / 86400),
                order_auto_close_expires_hour: parseInt((order_auto_close_expires % 86400) / 3600),
                order_auto_close_expires_minute: parseInt(order_auto_close_expires % 86400 % 3600 / 60),
                order_auto_confirm_expires_day: parseInt(order_auto_confirm_expires / 86400),
                order_auto_close_refound_expires_day: parseInt(order_auto_close_refound_expires / 86400)
            });
        } else {
            message.warning(shopInfo.msg);
        }
    }

    render() {
        const { form } = this.props;
        const {
            order_auto_close_expires_day,
            order_auto_close_expires_hour,
            order_auto_close_expires_minute,
            order_auto_confirm_expires_day,
            order_auto_close_refound_expires_day
        } = this.state;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 3 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 }
            }
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0
                },
                sm: {
                    span: 16,
                    offset: 3
                }
            }
        };
        return (
            <View className={styles.orderProcess}>
                <Alert
                    message="手动设置时间最长不超过90天"
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
                    <Row gutter={8}>
                        <Col span={6}>
                            <FormItem
                                labelCol={{
                                    xs: { span: 24 },
                                    sm: { span: 12 }
                                }}
                                wrapperCol={{
                                    xs: { span: 24 },
                                    sm: { span: 12 }
                                }}
                                label="待付款订单"
                            >
                                <Row style={{ marginLeft: 4 }}>
                                    <Col span={24}>
                                        {getFieldDecorator("order_auto_close_expires_day", {
                                            initialValue: order_auto_close_expires_day ? order_auto_close_expires_day : 0,
                                            rules: [{ required: true, message: "请输入天数" }]
                                        })(
                                            <InputNumber
                                                max={89}
                                                min={0}
                                                precision={0}
                                            />
                                        )}
                                        <span>&nbsp;天</span>
                                    </Col>
                                </Row>
                            </FormItem>
                        </Col>
                        <Col span={3}>
                            <FormItem>
                                <Col span={24}>
                                    {getFieldDecorator("order_auto_close_expires_hour", {
                                        initialValue: order_auto_close_expires_hour ? order_auto_close_expires_hour : 0,
                                        rules: [{ required: true, message: "请输入小时" }]
                                    })(
                                        <InputNumber
                                            max={24}
                                            min={0}
                                            precision={0}
                                        />
                                    )}
                                    <span>&nbsp;时</span>
                                </Col>
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem>
                                <Col span={24}>
                                    {getFieldDecorator("order_auto_close_expires_minute", {
                                        initialValue: order_auto_close_expires_minute ? order_auto_close_expires_minute : 0,
                                        rules: [{ required: true, message: "请输入分钟" }]
                                    })(
                                        <InputNumber
                                            max={60}
                                            min={0}
                                            precision={0}
                                        />
                                    )}
                                    <span>&nbsp;分，后自动关闭订单</span>
                                </Col>
                            </FormItem>
                        </Col>
                    </Row>
                    <FormItem
                        {...formItemLayout}
                        label="已发货订单"
                        extra="请考虑物流运输时间"
                    >
                        <Row gutter={8}>
                            <Col span={24}>
                                {getFieldDecorator("order_auto_confirm_expires_day", {
                                    initialValue: order_auto_confirm_expires_day ? order_auto_confirm_expires_day : 0,
                                    rules: [{ required: true, message: "请输入天数" }]
                                })(
                                    <InputNumber
                                        max={89}
                                        min={0}
                                        precision={0}
                                    />
                                )}
                                <span>&nbsp;天，后自动确认收货</span>

                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="已收货订单"
                        extra="0 代表确认收货后无法维权"
                    >
                        <Row gutter={8}>
                            <Col span={24}>
                                {getFieldDecorator("order_auto_close_refound_expires_day", {
                                    initialValue: order_auto_close_refound_expires_day ? order_auto_close_refound_expires_day : 0,
                                    rules: [{ required: true, message: "请输入天数" }]
                                })(
                                    <InputNumber
                                        max={89}
                                        min={0}
                                        precision={0}
                                    />
                                )}
                                <span>&nbsp;天，后关闭退款／退货功能</span>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            保存
                        </Button>
                    </FormItem>
                </Form>
            </View>
        );
    }
}
