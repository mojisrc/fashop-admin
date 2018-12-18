import React, { Component } from "react";
import { Table, Button, Modal } from "antd";
import styles from "./index.css";
import { View } from "@/components/flexView";
import { connect } from "dva";
import Query from "@/utils/query";
import router from "umi/router";

@connect(({ shipper, loading }) => ({
    shipperList: shipper.list.result,
    shipperListLoading: loading.effects["shipper/list"]
}))
export default class ShipperListTable extends Component {
    static defaultProps = {
        shipperListLoading: true,
        shipperList: {
            list: [],
            total_number: 0
        }
    };
    state = {
        get: { page: 1, rows: 10 }
    };

    componentDidMount() {
        this.initList();
    }

    initList() {
        const { dispatch } = this.props;
        const get = Query.make();
        dispatch({
            type: "shipper/list",
            payload: {
                page: get.page,
                rows: get.rows
            },
            callback: () => {
                this.setState({
                    get
                });
            }
        });
    }

    render() {
        const { shipperList, shipperListLoading } = this.props;
        const columns = [
            {
                title: "联系人",
                dataIndex: "name",
                key: "name"
            }, {
                title: "联系方式",
                dataIndex: "contact_number",
                key: "contact_number"
            }, {
                title: "收货地址",
                dataIndex: "combine_detail",
                key: "combine_detail"
            },
            // {
            //     title: '地址类型',
            //     dataIndex: 'is_default',
            //     key: 'is_default',
            //     render: (value) => value === 1 ? <Tag color="red">默认收货地址</Tag> : null
            // },
            {
                title: "操作",
                dataIndex: "operating",
                key: "operating",
                render: (value, record) => <View className={styles.operation}>
                    <a
                        onClick={() => {
                            router.push({
                                pathname: `/setting/deliver/shipper/edit`,
                                search: `?id=${record.id}`
                            });
                        }}
                    >
                        编辑
                    </a>
                    <a
                        onClick={() => {
                            Modal.confirm({
                                title: "确认删除？",
                                okText: "确认",
                                okType: "danger",
                                cancelText: "取消",
                                onOk() {
                                    dispatch({
                                        type: "shipper/del",
                                        payload: {
                                            id: record.id
                                        },
                                        callback: () => {
                                            this.initList();
                                        }
                                    });
                                }
                            });
                        }}
                    >删除</a>
                </View>
            }
        ];

        return (
            <View>
                <View className={styles.batchView}>
                    <Button
                        type='primary'
                        onClick={() => {
                            router.push("/setting/deliver/shipper/add");
                        }}
                    >
                        新增地址
                    </Button>
                </View>
                <Table
                    columns={columns}
                    dataSource={shipperList.list}
                    loading={shipperListLoading}
                    rowKey={record => record.id}
                    onChange={({ current, pageSize }) => {
                        router.push(Query.page(current, pageSize));
                        this.initList();
                    }}
                    pagination={{
                        showSizeChanger: false,
                        showQuickJumper: false,
                        current: this.state.get.page,
                        pageSize: this.state.get.rows,
                        total: shipperList.total_number
                    }}

                />
            </View>
        );
    }
}
