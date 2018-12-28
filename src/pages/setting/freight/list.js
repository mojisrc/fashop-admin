import React, { Component } from "react";
import { Table, Button, Tag, Card } from "antd";
import styles from "./index.css";
import { View } from "@/components/flexView";
import { connect } from "dva";
import moment from "moment/moment";
import { Modal } from "antd";
import Query from "@/utils/query";
import router from "umi/router";
import PageList from "@/components/pageList";

@connect(({ freight: { list }, area, loading }) => ({
    freightList: list.result,
    freightListLoading: loading.effects["freight/list"],
    areaList: area.list.result.list,
    areaListLoading: loading.effects["area/list"]
}))
class FreightList extends Component {
    static defaultProps = {
        freightList: [],
        freightListLoading: false,
        areaList: [],
        areaListLoading: false
    };
    state = {
        areaListByKey: {},
        expandedRowKeys: []
    };

    componentDidMount() {
        this.initArea();
        this.initList();
    }

    search = new PageList({
        router: "/setting/deliver/freight",
        param: {},
        refresh: (e) => {
            this.initList(e);
        }
    });

    initArea() {
        const { dispatch } = this.props;
        dispatch({
            type: "area/list",
            callback: (response) => {
                var areaListByKey = {};
                response.result.list.forEach(function(item) {
                    areaListByKey[item.id] = item;
                });
                this.setState({
                    areaListByKey
                });
            }
        });
    }

    initList = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "freight/list",
            payload: this.search.filter(),
            callback: (response) => {
                const { result: { list } } = response;
                this.setState({
                    expandedRowKeys: Array.isArray(list) ? list.map((item) => item.id) : []
                });
            }
        });
    };

    render() {
        const { areaListByKey, expandedRowKeys } = this.state;
        const { freightList, freightListLoading } = this.props;

        const columns = [
            {
                title: "模板名称",
                dataIndex: "name",
                key: "name"
            }, {
                title: "计算方式",
                dataIndex: "pay_type",
                key: "pay_type",
                render: (value) => <div>{this.getPayType(value)}</div>
            },
            {
                title: "创建时间",
                dataIndex: "create_time",
                key: "create_time",
                render: (text) => {
                    return moment(text, "X").format("YYYY-MM-DD HH:mm:ss");
                }
            },
            {
                title: "操作",
                key: "operation",
                className: `${styles.operationTh}`,
                render: (record) => <View className={styles.operation}>
                    <a
                        onClick={() => {
                            router.push(`/setting/freight/edit?id=${record.id}`);
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
                                        type: "freight/del",
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
        const areaColumns = [
            {
                title: "可配送区域",
                dataIndex: "area_ids",
                key: "area_ids",
                className: `${styles.areas}`,
                render: (area_ids) => {
                    if (area_ids && area_ids.length > 0) {
                        const areaNames = area_ids.map((id) => {
                            return (typeof areaListByKey[id] !== "undefined" && typeof areaListByKey[id]["name"] !== "undefined") ? areaListByKey[id].name : "x";
                        });
                        return areaNames.join(",");
                    } else {
                        return "-";
                    }
                }
            }
            , {
                title: "首(件/重)",
                dataIndex: "first_amount",
                key: "first_amount",
                className: `${styles.firstAmount}`
            }, {
                title: "运费（元）",
                dataIndex: "first_fee",
                key: "first_fee",
                className: `${styles.firstFee}`
            }, {
                title: "续（件/重）",
                dataIndex: "additional_amount",
                key: "additional_amount",
                className: `${styles.additionalAmount}`,
                render: (value) => {
                    return `${value} 件`;
                }
            }, {
                title: "续费（元）",
                dataIndex: "additional_fee",
                key: "additional_fee",
                className: `${styles.additionalFee}`,
                render: (value) => {
                    return `¥${value}`;
                }
            }
        ];
        return (
            <Card bordered={false}>
                <div className={styles.batchView}>
                    <Button
                        type='primary'
                        onClick={() => {
                            router.push("/setting/deliver/freight/add");
                        }}
                    >
                        新增运费模板
                    </Button>
                </div>
                <Table
                    loading={freightListLoading}
                    dataSource={freightList.list}
                    columns={columns}
                    expandedRowRender={record => (
                        <Table
                            dataSource={record.areas ? record.areas : []}
                            columns={areaColumns}
                            pagination={false}
                            rowKey={record => `${record.ids}`}
                        />
                    )}
                    onExpand={(expanded, record) => {
                        expanded ? expandedRowKeys.push(record.id) : expandedRowKeys = expandedRowKeys.filter(v => v !== record.id);
                        this.setState({ expandedRowKeys });
                    }}
                    expandedRowKeys={expandedRowKeys}
                    pagination={{
                        showSizeChanger: false,
                        showQuickJumper: false,
                        current: this.search.page,
                        pageSize: this.search.rows,
                        total: freightList.total_number
                    }}
                    onChange={({ current }) => {
                        this.search.setPage(current).push();
                    }}
                    rowKey={record => record.id}
                />
            </Card>
        );
    }

    getPayType(pay_type) {
        switch (pay_type) {
            case 1:
                return <Tag color="green">件数计费</Tag>;
            case 2:
                return <Tag color="red">重量计费</Tag>;
            default:
        }
    }
}

export default FreightList;
