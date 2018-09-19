// @flow
import React, { Component } from "react";
import { message } from "antd";
import OrderDetailView from "../../components/order/orderDetail";
import { View } from "react-web-dom";
import { publicFunction } from "../../utils";
import { getOrderInfo } from "../../actions/order"

const { parseQuery } = publicFunction
type Props = {
    id: number,
    location: { state: { type: string, record: {} }, search: string, pathname: string },
    history: { goBack: Function, push: Function },
}

type State = {
    orderInfo: {
        info: {
            id: number,
            amount: number,
            freight_fee: number,
            sn: string,
            trade_no: string,
            create_time: number,
            extend_order_goods: Array<{}>,
            extend_order_extend: {
                reciver_name: string,
                reciver_info: {
                    address: string,
                    name: string,
                    phone: string,
                    combine_detail: string,
                },
                message: string,
                deliver_name: string,
                deliver_phone: string,
                deliver_address: string,
                tracking_time: number,
                tracking_no: string,
                remark: string
            },
            state: number,

        }
    }
}
export default class Detail extends Component<Props, State> {
    state = {
        orderInfo: {
            info: {
                id: 0,
                amount: 0,
                freight_fee: 0.00,
                sn: '',
                trade_no: 'aaa',
                create_time: 0,
                extend_order_goods: [],
                extend_order_extend: {
                    reciver_name: '',
                    reciver_info: {
                        address: '',
                        name: '',
                        phone: '',
                        combine_detail: ''
                    },
                    message: '',
                    deliver_name: '',
                    deliver_phone: '',
                    deliver_address: '',
                    tracking_time: 0,
                    tracking_no: '',
                    remark: ''
                },
                state: 0,

            }
        }
    }

    async componentWillMount() {
        const { location } = this.props
        const { id } = parseQuery(location.search)
        const response = await getOrderInfo({ params: { id } })
        if (response.code === 0) {
            this.setState({
                orderInfo: response.result
            })
        } else {
            message.warning("订单详情获取失败")
        }
    }

    render() {

        const { history, } = this.props
        const { orderInfo } = this.state
        return (
            <View>
                <OrderDetailView orderInfo={orderInfo} history={history} />
            </View>
        )
    }
}
