import React, { Component, Fragment } from "react";
import { Card, Button, Table, Tag, Divider, Modal } from "antd";
import styles from "./index.css";
import router from "umi/router";
import PageList from "@/components/pageList";
import { connect } from "dva";

@connect(({ express, loading }) => ({
    expressList: express.list.result,
    expressListLoading: loading.effects["express/list"]
}))
class ExpressList extends Component {
    static defaultProps = {
        expressListLoading: true,
        expressList: {
            list: [],
            total_number: 0
        }
    };
    search = new PageList({
        router: "/setting/deliver/express",
        rows: 10,
        param: {
            keywords_type: "company_name",
            keywords: null
        },
        rule: [{ key: "keywords_type", rule: ["rely", "keywords"] }],
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
            type: "express/list",
            payload: this.search.filter()
        });
    };

    render() {
        let { keywords_type, keywords } = this.search.getParam();
        const { expressList, expressListLoading } = this.props;
        const columns = [
            {
                title: "物流公司名称",
                dataIndex: "company_name",
                key: "company_name"
            }, {
                title: "是否为常用",
                dataIndex: "is_commonly_use",
                key: "is_commonly_use",
                render: (value) => value === 1 ? <Tag color="red">常用</Tag> : "否"
            }, {
                title: "操作",
                dataIndex: "operating",
                key: "operating",
                render: (value, record) => <Fragment>
                    {record.is_commonly_use !== 1 ? <Fragment><a
                        onClick={() => {
                            Modal.confirm({
                                title: "确认设为常用？",
                                okText: "确认",
                                okType: "danger",
                                cancelText: "取消",
                                onOk: () => {
                                    this.props.dispatch({
                                        type: "express/setCommonlyUse",
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
                    >设为常用</a><Divider type="vertical" /></Fragment> : null}
                    {!record.is_system ? <Fragment><a
                        onClick={() => {
                            router.push({
                                pathname: `/setting/deliver/express/edit`,
                                search: `?id=${record.id}`
                            });
                        }}
                    >
                        编辑
                    </a><Divider type="vertical" /></Fragment> : null}
                    {!record.is_system ? <a
                        onClick={() => {
                            Modal.confirm({
                                title: "确认删除？",
                                okText: "确认",
                                okType: "danger",
                                cancelText: "取消",
                                onOk: () => {
                                    this.props.dispatch({
                                        type: "express/del",
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
                    >删除</a> : null}
                </Fragment>
            }
        ];
        return (
            <Card bordered={false}>
                <PageList.Search
                    loading={expressListLoading}
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
                <div className={styles.batchView}>
                    <Button
                        type='primary'
                        onClick={() => {
                            router.push("/setting/deliver/express/add");
                        }}
                    >
                        新增物流公司
                    </Button>
                </div>
                <Table
                    columns={columns}
                    dataSource={expressList.list}
                    loading={expressListLoading} cascader
                    rowKey={record => record.id}
                    pagination={{
                        showSizeChanger: false,
                        showQuickJumper: false,
                        current: this.search.page,
                        pageSize: this.search.rows,
                        total: expressList.total_number
                    }}
                    onChange={({ current }) => {
                        this.search.setPage(current).push();
                    }}

                />
            </Card>
        );
    }

}

const keywords_type_list = [
    {
        name: "公司名称",
        value: "company_name"
    }

];
export default ExpressList;
