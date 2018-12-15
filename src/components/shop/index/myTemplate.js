import React, { Component } from "react";
import { connect } from "dva";
import { Input, Button, Table, Switch, Popconfirm, Popover, message } from "antd";
import moment from "moment";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { View } from "react-web-dom";
import styles from "./index.css";

import Query from "@/utils/query";
import { getShopPageList, setShopPagePortal } from "@/actions/shop/decorate";

import { PageApi } from "@/services/page";

const InputGroup = Input.Group
// type Props = {
//     dispatch: dispatchType,
//     history: historyType,
//     addShopPage: Function,
//     getShopPageList: Function,
//     setShopPagePortal: Function,
//     shopPageListLoading: boolean,
//     shopPageList: {
//         page: number,
//         rows: number,
//         total_number: number,
//         list: Array<{}>
//     },
// }
// type State = {}

@connect(
    ({ view: { shop: { shopPageList, shopPageListLoading } } }) => ({
        shopPageList,
        shopPageListLoading,
    }),
)
export default class MyTemplate extends Component {
    componentDidMount() {
        this.getPageList()
    }

    getPageList() {
        const { dispatch } = this.props
        const params = Query.make()
        dispatch(getShopPageList({ params }))
    }

    render() {
        const { shopPageList, shopPageListLoading, history, dispatch } = this.props
        const { page, rows, total_number, list } = shopPageList
        const columns = [{
            title: "页面ID",
            dataIndex: "id",
        }, {
            title: "页面名称",
            dataIndex: "name",
        }, {
            title: "创建时间",
            dataIndex: "create_time",
            render: text => moment(text, 'X').format('YYYY-MM-DD HH:mm:ss')
        }, {
            title: "最后编辑",
            dataIndex: "update_time",
            render: text => text ? moment(text, 'X').format('YYYY-MM-DD HH:mm:ss') : '-'
        }, {
            title: "设为主页",
            dataIndex: "is_portal",
            render: (text, record) => <Switch
                checked={!!text}
                onChange={(checked) => {
                    if (checked) {
                        dispatch(setShopPagePortal({
                            params: {
                                id: record.id
                            }
                        }))
                    }
                }}
            />
        }, {
            title: '操作',
            key: 'operation',
            render: (record) => <View className={styles.operation}>
                <a
                    onClick={() => {
                        router.push(`/shop/decorate/edit?id=${record.id}`)
                    }}
                >
                    编辑
                </a>
                <Popconfirm
                    title="你确定要克隆此页面吗？"
                    okText="确定"
                    cancelText="取消"
                    onConfirm={async () => {
                        const response = await Fetch.fetch({
                            api: PageApi.add,
                            params: {
                                name: `${record.name}副本`,
                                description: record.description,
                                background_color: record.background_color,
                                body: record.body,
                                module: record.module,
                                clone_from_id: record.id,
                            }
                        })
                        if (response.code === 0) {
                            this.getPageList()
                        }
                    }}
                >
                    <a>克隆</a>
                </Popconfirm>
                {/*<Popover*/}
                {/*trigger="click"*/}
                {/*placement="left"*/}
                {/*content={(*/}
                {/*<View>*/}
                {/*{*/}
                {/*this.popoverView(record)*/}
                {/*}*/}
                {/*</View>*/}
                {/*)}*/}
                {/*>*/}
                {/*<a>链接</a>*/}
                {/*</Popover>*/}
            </View>
        }
        ]
        return (
            <View>
                <View className={styles.myTemplateTop}>
                    {/*<Search*/}
                    {/*placeholder="输入页面名称"*/}
                    {/*onSearch={value => console.log(value)}*/}
                    {/*style={{ width: 200 }}*/}
                    {/*/>*/}
                    <Button
                        type='primary'
                        onClick={() => {
                            router.push('/shop/decorate/add')
                        }}
                    >
                        新增模板
                    </Button>
                </View>
                <Table
                    loading={shopPageListLoading}
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
                        router.push(Query.page(current, pageSize))
                    }}
                />
            </View>
        )
    }

    popoverView(record: {
        is_portal: number,
    }) {
        return (
            <View>
                {
                    record.is_portal ? <View className={styles.portalView}>
                        <p>主页地址：</p>
                        <InputGroup compact>
                            <Input
                                disabled
                                style={{ width: 276 }}
                                value="http://www.fashop.cn/wap"
                            />
                            <CopyToClipboard
                                text="http://www.fashop.cn/wap"
                                onCopy={() => message.success('复制成功！', 1)}
                            >
                                <Button>复制</Button>
                            </CopyToClipboard>
                        </InputGroup>
                        <p>模板地址：</p>
                    </View> : null
                }
                <InputGroup compact>
                    <Input
                        disabled
                        style={{ width: 276 }}
                        value="http://www.fashop.cn/page/1002dassd"
                    />
                    <CopyToClipboard
                        text="http://www.fashop.cn/page/1002dassd"
                        onCopy={() => message.success('复制成功！', 1)}
                    >
                        <Button>复制</Button>
                    </CopyToClipboard>
                </InputGroup>
            </View>
        )
    }
}
