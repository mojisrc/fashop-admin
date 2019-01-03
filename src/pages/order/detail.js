import React, { Component } from "react";
import OrderDetailView from "@/components/order/detail";
import { connect } from "dva";
import { Spin, Card } from "antd";
import PageHeaderWrapper from '@/components/pageHeaderWrapper';
@connect(({ order, loading }) => ({
    orderInfo: order.info,
    orderInfoLoading: loading.effects["order/info"]
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

    componentDidMount() {
        const { dispatch, location: { query: { id } } } = this.props;
        dispatch({
            type: "order/info",
            payload: {
                id
            },
            callback: (response) => {
                this.setState({
                    info: response.result.info
                });
            }
        });
    }

    render() {
        const { orderInfoLoading, orderInfo } = this.props;
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true}>
                <Card bordered={false}>
                    <Spin size="large" className="globalSpin" spinning={orderInfoLoading}>
                        <OrderDetailView orderInfo={orderInfo.result} />
                    </Spin>
                </Card>
            </PageHeaderWrapper>
        );
    }
}
