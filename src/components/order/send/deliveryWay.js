import React, { Component } from "react";
import { connect } from "dva";
import { Form, Select, Radio, Card, Input } from "antd";
import { View } from "@/components/flexView";
import styles from "./index.css";

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

@connect()
export default class DeliveryWay extends Component {
    static defaultProps = {
        expressList: [],
        express_id: 0,
        need_express: 1,
        tracking_no: "",
        deliver_name: "",
        deliver_phone: "",
        deliver_address: ""
    };

    componentWillReceiveProps(nextProps) {
        const { express_id, tracking_no, need_express } = this.props;
        if (express_id !== nextProps.express_id || tracking_no !== nextProps.tracking_no || need_express !== nextProps.need_express) {
            const { onChange } = this.props;
            if (typeof onChange === "function") {
                onChange({
                    express_id: nextProps.express_id,
                    tracking_no: nextProps.express_id,
                    need_express: nextProps.need_express
                });
            }
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { expressList, tracking_no, express_id, onExpressChange, need_express } = this.props;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 2 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 6 }
            }
        };
        return (
            <View className={styles.orderSendItemWarp}>
                <p className={styles.title}>配送方式</p>
                <FormItem
                    {...formItemLayout}
                    label="是否需要物流"
                    style={{
                        marginBottom: 10
                    }}
                >
                    {getFieldDecorator("need_express", {
                        initialValue: need_express
                    })(
                        <RadioGroup onChange={(e) => {
                            onExpressChange({
                                express_id,
                                need_express: e.target.value ? 1 : 0,
                                tracking_no
                            });
                        }}>
                            <Radio value={1}>是</Radio>
                            <Radio value={0}>否</Radio>
                        </RadioGroup>
                    )}
                </FormItem>

                {need_express === 1 ? <Card
                    type="inner"
                    title={<FormItem
                        {...formItemLayout}
                        label="选择物流公司"
                        style={{
                            marginBottom: "0"
                        }}
                    >
                        {getFieldDecorator("express_id", {
                            initialValue: express_id ? express_id : undefined,
                            rules: [{
                                required: true, message: "请选择物流公司"
                            }]
                        })(
                            <Select
                                placeholder="选择物流公司"
                                onChange={(id) => {
                                    const item = expressList.find((e) => {
                                        return e.id === id;
                                    });
                                    if (item) {
                                        onExpressChange({
                                            express_id: item.id,
                                            tracking_no,
                                            need_express
                                        });
                                    }
                                }}
                            >
                                {expressList.length > 0 ? expressList.map((item) => {
                                    return <Option value={item.id} key={item.id}>{item.company_name}</Option>;
                                }) : null}
                            </Select>
                        )}
                    </FormItem>}
                >
                    <FormItem
                        label="输入物流单号"
                        colon={false}
                    >
                        {getFieldDecorator("tracking_no", {
                            initialValue: tracking_no,
                            rules: [{
                                required: true, message: "请输入物流单号"
                            }]
                        })(
                            <Input
                                placeholder="请输入物流单号"
                                style={{ width: 300 }}
                                onChange={(e) => {
                                    onExpressChange({
                                        express_id,
                                        need_express,
                                        tracking_no: e.target.value
                                    });
                                }}
                            />
                        )}
                    </FormItem>
                </Card> : null}
            </View>
        );
    }
}
