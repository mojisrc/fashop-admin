import React, { Component } from "react";
import { connect } from 'dva';
import { View } from "@/components/flexView";
import BasicInfo from "./info/basic";
import DetailInfo from "./info/detail";
import GoodsInfo from "./info/goods";
import OperateInfo from "./info/operate";
import Tracking from "./info/tracking";
import { publicFunction } from "@/utils/index";
import { info } from "@/models/refund"
import { Spin } from "antd";
import { query } from "@/utils/fa"

// type Props = {
//     dispatch: dispatchType,
//     history: { push: Function },
//     location: { state: { type: string, record: {} }, search: string },
//     id: number,
//     info?: Function,
//     orderRefundInfo: {
//         id: number,// 记录ID,
//         order_id: number, // 订单ID,
//         order_sn: string, // 订单编号,
//         order_state: number, // 订单状态:20:已付款;30:已发货;40:已收货;,
//         order_goods_id: number, // 子订单ID,
//         refund_sn: string, // 申请编号,
//         user_id: number, // 买家ID,
//         user_name: string, // 买家会员名,
//         goods_id: number, // 商品id,
//         goods_sku_id: number, // 商品ID,全部退款是0,
//         goods_title: string, // 商品名称,
//         goods_spec: Array<{
//             id: number,
//             name: string,
//             value_id: number,
//             value_name: string
//         }>, // 商品规格,
//         goods_img: string, // 商品图片,
//         goods_pay_price: number, // 商品实际成交价,
//         goods_num: number, // 商品数量,
//         goods_freight_fee: number, // 运费金额,
//         refund_type: number, // 申请类型:1为仅退款,2为退货退款,默认为1,
//         refund_amount: number, // 退款金额 小于等于子订单的金额,
//         order_amount: number, // 总订单的金额,
//         order_lock: number, // 订单锁定类型:1为不用锁定,2为需要锁定,默认为1,
//         create_time: number, // 添加时间,
//         user_reason: string, // 退款原因,
//         user_explain: string, // 退款说明,
//         tracking_no: string, // 退款退货物 买家发货流单号,
//         tracking_phone: string, // 退款退货物 买家发货手机号,
//         tracking_company: string, // 退款退货 买家发货公司,
//         tracking_explain: string, // 退款退货物 买家发货说明,
//         tracking_images: Array<string>, // 退款退货物 买家发货凭证 最多6张,
//         tracking_time: number, // 退款退货物 买家发货时间,默认为0,
//         receive: number, // 卖家是否收到买家退货退款货物 1未收到货 2已收到货,
//         receive_time: number, // 卖家收货时间,默认为0,
//         receive_message: string, // 卖家收货备注,
//         payment_code: string, // 支付方式,
//         trade_no: string, // 支付宝交易号OR微信交易号,
//         handle_state: number, // 卖家处理状态 默认0处理中(未处理) 10拒绝(驳回) 20同意 30成功(已完成) 50取消(用户主动撤销) 51取消(用户主动收货),
//         handle_message: string, // 卖家处理信息,
//         handle_time: number, // 卖家处理时间,
//         batch_no: string, // 支付宝退款批次号 退款回调使用,
//         success_time: number, // 退款回调完成时间,
//         user_receive: string, // 用户选择是否收到货物 默认0未发货(Order state=20) 1未收到货 2已收到货 卖家未发货(已付款)时无需传此参数,
//         user_images: Array<string>, // 照片凭证 ,
//         is_close: number, // 默认0 1已关闭(退款关闭),
//         handle_expiry_time: number, // 过期时间之管理员处理,
//         send_expiry_time: number, // 过期时间之用户发货,
//     },
// }
// type State = {}
@connect(
    ({ view: { order: { orderRefundInfo } } }) => ({
        orderRefundInfo,
    })
)
export default class RefundDetail extends Component {

    componentDidMount() {
        const { location, dispatch } = this.props
        const { id } = query.getParams()
        dispatch(info({ params: { id } }))
    }

    render() {
        const { orderRefundInfo,history } = this.props
        const {
            id,
            refund_sn, refund_type, handle_state, handle_message, create_time,
            refund_amount, user_reason, user_explain, user_images,
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

        } = orderRefundInfo
        return (
            id > 0 ? <View>
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
                    refund_amount={refund_amount}
                    handle_message={handle_message}
                    handle_state={handle_state}
                />
            </View> : <Spin tip="Loading..." spinning={true} />
        )
    }
}
