
import React, { Component } from "react";

import styles from "./index.css";
import { View } from "react-web-dom";
import InfoColumn from "../../public/info/infoColumn";

type Props = {
    refund_amount: number,
    user_reason: string,
    user_explain: string,
    user_images: Array<string>,
}
type State = {}
export default class OrderDetailOtherInfo extends Component {
    render() {
        const {
            refund_amount,
            user_reason,
            user_explain,
            user_images,
        } = this.props
        return (
            <View className={styles.infoWarp}>
                <p className={styles.infoTitle}>退款详情</p>
                <InfoColumn
                    infoList={[
                        {
                            title: '申请金额',
                            info: refund_amount,
                        }, {
                            title: '退款原因',
                            info: user_reason,
                        }, {
                            title: '退款说明',
                            info: user_explain ? user_explain : '暂无说明',
                        }, {
                            title: '照片凭证',
                            images: Array.isArray(user_images) && user_images.length > 0 ? user_images.map((img) => {
                                return { img }
                            }) : []
                        }
                    ]}
                />
            </View>
        );
    }
}
