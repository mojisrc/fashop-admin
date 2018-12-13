
import React, { Component } from "react";
import { Table, Button } from "antd";
import styles from "./index.css";
import { View } from "react-web-dom";
import { connect } from "react-redux";

import { dispatchProps } from "@/utils/defaultProps";
import { getShipperList, delShipper } from "../../../actions/deliver/shipper";
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
                  shipper: {
                      loading,
                      listData,
                  },
              }
          }) => ({
    loading,
    listData,
}))
export default class ShipperListTable extends Component  {
    state = {
        page: 1,
        rows: 10
    }
    static defaultProps = {
        dispatch: dispatchProps,
        loading: false,
        listData: {
            page: 1,
            rows: 10,
            total_number: 0,
            list: []
        },
    }

    getList() {
        const { dispatch } = this.props
        dispatch(getShipperList({ params: { page: this.state.page, rows: this.state.rows } }))
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
                title: '联系人',
                dataIndex: 'name',
                key: 'name',
            }, {
                title: '联系方式',
                dataIndex: 'contact_number',
                key: 'contact_number',
            }, {
                title: '收货地址',
                dataIndex: 'combine_detail',
                key: 'combine_detail',
            },
            // {
            //     title: '地址类型',
            //     dataIndex: 'is_default',
            //     key: 'is_default',
            //     render: (value) => value === 1 ? <Tag color="red">默认收货地址</Tag> : null
            // },
            {
                title: '操作',
                dataIndex: 'operating',
                key: 'operating',
                render: (value, record) => <View className={styles.operation}>
                    <a
                        onClick={() => {
                            history.push({
                                pathname: `/setting/deliver/shipperEdit`,
                                search: `?id=${record.id}`
                            })
                        }}
                    >
                        编辑
                    </a>
                    <a
                        onClick={() => {
                            Modal.confirm({
                                title: '确认删除？',
                                okText: '确认',
                                okType: 'danger',
                                cancelText: '取消',
                                onOk() {
                                    dispatch(delShipper({ params: { id: record.id } }))
                                }
                            })
                        }}
                    >删除</a>
                </View>
            }
        ];

        return (
            <View>
                <View className={styles.batchView}>
                    <Button
                        type='primary'
                        onClick={() => {
                            history.push('/setting/deliver/shipperAdd')
                        }}
                    >
                        新增地址
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
