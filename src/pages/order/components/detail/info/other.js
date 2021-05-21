import React, { Component } from "react";
import styles from "./index.css";
import { View } from "@/components/flexView";
import InfoColumn from "@/components/public/info/infoColumn";

export default class OrderDetailOtherInfo extends Component {
    render() {
        const { message } = this.props;
        return (
            <View className={styles.infoWarp}>
                <p className={styles.infoTitle}>其他信息</p>
                <InfoColumn
                    infoList={[
                        {
                            title: "买家留言",
                            info: message ? message : "无"
                        }
                    ]}
                />
            </View>
        );
    }
}
