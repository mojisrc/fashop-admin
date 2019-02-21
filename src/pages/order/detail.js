import React, { Component } from "react";
import OrderDetailView from "@/components/order/detail";
import { connect } from "dva";
import { Spin, Card, Tabs } from "antd";
import PageHeaderWrapper from '@/components/pageHeaderWrapper';

const TabPane = Tabs.TabPane;

@connect(({ order, loading }) => ({
    orderInfo: order.info,
    orderInfoLoading: loading.effects["order/info"],
    orderGroupInfo: order.groupInfo,
    orderGroupInfoLoading: loading.effects["order/groupInfo"],
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
        const { dispatch, location: { query: { id, group_id } } } = this.props;
        dispatch({
            type: group_id && group_id!=="0" ? "order/groupInfo" : "order/info",
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
        const { orderInfoLoading, orderInfo, orderGroupInfo, orderGroupInfoLoading, location: { query: { group_id } } } = this.props;
        if (group_id && group_id !== "0"){
            return (
                <PageHeaderWrapper hiddenBreadcrumb={true}>
                    <Tabs 
                        type="card"
                        className="fa-card-tab"
                        defaultActiveKey="2"
                        tabBarStyle={{
                            marginBottom: 0,
                            borderBottomWidth: 0,
                        }}
                    >
                        <TabPane tab="订单详情" key="1" >
                            <Card bordered={false}>
                                <Spin size="large" className="globalSpin" spinning={orderInfoLoading}>
                                    <OrderDetailView orderInfo={orderInfo.result} />
                                </Spin>
                            </Card>
                        </TabPane>
                        <TabPane tab="拼团详情" key="2" >
                            <Card bordered={false}>
                                <Spin size="large" className="globalSpin" spinning={orderInfoLoading}>
                                    <OrderDetailView orderGroupInfo={orderInfo.result} />
                                </Spin>
                            </Card>
                        </TabPane>
                    </Tabs>
                </PageHeaderWrapper>
            );
        }
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
