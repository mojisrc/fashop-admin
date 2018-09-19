// @flow
import React, { Component } from "react";

import BasicInfo from "./basicInfo";
import AddressInfo from "./addressInfo";
import DeliverInfo from "./deliverInfo";
import OtherInfo from "./otherInfo";
import GoodsInfo from "./goodsInfo";
import OperateInfo from "./operateInfo";
import Page from "../../public/page";

type Props = {
    history: { goBack: Function, push: Function },
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
                    combine_detail: string
                },
                message: string,
                deliver_name: string,
                deliver_phone: string,
                deliver_address: string,
                tracking_time: number,
                tracking_no: string,
                remark: string,
            },
            state: number,
        }
    }
}
type State = {}
export default class OrderDetailInfo extends Component<Props, State> {
    render() {
        const { orderInfo } = this.props
        const { info } = orderInfo
        const { extend_order_extend, create_time, sn, trade_no, state, extend_order_goods, amount, freight_fee, } = info
        const { reciver_name, reciver_info, message, deliver_name, deliver_phone, deliver_address, tracking_time, tracking_no, remark } = extend_order_extend
        const { history } = this.props
        return (
            <Page>
                <BasicInfo
                    sn={sn}
                    reciver_name={reciver_name}
                    create_time={create_time}
                    state={state}
                    trade_no={trade_no}
                />
                <AddressInfo
                    reciver_info={reciver_info ? reciver_info : {
                        address: '',
                        name: '',
                        phone: '',
                        combine_detail: ''
                    }}
                />
                {state >= 30 ? <DeliverInfo
                    deliver_name={deliver_name}
                    deliver_phone={deliver_phone}
                    deliver_address={deliver_address}
                    tracking_no={tracking_no}
                    tracking_time={tracking_time}
                    remark={remark}
                /> : null}
                <OtherInfo
                    message={message}
                />
                <GoodsInfo
                    extend_order_goods={extend_order_goods ? extend_order_goods : []}
                    amount={amount ? amount : 0}
                    freight_fee={freight_fee ? freight_fee : 0}
                />
                {state === 20 ? <OperateInfo history={history} info={info} /> : null}
            </Page>
        );

    }
}
