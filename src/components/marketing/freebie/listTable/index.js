import React, { Component } from "react";
import { Table, Button, Switch, Modal, Divider, Popconfirm, Icon } from "antd";
import styles from "./index.css";
import { View } from "@/components/flexView";
import { connect } from "dva";
import Image from "@/components/image";
import moment from "moment";
import Query from "@/utils/query";
import GoodsApi from "@/services/goods";
import router from "umi/router";

@connect(({ goods, goodsCategory, loading }) => ({
    goodsList: goods.list.result,
    goodsListLoading: loading.effects["goods/list"],
    goodsCategory: goodsCategory.result,
    goodsCategoryLoading: loading.effects["goodsCategory/list"]
}))
export default class FreebieListTable extends Component {
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
                title: "赠品名称",
                dataIndex: "title",
            }, {
                title: "已发放",
                dataIndex: "status",
            }, {
                title: "已兑换",
                dataIndex: "go",
            }, {
                title: "剩余",
                dataIndex: "get",
            }, {
                title: "操作",
                key: "operation",
                className: styles.column,
                width: 300,
                render: (record) => <View className={styles.operation}>
                    <a
                        onClick={() => {
                            router.push({
                                pathname: `/marketing/freebie/edit`,
                                search: `?id=${record.id}`,
                                state: {
                                    record
                                }
                            });
                        }}
                    >编辑</a>
                    <Divider type="vertical" />
                    <Popconfirm
                        title="确定让这组赠品活动失效？" 
                        onConfirm={()=>console.log('confirm')} 
                        onCancel={()=>console.log('cancel')}
                    >
                        <a>使失效</a>
                    </Popconfirm>
                </View>
            }
        ];
        return (
            <View>
                <View className={styles.batchView}>
                    <Button
                        type='primary'
                        onClick={() => {
                            router.push("/marketing/freebie/add");
                        }}
                    >
                        添加赠品
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
