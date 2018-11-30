// @flow
import React, { Component } from "react";
import {
    Button
} from "antd";
import styles from "./index.css";
import { View } from "react-web-dom";

type Props = {
    info: {
        id: number,
        amount: number,
        freight_fee: number,
        sn: string,
        create_time: number,
        extend_order_goods: Array<{}>,
        extend_order_extend: {
            reciver_name: string,
            reciver_info: {
                address: string,
                name: string,
                phone: string,
                combine_detail: string
            },
            message: string,
            deliver_name: string,
            deliver_phone: string,
            deliver_address: string,
            tracking_time: number,
            tracking_no: string,
            remark:string
        },
        state: number
    },
    history: { goBack: Function, push: Function }
}
type State = {}
export default class OrderDetailOperateInfo extends Component<Props, State> {
    render() {
        const { history, info } = this.props
        const { id } = info
        return (
            <View className={styles.infoWarp}>
                <p className={styles.infoTitle}>可执行操作</p>
                <View className={styles.btnWarp}>
                    <Button
                        type='primary'
                        onClick={() => {
                            history.push('/order/list/send?id=' + id)
                        }}
                    >
                        设置发货
                    </Button>
                </View>
            </View>
        );
    }
}
