//@flow
import React, { Component } from "react";
import {
    Table,
    Button,
    Tag
} from "antd";
import styles from "./index.css";
import { View } from "react-web-dom";
import { connect } from "react-redux";
import { dispatchType, historyType } from "../../../utils/flow";
import { dispatchProps } from "../../../utils/defaultProps";
import { getExpressList, delExpress, setExpressIsCommonlyUse } from "../../../actions/deliver/express";
import { Modal } from "antd/lib/index";

type Props = {
    history: historyType,
    dispatch: dispatchType,
    loading: boolean,
    listData: {
        page: number,
        rows: number,
        total_number: number,
        list: Array<{}>,
    }
}

type State = {
    page: number,
    rows: number
}

@connect(({
              view: {
                  express: {
                      loading,
                      listData,
                  },
              }
          }) => ({
    loading,
    listData,
}))
export default class ExpressListTable extends Component <Props, State> {
    state = {
        page: 1,
        rows: 10
    }
    static defaultProps = {
        dispatch: dispatchProps,
        loading: false,
        listData: {
            page:1,
            rows:10,
            total_number:0,
            list:[]
        },
    }

    getList() {
        const { dispatch } = this.props
        dispatch(getExpressList({ params: { page: this.state.page, rows: this.state.rows } }))
    }

    componentDidMount() {
        this.getList()
    }

    render() {
        const { page, rows } = this.state

        const {
            loading,
            listData,
            dispatch,
            history,
        } = this.props

        const {
            list,
            total_number
        } = listData

        const columns = [
            {
                title: '物流公司名称',
                dataIndex: 'company_name',
                key: 'company_name',
            }, {
                title: '是否为常用',
                dataIndex: 'is_commonly_use',
                key: 'is_commonly_use',
                render: (value) => value === 1 ? <Tag color="red">常用</Tag> : '否'
            }, {
                title: '操作',
                dataIndex: 'operating',
                key: 'operating',
                render: (value, record) => <View className={styles.operation}>
                    {record.is_commonly_use !== 1 ? <a
                        onClick={() => {
                            Modal.confirm({
                                title: '确认设为常用？',
                                okText: '确认',
                                okType: 'danger',
                                cancelText: '取消',
                                onOk() {
                                    dispatch(setExpressIsCommonlyUse({ params: { id: record.id } }))
                                }
                            })
                        }}
                    >设为常用</a> : null}
                    {!record.is_system ? <a
                        onClick={() => {
                            history.push({
                                pathname: `/setting/deliver/expressEdit`,
                                search: `?id=${record.id}`
                            })
                        }}
                    >
                        编辑
                    </a> : null}
                    {!record.is_system ? <a
                        onClick={() => {
                            Modal.confirm({
                                title: '确认删除？',
                                okText: '确认',
                                okType: 'danger',
                                cancelText: '取消',
                                onOk() {
                                    dispatch(delExpress({ params: { id: record.id } }))
                                }
                            })
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
                            history.push('/setting/deliver/expressAdd')
                        }}
                    >
                        新增物流公司
                    </Button>
                </View>
                <Table
                    dataSource={list}
                    columns={columns}
                    rowKey={record => record.id}
                    loading={loading}
                    onChange={({ current, pageSize }) => {
                        this.setState({
                            page: current,
                            rows: pageSize
                        }, () => {
                            this.getList()
                        })
                    }}
                    pagination={{
                        total: total_number,
                        current: page,
                        pageSize: rows
                    }}

                />
            </View>
        )
    }
}
