import React, { Component } from "react";
import { connect } from "dva";
import { View } from "@/components/flexView";
import { Form, Input, InputNumber, Radio, DatePicker, Checkbox, Button, Row, Col, Switch } from "antd";
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
        const discountInfo = this.props.discountInfo || {};
        const { form, formItemLayout } = this.props;
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
                        initialValue: discountInfo.title ? discountInfo.title : ""
                    })(
                        <Input
                            placeholder="请输入活动标题"
                            style={{width: 350}}
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
                            initialValue: discountInfo.start_time ? moment(discountInfo.start_time, 'X') : null
                        })(
                            <DatePicker
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                style={{ width: 216 }}
                                disabledDate={this.disabledStartDate}
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
                            initialValue: discountInfo.end_time ? moment(discountInfo.end_time, 'X') : null
                        })(
                            <DatePicker
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                style={{ width: 216 }}
                                disabledDate={this.disabledEndDate}
                                placeholder="请选择活动结束时间"
                            />
                        )}
                    </FormItem>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='每人限购'
                    extra="为0时不限购件数"
                >
                    {getFieldDecorator("limit_goods_num", {
                        initialValue: discountInfo.limit_goods_num ? discountInfo.limit_goods_num : 0
                    })(
                        <InputNumber
                            min={0}
                            precision={0}
                        />
                    )}
                    <span className="ant-form-text"> 件</span>
                </FormItem>
            </View>
        );
    }
}
export default Basic
