import React, { Component } from "react";
import { Table, Button, Tag, Card } from "antd";
import styles from "./index.css";
import { View } from "@/components/flexView";
import { connect } from "umi";
import moment from "dayjs";
import { Modal } from "antd";
import { history as router } from "umi";
import PageList from "@/components/pageList";
import Arr from "@/utils/array";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";

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
                let areaListByKey = {};
                response.result.list.map(function(item) {
                    areaListByKey[`${item.id}`] = item;
                });
                this.setState({ areaListByKey }, () => {
                    this.initList();
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
                            router.push(`/setting/deliver/freight/edit?id=${record.id}`);
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
                                onOk: () => {
                                    this.props.dispatch({
                                        type: "freight/del",
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
                    let areasIds = [];
                    let areasGroup = [];
                    if (area_ids && area_ids.length > 0) {
                        area_ids.map((id) => {
                            let current = areaListByKey[`${id}`];
                            if (current && !Arr.inArray(current.id, areasIds)) {
                                areasIds.push(current.id);
                                areasGroup.push(current);
                            }
                            if (current && current["pid"] !== 0) {
                                let city = areaListByKey[current["pid"]];
                                if (!Arr.inArray(city.id, areasIds)) {
                                    areasIds.push(city.id);
                                    areasGroup.push(city);
                                }
                                if (city["pid"] !== 0) {
                                    let province = areaListByKey[city["pid"]];
                                    if (!Arr.inArray(province.id, areasIds)) {
                                        areasIds.push(province.id);
                                        areasGroup.push(province);
                                    }
                                }
                            }
                        });
                        let areasGroupTree = Arr.toTree(areasGroup);
                        return <span>
                        {
                            Array.isArray(areasGroupTree) && areasGroupTree.length > 0 && areasGroupTree.map((a, i) => {
                                if (!a.children || a.children.length === 0) {
                                    return <span style={{ color: "#000" }}
                                                 key={a.id}>{i === 0 ? null : "、"}{a.name}</span>;
                                } else {
                                    return (
                                        <span style={{ color: "#000" }} key={a.id}>
                                            {i === 0 ? null : "、"}{a.name}[
                                            {a.children.map((b, j) => {
                                                if (!b.children) {
                                                    return <span style={{ color: "#555" }}
                                                                 key={b.id}>{j === 0 ? null : "、"}{b.name}</span>;
                                                } else {
                                                    return (
                                                        <span style={{ color: "#555" }} key={b.id}>
                                                             {j === 0 ? null : "、"}
                                                            {b.name}
                                                            ({b.children.map((c, z) => (<span style={{ color: "#999" }}
                                                                                              key={c.id}>{z === 0 ? null : "、"}{c.name}</span>))})
                                                        </span>
                                                    );
                                                }
                                            })}
                                            ]
                                        </span>
                                    );
                                }
                            })
                        }
                    </span>;
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
            <PageHeaderWrapper hiddenBreadcrumb={true} policy={"freight/list"}>
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
                            showTotal: (total, range) => `共 ${total} 条`,
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
            </PageHeaderWrapper>
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
