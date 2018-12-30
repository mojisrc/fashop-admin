import React, { Component } from "react";
import { Table, Card } from "antd";
import { connect } from "dva";
import moment from "moment/moment";
import Image from "@/components/image/index";
import router from "umi/router";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import PageList from "@/components/pageList";

@connect(({ user, loading }) => ({
    userList: user.list.result,
    userListLoading: loading.effects["user/list"]
}))
class UserList extends Component {
    static defaultProps = {
        userListLoading: true,
        userList: {
            list: [],
            total_number: 0
        }
    };
    search = new PageList({
        router: "/user/list",
        param: {
            keywords_type: "nickname",
            keywords: null,
        },
        rule: [{ key: "keywords_type", rule: ["rely", "keywords"] }],
        refresh: () => {
            this.initList();
        }
    });

    componentDidMount() {
        this.initList();
    }

    initList = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "user/list",
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
        const { userList, userListLoading } = this.props;
        let { keywords_type, keywords } = this.search.getParam();

        const columns = [
            {
                title: "ID",
                dataIndex: "id",
                key: "id"
            },
            {
                title: "头像",
                dataIndex: "avatar",
                key: "avatar",
                render: (e) => (
                    <Image
                        type='avatar'
                        src={e}
                        style={{ width: 20, height: 20 }}
                    />
                )
            }, {
                title: "昵称",
                dataIndex: "nickname",
                key: "nickname"
            }, {
                title: "手机号",
                dataIndex: "phone",
                key: "phone"
            }, {
                title: "购买次数",
                dataIndex: "buy_times",
                key: "buy_times"
            }, {
                title: "累计消费（元）",
                dataIndex: "cost_total",
                key: "cost_total"
            }, {
                title: "客单价（元）",
                dataIndex: "cost_average",
                key: "cost_average"
            }, {
                title: "最后消费",
                dataIndex: "last_cost_time",
                key: "last_cost_time",
                render: (text) => {
                    return text > 0 ? moment(text, "X").format("YYYY-MM-DD HH:mm:ss") : "-";
                }
            }, {
                title: "注册时间",
                dataIndex: "create_time",
                key: "create_time",
                render: (text) => {
                    return text > 0 ? moment(text, "X").format("YYYY-MM-DD HH:mm:ss") : "-";
                }
            }, {
                title: "操作",
                key: "operation",
                render: (record) => <a
                    onClick={() => {
                        router.push({
                            pathname: `/user/list/detail`,
                            search: `?id=${record.id}`
                        });
                    }}
                >
                    详情
                </a>
            }
        ];
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true}>
                <Card bordered={false}>
                    <PageList.Search
                        loading={userListLoading}
                        onSubmit={this.search.submit}
                        defaultValue={this.search.defaultParam}
                        onReset={this.search.reset}
                        items={[
                            {
                                selectInput: [
                                    {
                                        field: "keywords_type",
                                        style: { minWidth: 115 },
                                        initialValue: keywords_type,
                                        data: keywords_type_list
                                    },
                                    {
                                        field: "keywords",
                                        placeholder: "请输入关键词",
                                        initialValue: keywords
                                    }
                                ]
                            }
                        ]} />
                    <Table
                        defaultExpandAllRows
                        loading={userListLoading}
                        dataSource={userList.list ? userList.list : []}
                        columns={columns}
                        pagination={{
                            showSizeChanger: false,
                            showQuickJumper: false,
                            current: this.search.page,
                            pageSize: this.search.rows,
                            total: userList.total_number
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
}


const keywords_type_list = [
    {
        name: "昵称",
        value: "nickname"
    },
    {
        name: "手机号",
        value: "phone"
    }
];
export default UserList;
