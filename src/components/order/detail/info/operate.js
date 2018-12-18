import React, { Component } from "react";
import {
    Button
} from "antd";
import styles from "./index.css";
import { View } from "@/components/flexView";
import router from "umi/router";

export default class OrderDetailOperateInfo extends Component {
    render() {
        const { info } = this.props;
        const { id } = info;
        return (
            <View className={styles.infoWarp}>
                <p className={styles.infoTitle}>可执行操作</p>
                <View className={styles.btnWarp}>
                    <Button
                        type='primary'
                        onClick={() => {
                            router.push(`/order/list/send?id=${id}`);
                        }}
                    >
                        设置发货
                    </Button>
                </View>
            </View>
        );
    }
}
