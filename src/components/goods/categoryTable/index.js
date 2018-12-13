

import React, { Component } from "react";
import {
    Table,
    Button,
    Popconfirm,
} from "antd";
import styles from "./index.css";
import { View } from "react-web-dom";
import { connect } from "react-redux";

import { dispatchProps } from "@/utils/defaultProps";
import {
    getGoodsCategoryList,
    delCategory,
} from "../../../actions/goods/category";
import CategorySort from "../../goods/categorySort";
import Image from "../../image";

type Props = {
    loading: boolean,
    dispatch: dispatchType,
    categoryTree: Array<{}>,
    history: historyType,
}
type State = {
    expandedRowKeys: Array<number>,
}

const getExpandedRowKeys = (e) => {
    const _array = []
    const getListKey = (list: any) => {
        list.map((a) => {
            _array.push(a.id)
            if (a.children && a.children.length) {
                getListKey(a.children)
            }
        })
    }
    getListKey(e)
    return _array
}

@connect(({
              view: {
                  goods: {
                      loading,
                      categoryTree,
                  }
              }
          }) => ({
    loading,
    categoryTree,
}))
export default class GoodsCategoryTable extends Component {
    static defaultProps = {
        loading: false,
        dispatch: dispatchProps,
    }
    state = {
        expandedRowKeys: []
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(getGoodsCategoryList())
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.categoryTree !== this.props.categoryTree) {
            this.setState({
                expandedRowKeys: getExpandedRowKeys(nextProps.categoryTree)
            })
        }
    }

    render() {
        const {
            loading,
            categoryTree,
            dispatch,
        } = this.props
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
                            this.props.history.push({
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
                            dispatch(delCategory({ params: { id: record.id } }))

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
                            this.props.history.push('/goods/category/add')
                        }}
                    >
                        添加分类
                    </Button>
                    <Button
                        onClick={() => {
                            this.setState({
                                expandedRowKeys: getExpandedRowKeys(categoryTree)
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
                    loading={loading}
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
