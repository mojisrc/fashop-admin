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
function disabledDate(current) {
    // Can not select days before today
    return current && current < moment().startOf('day');
}

@connect()
class Basic extends Component {
    render() {
        const { form, title, formItemLayout, type } = this.props;
        const { getFieldDecorator, setFieldsValue, getFieldValue } = form;
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
        return (
            <View className={styles.warp}>
                {
                    this.left()
                }
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
                        validateStatus={
                            getFieldValue('goods') === "a" ? "error" : ""
                        }
                        help={getFieldValue('goods') === "a" ? "你选择了分销商品（实物），优惠后可能造成利润受损" : ""}
                    >
                        {getFieldDecorator('goods', {
                            rules: [{ required: true }],
                            // initialValue: title
                            initialValue: "a"
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
                        validateStatus={
                            (
                                (getFieldValue('limit')==="b"&&!getFieldValue("over"))||
                                (type==='reward'&&getFieldValue('content')>getFieldValue("over"))
                            ) ? "error" : ""
                        }
                        help={
                            getFieldValue('limit')==="b"&&!getFieldValue("over") ? "请输入金额数!" : 
                            (
                                type==='reward'&&getFieldValue('content')>getFieldValue("over") ? "使用门槛不能低于优惠券面额" : 
                                // type==='discount' ? `${cardData.content}折优惠券` : 
                                // type==='random' ? `随机优惠${cardData.content1}至${cardData.content2}` : 
                                ""
                            )
                        }
                    >
                        {getFieldDecorator('limit', {
                            rules: [{ required: true }],
                            // initialValue: title
                            initialValue: "a"
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
                            // initialValue: title
                            initialValue: 1
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
                            initialValue: true
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
    left(){
        const { form, type } = this.props;
        const { getFieldsValue } = form;
        const cardData = getFieldsValue()
        // console.log("cardData", cardData);
        // console.log(type === 'random');
        return(
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
                <p className={styles.descTitle}>使用说明</p>
                <View className={styles.descView}>
                    {
                        cardData.title ?
                        <p className={styles.descInfo}>{cardData.title}</p> : null
                    }
                    {
                        cardData.time === 1 && cardData.range ?
                        <p className={styles.descInfo}>使用时间：{cardData.range}</p> : 
                        cardData.time === 2 && cardData.days ?
                        <p className={styles.descInfo}>使用时间：领券当日起{cardData.days}天内可用</p> : 
                        cardData.time === 3 && cardData.days ?
                        <p className={styles.descInfo}>使用时间：领券次日起{cardData.days}天内可用</p> : 
                        <p className={styles.descInfo}/>
                    }
                    <p className={styles.descInfo}>
                        优惠内容：
                        {
                            cardData.goods==="a" ? "全部商品可用" : "部分商品可用"
                        }，
                        {
                            cardData.limit==="a" ? "无限制" : 
                            cardData.limit==="b"&&cardData.over ? `满${cardData.over}元` : null
                        }
                        {
                            cardData.content||(cardData.content1&&cardData.content2) ? (
                                type==='reward' ? `减免${cardData.content}元优惠券` : 
                                type==='discount' ? `${cardData.content}折优惠券` : 
                                type==='random' ? `随机优惠${cardData.content1}至${cardData.content2}` : ''
                            ) : null
                        }
                    </p>
                    {
                        cardData.otherLimit ?
                        <p className={styles.descInfo}>其他限制：仅原价购买商品时可用券</p> : null
                    }
                </View>
            </View>
        )
    }
}
export default Basic
