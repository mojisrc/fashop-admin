import React, { Component } from "react";
import { connect } from "dva";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import { Card, Table, Divider, Button, Popconfirm } from "antd";
import PageList from "@/components/pageList";
import styles from "@/components/marketing/discount/index.css";
import { View } from "@/components/flexView";
import router from "umi/router";
import moment from "moment";

@connect(({ discount, loading }) => ({
    discountList: discount.list.result,
    discountListLoading: loading.effects["discount/list"]
}))
export default class DiscountList extends Component {
    static defaultProps = {
        discountListLoading: true,
        discountList: {
            list: [],
            total_number: 0
        }
    };
    search = new PageList({
        router: "/marketing/discount/list",
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
            type: "discount/list",
            payload: this.search.filter()
        });
    };

    componentDidMount() {
        this.initList();
    }

    render() {
        const { discountList, discountListLoading } = this.props;
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
                title: "活动时间",
                dataIndex: "start_time",
                key: "start_time",
                render: (text, record) => `${moment(record.start_time, "X").format("YYYY-MM-DD HH:mm:ss")} 至 ${moment(record.end_time, "X").format("YYYY-MM-DD HH:mm:ss")}`
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
                    const showDelete = record.state_desc === "未开始" || record.state_desc === "已结束"
                    const showInvalid = record.state_desc === "进行中"
                    const showEdit = record.state_desc !== "已结束"
                    return <View className={styles.operation}>
                        {
                            showEdit ? 
                            <a
                                onClick={() => {
                                    router.push({
                                        pathname: `/marketing/discount/edit`,
                                        search: `?id=${record.id}`,
                                    });
                                }}
                            >
                                编辑
                            </a> :
                            <a
                                onClick={() => {
                                    
                                }}
                            >
                                查看
                            </a>
                        }
                        <Divider type="vertical" />
                        {
                            showDelete ? 
                            <Popconfirm
                                title="确定删除该拼团活动？"
                                onConfirm={() => {
                                    dispatch({
                                        type: "discount/del",
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
                        loading={discountListLoading}
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
                                        { name: "进行中", value: "10" },
                                        { name: "已结束", value: "20" },
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
                                router.push("/marketing/discount/add");
                            }}
                        >
                            创建活动
                        </Button>
                    </View>
                    <Table
                        loading={discountListLoading}
                        dataSource={discountList.list}
                        columns={columns}
                        rowKey={record => record.id}
                        pagination={{
                            showSizeChanger: false,
                            showQuickJumper: false,
                            current: this.search.page,
                            pageSize: this.search.rows,
                            total: discountList.total_number
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
