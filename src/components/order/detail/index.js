import React, { Component } from "react";
import OrderDetailInfo from "./info";
import { View } from "@/components/flexView";

export default class OrderDetail extends Component {
    render() {
        const { orderInfo, history } = this.props;
        return (
            <View>
                {orderInfo ? <OrderDetailInfo orderInfo={orderInfo} history={history} /> : null}
            </View>
        );
    }
}
