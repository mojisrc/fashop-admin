import React, { Component } from "react";
import { connect } from "umi";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import { Card, Tag } from "antd";
import OrderEditPrice from "@/pages/order/components/editPrice/index";
import { Table, Button, message } from "antd";
import { View } from "@/components/flexView";
import moment from "moment/moment";
import Image from "@/components/image/index";
import { history as router } from "umi";
import styles from "./list.css";
import PageList from "@/components/pageList";
import Time from "@/utils/time"

@connect(({ order, loading }) => ({
    orderList: order.list.result,
    orderListLoading: loading.effects["order/list"]
}))
class List extends Component {

    static defaultProps = {
        orderListLoading: false,
        orderList: {}
    };

    constructor(props) {
        super(props);
        // 设置url里的订单状态（state_type）
        const { location: { query: { state_type } } } = props;
        this.state = {
            orderId: 0,
            visible: false,
            expandedRowKeys: [],
            tabKey: state_type ? state_type : 'all',
            selectedRowKeys: [],
            list: []
        }
    }

    componentDidMount() {
        this.initList();
    }

    search = new PageList({
        router: () => {
            const { tabKey } = this.state;
            if (tabKey !== "all") {
                return `/order/list?state_type=${tabKey}`;
            } else {
                return `/order/list`;
            }
        },
        param: {
            keywords_type: "goods_name",
            keywords: null,
            create_time: [],
            order_type: null,
            group_state_type: null,
        },
        rule: [{ key: "keywords_type", rule: ["rely", "keywords"] }],
        refresh: (e) => {
            this.initList(e);
        }
    });


    initList = () => {
        const { dispatch } = this.props;
        const { tabKey } = this.state;
        let payload = this.search.filter();
        if (tabKey !== "all") {
            payload["state_type"] = tabKey;
        }
        dispatch({
            type: "order/list",
            payload,
            callback: (response) => {
                const { result: { list } } = response;
                this.setState({
                    expandedRowKeys: Array.isArray(list) ? list.map((item) => item.id) : []
                });
            }
        });
    };
    onTabChange = (key) => {
        this.setState({ tabKey: key }, () => {
            if (key !== "all") {
                router.push(`/order/list?state_type=${key}`);
            } else {
                router.push(`/order/list`);
            }
            // 重置搜索表单的值
            this.searchForm.resetValues();
            // 重置PageSearchList
            this.search.reset();
        });
    };

    render() {
        let { keywords_type, keywords, create_time, order_type, group_state_type } = this.search.getParam();
        const { orderList, orderListLoading } = this.props;
        let { expandedRowKeys, selectedRowKeys } = this.state;
        let { list } = orderList;
        let _list = []
        if (Array.isArray(list)) {
            // 为什么 非要JSON一下呢
            _list = JSON.parse(JSON.stringify(list))
            _list.map((item) => {
                Array.isArray(item.extend_order_goods) && item.extend_order_goods.map((goods) => {
                    goods["reciver_info"] = typeof item.extend_order_extend['reciver_info'] !== "undefined" ? item.extend_order_extend.reciver_info : {};
                    goods["rows"] = item.extend_order_goods.length;
                    goods["extend_user"] = item.extend_user
                    return goods;
                });
                return item;
            });
        }
        const rowSelection = {
            selectedRowKeys,
            onChange: (selectedRowKeys) => {
                this.setState({ selectedRowKeys });
            },
        };
        let tabList = state_type_list.map((item) => {
            return {
                key: item.value,
                tab: item.name
            };
        });
        tabList.unshift({
            key: "all",
            tab: "全部"
        });
        const group_search = Number(order_type) === 2 ? [{
            label: "订单状态",
            select: {
                field: "group_state_type",
                style: { width: 100 },
                placeholder: "全部状态",
                data: group_state_type_list,
                initialValue: group_state_type
            }
        }] : []
        const columns = [
            {
                title: "订单号",
                dataIndex: "sn",
                key: "sn",
                render: (text, record) => <div>
                    {this.getActivityText(record.marketing_activity)}{record.sn}
                </div>
            }, {
                title: "下单时间",
                dataIndex: "create_time",
                key: "create_time",
                render: text => moment(text, "X").format("YYYY-MM-DD HH:mm:ss")
            }, {
                title: "订单状态",
                dataIndex: "state",
                key: "state",
                render: (text, record) => Number(order_type) !== 2 ? this.returnOrderState(text, record) : <div>
                    <div>{this.returnOrderState(text)}</div>
                    <div>
                        <span className={styles.name}>拼团状态：</span>
                        <span className={styles.value}>{this.returnGroupOrderState(record.group_state_type)}</span>
                    </div>
                </div>
            },
            {
                title: "运费（元）",
                dataIndex: "freight_fee",
                key: "freight_fee",
                render: (value) => `¥${value}`
            }, {
                title: "商品总额（元）",
                dataIndex: "amount",
                key: "amount",
                render: (value, record) => {
                    return record.is_revise ?
                        <span style={{ color: 'red' }}>已改价 ¥{record.revise_amount}</span> : `¥${value}`
                }
            }, {
                title: "操作",
                key: "operation",
                render: (record) => <View className={styles.operation}>
                    {
                        record.state === 10 ? <a
                            onClick={() => {
                                this.editPrice.show({
                                    orderId: record.id
                                });
                            }}
                        >
                            改价
                        </a> : null
                    }
                    <a
                        onClick={() => {
                            router.push(`/order/list/detail?id=${record.id}`);
                        }}
                    >
                        详情
                    </a>
                    {
                        Number(order_type) !== 2 ? null : <a
                            onClick={() => {
                                // this.setState({ group_type: 1 }, () => {
                                //     router.push(`/order/list?group_type=1`);
                                //     // 重置搜索表单的值
                                //     this.searchForm.resetValues();
                                //     // 重置PageSearchList
                                //     this.search.reset();
                                // })
                            }}
                        >
                            查看同团订单
                        </a>
                    }
                    {
                        record.state === 20 ? <a
                            onClick={() => {
                                router.push(`/order/list/send?id=${record.id}`);
                            }}
                        >
                            发货
                        </a> : ""
                    }

                </View>
            }
        ];
        const expandedRowColumns = [
            {
                title: "商品图",
                dataIndex: "goods_img",
                key: "goods_img",
                className: `${styles.goodsGoodsImg} ${styles.borderRightNone}`,
                render: (e) => (
                    <Image
                        type='goods'
                        src={e}
                        style={{ width: 32, height: 32 }}
                    />
                )
            }, {
                title: "商品名称",
                key: "goods_title",
                className: `${styles.goodsTitle}`,
                render: (record) => {
                    return <div>
                        {record.goods_title}
                    </div>
                }
            }, {
                title: "规格",
                dataIndex: "goods_spec",
                key: "goods_spec",
                className: `${styles.goodsSpec}`,
                render: (goods_spec) => {
                    return goods_spec[0].id > 0 ? goods_spec.map(function (item) {
                        return item.value_name + " ";
                    }) : "-";
                }
            }, {
                title: "数量",
                dataIndex: "goods_num",
                key: "goods_num",
                className: `${styles.goodsNum}`,
                render: (value) => {
                    return `${value} 件`;
                }
            }, {
                title: "单价",
                dataIndex: "goods_price",
                key: "goods_price",
                className: `${styles.goodsPrice}`,
                render: (value) => {
                    return `¥${value}`;
                }
            }, {
                title: "售后",
                dataIndex: "lock_state",
                key: "lock_state",
                render: (value, item) => {
                    if (item.lock_state === 1 && item.refund_id > 0) {
                        return <a onClick={() => {
                            router.push(`/order/refund/edit?id=${item.refund_id}`);
                        }}>退款中</a>;
                    }
                }
            }, {
                title: "收货人",
                dataIndex: "reciver_info.name",
                key: "reciver",
                className: `${styles.reciver} ${styles.borderLeft}`,
                render: (value, row, index) => {
                    return {
                        children: <span>{value}<a className={styles.reciverAvatar}
                                                  onClick={() => {
                                                      router.push(`/user/list/detail?id=${row.extend_user.id}`)
                                                  }}
                        ><Image
                            type='avatar'
                            src={row.extend_user.profile.avatar}
                            style={{
                                width: 20,
                                height: 20
                            }}
                        />{row.extend_user.profile.nickname}</a></span>, props: { rowSpan: index === 0 ? row.rows : 0 }
                    };
                }
            }
            , {
                title: "联系方式",
                dataIndex: "reciver_info.phone",
                key: "reciver_phone",
                className: `${styles.reciverPhone} ${styles.borderLeft}`,
                render: (value, row, index) => {
                    return { children: value, props: { rowSpan: index === 0 ? row.rows : 0 } };
                }
            },
            {
                title: "收货地址",
                dataIndex: "reciver_info.address",
                key: "reciver_address",
                className: `${styles.reciverAddress} ${styles.borderLeft}`,
                render: (value, row, index) => {
                    return { children: value, props: { rowSpan: index === 0 ? row.rows : 0 } };
                }
            }
        ];
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true} policy={'order/list'}>
                <OrderEditPrice ref={(e) => this.editPrice = e} />
                <Card
                    bordered={false}
                    tabList={tabList}
                    activeTabKey={this.state.tabKey}
                    onTabChange={(key) => {
                        this.onTabChange(key);
                    }}
                >
                    <PageList.Search
                        wrappedComponentRef={(form) => this.searchForm = form}
                        ref={this.searchInstance}
                        loading={orderListLoading}
                        onSubmit={this.search.submit}
                        defaultValue={this.search.defaultParam}
                        onReset={this.search.reset}
                        items={[
                            {
                                selectInput: [
                                    {
                                        field: "keywords_type",
                                        style: { minWidth: 115 },
                                        initialValue: keywords_type,
                                        data: keywords_type_list
                                    },
                                    {
                                        field: "keywords",
                                        placeholder: "请输入关键词",
                                        initialValue: keywords
                                    }
                                ]
                            },
                            {
                                label: "下单时间",
                                timeRange: {
                                    field: "create_time",
                                    initialValue: create_time
                                }
                            },
                            {
                                label: "订单类型",
                                select: {
                                    field: "order_type",
                                    style: { width: 100 },
                                    placeholder: "全部类型",
                                    data: order_type_list,
                                    initialValue: order_type
                                }
                            }, ...group_search
                        ]}
                    />
                    <div className="listTableTop">
                        <Button
                            type='primary'
                            onClick={() => {
                                if (selectedRowKeys.length > 0) {
                                    router.push({
                                        pathname: `/order/list/print`,
                                        query: {
                                            ids: selectedRowKeys
                                        },
                                    })
                                } else {
                                    message.info("请选择")
                                }

                            }}
                        >
                            批量打印
                        </Button>
                    </div>
                    <Table
                        loading={orderListLoading}
                        dataSource={_list}
                        columns={columns}
                        expandedRowRender={record => (
                            <Table
                                dataSource={record.extend_order_goods}
                                columns={expandedRowColumns}
                                pagination={false}
                                defaultExpandAllRows={true}
                                rowKey={record => `${record.id}_child`}
                            />
                        )}
                        onExpand={(expanded, record) => {
                            expanded ? expandedRowKeys.push(record.id) : expandedRowKeys = expandedRowKeys.filter(v => v !== record.id);
                            this.setState({ expandedRowKeys });
                        }}
                        expandedRowKeys={expandedRowKeys}
                        pagination={{
                            showSizeChanger: false,
                            showTotal: (total, range) => `共 ${total} 条`,
                            current: this.search.page,
                            pageSize: this.search.rows,
                            total: orderList.total_number
                        }}
                        onChange={({ current }) => {
                            this.search.setPage(current).push();
                        }}
                        rowKey={record => record.id}
                        rowSelection={rowSelection}
                    />
                </Card>
            </PageHeaderWrapper>
        );
    }

    returnOrderState(state, record) {
        switch (state) {
            case 0:
                return "已取消";
            case 10:
                if (Time.overdue(record.payable_time)) {
                    return "支付超时"
                } else {
                    return "待支付";
                }
            case 20:
                return "待发货";
            case 30:
                return "已发货";
            case 40:
                return "已完成";
            default:
                return "";
        }
    }

    returnGroupOrderState(type) {
        switch (type) {
            case "group_state_new":
                return "待付款";
            case "group_state_pay":
                return "待开团";
            case "group_state_success":
                return "拼团成功";
            case "group_state_fail":
                return "拼团失败";
            default:
                return "";
        }
    }

    getActivityText(marketing_activity) {
        switch (marketing_activity) {
            case 0:
                break
            case 1:
                return <span style={{ color: 'red' }}>[拼团] </span>
            case 2:
                return <span style={{ color: 'red' }}>[秒杀] </span>
            case 3:
                return <span style={{ color: 'red' }}>[赠品] </span>
        }
    }
}

const state_type_list = [
    {
        name: "待发货",
        value: "state_pay"
    }, {
        name: "待付款",
        value: "state_new"
    }, {
        name: "已发货",
        value: "state_send"
    }, {
        name: "已完成",
        value: "state_success"
    }, {
        name: "已关闭",
        value: "state_cancel"
    }
];
const order_type_list = [
    {
        name: "普通订单",
        value: "1"
    }, {
        name: "拼团订单",
        value: "2"
    }
];

const group_state_type_list = [
    {
        name: "待付款",
        value: "group_state_new"
    }, {
        name: "待成团",
        value: "group_state_pay"
    }, {
        name: "拼团成功",
        value: "group_state_success"
    }, {
        name: "拼团失败",
        value: "group_state_fail"
    }
];

const keywords_type_list = [
    {
        name: "商品名称",
        value: "goods_name"
    },
    {
        name: "订单号",
        value: "order_no"
    },
    {
        name: "收货人姓名",
        value: "receiver_name"
    },
    {
        name: "收货人电话",
        value: "receiver_phone"
    },
    {
        name: "快递单号",
        value: "courier_number"
    }
];

export default List;
