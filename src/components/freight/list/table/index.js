import React, { Component } from "react";
import {
    Table,
    Button,
    Tag
} from "antd";
import styles from "./index.css";
import { View } from "react-web-dom";
import { connect } from "dva";
import moment from "moment/moment";
import { getFreightList, delFreight } from "@/actions/deliver/freight";
import { getKeyAreaList } from "@/actions/area"
import { Modal } from "antd";

@connect(({
              view: {
                  freight: {
                      loading,
                      listData,
                  },
              }
          }) => ({
    loading,
    listData,
}))
export default class FreightListTable extends Component   {
    state = {
        page: 1,
        rows: 10,
        areaList: []
    }
    static defaultProps = {

        loading: false,
        listData: [],
    }

    getList() {
        const { dispatch } = this.props
        dispatch(getFreightList({ params: { page: this.state.page, rows: this.state.rows } }))
    }

    async componentDidMount() {
        this.getList()
        this.setState({
            areaList: await getKeyAreaList()
        })
    }

    render() {
        const { areaList, page, rows } = this.state
        const {
            loading,
            listData,
            history,
            dispatch
        } = this.props

        const {
            list,
            total_number
        } = listData


        const columns = [
            {
                title: "模板名称",
                dataIndex: "name",
                key: "name",
            }, {
                title: "计算方式",
                dataIndex: "pay_type",
                key: "pay_type",
                render: (value) => <div>{FreightListTable.getPayType(value)}</div>
            },
            {
                title: "创建时间",
                dataIndex: "create_time",
                key: "create_time",
                render: (text) => {
                    return moment(text, 'X').format('YYYY-MM-DD HH:mm:ss')
                }
            },
            {
                title: '操作',
                key: 'operation',
                className: `${styles.operationTh}`,
                render: (record) => <View className={styles.operation}>
                    <a
                        onClick={() => {
                            router.push(`/setting/deliver/freightEdit?id=${record.id}`)
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
                                    dispatch(delFreight({ params: { id: record.id } }))
                                }
                            })
                        }}
                    >删除</a>
                </View>
            }
        ]
        const areaColumns = [
            {
                title: "可配送区域",
                dataIndex: "area_ids",
                key: "area_ids",
                className: `${styles.areas}`,
                render: (area_ids) => {
                    if (area_ids && area_ids.length > 0) {
                        const areaNames = area_ids.map((id) => {
                            return (typeof areaList[id] !== "undefined" && typeof areaList[id]['name'] !== "undefined") ? areaList[id].name : 'x'
                        })
                        return areaNames.join(',')
                    } else {
                        return '-'
                    }
                }
            }
            , {
                title: "首(件/重)",
                dataIndex: "first_amount",
                key: "first_amount",
                className: `${styles.firstAmount}`,
            }, {
                title: "运费（元）",
                dataIndex: "first_fee",
                key: "first_fee",
                className: `${styles.firstFee}`,
            }, {
                title: "续（件/重）",
                dataIndex: "additional_amount",
                key: "additional_amount",
                className: `${styles.additionalAmount}`,
                render: (value) => {
                    return `${value} 件`
                }
            }, {
                title: "续费（元）",
                dataIndex: "additional_fee",
                key: "additional_fee",
                className: `${styles.additionalFee}`,
                render: (value) => {
                    return `¥${value}`
                }
            }
        ]
        return (
            <View>
                <View className={styles.batchView}>
                    <Button
                        type='primary'
                        onClick={() => {
                            router.push('/setting/deliver/freightAdd')
                        }}
                    >
                        新增运费模板
                    </Button>
                </View>
                {list ? <Table
                    loading={loading}
                    className="tableGoodsNested"
                    dataSource={list}
                    columns={columns}
                    expandedRowRender={record => (
                        <Table
                            className="tableGoodsNestedChild"
                            dataSource={record.areas ? record.areas : []}
                            columns={areaColumns}
                            pagination={false}
                            rowKey={record => record.id}
                        />
                    )}
                    rowKey={record => record.id}
                    pagination={{
                        total: total_number,
                        current: page,
                        pageSize: rows
                    }}
                    onChange={({ current, pageSize }) => {
                        this.setState({
                            page: current,
                            rows: pageSize
                        }, () => {
                            this.getList()
                        })
                    }}
                /> : ''}
            </View>
        )
    }

    static getPayType(pay_type) {
        switch (pay_type) {
            case 1:
                return <Tag color="green">件数计费</Tag>
            case 2:
                return <Tag color="red">重量计费</Tag>
            default:
        }
    }
}
