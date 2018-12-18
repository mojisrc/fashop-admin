import React, { Component } from "react";
import { connect } from "dva";
import { Alert, Form, Input, Row, Col, Button } from "antd";
import { View } from "@/components/flexView";
import styles from "./index.css";

const FormItem = Form.Item;
@Form.create()
@connect()
export default class RightsProcess extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
            }
        });
    };

    render() {
        const { l form } = this.props;
        const { getFieldDecorator } = form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 }
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
                    offset: 4
                }
            }
        };
        return (
            <View className={styles.rightsProcess}>
                <Alert
                    message="系统默认的时间为7天，手动设置时间最长不超过90天"
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
                        label="买家发起退款申请"
                    >
                        <Row gutter={8}>
                            <Col span={11}>
                                {getFieldDecorator("state_send", {
                                    rules: [{ required: true, message: "Please input the captcha you got!" }]
                                })(
                                    <Input />
                                )}
                            </Col>
                            <Col span={1}>
                                <span>天</span>
                            </Col>
                            <Col span={12}>
                                <p>后商家未处理，系统将自动同意/拒绝退款</p>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="买家发起退货退款申请"
                    >
                        <Row gutter={8}>
                            <Col span={11}>
                                {getFieldDecorator("state_success", {
                                    rules: [{ required: true, message: "Please input the captcha you got!" }]
                                })(
                                    <Input />
                                )}
                            </Col>
                            <Col span={1}>
                                <span>天</span>
                            </Col>
                            <Col span={12}>
                                <p>后商家未处理，系统将自动同意维权</p>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="商家同意退货"
                    >
                        <Row gutter={8}>
                            <Col span={11}>
                                {getFieldDecorator("state_success", {
                                    rules: [{ required: true, message: "Please input the captcha you got!" }]
                                })(
                                    <Input />
                                )}
                            </Col>
                            <Col span={1}>
                                <span>天</span>
                            </Col>
                            <Col span={12}>
                                <p>后买家未处理，系统将自动拒绝维权</p>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="买家已退货"
                    >
                        <Row gutter={8}>
                            <Col span={11}>
                                {getFieldDecorator("state_success", {
                                    rules: [{ required: true, message: "Please input the captcha you got!" }]
                                })(
                                    <Input />
                                )}
                            </Col>
                            <Col span={1}>
                                <span>天</span>
                            </Col>
                            <Col span={12}>
                                <p>后商家未处理，系统将自动同意/拒绝退款</p>
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
