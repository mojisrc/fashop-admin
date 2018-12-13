import React, { Component } from "react";
import OrderDetailInfo from "../orderDetailInfo";
import { View } from "react-web-dom";
export default class OrderDetail extends Component {
    render() {
        const { orderInfo, history } = this.props
        return (
            <View>
                {orderInfo ? <OrderDetailInfo orderInfo={orderInfo} history={history} /> : null}
            </View>
        )
    }
}
