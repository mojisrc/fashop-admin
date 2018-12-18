import React, { Component } from "react";
import { Table } from "antd";
import styles from "./index.css";
import { View } from "@/components/flexView";
import moment from "moment";
import Query from "@/utils/query";
import { list } from "@/models/refund";
import router from "umi/router";
import { connect } from "dva";

@connect(({ refund, loading }) => ({
    refundList: refund.list.result,
    refundListLoading: loading.effects["refund/list"]
}))
export default class RefundTable extends Component {
    state = {
        selectedRowKeys: [],
        queryParams: {
            keywords_type: "goods_name",
            keywords: null,
            create_time: [],
            refund_type: "all",
            refund_state: "all",
            order_type: "all"
        },
        get:{
            page:1,
            rows:10
        }
    };
    static defaultProps = {
        refundListLoading: true,
        refundList: {
            list:[],
            total_number:0
        }
    };

    componentDidMount() {
        this.initList();
    }

    initList() {
        const { dispatch } = this.props;
        const get = Query.make([
            { key: "refund_type", rule: ["eq", "all"] },
            { key: "refund_state", rule: ["eq", "all"] },
            { key: "order_type", rule: ["eq", "all"] },
            { key: "keywords_type", rule: ["rely", "keywords"] }
        ]);
        if (get["create_time"] !== undefined) {
            get["create_time"] = [moment(get["create_time"][0]).unix(), moment(get["create_time"][1]).unix()];
        }
        dispatch({
            type: "refund/list",
            payload: {
                page: get.page,
                rows: get.rows
            }
        });
        this.setState({
            get
        });
    }

    returnRefundState(state) {
        switch (state) {
            case 0:
                return <span style={{ color: "red" }}>未处理</span>;
            case 10:
                return "已拒绝退款";
            case 20:
                return "已同意退款";
            case 30:
                return "已完成";
            case 50:
                return "用户主动撤销";
            case 51:
                return "用户主动收货";
            default:
                return "-";

        }
    }

    render() {
        const { refundList, refundListLoading } = this.props;
        const columns = [
            {
                title: "退款编号",
                dataIndex: "refund_sn",
                key: "refund_sn"
            }, {
                title: "退款方式",
                dataIndex: "refund_type",
                key: "refund_type",
                render: (text) => {
                    switch (text) {
                        case 1:
                            return "仅退款";
                        case 2:
                            return "退货退款";
                        default:
                            return "-";

                    }
                }
            }, {
                title: "退款状态",
                dataIndex: "handle_state",
                key: "handle_state",
                render: (text, record) => {
                    return <div>
                        {record.tracking_time > 0 && record.receive === 1 ?
                            <span><span style={{ color: "red" }}>待签收</span>，</span> : ""}
                        {record.tracking_time > 0 && record.receive === 2 ? "已经签收，" : ""}
                        {this.returnRefundState(text)}
                    </div>;
                }
            }, {
                title: "申请时间",
                dataIndex: "create_time",
                key: "create_time",
                render: text => moment(text, "X").format("YYYY-MM-DD HH:mm:ss")
            }, {
                title: "订单号",
                dataIndex: "order_sn",
                render: (text, record) =>
                    <a
                        onClick={() => {
                            router.push(`/order/list/detail?id=${record.order_id}`);
                        }}
                    >
                        {text}
                    </a>
            }, {
                title: "订单金额（元）",
                dataIndex: "order_amount",
                key: "order_amount",
                className: styles.column
            }, {
                title: "收货人",
                dataIndex: "reciver_name",
                key: "reciver_name"
            }, {
                title: "退款原因",
                dataIndex: "user_reason",
                key: "user_reason"
            }, {
                title: "操作",
                key: "operation",
                className: styles.column,
                render: (record) => <View className={styles.operation}>
                    <a
                        onClick={() => {
                            router.push({
                                pathname: `/order/refund/edit`,
                                search: `?id=${record.id}&order_id=${record.order_id}`
                            });
                        }}
                    >
                        详情
                    </a>
                </View>
            }
        ];
        return (
            <View>
                {/*<View className={styles.batchView}>*/}
                {/*<Button*/}
                {/*type='primary'*/}
                {/*>*/}
                {/*批量导出*/}
                {/*</Button>*/}
                {/*</View>*/}
                <Table
                    loading={refundListLoading}
                    dataSource={refundList.list}
                    columns={columns}
                    rowKey={record => record.id}
                    pagination={{
                        showSizeChanger: false,
                        showQuickJumper: false,
                        current: this.state.get.page,
                        pageSize: this.state.get.rows,
                        total: refundList.total_number
                    }}
                    onChange={({ current, pageSize }) => {
                        router.push(Query.page(current, pageSize));
                        this.initList();
                    }}
                />
            </View>
        );
    }
}
