import { Form } from '@ant-design/compatible';
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { formItemLayout } from "@/pages/shop/page/components/diy/formLayout";
import styles from "./index.css";


const FormItem = Form.Item;
// 返回组内一条的数据格式
const _response = {
        "id": 0,
        "title": "",
        "total": 1000,
        "goods_choice": 1,
        "threshold_choice": 2,
        "threshold_order_amount": "0.00",
        "valid_time_choice": 0,
        "valid_start_time": 0,
        "valid_end_time": 0,
        "valid_today_limit_day": 1,
        "valid_morrow_limit_day": 0,
        "get_limit_choice": 1,
        "get_each_limit": 0,
        "original_price_choice": 0,
        "instruction": "满减",
        "share_get_limit": 0,
        "coupon_type": 1,
        "delete_time": 0,
        "get_total_number": 0,
        "use_total_number": 0,
        "is_show": 1,
        "start_time": 0,
        "coupon_type1": {
            "reduce_amount": "0.00"
        },
        "coupon_type2": {
            "discount": "0.20",
            "discount_max_amount": "0.00"
        }
    }
;
export default class CouponCardItem extends PureComponent {
    static propTypes = {
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        title: PropTypes.string,
        total: PropTypes.any,
        goods_choice: PropTypes.number,
        threshold_choice: PropTypes.number,
        threshold_order_amount: PropTypes.any,
        valid_time_choice: PropTypes.number,
        valid_start_time: PropTypes.number,
        valid_end_time: PropTypes.number,
        valid_today_limit_day: PropTypes.number,
        valid_morrow_limit_day: PropTypes.number,
        get_limit_choice: PropTypes.number,
        get_each_limit: PropTypes.number,
        original_price_choice: PropTypes.number,
        instruction: PropTypes.string,
        share_get_limit: PropTypes.number,
        coupon_type: PropTypes.number,
        get_total_number: PropTypes.number,
        use_total_number: PropTypes.number,
        start_time: PropTypes.number,
        coupon_type1: PropTypes.shape({
            reduce_amount: PropTypes.any
        }),
        coupon_type2: PropTypes.shape({
            discount: PropTypes.any,
            discount_max_amount: PropTypes.any
        })


    };
    static defaultProps = {
        id: 0,
        title: "",
        total: 1000,
        goods_choice: 1,
        threshold_choice: 2,
        threshold_order_amount: 0.00,
        valid_time_choice: 0,
        valid_start_time: 0,
        valid_end_time: 0,
        valid_today_limit_day: 1,
        valid_morrow_limit_day: 0,
        get_limit_choice: 1,
        get_each_limit: 0,
        original_price_choice: 0,
        instruction: "满减",
        share_get_limit: 0,
        coupon_type: 1,
        delete_time: 0,
        get_total_number: 0,
        use_total_number: 0,
        is_show: 1,
        start_time: 0,
        coupon_type1: {
            reduce_amount: 0.00
        },
        coupon_type2: {
            discount: 0.20,
            discount_max_amount: 0.00
        },
        onChange: (data) => {
        }
    };
    state = {
        response: { ..._response }
    };

    render() {
        const { title } = this.props;
        return <div className={styles.itemBot}>
            <div style={{ flex: 1 }}>
                <FormItem
                    {...formItemLayout}
                    label="标题"
                >
                    {title}
                </FormItem>
            </div>
        </div>;
    }
}
