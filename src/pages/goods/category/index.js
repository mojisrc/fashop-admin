import React, { Component, Fragment } from "react";
import { Table, Button, Popconfirm, Divider, Card, Modal } from "antd";
import styles from "./index.css";
import { View } from "@/components/flexView";
import { connect } from "umi";
import CategorySort from "@/pages/goods/components/category/sort";
import Arr from "@/utils/array";
import { history as router } from "umi";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";

@connect(({ goodsCategory, loading }) => ({
    goodsCategory: goodsCategory.list.result,
    goodsCategoryLoading: loading.effects["goodsCategory/list"]
}))
export default class GoodsCategory extends Component {
    static defaultProps = {
        goodsCategoryLoading: true,
        goodsCategory: {
            list: []
        }
    };
    state = {
        expandedRowKeys: [],
        categoryTree: [],
        previewVisible: false,
        previewUrl: ""
    };

    componentDidMount() {
        this.initList();
    }

    initList() {
        const { dispatch } = this.props;
        dispatch({
            type: "goodsCategory/list",
            callback: (response) => {
                const categoryTree = Arr.toTree(response.result.list);
                this.setState({ categoryTree });
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.goodsCategory.list !== this.props.goodsCategory.list) {
            this.setState({
                expandedRowKeys: Array.isArray(this.props.goodsCategory.list) ? this.props.goodsCategory.list.map((item) => item.id) : []
            });
        }
    }

    render() {
        const { goodsCategoryLoading, goodsCategory, dispatch } = this.props;
        const { expandedRowKeys, categoryTree, previewUrl, previewVisible } = this.state;
        const columns = [
            {
                title: "ID - 分类名称",
                dataIndex: "name",
                key: "name",
                render: (value, row) => {
                    return <span>
                        <span style={{ marginRight: 15 }}>
                            <span style={{ color: "#ccc", fontSize: 10 }}>{row.id} - </span>{value}</span>
                        <span>
                            {row.icon ? <img src={row.icon} style={{ height: "20px" }}
                                             onClick={() => {
                                                 this.setState({
                                                     previewUrl: row.icon,
                                                     previewVisible: true
                                                 });
                                             }}
                            /> : null}
                    </span>
                    </span>;
                }
            },

            {
                title: "操作",
                key: "operation",
                className: styles.column,
                render: (record) => <Fragment>
                    <a
                        onClick={() => {
                            router.push({
                                pathname: `/goods/category/edit`,
                                search: `?id=${record.id}`,
                                state: {
                                    categoryData: record
                                }
                            });
                        }}
                    >
                        编辑
                    </a>
                    <Divider type="vertical" />
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
                </Fragment>
            }
        ];
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true} policy={'goodscategory/list'}>
                <Card bordered={false}>
                    <View>
                        <div className={styles.batchView}>
                            <Button
                                type='primary'
                                onClick={() => {
                                    router.push("/goods/category/add");
                                }}
                            >
                                添加分类
                            </Button>
                            <Button
                                onClick={() => {
                                    this.setState({
                                        expandedRowKeys: Array.isArray(goodsCategory.list) ? goodsCategory.list.map((item) => item.id) : []
                                    });
                                }}
                            >
                                全部展开
                            </Button>
                            <Button
                                onClick={() => {
                                    this.setState({
                                        expandedRowKeys: []
                                    });
                                }}
                            >
                                全部折叠
                            </Button>
                            <CategorySort
                                dataSource={categoryTree}
                                dispatch={dispatch}
                                onSubmit={()=>{
                                    this.initList()
                                }}
                            />
                        </div>
                        <Table
                            loading={goodsCategoryLoading}
                            columns={columns}
                            dataSource={categoryTree}
                            defaultExpandAllRows={true}
                            rowKey={record => record.id}
                            pagination={false}
                            expandedRowKeys={expandedRowKeys}
                            onExpand={(bool, row) => {
                                if (bool) {
                                    this.setState({
                                        expandedRowKeys: [...expandedRowKeys, row.id]
                                    });
                                } else {
                                    const index = expandedRowKeys.findIndex((e) => e === row.id);
                                    const newArray = [...expandedRowKeys];
                                    newArray.splice(index, 1);
                                    this.setState({
                                        expandedRowKeys: newArray
                                    });
                                }
                            }}
                        />
                    </View>
                </Card>
                <Modal visible={previewVisible} footer={null} onCancel={() => {
                    this.setState({ previewVisible: false });
                }}>
                    <img style={{ width: "100%" }} src={previewUrl} />
                </Modal>
            </PageHeaderWrapper>
        );
    }
}
