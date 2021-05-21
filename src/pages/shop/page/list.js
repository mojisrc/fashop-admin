import React, { Component, Fragment } from "react";
import { connect } from "umi";
import { Button, Table, Switch, message, Popconfirm, Card, Divider } from "antd";
import moment from "moment";
import { history as router } from "umi";
import PageList from "@/components/pageList/index";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";

@connect(({ page, loading }) => ({
    pageList: page.list.result,
    pageListLoading: loading.effects["page/list"]
}))
export default class MyTemplate extends Component {
    static defaultProps = {
        pageListLoading: true,
        pageList: {
            list: [],
            total_number: 0
        }
    };

    componentDidMount() {
        this.initList();
    }

    search = new PageList({
        router: "/shop/page/list",
        rows: 10,
        param: {},
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
        let { keywords } = this.search.getParam();
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
            render: text => moment(text, "X").format("YYYY-MM-DD HH:mm:ss")
        }, {
            title: "最后编辑",
            dataIndex: "update_time",
            render: text => text ? moment(text, "X").format("YYYY-MM-DD HH:mm:ss") : "-"
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
                                    message.success("设置主页成功");
                                    this.initList();
                                }
                            });
                        }
                    }}
                />
        },
            {
                title: "操作",
                key: "operation",
                render: (record) => <Fragment>
                    <a
                        onClick={() => {
                            router.push(`/shop/page/edit?id=${record.id}`);
                        }}
                    >
                        编辑
                    </a>
                    <Divider type="vertical" />
                    <Popconfirm
                        title="你确定要克隆此页面吗？"
                        okText="确定"
                        cancelText="取消"
                        onConfirm={async () => {
                            dispatch({
                                type: "page/add",
                                payload: {
                                    name: `${record.name}副本`,
                                    description: record.description,
                                    background_color: record.background_color,
                                    body: record.body,
                                    module: record.module,
                                    clone_from_id: record.id
                                },
                                callback: (e) => {
                                    if (e.code === 0) {
                                        message.success("克隆页面成功");
                                        this.initList();
                                    } else {
                                        message.error(e.msg);
                                    }
                                }
                            });
                        }}
                    >
                        <a>克隆</a>
                    </Popconfirm>
                </Fragment>
            }
        ];
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true} policy={"page/list"}>
                <Card bordered={false}>
                    <PageList.Search
                        loading={pageListLoading}
                        onSubmit={this.search.submit}
                        defaultValue={this.search.defaultParam}
                        onReset={this.search.reset}
                        items={[
                            {
                                input: {
                                    field: "keywords",
                                    placeholder: "请输入关键词",
                                    initialValue: keywords
                                }
                            }
                        ]}
                    />
                    <div className={"listTableTop"}>
                        <Button
                            type='primary'
                            onClick={() => {
                                router.push("/shop/page/add");
                            }}
                        >
                            新增页面
                        </Button>
                    </div>
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
                </Card>
            </PageHeaderWrapper>
        );
    }
}
