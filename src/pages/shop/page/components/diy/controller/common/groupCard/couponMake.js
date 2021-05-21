import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import CouponItem from "./couponItem";
import CouponAdd from "./couponAdd";
import Sort from "./sort";
import styles from "./index.css";
import { Card } from "antd";

export default class CouponMake extends PureComponent {
    static propTypes = {
        addShow: PropTypes.bool,
        sortShow: PropTypes.bool,
        dataSource: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired
    };
    static defaultProps = {
        dataSource: [],
        addShow: true,
        sortShow: true,
        onChange: (dataSource) => {
        }
    };


    render() {
        const { dataSource, onChange, addShow, sortShow } = this.props;
        return <Fragment>
            {
                dataSource.map((item, index) => (
                    <Card
                        className={styles.item}
                        key={`card${index}`}
                        type={"inner"}
                        extra={
                            sortShow ? <Sort
                                index={index}
                                data={dataSource}
                                onChange={(data) => {
                                    onChange(data);
                                }}
                            /> : null
                        }
                    >
                        <CouponItem
                            id={item.id}
                            title={item.title}
                            total={item.total}
                            goods_choice={item.goods_choice}
                            threshold_choice={item.threshold_choice}
                            threshold_order_amount={item.threshold_order_amount}
                            valid_time_choice={item.valid_time_choice}
                            valid_start_time={item.valid_start_time}
                            valid_end_time={item.valid_end_time}
                            valid_today_limit_day={item.valid_today_limit_day}
                            valid_morrow_limit_day={item.valid_morrow_limit_day}
                            get_limit_choice={item.get_limit_choice}
                            get_each_limit={item.get_each_limit}
                            original_price_choice={item.original_price_choice}
                            share_get_limit={item.share_get_limit}
                            coupon_type={item.coupon_type}
                            get_total_number={item.get_total_number}
                            use_total_number={item.use_total_number}
                            start_time={item.start_time}
                            coupon_type1={item.coupon_type === 1 ? item.coupon_type1 : {}}
                            coupon_type2={item.coupon_type === 2 ? item.coupon_type2 : {}}
                        />
                    </Card>
                ))
            }
            {addShow ? <CouponAdd
                data={dataSource}
                onChange={(data) => {
                    onChange(data);
                }}
            /> : null}
        </Fragment>;
    }
}
