import React, { Component } from "react";
import styles from "../index.css";
import { View } from "@/components/flexView";
import InfoRow from "@/components/public/info/infoRow";
import moment from "dayjs";
import { history as router } from "umi";

export default class OrderDetailBasicInfo extends Component {
    render() {
        const { refund_sn, refund_type, handle_state, create_time, order_id, order_sn,payment_code } = this.props;
        return (
            <View className={styles.infoWarp}>
                <p className={styles.infoTitle}>基本信息</p>
                <InfoRow
                    infoList={[
                        {
                            title: "退款编号",
                            info: refund_sn
                        }, {
                            title: "退款方式",
                            info: this.returnRefundType(refund_type)
                        }, {
                            title: "退款状态",
                            info: this.returnRefundState(handle_state),
                            infoColor: "#FA445F"
                        },
                        {
                            title: "申请时间",
                            info: moment(create_time, "X").format("YYYY-MM-DD HH:mm:ss")
                        },
                        {
                            title: "支付方式",
                            info: this.getPayName(payment_code)
                        },
                        {
                            title: "订单编号",
                            info: <a
                                onClick={() => {
                                    router.push(`/order/list/detail?id=${order_id}`);
                                }}
                            >
                                {order_sn}
                            </a>,
                            infoColor: "#FA445F"
                        }
                    ]}
                />
            </View>
        );
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

    returnRefundType(type) {
        switch (type) {
            case 1:
                return "仅退款";
            case 2:
                return "退货退款";
            default:
                return "-";

        }
    }

    returnRefundState(state) {
        switch (state) {
            case 0:
                return "未处理";
            case 10:
                return "已拒绝";
            case 20:
                return "已同意";
            case 30:
                return "已完成";
            case 50:
                return "用户已撤销";
            case 51:
                return "用户已收货";
            default:
                return "-";

        }
    }
}
