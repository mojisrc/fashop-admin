import React, { Component } from "react";
import { connect } from "dva";
import { View } from "@/components/flexView";
import styles from "./index.css";

@connect()
export default class ShoppingInfo extends Component {
    static defaultProps = {
        user_id: 0,
        refund_times: 0,
        refund_total: 0,
        buy_times: 0,
        cost_average: 0,
        cost_total: 0
    };

    render() {
        const { refund_times, refund_total, buy_times, cost_average, cost_total } = this.props;
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
            </View>
        );
    }
}
