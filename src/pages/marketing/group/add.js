import React, { Component } from "react";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import { Card, Form, Button, Input, DatePicker, InputNumber, Radio, Icon, Popover } from "antd";
import router from "umi/router";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
function disabledDate(current) {
    // Can not select days before today
    return current && current < moment().startOf('day');
}

@Form.create()
export default class FreebieAdd extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }
    render() {
        const { form, title } = this.props;
        const { getFieldDecorator, getFieldValue } = form;
        getFieldDecorator("over", {
            rules: [{ required: true, message: "请输入每人限领次数!" }],
        });
        getFieldDecorator("range", {
            rules: [{ required: true, message: "请选择赠品有效期!" }],
        });
        const radioStyle = {
            display: 'block',
            height: '38px',
            lineHeight: '38px',
        };
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 4,
                },
            },
        };
        return <PageHeaderWrapper hiddenBreadcrumb={true}>
            <Card>
                <Form onSubmit={this.handleSubmit}>
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
                                placeholder="如：双十一大促赠品，最多20个字"
                            />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='选择商品'
                        extra="一个赠品活动只可选择一件商品"
                        required={true}
                    >
                        <a>添加商品</a>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='领取有效期'
                        extra="赠品通过抽奖等方式赠送后，客户需在有效期内领取，过期后将无法领取"
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
                        label="赠品有效期"
                    >
                        {getFieldDecorator('time', {
                            rules: [{ required: true }],
                            initialValue: 1
                        })(
                            <RadioGroup>
                                <Radio style={radioStyle} value={1}>
                                    不设置有效期（推荐）
                                    <Popover placement="right" content="若此赠品计划用于多个营销活动，建议直接在相应活动中配置时间" trigger="hover">
                                        <Icon type="question-circle" />
                                    </Popover>
                                </Radio>
                                <FormItem
                                    validateStatus={getFieldValue('time') === 2 && !getFieldValue("range") ? "error" : ""}
                                    help={getFieldValue('time') === 2 && !getFieldValue("range") ? "请选择赠品有效期!" : ""}
                                >
                                    <Radio style={radioStyle} value={2}>
                                        <RangePicker
                                            showTime
                                            format="YYYY-MM-DD HH:mm:ss"
                                            disabledDate={disabledDate}
                                            disabled={getFieldValue('time') !== 2}
                                            onChange={(e) => setFieldsValue({ range: `${moment(e[0]).format("YYYY-MM-DD HH:mm:ss")} - ${moment(e[1]).format("YYYY-MM-DD HH:mm:ss")}` })}
                                        />
                                    </Radio>
                                </FormItem>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="每人限领次数"
                        extra="每个客户通过不同营销活动获得此赠品的最高上限"
                    >
                        {getFieldDecorator('limit', {
                            rules: [{ required: true }],
                            initialValue: "a"
                        })(
                            <RadioGroup>
                                <Radio style={radioStyle} value="a">不限次数</Radio>
                                <Radio style={radioStyle} value="b">
                                    <InputNumber
                                        style={{ width: 100, marginLeft: 6, marginRight: 6 }}
                                        disabled={getFieldValue('limit') !== "b"}
                                        onChange={(e) => setFieldsValue({ over: e })}
                                    />
                                    件/人
                                </Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">保 存</Button>
                    </FormItem>
                </Form>
            </Card>
        </PageHeaderWrapper>
    }
}
