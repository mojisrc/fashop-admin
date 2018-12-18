import React, { Component } from "react";
import { Table, Button, Switch, Modal, Divider } from "antd";
import styles from "./index.css";
import { View } from "@/components/flexView";
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
                dataIndex: "type",
            }, {
                title: "内容",
                dataIndex: "desc",
            }, {
                title: "已领取/剩余",
                dataIndex: "end",
            }, {
                title: "已使用",
                dataIndex: "use",
            }, {
                title: "支付金额（元）",
                dataIndex: "amount",
            }, {
                title: "客单件（元）",
                dataIndex: "price",
            }, {
                title: "操作",
                key: "operation",
                className: styles.column,
                width: 200,
                render: (record) => <View className={styles.operation}>
                    <a
                        onClick={()=>{
                            router.push({
                                pathname: `/marketing/coupon/edit`,
                                search: `?id=${record.id}`,
                                state: {
                                    record
                                }
                            });
                        }}
                    >编辑</a>
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
            }
        ];
        const addList = [
            {
                title: "满减券",
                desc: <p className={styles.addDesc}>例：满100元减20元<br/>便于合理控制活动成本</p>,
                type: "reward"
            }, {
                title: "折扣券",
                desc: <p className={styles.addDesc}>例：满100元打9折<br/>提高店铺销量和客单价</p>,
                type: "discount"
            }, {
                title: "随机金额券",
                desc: <p className={styles.addDesc}>获得金额随机的优惠券<br/>增加活动趣味性</p>,
                type: "random"
            }
        ]
        return (
            <View>
                <View className={styles.addList}>
                    {
                        addList.map((item,index)=>(
                            <View className={styles.addItem} key={index}>
                                <p className={styles.addTitle}>{item.title}</p>
                                {item.desc}
                                <Button
                                    type='primary'
                                    onClick={() => {
                                        router.push({
                                            pathname: `/marketing/coupon/add`,
                                            search: `?type=${item.type}`,
                                        });
                                    }}
                                >
                                    立即新建
                                </Button>
                            </View>
                        ))
                    }
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
