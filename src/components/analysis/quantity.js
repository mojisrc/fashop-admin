import React, { Component } from "react";
import { View } from "react-web-dom";
import styles from "./index.css";
import statistics from "@/services/statistics";

class Quantity extends Component {
    state = {
        info: {
            no_send_count: 0,
            day_total: 0,
            cost_average: 0,
            yesterday_new_user: 0,
            all_user: 0,
            positive_count: 0,
            yesterday_positive_count: 0,
            yesterday_moderate_count: 0,
            yesterday_negative_count: 0
        }
    };

    async componentWillMount() {
        const response = await statistics.quantity();
        if (response.code === 0) {
            const {
                no_send_count, day_total,
                cost_average,
                yesterday_new_user,
                all_user,
                positive_count,
                yesterday_positive_count,
                yesterday_moderate_count,
                yesterday_negative_count
            } = response.result.info;
            this.setState({
                info: {
                    no_send_count,
                    day_total,
                    cost_average,
                    yesterday_new_user,
                    all_user,
                    positive_count,
                    yesterday_positive_count,
                    yesterday_moderate_count,
                    yesterday_negative_count
                }
            });
        }
    }

    render() {
        const { info } = this.state;
        return (
            <View className={styles.dataDisplayWarp}>
                <View className={styles.dataDisplay}>
                    <View className={styles.dataDisplayItem}>
                        <span>未发货订单</span>
                        <p>{info.no_send_count}</p>
                    </View>
                    <View className={styles.dataDisplayItem}>
                        <span>当日销售额 (元)</span>
                        <p>{info.day_total}</p>
                    </View>
                    <View className={styles.dataDisplayItem}>
                        <span>平均客单价 (元)</span>
                        <p>{info.cost_average}</p>
                    </View>
                    <View className={styles.dataDisplayItem}>
                        <span>昨日新增客户</span>
                        <p>{info.yesterday_new_user}</p>
                    </View>
                    <View className={styles.dataDisplayItem}>
                        <span>累计客户</span>
                        <p>{info.all_user}</p>
                    </View>
                </View>
                <View className={styles.dataDisplay}>
                    <View className={styles.dataDisplayItem}>
                        <span>累计好评度</span>
                        <p>{info.positive_count}</p>
                    </View>
                    <View className={styles.dataDisplayItem}>
                        <span>昨日好评数</span>
                        <p>{info.yesterday_positive_count}</p>
                    </View>
                    <View className={styles.dataDisplayItem}>
                        <span>昨日中评数</span>
                        <p>{info.yesterday_moderate_count}</p>
                    </View>
                    <View className={styles.dataDisplayItem}>
                        <span>昨日差评数</span>
                        <p>{info.yesterday_negative_count}</p>
                    </View>
                    <View className={styles.dataDisplayItem}>
                        <span>累计好评数</span>
                        <p>{info.positive_count}</p>
                    </View>
                </View>
            </View>
        );
    }
}

export default Quantity;
