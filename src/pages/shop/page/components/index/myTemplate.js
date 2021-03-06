import React, { Component } from "react";
import { connect } from "umi";
import { Input, Button, Table, Switch, message,Popconfirm } from "antd";
import dayjs from "dayjs";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { View } from "@/components/flexView";
import styles from "./index.css";
import PageApi from "@/services/page";
import { history as router } from "umi";
import PageList from "@/components/pageList/index";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
const InputGroup = Input.Group;

@connect(({ page, loading }) => ({
    pageList: page.list.result,
    pageListLoading: loading.effects["page/list"]
}))
export default class MyTemplate extends Component {
    static defaultProps = {
        pageListLoading: true,
        pageList: {
            list:[],
            total_number:0
        }
    };

    componentDidMount() {
        this.initList();
    }
    search = new PageList({
        router: "/shop/page",
        rows: 10,
        param: {
        },
        refresh: (e) => {
            this.initList(e);
        }
    });

    initList() {
        const { dispatch } = this.props;
        dispatch({
            type: "page/list",
            payload: this.search.filter()
        });
    }

    render() {
        const { pageList, pageListLoading, dispatch } = this.props;
        const { list } = pageList;
        const columns = [{
            title: "页面编号",
            dataIndex: "id"
        }, {
            title: "页面名称",
            dataIndex: "name"
        }, {
            title: "创建时间",
            dataIndex: "create_time",
            render: text => dayjs(text * 1000).format("YYYY-MM-DD HH:mm:ss")
        }, {
            title: "最后编辑",
            dataIndex: "update_time",
            render: text => text ? dayjs(text * 1000).format("YYYY-MM-DD HH:mm:ss") : "-"
        }, {
            title: "设为主页",
            dataIndex: "is_portal",
            render: (text, record) =>
                <Switch
                    checked={!!text}
                    onChange={(checked) => {
                        if (checked) {
                            dispatch({
                                type: "page/setPortal",
                                payload: {
                                    id: record.id
                                },
                                callback: () => {
                                    message.success('设置主页成功');
                                    this.initList();
                                }
                            });
                        }
                    }}
                />
        }, {
            title: "操作",
            key: "operation",
            render: (record) => <View className={styles.operation}>
                <a
                    onClick={() => {
                        router.push(`/shop/page/edit?id=${record.id}`);
                    }}
                >
                    编辑
                </a>
                <Popconfirm
                    title="你确定要克隆此页面吗？"
                    okText="确定"
                    cancelText="取消"
                    onConfirm={async () => {
                        const response = await PageApi.add({
                            name: `${record.name}副本`,
                            description: record.description,
                            background_color: record.background_color,
                            body: record.body,
                            module: record.module,
                            clone_from_id: record.id
                        });
                        if (response.code === 0) {
                            message.success('克隆页面成功')
                            this.initList();
                        }
                    }}
                >
                    <a>克隆</a>
                </Popconfirm>
            </View>
        }
        ];
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true} policy={"page/list"}>
                <Card bordered={false}>
                    <View>
                        <View className={styles.myTemplateTop}>
                            <Button
                                type='primary'
                                onClick={() => {
                                    router.push("/shop/page/add");
                                }}
                            >
                                新增页面
                            </Button>
                        </View>
                        <Table
                            loading={pageListLoading}
                            dataSource={list}
                            columns={columns}
                            rowKey={record => record.id}
                            pagination={{
                                showSizeChanger: false,
                                showTotal: (total, range) => `共 ${total} 条`,
                                current: this.search.page,
                                pageSize: this.search.rows,
                                total: pageList.total_number
                            }}
                            onChange={({ current }) => {
                                this.search.setPage(current).push();
                            }}
                        />
                    </View>
                </Card>
            </PageHeaderWrapper>
        );
    }
}
