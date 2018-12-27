import React, { Component } from "react";
import { connect } from "dva";
import { View } from "@/components/flexView";
import { Form, Input, InputNumber, Radio, DatePicker, Checkbox, Button, Row, Col, Switch } from "antd";
import router from "umi/router";
import moment from "moment";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
function disabledDate(current) {
    // Can not select days before today
    return current && current < moment().startOf('day');
}

@connect()
class Basic extends Component {
    render() {
        const { form, formItemLayout, groupInfo } = this.props;
        const { getFieldDecorator, setFieldsValue, getFieldValue } = form;
        return (
            <View>
                <h3>基本信息</h3>
                <FormItem
                    {...formItemLayout}
                    label='活动标题'
                >
                    {getFieldDecorator("title", {
                        rules: [{ required: true, message: "请输入活动标题!" }],
                        initialValue: groupInfo.title ? groupInfo.title : ""
                    })(
                        <Input
                            placeholder="请输入活动标题"
                            style={{width: 350}}
                        />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='活动时间'
                >
                    {getFieldDecorator("time", {
                        rules: [{ required: true, message: "请选择活动时间!" }],
                        initialValue: (groupInfo.start_time&&groupInfo.end_time) ? [
                            new Date(groupInfo.start_time),
                            new Date(groupInfo.end_time)
                        ] : []
                    })(
                        <RangePicker
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            disabledDate={disabledDate}
                        />
                    )}
                    {/* start_time end_time */}
                </FormItem>
                <Row>
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
                            label="拼团时限"
                            extra="建议不要超过24小时"
                        >
                            {getFieldDecorator("time_over_day", {
                                initialValue: groupInfo.time_over_day ? groupInfo.time_over_day : 0,
                                rules: [{ required: true, message: "请输入天数" }]
                            })(
                                <InputNumber
                                    max={89}
                                    min={0}
                                    precision={0}
                                />
                            )}
                            <span className="ant-form-text"> 天</span>
                        </FormItem>
                    </Col>
                    <Col span={3}>
                        <FormItem>
                            {getFieldDecorator("time_over_hour", {
                                initialValue: groupInfo.time_over_hour ? groupInfo.time_over_hour : 0,
                                rules: [{ required: true, message: "请输入小时" }]
                            })(
                                <InputNumber
                                    max={24}
                                    min={0}
                                    precision={0}
                                />
                            )}
                            <span className="ant-form-text"> 时</span>
                        </FormItem>
                    </Col>
                    <Col span={3}>
                        <FormItem>
                            {getFieldDecorator("time_over_minute", {
                                initialValue: groupInfo.time_over_minute ? groupInfo.time_over_minute : 0,
                                rules: [{ required: true, message: "请输入分钟" }]
                            })(
                                <InputNumber
                                    max={60}
                                    min={0}
                                    precision={0}
                                />
                            )}
                            <span className="ant-form-text"> 分</span>
                        </FormItem>
                    </Col>
                </Row>
                <FormItem
                    {...formItemLayout}
                    label='参团人数'
                    extra="输入2-100的数字"
                >
                    {getFieldDecorator("limit_buy_num", {
                        rules: [{ required: true, message: "请输入参团人数!" }],
                        initialValue: groupInfo.limit_buy_num ? groupInfo.limit_buy_num : 2
                    })(
                        <InputNumber
                            max={100}
                            min={2}
                            precision={0}
                        />
                    )}
                    <span className="ant-form-text"> 人</span>
                </FormItem>
                {/* <Form.Item
                    {...formItemLayout}
                    label="凑团设置"
                    extra={(<div style={{width: 420}}>默认开启。开启凑团后，对于未参团的买家，活动商品详情页会显示未成团的团列表，买家可以直接任选一个参团，提升成团率。</div>)}
                >
                    {getFieldDecorator('switch', { 
                        valuePropName: 'checked',
                        initialValue: true
                    })(
                        <Switch />
                    )}
                </Form.Item> */}
                <FormItem
                    {...formItemLayout}
                    label='每人限购'
                    extra="为0时不限购件数"
                >
                    {getFieldDecorator("limit_goods_num", {
                        initialValue: groupInfo.limit_goods_num ? groupInfo.limit_goods_num : 0
                    })(
                        <InputNumber
                            min={0}
                            precision={0}
                        />
                    )}
                    <span className="ant-form-text"> 件</span>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='每人限参'
                    extra="每人可同时参团的次数，成功和失败不计入次数。为0时不限参团次数"
                >
                    {getFieldDecorator("limit_group_num", {
                        initialValue: groupInfo.limit_group_num ? groupInfo.limit_group_num : 0
                    })(
                        <InputNumber
                            min={0}
                            precision={0}
                        />
                    )}
                    <span className="ant-form-text"> 团</span>
                </FormItem>
                {/* <FormItem
                    {...formItemLayout}
                    label="优惠叠加"
                >
                    {getFieldDecorator('radio-group',{
                        rules: [{ required: true, message: "请选择优惠叠加!" }],
                        initialValue: "a"
                    })(
                        <RadioGroup>
                            <Radio value="a">可叠加优惠券</Radio>
                            <Radio value="b">不可叠加优惠券</Radio>
                        </RadioGroup>
                    )}
                </FormItem> */}
            </View>
        );
    }
}
export default Basic
