import React, { Component } from "react";
import { connect } from "dva";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import { Card, Table, Divider, Button, Popconfirm } from "antd";
import PageList from "@/components/pageList";
import styles from "@/components/marketing/group/index.css";
import { View } from "@/components/flexView";
import router from "umi/router";
import moment from "moment";

@connect(({ group, loading }) => ({
    groupList: group.list.result,
    groupListLoading: loading.effects["group/list"]
}))
export default class GroupList extends Component {
    static defaultProps = {
        groupListLoading: true,
        groupList: {
            list: [],
            total_number: 0
        }
    };
    search = new PageList({
        router: "/marketing/group/list",
        rows: 10,
        param: {
            keywords: null,
            state: null,
        },
        refresh: (e) => {
            this.initList(e);
        }
    });

    initList = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "group/list",
            payload: this.search.filter()
        });
    };

    componentDidMount() {
        this.initList();
    }

    render() {
        const { groupList, groupListLoading, dispatch } = this.props;
        const {
            keywords,
            state,
        } = this.search.getParam();
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
                render: (text, record) => `${moment(record.start_time, "X").format("YYYY-MM-DD HH:mm:ss")} 至 ${moment(record.end_time, "X").format("YYYY-MM-DD HH:mm:ss")}`
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
                render: (record) => {
                    const showDelete = record.state_desc === "未开始" || record.state_desc === "已过期未生效"
                    const showInvalid = record.state_desc === "已开始生效中" || record.state_desc === "已过期生效中"
                    const showEffective = record.state_desc === "已开始未生效"
                    return <View className={styles.operation}>
                        <a
                            onClick={() => {
                                router.push({
                                    pathname: `/marketing/group/edit`,
                                    search: `?id=${record.id}`,
                                });
                            }}
                        >
                            编辑
                        </a>
                        <Divider type="vertical" />
                        {
                            showDelete ? 
                            <Popconfirm
                                title="确定删除该拼团活动？"
                                onConfirm={() => {
                                    dispatch({
                                        type: "group/del",
                                        payload: {
                                            id: record.id
                                        }
                                    });
                                }}
                                onCancel={() => console.log('cancel')}
                            >
                                <a>删除</a>
                            </Popconfirm> :
                            showInvalid ? 
                            <Popconfirm
                                title="确定让这个拼团活动失效？"
                                onConfirm={() => console.log('confirm')}
                                onCancel={() => console.log('cancel')}
                            >
                                <a>使失效</a>
                            </Popconfirm> :
                            showEffective ? 
                            <Popconfirm
                                title="确定让这个拼团活动生效？"
                                onConfirm={() => console.log('confirm')}
                                onCancel={() => console.log('cancel')}
                            >
                                <a>生效</a>
                            </Popconfirm> :
                            null
                        }
                    </View>
                }
            }
        ];
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true}>
                <Card bordered={false}>
                    <PageList.Search
                        loading={groupListLoading}
                        onSubmit={this.search.submit}
                        defaultValue={this.search.defaultParam}
                        onReset={this.search.reset}
                        items={[
                            {
                                label: "活动名称",
                                input: {
                                    field: "keywords",
                                    placeholder: "请输入活动名称",
                                    initialValue: keywords
                                }
                            }, {
                                label: "活动状态",
                                select: {
                                    field: "state",
                                    style: { width: 130 },
                                    placeholder: "全部",
                                    data: [
                                        { name: "未开始", value: "0" },
                                        { name: "已开始生效中", value: "10" },
                                        { name: "已开始未生效", value: "20" },
                                        { name: "已过期生效中", value: "30" },
                                        { name: "已过期未生效", value: "40" },
                                    ],
                                    initialValue: state
                                }
                            },
                        ]} 
                    />
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
                        loading={groupListLoading}
                        dataSource={groupList.list}
                        columns={columns}
                        rowKey={record => record.id}
                        pagination={{
                            showSizeChanger: false,
                            showQuickJumper: false,
                            current: this.search.page,
                            pageSize: this.search.rows,
                            total: groupList.total_number
                        }}
                        onChange={({ current }) => {
                            this.search.setPage(current).push();
                        }}
                    />
                </Card>
            </PageHeaderWrapper>
        );
    }
}
