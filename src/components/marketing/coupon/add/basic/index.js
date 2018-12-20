import React, { Component } from "react";
import { connect } from "dva";
import { View } from "@/components/flexView";
import { Form, Input, InputNumber, Radio, DatePicker, Checkbox } from "antd";
import styles from "./index.css";
import router from "umi/router";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;

@connect()
class Basic extends Component {
    render() {
        const { form, title, formItemLayout } = this.props;
        const { getFieldDecorator, setFieldsValue, getFieldValue } = form;
        const radioStyle = {
            display: 'block',
            height: '38px',
            lineHeight: '38px',
        };
        return (
            <View className={styles.warp}>
                <View className={styles.left}>
                    <p className={styles.title}>Fashop 优惠券</p>
                    <View className={styles.card}>

                    </View>
                </View>
                <View className={styles.right}>
                    <h3>基本信息</h3>
                    <FormItem
                        {...formItemLayout}
                        label='优惠券名称'
                    >
                        {getFieldDecorator("title", {
                            rules: [{ required: true, message: "请输入优惠券名称!" }],
                            initialValue: title
                        })(
                            <Input
                                placeholder="如：迎新年优惠券，最多10个字"
                                style={{width: 230}}
                            />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='发放总量'
                        extra="修改优惠券总量时只能增加不能减少，请谨慎设置"
                    >
                        {getFieldDecorator("title", {
                            rules: [{ required: true, message: "请输入发放总量!" }],
                            initialValue: title
                        })(
                            <InputNumber
                                style={{ width: 190}} 
                                placeholder="最多99999999张"
                            />
                        )}
                        <span className="ant-form-text"> 张</span>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="适用商品"
                        // extra={'你选择了分销商品（实物），优惠后可能造成利润受损'}
                        // extra={'请选择适用商品'}
                    >
                        {getFieldDecorator('goods', {
                            rules: [{ required: true }],
                            initialValue: title
                        })(
                            <RadioGroup>
                                <Radio style={radioStyle} value="a">全部商品可用</Radio>
                                <Radio style={radioStyle} value="b">
                                    指定商品可用 {
                                        getFieldValue('goods')==="b" ? <a style={{marginLeft: 6}}>选择商品</a> : null
                                    }
                                </Radio>
                                <Radio style={radioStyle} value="c">
                                    指定商品不可用 {
                                        getFieldValue('goods')==="c" ? <a style={{marginLeft: 6}}>选择商品</a> : null
                                    }
                                </Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="使用门槛"
                    >
                        {getFieldDecorator('radio', {
                            rules: [{ required: true }],
                            initialValue: title
                        })(
                            <RadioGroup>
                                <Radio style={radioStyle} value="a">无使用门槛</Radio>
                                <Radio style={radioStyle} value={4}>
                                    订单满
                                    <InputNumber 
                                        style={{ width: 100, marginLeft: 6, marginRight: 6 }} 
                                        disabled={getFieldValue('radio') !== 4}
                                    /> 
                                    元
                                </Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='优惠内容'
                    >
                        <span className="ant-form-text">减免 </span>
                        {getFieldDecorator("title", {
                            rules: [{ required: true, message: "请输入优惠内容!" }],
                            initialValue: title
                        })(
                            <InputNumber />
                        )}
                        <span className="ant-form-text"> 元</span>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="用券时间"
                    >
                        {getFieldDecorator('time', {
                            rules: [{ required: true }],
                            initialValue: title
                        })(
                            <RadioGroup>
                                <Radio style={radioStyle} value={1}>
                                    <RangePicker 
                                        showTime 
                                        format="YYYY-MM-DD HH:mm:ss" 
                                        disabled={getFieldValue('time') !== 1}
                                    />
                                </Radio>
                                <Radio style={radioStyle} value={2}>
                                    领券当日起
                                    <InputNumber
                                        style={{ width: 100, marginLeft: 6, marginRight: 6 }}
                                        disabled={getFieldValue('time') !== 2}
                                    />
                                    天内可用
                                </Radio>
                                <Radio style={radioStyle} value={3}>
                                    领券次日起
                                    <InputNumber
                                        style={{ width: 100, marginLeft: 6, marginRight: 6 }}
                                        disabled={getFieldValue('time') !== 3}
                                    />
                                    天内可用
                                </Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='分享设置'
                    >
                        {getFieldDecorator('agreement', {
                            valuePropName: 'checked',
                        })(
                            <Checkbox>优惠券允许分享给好友领取</Checkbox>
                        )}
                    </FormItem>
                    {/* <FormItem
                        {...formItemLayout}
                        label='同步打标签'
                        extra="编辑后仅对后续领取的客户生效，之前对已领取的客户无法生效"
                    >
                        {getFieldDecorator('agreement', {
                            valuePropName: 'checked',
                        })(
                            <Checkbox>给领券客户打标签</Checkbox>
                        )}
                    </FormItem> */}
                </View>
            </View>
        );
    }
}
export default Basic
