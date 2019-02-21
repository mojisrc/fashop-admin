import React, { Component } from "react";
import { connect } from "dva";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import { Card, Table, Divider, Button } from "antd";
import PageList from "@/components/pageList";
import styles from "@/components/marketing/freebie/listTable/index.css";
import { View } from "@/components/flexView";
import router from "umi/router";
import moment from "moment";

@connect(({ coupon, loading }) => ({
    couponList: coupon.list.result,
    couponListLoading: loading.effects["coupon/list"]
}))
export default class Freebie extends Component {
    static defaultProps = {
        couponListLoading: true,
        couponList: {
            list: [],
            total_number: 0
        }
    };
    search = new PageList({
        router: "/marketing/freebie",
        rows: 10,
        param: {
            keywords: null,
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
        } = this.search.getParam();
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
                        onConfirm={() => console.log('confirm')}
                        onCancel={() => console.log('cancel')}
                    >
                        <a>使失效</a>
                    </Popconfirm>
                </View>
            }
        ];
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
                                label: "赠品名称",
                                input: {
                                    field: "keywords",
                                    placeholder: "请输入赠品名称",
                                    initialValue: keywords
                                }
                            }
                        ]}
                    />
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

