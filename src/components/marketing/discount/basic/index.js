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
        const groupInfo = this.props.groupInfo || {};
        console.log(groupInfo);
        
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
                            moment(groupInfo.start_time,'X'),
                            moment(groupInfo.end_time,'X')
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
            </View>
        );
    }
}
export default Basic
