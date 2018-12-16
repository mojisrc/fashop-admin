import React, { Component } from "react";
import {Table,Button, Popconfirm,} from "antd";
import styles from "./index.css";
import { View } from "react-web-dom";
import { connect } from "dva";
import CategorySort from "@/components/category/sort";
import Image from "@/components/image";
import tree from "smart-arraytotree"

@connect(({ goodsCategory, loading }) => ({
    goodsCategory: goodsCategory.list.result.list,
    goodsCategoryLoading: loading.effects["goodsCategory/list"]
}))
export default class GoodsCategoryTable extends Component {
    static defaultProps = {
        goodsCategoryLoading: false,
        goodsCategory:[]

    }
    state = {
        expandedRowKeys: []
    }
    componentDidMount() {
        this.initList();
    }
    initList() {
        const { dispatch } = this.props;
        dispatch({
            type: "goodsCategory/list",
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.goodsCategory !== this.props.goodsCategory) {
            this.setState({
                expandedRowKeys: Array.isArray(goodsCategory) ? goodsCategory.map((item) => item.id) : []
            })
        }
    }

    render() {
        const {goodsCategoryLoading, goodsCategory,dispatch,} = this.props
        const categoryTree = tree(goodsCategory.list)
        const { expandedRowKeys } = this.state
        const columns = [
            {
                title: "",
                key: "_id",
                width: 100
            },
            {
                title: "分类ID",
                dataIndex: "id",
                key: "id",
                width: 100
            },
            {
                title: "图标",
                dataIndex: "icon",
                key: "icon",
                render: (icon) => <Image src={icon} style={{ height: '20px' }} />,
                width: 60
            },
            {
                title: "分类名称",
                dataIndex: "name",
                key: "name",
            },
            // {
            //     title: "使用商品",
            //     dataIndex: "goods_number",
            //     key: "goods_number",
            //     render: (text) => <a>{text}</a>
            // },
            {
                title: '操作',
                key: 'operation',
                className: styles.column,
                render: (record) => <View className={styles.operation}>
                    <a
                        onClick={() => {
                            router.push({
                                pathname: `/goods/category/edit`,
                                search: `?id=${record.id}`,
                                state: {
                                    categoryData: record,
                                }
                            })
                        }}
                    >
                        编辑
                    </a>
                    <Popconfirm
                        title="确认删除？"
                        okText="确认"
                        cancelText="取消"
                        onConfirm={() => {
                            dispatch({
                                type: "goodsCategory/del",
                                payload: {
                                    id: record.id
                                },
                                callback: () => {
                                    this.initList();
                                }
                            });
                        }}
                    >
                        <a>删除</a>
                    </Popconfirm>
                </View>
            }
        ]
        return (
            <View>
                <View className={styles.batchView}>
                    <Button
                        type='primary'
                        onClick={() => {
                            router.push('/goods/category/add')
                        }}
                    >
                        添加分类
                    </Button>
                    <Button
                        onClick={() => {
                            this.setState({
                                expandedRowKeys: Array.isArray(goodsCategory) ? goodsCategory.map((item) => item.id) : []
                            })
                        }}
                    >
                        全部展开
                    </Button>
                    <Button
                        onClick={() => {
                            this.setState({
                                expandedRowKeys: []
                            })
                        }}
                    >
                        全部折叠
                    </Button>
                    <CategorySort dataSource={categoryTree} dispatch={dispatch} />
                </View>
                <Table
                    defaultExpandAllRows={true}
                    dataSource={categoryTree}
                    columns={columns}
                    rowKey={record => record.id}
                    pagination={false}
                    goodsCategoryLoading={goodsCategoryLoading}
                    expandedRowKeys={expandedRowKeys}
                    onExpand={(bool, row) => {
                        if (bool) {
                            this.setState({
                                expandedRowKeys: [...expandedRowKeys, row.id]
                            })
                        } else {
                            const index = expandedRowKeys.findIndex((e) => e === row.id)
                            const newArray = [...expandedRowKeys]
                            newArray.splice(index, 1)
                            this.setState({
                                expandedRowKeys: newArray
                            })
                        }
                    }}
                />
            </View>
        )
    }
}
