import React, { Component } from "react";
import styles from "./index.css";
import { View } from "@/components/flexView";
import InfoRow from "@/components/public/info/infoRow";

export default class OrderDetailAddressInfo extends Component {
    render() {
        const { address, name, phone, combine_detail } = this.props.reciver_info;
        return (
            <View className={styles.infoWarp}>
                <p className={styles.infoTitle}>收货信息</p>
                <InfoRow
                    infoList={[
                        {
                            title: "联系人",
                            info: name
                        }, {
                            title: "联系电话",
                            info: phone
                        }, {
                            title: "所在城市",
                            info: combine_detail
                        }, {
                            title: "详细地址",
                            info: address
                        }
                    ]}
                />
            </View>
        );
    }
}
