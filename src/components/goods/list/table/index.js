import React, { Component } from "react";
import { Table, Button, Switch, Modal } from "antd";
import styles from "./index.css";
import { View } from "react-web-dom";
import { connect } from "dva";
import { initList } from "@/actions/goods";
import { getGoodsCategoryList } from "@/actions/goods/category";
import Image from "../../../image/index";
import moment from "moment";
import Query from "@/utils/query";
import GoodsApi from "@/services/goods";
import router from "umi/router";

@connect(({ goods, goodsCategory, loading }) => ({
    goodList: goods.list.result,
    goodsListLoading: loading.effects["goods/list"],
    goodsCategory: goodsCategory.result.list,
    goodsCategoryLoading: loading.effects["goodsCategory/list"]
}))
export default class GoodsListTable extends Component {
    static defaultProps = {
        goodList: { total_number, list },
        goodsListLoading: false,
        goodsCategory: [],
        goodsCategoryLoading: false
    };
    state = {
        rowSelectionIds: [],
        get: {}
    };

    componentDidMount() {
        this.initList();
    }

    initList() {
        const { dispatch, goodsCategoryList } = this.props;
        const get = Query.make([
            { key: "sale_state", rule: ["eq", "all"] },
            { key: "order_type", rule: ["eq", "all"] }
        ]);
        dispatch({
            type: "goods/list",
            payload: get
        });
        if (!goodsCategoryList.length) {
            dispatch({
                type: "goodsCategory/list"
            });
        }
        this.setState({
            get
        });
    }

    render() {
        const { goodsListLoading, goodsList, goodsCategoryList } = this.props;

        const columns = [
            {
                title: "商品图",
                dataIndex: "img",
                width: 50,
                render: (e) => (
                    <Image
                        type='goods'
                        src={e}
                        style={{ width: 50, height: 50 }}
                    />
                )
            }, {
                title: "商品标题",
                dataIndex: "title",
                width: 230
            }, {
                title: "价格（元）",
                dataIndex: "price",
                width: 120
            }, {
                title: "销量",
                dataIndex: "base_sale_num",
                width: 80
            }, {
                title: "库存",
                dataIndex: "stock",
                width: 80
            }, {
                title: "分类",
                dataIndex: "category_ids",
                render: (e) => {
                    const textArray = e ? e.map((a) => {
                        const index = goodsCategoryList.findIndex((c) => c.id === Number(a));
                        if (index !== -1) {
                            return goodsCategoryList[index].name;
                        } else {
                            return null;
                        }
                    }) : [];
                    const newArray = textArray.filter((e) => e);
                    return newArray.join("，");
                },
                width: 200

            }, {
                title: "创建时间",
                dataIndex: "create_time",
                render: e => moment(e * 1000).format("YYYY-MM-DD hh:mm"),
                width: 200
            }, {
                title: "上架状态",
                dataIndex: "is_on_sale",
                render: (text, record) => <Switch
                    defaultChecked={!!text}
                    onChange={async (checked) => {
                        if (checked) {
                            const response = await GoodsApi.onSale({ ids: [record.id] });
                            if (response.code === 0) {
                                this.initList();
                            }
                        } else {
                            const response = await GoodsApi.offSale({ ids: [record.id] });
                            if (response.code === 0) {
                                this.initList();
                            }
                        }
                    }}
                />
            }, {
                title: "操作",
                key: "operation",
                className: styles.column,
                width: 100,
                render: (record) => <View className={styles.operation}>
                    <a
                        onClick={() => {
                            router.push({
                                pathname: `/goods/list/edit`,
                                search: `?id=${record.id}`,
                                state: {
                                    record
                                }
                            });
                        }}
                    >
                        编辑
                    </a>
                    <a
                        onClick={async () => {
                            Modal.confirm({
                                title: "确认删除？",
                                okText: "确认",
                                okType: "danger",
                                cancelText: "取消",
                                onOk: async () => {
                                    const response = await GoodsApi.del({ ids: [record.id] });
                                    if (response.code === 0) {
                                        this.initList();
                                    }
                                }
                            });

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
                            router.push("/goods/list/add");
                        }}
                    >
                        添加商品
                    </Button>
                </View>
                <Table
                    loading={goodsListLoading}
                    defaultExpandAllRows
                    dataSource={goodsList.list}
                    columns={columns}
                    rowKey={record => record.id}
                    pagination={{
                        showSizeChanger: false,
                        showQuickJumper: false,
                        current: this.get.page,
                        pageSize: this.get.rows,
                        total: goodsList.total_number
                    }}
                    onChange={({ current, pageSize }) => {
                        router.push(Query.page(current, pageSize));
                        this.initList();
                    }}
                />
            </View>
        );
    }
}
