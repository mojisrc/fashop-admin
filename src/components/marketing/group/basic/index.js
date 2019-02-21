import React, { Component } from "react";
import { connect } from "dva";
import { View } from "@/components/flexView";
import { Form, Input, InputNumber, Radio, DatePicker } from "antd";
import router from "umi/router";
import moment from "moment";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

@connect()
class Basic extends Component {
    disabledStartDate = (startValue) => {
        const endValue = this.props.form.getFieldValue('end_time')
        if (!startValue || !endValue) {
            return startValue && startValue < moment().startOf('day')
        }
        return !moment(startValue).isBetween(moment().startOf('day'), moment(endValue).endOf('day'))
    }

    disabledEndDate = (endValue) => {
        const startValue = this.props.form.getFieldValue('start_time')
        if (!endValue || !startValue) {
            return endValue && endValue < moment().startOf('day')
        }
        return endValue.valueOf() <= startValue.valueOf();
    }
    render() {
        const groupInfo = this.props.groupInfo || {};
        const { form, formItemLayout } = this.props;
        const { getFieldDecorator, setFieldsValue, getFieldValue } = form;
        const is_invalid = groupInfo && groupInfo.is_show===0 // 已失效
        const is_over = groupInfo && moment().isAfter(moment(groupInfo.end_time, 'X')) // 已结束
        const is_ing = groupInfo && moment().isBetween(moment(groupInfo.start_time, 'X'), moment(groupInfo.end_time, 'X')) // 进行中
        const disabled = is_ing || is_invalid || is_over;
        // 已失效、已结束的活动 不能编辑（查看）
        // 进行中 的活动 只能编辑活动标题、活动结束时间（编辑）
        return (
            <View>
                <h3>活动信息</h3>
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
                            disabled={is_invalid || is_over}
                        />
                    )}
                </FormItem>
                <FormItem
                    label='活动时间'
                    {...formItemLayout}
                    style={{ marginBottom: 0 }}
                    required={true}
                >
                    <FormItem style={{ display: 'inline-block' }}>
                        {getFieldDecorator("start_time", {
                            rules: [{ required: true, message: "请选择活动开始时间!" }],
                            initialValue: groupInfo.start_time ? moment(groupInfo.start_time,'X') : null
                        })(
                            <DatePicker 
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                style={{ width: 216 }}
                                disabledDate={this.disabledStartDate}
                                disabled={disabled}
                                placeholder="请选择活动开始时间"
                            />
                        )}
                    </FormItem>
                    <span style={{ display: 'inline-block', width: 40, textAlign: 'center' }}>
                        -
                    </span>
                    <FormItem style={{ display: 'inline-block' }}>
                        {getFieldDecorator("end_time", {
                            rules: [{ required: true, message: "请选择活动结束时间!" }],
                            initialValue: groupInfo.end_time ? moment(groupInfo.end_time, 'X') : null
                        })(
                            <DatePicker
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                style={{ width: 216 }}
                                disabledDate={this.disabledEndDate}
                                disabled={is_invalid || is_over}
                                placeholder="请选择活动结束时间"
                            />
                        )}
                    </FormItem>
                </FormItem>
                <FormItem
                    label='拼团时限'
                    {...formItemLayout}
                    required={true}
                    extra="建议不要超过24小时"
                >
                    <FormItem style={{ display: 'inline-block', marginBottom: 0 }}>
                        {getFieldDecorator("time_over_day", {
                            initialValue: groupInfo.time_over_day ? groupInfo.time_over_day : 0,
                            rules: [{ required: true, message: "请输入天数" }]
                        })(
                            <InputNumber
                                max={89}
                                min={0}
                                precision={0}
                                disabled={disabled}
                            />
                        )}
                    </FormItem>
                    <span style={{ display: 'inline-block', width: 30, textAlign: 'center' }}>天</span>
                    <FormItem style={{ display: 'inline-block', marginBottom: 0 }}>
                        {getFieldDecorator("time_over_hour", {
                            initialValue: groupInfo.time_over_hour ? groupInfo.time_over_hour : 0,
                            rules: [{ required: true, message: "请输入小时" }]
                        })(
                            <InputNumber
                                max={24}
                                min={0}
                                precision={0}
                                disabled={disabled}
                            />
                        )}
                    </FormItem>
                    <span style={{ display: 'inline-block', width: 30, textAlign: 'center' }}>时</span>
                    <FormItem style={{ display: 'inline-block', marginBottom: 0 }}>
                        {getFieldDecorator("time_over_minute", {
                            initialValue: groupInfo.time_over_minute ? groupInfo.time_over_minute : 0,
                            rules: [{ required: true, message: "请输入分钟" }]
                        })(
                            <InputNumber
                                max={60}
                                min={0}
                                precision={0}
                                disabled={disabled}
                            />
                        )}
                    </FormItem>
                    <span style={{ display: 'inline-block', width: 30, textAlign: 'center' }}>分</span>
                </FormItem>
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
                            disabled={disabled}
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
                            disabled={disabled}
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
                            disabled={disabled}
                        />
                    )}
                    <span className="ant-form-text"> 团</span>
                </FormItem>
                {/* <FormItem
                    {...formItemLayout}
                    label="优惠叠加"
                >
                    {getFieldDecorator('is_overlay',{
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
