import React, { Component } from "react";
import { connect } from "dva";
import { View } from "@/components/flexView";
import { Form, Input, Radio, Select, Checkbox, Icon, Popover } from "antd";
import styles from "./index.css";
import router from "umi/router";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const { TextArea } = Input;

@connect()
class Rules extends Component {
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
                    
                </View>
                <View className={styles.right}>
                    <h3>领取和使用规则</h3>
                    <FormItem
                        {...formItemLayout}
                        label="领取人限制"
                    >
                        {getFieldDecorator('limit', {
                            rules: [{ required: true }],
                            // initialValue: title
                            initialValue: "a"
                        })(
                            <RadioGroup>
                                <Radio style={radioStyle} value="a">不限制，所有人可领</Radio>
                                <Radio style={radioStyle} value="b">
                                    指定会员等级可领 {
                                        getFieldValue('limit') === "b" ? <a style={{ marginLeft: 6 }}>选择会员等级</a> : null
                                    }
                                </Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="每人限领次数"
                    >
                        {getFieldDecorator('radio', {
                            rules: [{ required: true }],
                            // initialValue: title
                            initialValue: "a"
                        })(
                            <RadioGroup>
                                <Radio style={radioStyle} value="a">无使用门槛</Radio>
                                <Radio style={radioStyle} value={4}>
                                    <Select 
                                        placeholder="请选择"
                                        style={{ width: 160, marginRight: 6 }} 
                                        disabled={getFieldValue('radio') !== 4}
                                    >
                                        <Option value="china">China</Option>
                                        <Option value="usa">U.S.A</Option>
                                    </Select>
                                    次
                                </Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='过期提醒'
                        extra={(<p>过期提醒需授权公众号到有赞，未授权商家将无法推送消息 <a>查看教程</a></p>)}
                    >
                        {getFieldDecorator('agreement', {
                            valuePropName: 'checked',
                        })(
                            <Checkbox>优惠券过期前4天提醒买家</Checkbox>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='其他限制'
                    >
                        {getFieldDecorator('otherLimit', {
                            valuePropName: 'checked',
                        })(
                            <Checkbox>
                                优惠券仅原价购买商品时可用
                                <Icon type="question-circle" style={{fontSize: 14, marginLeft: 5}}/>
                            </Checkbox>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='使用说明'
                        extra={(
                            <Popover
                                trigger="click"
                                placement="bottomLeft"
                                content={(
                                    <div>
                                        <p>庆国庆优惠券</p>
                                        <p>使用时间：2017-10-27 12:00:00 - 2017-10-29 14:49:06</p>
                                        <p>优惠内容：部分商品，满88元8.8折优惠券</p>
                                        <p>其他限制：仅原价购买商品时可用券</p>
                                    </div>
                                )}
                            >
                                <a>查看示例</a>
                            </Popover>
                        )}
                    >
                        {getFieldDecorator("title", {
                            rules: [{ required: true, message: "请输入使用说明!" }],
                            initialValue: title
                        })(
                            <TextArea
                                placeholder="建议填写优惠券的具体使用信息"
                                type="textarea"
                                autosize
                            />
                        )}
                    </FormItem>
                </View>
            </View>
        );
    }
}
export default Rules
