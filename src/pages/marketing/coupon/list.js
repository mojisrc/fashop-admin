import React, { Component } from "react";
import { connect } from "dva";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import { Card, Table, Divider, Button } from "antd";
import PageList from "@/components/pageList";
import styles from "@/components/marketing/coupon/listTable/index.css";
import { View } from "@/components/flexView";
import router from "umi/router";
import moment from "moment";

@connect(({ coupon, loading }) => ({
    couponList: coupon.list.result,
    couponListLoading: loading.effects["coupon/list"]
}))
export default class Coupon extends Component {
    static defaultProps = {
        couponListLoading: true,
        couponList: {
            list: [],
            total_number: 0
        }
    };
    search = new PageList({
        router: "/marketing/coupon",
        rows: 10,
        param: {
            keywords: null,
            state: null,
            type: null,
        },
        refresh: (e) => {
            this.initList(e);
        }
    });

    initList = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "coupon/list",
            payload: this.search.filter()
        });
    };

    componentDidMount() {
        this.initList();
    }

    render() {
        const { couponList, couponListLoading } = this.props;
        const {
            keywords,
            state,
            type,
        } = this.search.getParam();
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
                        onClick={() => {
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
                desc: <p className={styles.addDesc}>例：满100元减20元<br />便于合理控制活动成本</p>,
                type: "reward"
            }, {
                title: "折扣券",
                desc: <p className={styles.addDesc}>例：满100元打9折<br />提高店铺销量和客单价</p>,
                type: "discount"
            }, {
                title: "随机金额券",
                desc: <p className={styles.addDesc}>获得金额随机的优惠券<br />增加活动趣味性</p>,
                type: "random"
            }
        ]
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true}>
                <Card bordered={false}>
                    <PageList.Search
                        loading={couponListLoading}
                        onSubmit={this.search.submit}
                        defaultValue={this.search.defaultParam}
                        onReset={this.search.reset}
                        items={[
                            {
                                label: "优惠券名称",
                                input: {
                                    field: "keywords",
                                    placeholder: "请输入优惠券名称",
                                    initialValue: keywords
                                }
                            }, {
                                label: "优惠券状态",
                                select: {
                                    field: "state",
                                    style: { width: 130 },
                                    placeholder: "全部",
                                    data: [
                                        { name: "未开始", value: "0" },
                                        { name: "进行中", value: "10" },
                                        { name: "已结束", value: "20" },
                                    ],
                                    initialValue: state
                                }
                            }, {
                                label: "优惠券类型",
                                select: {
                                    field: "type",
                                    style: { width: 130 },
                                    placeholder: "全部",
                                    data: [
                                        { name: "满减券", value: "0" },
                                        { name: "折扣券", value: "10" },
                                        { name: "随机金额券", value: "20" },
                                    ],
                                    initialValue: type
                                }
                            }
                        ]}
                    />
                    <View className={styles.addList}>
                        {
                            addList.map((item, index) => (
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
                        loading={couponListLoading}
                        dataSource={couponList.list}
                        columns={columns}
                        rowKey={record => record.id}
                        pagination={{
                            showSizeChanger: false,
                            showQuickJumper: false,
                            current: this.search.page,
                            pageSize: this.search.rows,
                            total: couponList.total_number
                        }}
                        onChange={({ current }) => {
                            this.search.setPage(current).push();
                        }}
                    />
                </Card>
            </PageHeaderWrapper>
        );
    }

    // returnCouponState(state) {
    //     switch (state) {
    //         case 0:
    //             return <span style={{ color: "red" }}>未处理</span>;
    //         case 10:
    //             return "已拒绝退款";
    //         case 20:
    //             return "已同意退款";
    //         case 30:
    //             return "已完成";
    //         case 50:
    //             return "用户主动撤销";
    //         case 51:
    //             return "用户主动收货";
    //         default:
    //             return "-";
    //     }
    // }
}

