import React, { Component,Fragment } from "react";
import BasicInfo from "./basic";
import GroupInfo from "./group";

export default class OrderGroupDetailInfo extends Component {
    render() {
        const { orderInfo } = this.props;
        const { info } = orderInfo;
        const { extend_order_extend, create_time, sn, trade_no, state, extend_order_goods, payment_code } = info;
        const { reciver_name } = extend_order_extend;
        return (
            <Fragment>
                <BasicInfo
                    sn={sn}
                    reciver_name={reciver_name}
                    create_time={create_time}
                    state={state}
                    trade_no={trade_no}
                    payment_code={payment_code}
                />
                <GroupInfo
                    extend_order_goods={extend_order_goods ? extend_order_goods : []}
                    // extend_order_goods={[]}
                />
            </Fragment>
        );

    }
}
