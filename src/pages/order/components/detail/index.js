import React, { Component } from "react";
import OrderDetailInfo from "./info/index";
import OrderGroupDetailInfo from "./groupInfo/index";
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
