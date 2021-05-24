import React, { Component } from "react";
import { connect } from "umi";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import { Card, Descriptions, Button, Divider } from "antd";
import moment from "dayjs";
import OrderPrintGoodsList from "@/pages/order/components/print/goodsList";
import styles from "./print.css"

const DescriptionsItem = Descriptions.Item

@connect(({ order, loading }) => ({
    orderList: order.list.result,
    orderListLoading: loading.effects["order/list"]
}))
class List extends Component {

    static defaultProps = {
        orderListLoading: false,
        orderList: {}
    };

    constructor(props) {
        super(props);
        const { location: { query: { ids } } } = props;
        this.state = {
            ids,
            list: []
        }
    }

    componentDidMount() {
        this.initList();
    }


    initList = () => {
        const { dispatch } = this.props;
        const { ids } = this.state
        dispatch({
            type: "order/list",
            payload: {
                page: 1,
                rows: 10000,
                ids
            },
            callback: (response) => {
                const { result: { list } } = response;
                this.setState({
                    list
                });
            }
        });
    };

    render() {
        const { list } = this.state;

        return (
            <PageHeaderWrapper hiddenBreadcrumb={true} policy={'order/list'}>
                <Card
                    bordered={false}
                >
                    <div className="listTableTop">
                        <Button
                            type='primary'
                            onClick={() => {
                                this.onPrint()
                            }}
                        >
                            打印
                        </Button>
                    </div>
                    <div className={styles.wrap} id={'printArea'}>
                        <div className={styles.contain}>
                            <h2>销售出货单</h2>
                            {list.map((item, index) => {
                                const { extend_order_extend, sn, extend_order_goods, amount, freight_fee, revise_amount, revise_freight_fee, extend_order_discount, points, pay_balance, is_revise, is_revise_freight } = item || {};
                                const { reciver_name, reciver_info, message, tracking_time, need_express } = extend_order_extend || {};
                                const { name, phone, combine_detail, address } = reciver_info || {}
                                return <div key={index} className={styles.item}>
                                    <Descriptions>
                                        <DescriptionsItem label="编号">{sn}</DescriptionsItem>
                                    </Descriptions>
                                    <Descriptions>
                                        {tracking_time > 0 && <DescriptionsItem
                                            label="出库日期"
                                        >
                                            {moment(tracking_time, "X").format("YYYY-MM-DD HH:mm:ss")}
                                        </DescriptionsItem>}
                                        <DescriptionsItem label="客户">{reciver_name}</DescriptionsItem>
                                        {need_express === 1 && <DescriptionsItem label="配送方式">
                                            不详
                                        </DescriptionsItem>}
                                    </Descriptions>
                                    <OrderPrintGoodsList
                                        goodsList={extend_order_goods}
                                        amount={amount ? amount : 0}
                                        freight_fee={freight_fee ? freight_fee : 0}
                                        is_revise={is_revise}
                                        is_revise_freight={is_revise_freight}
                                        revise_amount={revise_amount ? revise_amount : 0}
                                        revise_freight_fee={revise_freight_fee ? revise_freight_fee : 0}
                                        discount={extend_order_discount}
                                        points={points}
                                        pay_balance={pay_balance}
                                        className={styles.table}
                                    />
                                    <Descriptions>
                                        <DescriptionsItem label="客户地址">{combine_detail} {address}</DescriptionsItem>
                                    </Descriptions>
                                    <Descriptions>
                                        <DescriptionsItem label="客户联系人">{name}</DescriptionsItem>
                                        <DescriptionsItem label="联系手机">
                                            {phone}
                                        </DescriptionsItem>
                                    </Descriptions>
                                    {!!message && <Descriptions>
                                        <DescriptionsItem label="备注"><span
                                            className={styles.remark}>{message}</span></DescriptionsItem>
                                    </Descriptions>}
                                    <Divider />
                                </div>
                            })}
                        </div>
                    </div>
                </Card>
            </PageHeaderWrapper>
        );
    }

    onPrint = () => {
        window.document.body.innerHTML = window.document.getElementById('printArea').innerHTML;
        window.print();
        window.location.reload();
    }
}

export default List;
