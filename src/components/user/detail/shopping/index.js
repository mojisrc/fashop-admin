import React, { Component } from "react";
import { connect } from "dva";
import { View } from "react-web-dom";
import styles from './index.css'
import Loadable from 'react-loadable';
import { Spin } from "antd";

const OrderListTable = Loadable({
    loader: () => import('../orderListTable/index'),
    loading: () => {
        return <Spin size="large" className="global-spin" />;
    },
})
// type Props = {
//     user_id: number,
//     refund_times: number,
//     refund_total: number,
//     buy_times: number,
//     cost_average: number,
//     cost_total: number,
// }
//
// type States = {}
@connect()
export default class ShoppingInfo extends Component {
    render() {
        const { user_id, refund_times, refund_total, buy_times, cost_average, cost_total,history } = this.props
        return (
            <View>
                <View className={styles.dataDisplay}>
                    <View className={styles.dataDisplayItem}>
                        <span>退款次数</span>
                        <p>{refund_times ? refund_times : 0}</p>
                    </View>
                    <View className={styles.dataDisplayItem}>
                        <span>退款金额 (元)</span>
                        <p>{refund_total ? refund_total : 0}</p>
                    </View>
                    <View className={styles.dataDisplayItem}>
                        <span>购次</span>
                        <p>{buy_times ? buy_times : 0}</p>
                    </View>
                    <View className={styles.dataDisplayItem}>
                        <span>客单价 (元)</span>
                        <p>{cost_average ? cost_average : 0}</p>
                    </View>
                    <View className={styles.dataDisplayItem}>
                        <span>累计消费 (元)</span>
                        <p>{cost_total ? cost_total : 0}</p>
                    </View>
                </View>
                <OrderListTable user_id={user_id} history={history} />
            </View>
        )
    }
}
