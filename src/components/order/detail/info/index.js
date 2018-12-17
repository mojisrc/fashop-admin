import React, { Component } from "react";
import BasicInfo from "./basic";
import AddressInfo from "./address";
import DeliverInfo from "./deliver";
import OtherInfo from "./other";
import GoodsInfo from "./goods";
import OperateInfo from "./operate";
import { Card } from "antd";

export default class OrderDetailInfo extends Component {
    render() {
        const { orderInfo } = this.props;
        const { info } = orderInfo;
        const { extend_order_extend, create_time, sn, trade_no, state, extend_order_goods, amount, freight_fee } = info;
        const { reciver_name, reciver_info, message, deliver_name, deliver_phone, deliver_address, tracking_time, tracking_no, remark } = extend_order_extend;
        const { history } = this.props;
        return (
            <Card bordered={false}>
                <BasicInfo
                    sn={sn}
                    reciver_name={reciver_name}
                    create_time={create_time}
                    state={state}
                    trade_no={trade_no}
                />
                <AddressInfo
                    reciver_info={reciver_info ? reciver_info : {
                        address: "",
                        name: "",
                        phone: "",
                        combine_detail: ""
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
            </Card>
        );

    }
}
