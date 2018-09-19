// @flow
import React, { Component } from "react";
import styles from "./index.css";
import { View } from "react-web-dom";
import InfoColumn from "../../public/info/infoColumn";

type Props = {
    message: string
}
type State = {}
export default class OrderDetailOtherInfo extends Component<Props, State> {
    render() {
        const { message } = this.props
        return (
            <View className={styles.infoWarp}>
                <p className={styles.infoTitle}>其他信息</p>
                <InfoColumn
                    infoList={[
                        {
                            title: '买家留言',
                            info: message ? message : '无',
                        }
                    ]}
                />
            </View>
        );
    }
}
