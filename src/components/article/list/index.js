//@flow
import React, { Component } from 'react'
import { Popconfirm, Row, Col, Spin, Pagination, Button,Table, Modal,message } from 'antd';
import { View } from 'react-web-dom'
import styles from './index.css'
import moment from 'moment'
import Image from "../../image";
import Fetch from "../../../utils/fetch";
import { GoodsApi } from "../../../config/api/article";
import Query from "../../../utils/query";
import {historyType} from "../../../utils/flow";

type Props = {
    history: historyType,
    localNewsMaterialList: {
        list: Array<{
            create_time: string,
            media: Array<{
                title: string,
                cover_pic: string,
                link: {
                    action: string,
                    param: {
                        id: number
                    }
                }
            }>
        }>,
        total_number: number
    },
}

type State = {
    rowSelectionIds: Array<string>,
    delIds: Array<number>
}

export default class TableList extends Component<Props, State> {
    state = {
        rowSelectionIds: [],
        delIds: [],
    }

    render() {

        const { articleList,history } = this.props
        let { page, rows, total_number, list, } = articleList
        const { delIds } = this.state

        Array.isArray(list) && list.length > 0 && list.map((article: any) => {
            if (delIds.indexOf(article.id) === -1) {
                list.push(article)
            }
        })

        const columns = [
            {
                title: "封面图",
                dataIndex: 'img',
                width: 50,
                render: (e) => (
                    <Image
                        type='article'
                        src={e}
                        style={{ width: 50, height: 50 }}
                    />
                )
            }, {
                title: "标题",
                dataIndex: "title",
                width: 230
            }, {
                title: "创建时间",
                dataIndex: "create_time",
                render: e => moment(e * 1000).format('YYYY-MM-DD hh:mm'),
                width: 200,
            }, {
                title: '操作',
                key: 'operation',
                width: 100,
                render: (record) => <View className={styles.operation}>
                    <a
                        onClick={() => {
                            this.props.history.push({
                                pathname: `/article/list/edit`,
                                search: `?id=${record.id}`,
                                state: {
                                    record,
                                }
                            })
                        }}
                    >
                        编辑
                    </a>
                    <a
                        onClick={async () => {
                            Modal.confirm({
                                title: '确认删除？',
                                okText: '确认',
                                okType: 'danger',
                                cancelText: '取消',
                                onOk: async () => {
                                    const response = await Fetch.fetch({
                                        api: GoodsApi.del,
                                        params: { ids: [record.id] }
                                    })
                                    if (response.code === 0) {
                                        this.setState({
                                            delIds: [...delIds, record.id]
                                        }, () => {
                                            message.success('已删除', 1)
                                        })
                                    }
                                }
                            })

                        }}
                    >删除</a>
                </View>
            }
        ]
        return (
            <View>
                <View className={styles.batchView}>
                    <Button
                        type='primary'
                        onClick={() => {
                            history.push('/article/list/add')
                        }}
                    >
                        添加文章
                    </Button>
                </View>
                <Table
                    defaultExpandAllRows
                    dataSource={list}
                    columns={columns}
                    rowKey={record => record.id}
                    pagination={{
                        showSizeChanger: false,
                        showQuickJumper: false,
                        pageSize: rows,
                        total: total_number,
                        current: page,
                    }}
                    onChange={({ current, pageSize }) => {
                        this.props.history.push(Query.page(current, pageSize))
                    }}
                />
            </View>
        )
    }

}
