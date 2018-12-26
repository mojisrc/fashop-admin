import React, { Component } from "react";
import { Table, Divider, Popconfirm, Button } from "antd";
import styles from "./index.css";
import { View } from "@/components/flexView";
import { connect } from "dva";
import Query from "@/utils/query";
import moment from "moment/moment";
import Image from "@/components/image/index";
import router from "umi/router";

@connect(({ group, loading }) => ({
    groupList: group.list.result,
    groupListLoading: loading.effects["group/list"]
}))
export default class ListTable extends Component {
    static defaultProps = {
        groupListLoading: true,
        groupList: {
            list: [],
            total_number: 0
        }
    };
    state = {
        selectedRowKeys: [],
        customerVisible: false,
        currentUser: {},
        get: { page: 1, rows: 10 }
    };
    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    };
    componentDidMount() {
        this.initList();
    }
    initList() {
        const { dispatch } = this.props;
        const get = Query.make();
        dispatch({
            type: "group/list",
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
        // const { selectedRowKeys } = this.state;
        // const rowSelection = {
        //     selectedRowKeys,
        //     onChange: this.onSelectChange
        // };
        const { groupList, groupListLoading } = this.props;
        const columns = [
            {
                title: "活动标题",
                dataIndex: "title",
                key: "title"
            }, {
                title: "拼团时限",
                dataIndex: "time_over",
                key: "time_over",
                render: (text, record) => `${record.time_over_day}天${record.time_over_hour}时${record.time_over_minute}分`
            }, {
                title: "活动时间",
                dataIndex: "start_time",
                key: "start_time",
                render: (text,record) => `${moment(record.start_time, "X").format("YYYY-MM-DD HH:mm:ss")} 至 ${moment(record.end_time, "X").format("YYYY-MM-DD HH:mm:ss")}`
            }, {
                title: "参团人数",
                dataIndex: "limit_buy_num",
                key: "limit_buy_num"
            }, {
                title: "活动状态",
                dataIndex: "state_desc",
                key: "state_desc",
            }, {
                title: "操作",
                key: "operation",
                className: styles.column,
                width: 300,
                render: (record) => <View className={styles.operation}>
                    <a
                        onClick={() => {
                            router.push({
                                pathname: `/marketing/freebie/edit`,
                                search: `?id=${record.id}`,
                                state: {
                                    record
                                }
                            });
                        }}
                    >编辑</a>
                    <Divider type="vertical" />
                    <Popconfirm
                        title="确定让这组赠品活动失效？"
                        onConfirm={() => console.log('confirm')}
                        onCancel={() => console.log('cancel')}
                    >
                        <a>使失效</a>
                    </Popconfirm>
                </View>
            }
        ];
        return (
            <View>
                <View className={styles.batchView}>
                    <Button
                        type='primary'
                        onClick={() => {
                            router.push("/marketing/group/add");
                        }}
                    >
                        创建活动
                    </Button>
                </View>
                <Table
                    defaultExpandAllRows
                    loading={groupListLoading}
                    size="middle"
                    dataSource={groupList.list ? groupList.list : []}
                    columns={columns}
                    rowKey={record => record.id}
                    pagination={{
                        showSizeChanger: false,
                        showQuickJumper: false,
                        current: this.state.get.page,
                        pageSize: this.state.get.rows,
                        total: groupList.total_number
                    }}
                    onChange={({ current, pageSize }) => {
                        router.push(Query.page(current, pageSize));
                        this.initList();
                    }}
                // rowSelection={rowSelection}
                />
            </View>
        );
    }
}
