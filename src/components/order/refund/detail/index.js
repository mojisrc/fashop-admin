import React, { Component } from "react";
import { connect } from "dva";
import BasicInfo from "./info/basic";
import DetailInfo from "./info/detail";
import GoodsInfo from "./info/goods";
import OperateInfo from "./info/operate";
import Tracking from "./info/tracking";
import { publicFunction } from "@/utils/index";
import { info } from "@/models/refund";
import { Spin } from "antd";
import { query } from "@/utils/fa";

@connect(({ refund, loading }) => ({
    refundInfo: refund.info.result,
    refundInfoLoading: loading.effects["refund/info"]
}))
export default class RefundDetail extends Component {
    static defaultProps = {
        refundInfoLoading: true,
        refundInfo: {
            info: {}
        }
    };

    componentDidMount() {
        const { dispatch, id } = this.props;
        dispatch({
            type: "refund/info",
            payload: { id }
        });
    }

    render() {
        const { refundInfo: { info }, history, refundInfoLoading } = this.props;
        const {
            id,
            refund_sn, refund_type, handle_state, handle_message, create_time,
            refund_amount, user_reason, user_explain, user_images, order_amount,
            order_id,
            order_sn,
            goods_id, goods_title, goods_img, goods_spec, goods_pay_price, goods_num,

            tracking_no,
            tracking_phone,
            tracking_company,
            tracking_explain,
            tracking_time,
            tracking_images,
            receive,
            receive_time

        } = info;
        return <Spin tip="Loading..." spinning={refundInfoLoading}>
            <BasicInfo
                refund_sn={refund_sn}
                refund_type={refund_type}
                handle_state={handle_state}
                handle_message={handle_message}
                create_time={create_time}
                order_id={order_id}
                order_sn={order_sn}
                history={history}
            />
            <GoodsInfo
                goods_id={goods_id}
                goods_title={goods_title}
                goods_img={goods_img}
                goods_spec={goods_spec}
                goods_num={goods_num}
                goods_pay_price={goods_pay_price}
            />
            <DetailInfo
                refund_amount={refund_amount}
                user_reason={user_reason}
                user_explain={user_explain}
                user_images={user_images}
            />
            {tracking_time > 0 ? <Tracking
                id={id}
                tracking_no={tracking_no}
                tracking_phone={tracking_phone}
                tracking_company={tracking_company}
                tracking_explain={tracking_explain}
                tracking_time={tracking_time}
                tracking_images={tracking_images}
                receive={receive}
                receive_time={receive_time}
            /> : null}

            <OperateInfo
                id={id}
                order_amount={order_amount}
                refund_amount={refund_amount}
                handle_message={handle_message}
                handle_state={handle_state}
            />
        </Spin>;
    }
}
