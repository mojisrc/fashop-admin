import React, { Component } from "react";
import {
    Table,
    Button,
} from "antd";
import styles from "./index.css";
import { View } from "@/components/flexView";
import { connect } from "dva";


import { getShipperList } from "@/actions/deliver/shipper";
//
// type Props = {
//     history: historyType,
//     dispatch: dispatchType,
//     loading: boolean,
//     listData: {
//         page: number,
//         rows: number,
//         total_number: number,
//         list: Array<{}>,
//     },
//     categoryList: Array<{ id: number, name: string }>,
// }
//
// type State = {
//     rowSelectionIds: Array<string>,
// }

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
    static defaultProps = {

        loading: false,
        listData: [],
    }
    state = {
        rowSelectionIds: [],
    }

    render() {
        const {
            loading,
            listData,
            dispatch,
            history,
        } = this.props
        const {
            page,
            rows,
            total_number,
            list,
        } = listData

        const columns = [{
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        }, {
            title: '联系人',
            dataIndex: 'contact',
            key: 'contact',
        }, {
            title: '联系方式',
            dataIndex: 'tel',
            key: 'tel',
        }, {
            title: '收货地址',
            dataIndex: 'address',
            key: 'address',
        }, {
            title: '默认设置',
            dataIndex: 'set',
            key: 'set'
        }, {
            title: '操作',
            dataIndex: 'operating',
            key: 'operating',
            render: (record) => <View className={styles.operation}>
                <a
                    onClick={() => {
                        // router.push({
                        //     pathname:`/order/refundEdit`,
                        //     search:`?id=${record.id}`,
                        //     state:{
                        //         record,
                        //     }
                        // })
                    }}
                >
                    编辑
                </a>
                <a>删除</a>
            </View>
        }];

        return (
            <View>
                <View className={styles.batchView}>
                    <Button
                        type='primary'
                        onClick={() => {
                            router.push('/deliver/shipperAdd')
                        }}
                    >
                        新增地址
                    </Button>
                </View>
                <Table
                    defaultExpandAllRows
                    dataSource={list}
                    columns={columns}
                    rowKey={record => record.id}
                    pagination={{
                        showSizeChanger: true,
                        showQuickJumper: true,
                        pageSize: rows,
                        total: total_number,
                        current: page,
                    }}
                    loading={loading}
                    onChange={({ current, pageSize }) => {
                        dispatch(getShipperList({ params: { page: current, rows: pageSize } }))
                    }}
                    rowSelection={{
                        onChange: (e) => {
                            this.setState({
                                rowSelectionIds: e
                            })
                        }
                    }}
                />
            </View>
        )
    }
}
