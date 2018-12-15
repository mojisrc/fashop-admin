import React, { Component } from "react";
import { Table, Button, Tag } from "antd";
import styles from "./index.css";
import { View } from "react-web-dom";
import { connect } from "dva";
import { Modal } from "antd";
import Query from "@/utils/query";
import router from "umi/router";

@connect(({ express: { list }, loading }) => ({
    expressList: list.result,
    expressListLoading: loading.effects["express/list"]
}))
export default class ExpressListTable extends Component {
    static defaultProps = {
        expressListLoading: false,
        expressList: {}
    };
    state = {
        get: {}
    };

    componentDidMount() {
        this.initList();
    }

    initList() {
        const { dispatch } = this.props;
        const get = Query.make();
        dispatch({
            type: "express/list",
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
                render: (value, record) => <View className={styles.operation}>
                    {record.is_commonly_use !== 1 ? <a
                        onClick={() => {
                            Modal.confirm({
                                title: "确认设为常用？",
                                okText: "确认",
                                okType: "danger",
                                cancelText: "取消",
                                onOk() {
                                    dispatch(setExpressIsCommonlyUse({ params: { id: record.id } }));
                                }
                            });
                        }}
                    >设为常用</a> : null}
                    {!record.is_system ? <a
                        onClick={() => {
                            router.push({
                                pathname: `/setting/express/edit`,
                                search: `?id=${record.id}`
                            });
                        }}
                    >
                        编辑
                    </a> : null}
                    {!record.is_system ? <a
                        onClick={() => {
                            Modal.confirm({
                                title: "确认删除？",
                                okText: "确认",
                                okType: "danger",
                                cancelText: "取消",
                                onOk() {
                                    dispatch({
                                        type: "express/del",
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
                    >删除</a> : null}
                </View>
            }
        ];

        return (
            <View>
                <View className={styles.batchView}>
                    <Button
                        type='primary'
                        onClick={() => {
                            router.push("/setting/express/add");
                        }}
                    >
                        新增物流公司
                    </Button>
                </View>
                <Table
                    dataSource={expressList}
                    columns={columns}
                    rowKey={record => record.id}
                    loading={expressListLoading}
                    onChange={({ current, pageSize }) => {
                        router.push(Query.page(current, pageSize));
                        this.initList();
                    }}
                    pagination={{
                        showSizeChanger: false,
                        showQuickJumper: false,
                        current: get.page,
                        pageSize: get.rows,
                        total: expressList.total_number
                    }}

                />
            </View>
        );
    }
}
