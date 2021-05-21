import React, { Component } from "react";
import styles from "./index.css";
import { View } from "@/components/flexView";
import InfoRow from "@/components/public/info/infoRow";
import moment from 'moment'
import Time from "@/utils/time";

export default class OrderDetailBasicInfo extends Component{
    render() {
        const { sn, create_time, state,trade_no,payment_code,marketing_activity,payable_time } = this.props
        return (
            <View className={styles.infoWarp}>
                <p className={styles.infoTitle}>基本信息</p>
                <InfoRow
                    infoList={[
                        {
                            title: '订单号',
                            info: <div>{sn}   {this.getActivityText(marketing_activity)}</div>,
                        }
                        , {
                            title: '下单时间',
                            info: moment(create_time, 'X').format('YYYY-MM-DD HH:mm:ss'),
                        }, {
                            title: '订单状态',
                            info: this.returnOrderState(state,payable_time),
                        },
                        {
                            title: '支付平台交易号',
                            info: trade_no,
                        },
                        {
                            title: '支付方式',
                            info: this.getPayName(payment_code),
                        }
                    ]}
                />
            </View>
        );
    }
    getActivityText(marketing_activity){
        switch (marketing_activity) {
            case 0:
                break
            case 1:
                return <span style={{color:'red'}}>[拼团] </span>
            case 2:
                return <span style={{color:'red'}}>[秒杀] </span>
            case 3:
                return <span style={{color:'red'}}>[赠品] </span>
        }
    }
    getPayName(payment_code){
        switch (payment_code) {
            case 'balance':
                return '余额支付'
            case 'wechat_mini':
                return '微信支付'
            case 'wechat_app':
                return '微信支付'
            case 'alipay_app':
                return '支付宝支付'
        }
    }
    returnOrderState(state,payable_time) {
        switch (state) {
            case 0:
                return '已取消'
            case 10:
                if(Time.overdue(payable_time)){
                    return "支付超时"
                }else{
                    return "待支付";
                }
            case 20:
                return '待发货'
            case 30:
                return '待收货'
            case 40:
                return '已完成'
            default:
                return ''
        }
    }
}
