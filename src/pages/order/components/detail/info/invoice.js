import React, { Component } from "react";
import styles from "./index.css";
import { View } from "@/components/flexView";
import InfoRow from "@/components/public/info/infoRow";

export default class OrderDetailInvoice extends Component {
    render() {
        const { invoice } = this.props;
        const { type, company, tax_number } = invoice;
        let infoList = [];
        if (type === 0) {
            infoList = [
                {
                    title: "类型",
                    info: "个人"
                }
            ];
        } else {
            infoList = [
                {
                    title: "类型",
                    info: "公司"
                }, {
                    title: "公司",
                    info: company
                }, {
                    title: "税号",
                    info: tax_number
                }
            ];
        }
        return (
            <View className={styles.infoWarp}>
                <p className={styles.infoTitle}>发票信息</p>
                <InfoRow
                    infoList={infoList}
                />
            </View>
        );
    }
}
