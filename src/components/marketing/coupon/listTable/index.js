import React, { Component } from "react";
import { Table, Button, Switch, Modal, Divider } from "antd";
import styles from "./index.css";
import { View } from "react-web-dom";
import { connect } from "dva";
import Image from "@/components/image";
import moment from "moment";
import Query from "@/utils/query";
import router from "umi/router";

@connect(({ goods, goodsCategory, loading }) => ({
    goodsList: goods.list.result,
    goodsListLoading: loading.effects["goods/list"],
    goodsCategory: goodsCategory.result,
    goodsCategoryLoading: loading.effects["goodsCategory/list"]
}))
export default class CouponListTable extends Component {
    static defaultProps = {
        goodsList: {
            total_number: 0,
            list: []
        },
        goodsListLoading: true,
        goodsCategory: {
            list: []
        },
        goodsCategoryLoading: true
    };
    state = {
        rowSelectionIds: [],
        get: { page: 1, rows: 10 }
    };

    componentDidMount() {
        console.log('componentDidMount')
        this.initList();
    }

    initList() {
        console.log('initList')
        const { dispatch, goodsCategory } = this.props;
        const get = Query.make([
            { key: "sale_state", rule: ["eq", "all"] },
            { key: "order_type", rule: ["eq", "all"] }
        ]);
        dispatch({
            type: "goods/list",
            payload: get,
            callback:(res)=>{
                console.log(res)
            }
        });
        if (!goodsCategory.list.length) {
            dispatch({
                type: "goodsCategory/list"
            });
        }
        this.setState({
            get
        });
    }

    render() {
        const { goodsListLoading, goodsList, goodsCategory } = this.props;
        const columns = [
            {
                title: "优惠券名称",
                dataIndex: "title",
                render: (e) => (
                    <Image
                        type='goods'
                        src={e}
                        style={{ width: 50, height: 50 }}
                    />
                )
            }, {
                title: "类型",
                dataIndex: "title",
            }, {
                title: "内容",
                dataIndex: "price",
            }, {
                title: "已领取/剩余",
                dataIndex: "base_sale_num",
            }, {
                title: "已使用",
                dataIndex: "stock",
            }, {
                title: "支付金额（元）",
                dataIndex: "stock",
            }, {
                title: "客单件（元）",
                dataIndex: "stock",
            }, {
                title: "操作",
                key: "operation",
                className: styles.column,
                width: 200,
                render: (record) => <View className={styles.operation}>
                    <a href="#">编辑</a>
                    <Divider type="vertical" />
                    <a
                        onClick={async () => {
                            Modal.confirm({
                                title: "停止发券",
                                content: "停止发券后，买家之前领取的优惠券，在可用时间内还能继续使用，但无法再编辑优惠券内容。确定停止发券？",
                                okText: "确认",
                                okType: "danger",
                                cancelText: "取消",
                                onOk: async () => {
                                    // const response = await GoodsApi.del({ ids: [record.id] });
                                    // if (response.code === 0) {
                                    //     this.initList();
                                    // }
                                }
                            });

                        }}
                    >停止</a>
                </View>
                // render: (record) => <View className={styles.operation}>
                //     <a
                //         onClick={() => {
                //             router.push({
                //                 pathname: `/goods/list/edit`,
                //                 search: `?id=${record.id}`,
                //                 state: {
                //                     record
                //                 }
                //             });
                //         }}
                //     >
                //         编辑
                //     </a>
                //     <a
                //         onClick={async () => {
                //             Modal.confirm({
                //                 title: "确认删除？",
                //                 okText: "确认",
                //                 okType: "danger",
                //                 cancelText: "取消",
                //                 onOk: async () => {
                //                     const response = await GoodsApi.del({ ids: [record.id] });
                //                     if (response.code === 0) {
                //                         this.initList();
                //                     }
                //                 }
                //             });

                //         }}
                //     >删除</a>
                // </View>
            }
        ];
        return (
            <View>
                <View className={styles.batchView}>
                    <Button
                        type='primary'
                        onClick={() => {
                            // router.push("/goods/list/add");
                        }}
                    >
                        添加优惠券
                    </Button>
                </View>
                <Table
                    loading={goodsListLoading}
                    defaultExpandAllRows
                    dataSource={[{}]}
                    columns={columns}
                    rowKey={record => record.id}
                    pagination={{
                        showSizeChanger: false,
                        showQuickJumper: false,
                        current: this.state.get.page,
                        pageSize: this.state.get.rows,
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
