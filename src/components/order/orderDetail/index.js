// @flow
import React, { Component } from "react";
// import OrderDetailSchedule from "../orderDetailSchedule";
import OrderDetailInfo from "../orderDetailInfo";
import { View } from "react-web-dom";

type Props = {
    history: { goBack: Function, push: Function },
    orderInfo: {
        info: {
            id: number,
            amount: number,
            freight_fee: number,
            sn: string,
            trade_no:string,
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
            state: number,
        }
    }
}
type State = {}
export default class OrderDetail extends Component<Props, State> {
    render() {
        const { orderInfo, history } = this.props
        return (
            <View>
                {/*<OrderDetailSchedule {...this.props} />*/}
                {orderInfo ? <OrderDetailInfo orderInfo={orderInfo} history={history} /> : null}
            </View>
        )
    }
}
