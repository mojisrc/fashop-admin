import React, { Component } from "react";
import { connect } from "dva";
import { View } from "@/components/flexView";
import { Form, Input, InputNumber, Radio, DatePicker, Checkbox, Button, Col } from "antd";
import styles from "./index.css";
import router from "umi/router";
import moment from "moment";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
function range(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
}
function disabledDate(current) {
    return current < moment().endOf('day');
}
function disabledRangeTime(_, type) {
    if (type === 'start') {
        return {
            disabledHours: () => range(0, 60).splice(4, 20),
            disabledMinutes: () => range(30, 60),
            disabledSeconds: () => [55, 56],
        };
    }
    return {
        disabledHours: () => range(0, 60).splice(20, 4),
        disabledMinutes: () => range(0, 31),
        disabledSeconds: () => [55, 56],
    };
}

@connect()
class Basic extends Component {
    render() {
        const { form, title, formItemLayout, type } = this.props;
        const { getFieldDecorator, setFieldsValue, getFieldValue, getFieldsValue } = form;
        getFieldDecorator("over", {
            rules: [{ required: true, message: "请输入金额数!" }],
        });
        getFieldDecorator("range", {
            rules: [{ required: true, message: "请输入用券时间!" }],
        });
        getFieldDecorator("days", {
            rules: [{ required: true, message: "请输入用券时间!" }],
        });
        const radioStyle = {
            display: 'block',
            height: '38px',
            lineHeight: '38px',
        };
        const cardData = getFieldsValue()
        // console.log("cardData", cardData);
        console.log(type === 'random');
        
        return (
            <View className={styles.warp}>
                <View className={styles.left}>
                    <p className={styles.title}>Fashop 优惠券</p>
                    <View className={styles.card}>
                        <View className={styles.cardTop}>
                            {
                                cardData.title ? 
                                <p className={styles.cardTitle}>{cardData.title}</p> : <p className={styles.cardTitle}/>
                            }
                            {
                                cardData.share ? 
                                <Button type="ghost" style={{color: '#fff'}}>分享</Button> : null
                            }
                        </View>
                        <View className={styles.cardBody}>
                            {
                                cardData.content||(cardData.content1&&cardData.content2) ? 
                                <p className={styles.content}>
                                    {
                                        type==='reward' ? `减免${cardData.content}元优惠券` : 
                                        type==='discount' ? `${cardData.content}折优惠券` : 
                                        type==='random' ? `随机优惠${cardData.content1}至${cardData.content2}` : ''
                                    }
                                </p> : <p className={styles.content}/>
                            }
                            {
                                cardData.limit==="a" ? <p className={styles.desc}>无限制</p> : 
                                cardData.limit==="b" ? (
                                    cardData.over ? 
                                    <p className={styles.desc}>满{cardData.over}元</p> :
                                    <p className={styles.desc}>订单满 xx 元（不含运费)</p>
                                ) : <p className={styles.desc}/>
                            }
                            {
                                cardData.time === 1 && cardData.range ?
                                <p className={styles.time}>有效日期：{cardData.range}</p> : 
                                cardData.time === 2 && cardData.days ?
                                <p className={styles.time}>有效日期：领券当日起{cardData.days}天内可用</p> : 
                                cardData.time === 3 && cardData.days ?
                                <p className={styles.time}>有效日期：领券次日起{cardData.days}天内可用</p> : 
                                <p className={styles.time}/>
                            }
                        </View>
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
                        {getFieldDecorator("num", {
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
                        validateStatus={getFieldValue('limit')==="b"&&!getFieldValue("over") ? "error" : ""}
                        help={getFieldValue('limit')==="b"&&!getFieldValue("over") ? "请输入金额数!" : ""}
                    >
                        {getFieldDecorator('limit', {
                            rules: [{ required: true }],
                            initialValue: title
                        })(
                            <RadioGroup>
                                <Radio style={radioStyle} value="a">无使用门槛</Radio>
                                <Radio style={radioStyle} value="b">
                                    订单满
                                    <InputNumber 
                                        style={{ width: 100, marginLeft: 6, marginRight: 6 }} 
                                        disabled={getFieldValue('limit') !== "b"}
                                        onChange={(e)=>setFieldsValue({over: e})}
                                    /> 
                                    元
                                </Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    {
                        type === 'reward' ? <FormItem
                            {...formItemLayout}
                            label='优惠内容'
                        >
                            <span className="ant-form-text">减免 </span>
                            {getFieldDecorator("content", {
                                rules: [{ required: true, message: "请输入优惠内容!" }],
                                initialValue: title
                            })(
                                <InputNumber />
                            )}
                            <span className="ant-form-text"> 元</span>
                        </FormItem> :
                        type === 'discount' ? <FormItem
                            {...formItemLayout}
                            label='优惠内容'
                        >
                            <span className="ant-form-text">打 </span>
                            {getFieldDecorator("content", {
                                rules: [{ required: true, message: "请输入优惠内容!" }],
                                initialValue: title
                            })(
                                <InputNumber />
                            )}
                            <span className="ant-form-text"> 折</span>
                        </FormItem> :
                        type === 'random' ? <FormItem
                            {...formItemLayout}
                            label='优惠内容'
                        >
                            <span className="ant-form-text">范围内随机 </span>
                            {getFieldDecorator("content1", {
                                rules: [{ required: true, message: "请输入优惠内容!" }],
                                initialValue: title
                            })(
                                <InputNumber />
                            )}
                            <span className="ant-form-text"> 至 </span>
                            {getFieldDecorator("content2", {
                                rules: [{ required: true, message: "请输入优惠内容!" }],
                                initialValue: title
                            })(
                                <InputNumber />
                            )}
                            <span className="ant-form-text"> 元</span>
                        </FormItem> : null
                    }
                    <FormItem
                        {...formItemLayout}
                        label="用券时间"
                    >
                        {getFieldDecorator('time', {
                            rules: [{ required: true }],
                            initialValue: title
                        })(
                            <RadioGroup>
                                <FormItem
                                    validateStatus={getFieldValue('time') === 1 && !getFieldValue("range") ? "error" : ""}
                                    help={getFieldValue('time') === 1 && !getFieldValue("range") ? "请选择用券时间!" : ""}
                                >
                                    <Radio style={radioStyle} value={1}>
                                        <RangePicker 
                                            showTime 
                                            format="YYYY-MM-DD HH:mm:ss" 
                                            disabledDate={disabledDate}
                                            disabledTime={disabledRangeTime}
                                            disabled={getFieldValue('time') !== 1}
                                            onChange={(e) => setFieldsValue({ range: `${moment(e[0]).format("YYYY-MM-DD HH:mm:ss")} - ${moment(e[1]).format("YYYY-MM-DD HH:mm:ss")}` })}
                                        />
                                    </Radio>
                                </FormItem>
                                <FormItem
                                    validateStatus={getFieldValue('time') === 2 && !getFieldValue("days") ? "error" : ""}
                                    help={getFieldValue('time') === 2 && !getFieldValue("days") ? "请输入用券时间!" : ""}
                                >
                                    <Radio style={radioStyle} value={2}>
                                        领券当日起
                                        <InputNumber
                                            style={{ width: 100, marginLeft: 6, marginRight: 6 }}
                                            disabled={getFieldValue('time') !== 2}
                                            onChange={(e)=>setFieldsValue({days: e})}
                                        />
                                        天内可用
                                    </Radio>
                                </FormItem>
                                <FormItem
                                    validateStatus={getFieldValue('time') === 3 && !getFieldValue("days") ? "error" : ""}
                                    help={getFieldValue('time') === 3 && !getFieldValue("days") ? "请输入用券时间!" : ""}
                                >
                                    <Radio style={radioStyle} value={3}>
                                        领券次日起
                                        <InputNumber
                                            style={{ width: 100, marginLeft: 6, marginRight: 6 }}
                                            disabled={getFieldValue('time') !== 3}
                                            onChange={(e)=>setFieldsValue({days: e})}
                                        />
                                        天内可用
                                    </Radio>
                                </FormItem>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='分享设置'
                    >
                        {getFieldDecorator('share', {
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
