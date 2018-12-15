import React, { Component } from "react";
import OrderDetailView from "@/components/order/detail";
import { connect } from "dva";

@connect(({ info, loading }) => ({
    info,
    loading: loading.models.info
}))
export default class Detail extends Component {
    state = {
        info: {
            id: 0,
            amount: 0,
            freight_fee: 0.00,
            sn: "",
            trade_no: "",
            create_time: 0,
            extend_order_goods: [],
            extend_order_extend: {
                reciver_name: "",
                reciver_info: {
                    address: "",
                    name: "",
                    phone: "",
                    combine_detail: ""
                },
                message: "",
                deliver_name: "",
                deliver_phone: "",
                deliver_address: "",
                tracking_time: 0,
                tracking_no: "",
                remark: ""
            },
            state: 0

        }
    };

    async componentWillMount() {
        const { id } = query.getParams();
        const { dispatch } = this.props;
        dispatch({
            type: "order/detail",
            payload: {
                id
            },
            callback: () => {
                if (this.props.loading === true) {
                    this.setState({
                        info: this.props.info
                    });
                }

            }
        });
    }

    render() {
        const { history, loading } = this.props;
        const { info } = this.state;
        return (
            <div>
                {loading ? <OrderDetailView orderInfo={info.result.info} history={history} /> : null}
            </div>
        );
    }
}
