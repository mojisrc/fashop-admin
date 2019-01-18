import React, { Component } from "react";
import OrderDetailInfo from "./info";
import OrderGroupDetailInfo from "./groupInfo";
import { View } from "@/components/flexView";

export default class OrderDetail extends Component {
    render() {
        const { orderInfo, history, orderGroupInfo } = this.props;
        return (
            <View>
                {
                    orderInfo ? <OrderDetailInfo orderInfo={orderInfo} history={history} /> :
                    orderGroupInfo ? <OrderGroupDetailInfo orderInfo={orderGroupInfo} history={history} /> : null
                }
            </View>
        );
    }
}
