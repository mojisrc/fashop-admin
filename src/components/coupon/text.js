import React, { Component } from "react";
import dayjs from "dayjs";
export default class CouponText extends Component {

    render() {
        const { data } = this.props;
        return <div>
            <span>{data.title}</span>
            {
                data.daily_reward_choice === 1 ?
                    "无门槛，" :
                    <span>满¥{data.threshold_order_amount}，</span>
            }
            <span>{data.coupon_type === 1 ? "减¥" : ""}</span>
            <span>{data.coupon_type === 1 ? data.coupon_type1.reduce_amount : data.coupon_type2.discount} </span>
            <span>{data.coupon_type === 1 ? "" : "折"}</span>
            {
                data.valid_time_choice === 1 ?
                    <div>
                        {dayjs(data.valid_start_time*1000).format("YYYY.MM.DD")} - {dayjs(data.valid_end_time*1000).format("YYYY.MM.DD")}
                    </div>
                    : null
            }
            <span>{data.goods_choice === 1 ? " 全店商品可用" : " 部分商品可用"}</span>
            <span>{data.get_each_limit > 0 ? `${get_each_limit}人` : "不限"}</span>
        </div>;

    }
}

