import React, { Component, Fragment } from "react";
import { Card, Button, Table, Divider, Modal } from "antd";
import styles from "./index.css";
import router from "umi/router";
import PageList from "@/components/pageList";
import { connect } from "dva";

@connect(({ shipper, loading }) => ({
    shipperList: shipper.list.result,
    shipperListLoading: loading.effects["shipper/list"]
}))
class ShipperList extends Component {
    static defaultProps = {
        shipperListLoading: true,
        shipperList: {
            list: [],
            total_number: 0
        }
    };
    search = new PageList({
        router: "/setting/deliver/shipper",
        rows: 10,
        refresh: (e) => {
            this.initList(e);
        }
    });

    componentDidMount() {
        this.initList();
    }

    initList = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "shipper/list",
            payload: this.search.filter()
        });
    };

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
                render: (value, record) => <Fragment>
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
                    <Divider type="vertical" />
                    <a
                        onClick={() => {
                            Modal.confirm({
                                title: "确认删除？",
                                okText: "确认",
                                okType: "danger",
                                cancelText: "取消",
                                onOk: () => {
                                    this.props.dispatch({
                                        type: "shipper/del",
                                        payload: {
                                            id: record.id
                                        },
                                        callback: () => {
                                            this.search.push();
                                        }
                                    });
                                }
                            });
                        }}
                    >删除</a>
                </Fragment>
            }
        ];

        return (
            <Card bordered={false}>
                <div className={styles.batchView}>
                    <Button
                        type='primary'
                        onClick={() => {
                            router.push("/setting/deliver/shipper/add");
                        }}
                    >
                        新增地址
                    </Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={shipperList.list}
                    loading={shipperListLoading} cascader
                    rowKey={record => record.id}
                    pagination={{
                        showSizeChanger: false,
                        showQuickJumper: false,
                        current: this.search.page,
                        pageSize: this.search.rows,
                        total: shipperList.total_number
                    }}
                    onChange={({ current }) => {
                        this.search.setPage(current).push();
                    }}

                />
            </Card>
        );
    }
}

export default ShipperList;
