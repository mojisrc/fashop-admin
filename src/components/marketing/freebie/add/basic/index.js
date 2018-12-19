import React, { Component } from "react";
import { connect } from "dva";
import { View } from "@/components/flexView";
import { Form, Input, Radio, Select, Checkbox, Icon, InputNumber, DatePicker } from "antd";
import router from "umi/router";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

@connect()
class Rules extends Component {
    render() {
        const { form, title, formItemLayout } = this.props;
        const { getFieldDecorator, setFieldsValue, getFieldValue } = form;
        return (
            <View>
                <h3>活动信息</h3>
                <FormItem
                    {...formItemLayout}
                    label='赠品名称'
                >
                    {getFieldDecorator("title", {
                        rules: [{ required: true, message: "请输入赠品名称!" }],
                        initialValue: title
                    })(
                        <Input
                            style={{ width: 220 }}
                            placeholder="请填写活动名称"
                        />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="赠品有效期"
                >
                    {getFieldDecorator('range-picker', {
                        rules: [{ type: 'array', required: true, message: '请选择!' }]
                    })(
                        <RangePicker
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                        />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='领取有效期'
                >
                    {getFieldDecorator("title", {
                        rules: [{ required: true, message: "请输入领取有效期!" }],
                        initialValue: title
                    })(
                        <InputNumber
                            style={{ width: 66 }}
                        />
                    )}
                    <span className="ant-form-text"> 天</span>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='领取限制'
                    extra="0表示不限领取次数"
                >
                    {getFieldDecorator("title", {
                        rules: [{ required: true, message: "请输入领取限制!" }],
                        initialValue: title
                    })(
                        <InputNumber
                            style={{ width: 66 }}
                        />
                    )}
                    <span className="ant-form-text"> 次/人</span>
                </FormItem>
            </View>
        );
    }
}
export default Rules
