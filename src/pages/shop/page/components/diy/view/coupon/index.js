import React, { Component } from "react";
import styles from "./index.css";
import moment from "moment";

export default class Coupon extends Component {
    render() {
        const { data, options: { source_type } } = this.props;
        return <div className={styles.main}>
            {Array.isArray(data) && data.length > 0 ? data.map((item, index) => {
                return <div className={styles.item} key={index}>
                    <div>
                        <div>
                            <span>{item.coupon_type === 1 ? item["coupon_type1"].reduce_amount : item["coupon_type2"].discount}</span>
                            {item.threshold_choice === 1 ? <em>无门槛</em> :
                                <em>满¥{item.threshold_order_amount}{item.coupon_type === 1 ? "减" : "折"}</em>}
                        </div>

                        <div>
                            <h3>{item.title}</h3>
                            <em>{moment(item.valid_start_time, "X").format("YYYY.MM.DD")} - {moment(item.valid_end_time, "X").format("YYYY.MM.DD")}</em>
                            <i>{item.goods_choice === 1 ? "全店商品可用" : "部分商品可用"}</i>
                        </div>
                    </div>

                    <div>
                        <span>领取</span>
                    </div>
                </div>;
            }) : <div className={styles.empty}>{source_type === "auto" ? "全部优惠券" : "暂无优惠券"}</div>
            }
        </div>
            ;
    }
}
