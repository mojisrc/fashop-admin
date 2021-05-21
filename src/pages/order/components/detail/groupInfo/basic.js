import React, { Component } from "react";

import styles from "./index.css";
import { View } from "@/components/flexView";
import InfoRow from "@/components/public/info/infoRow";
import moment from 'moment'

export default class OrderDetailBasicInfo extends Component{
    render() {
        const { sn, create_time, state, trade_no, payment_code } = this.props
        return (
            <View className={styles.infoWarp}>
                <p className={styles.infoTitle}>基本信息</p>
                <InfoRow
                    infoList={[
                        {
                            title: '团编号',
                            info: sn,
                        },
                        {
                            title: '拼团状态',
                            info: moment(create_time, 'X').format('YYYY-MM-DD HH:mm:ss'),
                        },
                        {
                            title: '拼团时限',
                            info: sn,
                        },
                        {
                            title: '参团人数',
                            info: trade_no,
                        },
                        {
                            title: '已参人数',
                            info: payment_code,
                        },
                        {
                            title: '限参件数',
                            info: payment_code,
                        },
                        {
                            title: '每人限参',
                            info: payment_code,
                        },
                    ]}
                />
            </View>
        );
    }
    getPayName(payment_code){
        switch (payment_code) {
            case 'wechat_mini':
                return '微信小程序支付'
            case 'alipay':
                return '支付宝'
            default:
                return '-'
        }
    }
}
