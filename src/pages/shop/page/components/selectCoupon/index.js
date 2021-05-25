import React, { Component } from "react";
import { View } from "@/components/flexView";
import { Modal, Table, Button } from "antd";
import { connect } from "umi";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import styles from "@/pages/shop/page/components/diy/view/coupon/index.css";

@connect(({ coupon, loading }) => ({
    couponList: coupon.pageCoupons.result,
    couponListLoading: loading.effects["coupon/pageCoupons"]
}), null, null, {
    forwardRef: true
})
export default class SelectCoupon extends Component {
    static propTypes = {
        getState: PropTypes.func.isRequired
    };
    static defaultProps = {
        couponListLoading: false,
        couponList: {
            list: [],
            total_number: 0
        },
        getState: () => {

        }
    };

    constructor(props) {
        super(props);
        this.state = {
            page: 1, rows: 10,
            value: props.value ? props.value : null,
            visible: false
        };
    }

    componentDidMount() {
        const { couponList, couponListLoading } = this.props;
        if (couponList.list.length === 0 && couponListLoading === false) {
            this.initList();
        }
    }

    initList() {
        const { dispatch } = this.props;
        dispatch({
            type: "coupon/pageCoupons",
            payload: {
                page: this.state.page,
                rows: this.state.rows
            }
        });
    }

    show() {
        this.setState({
            visible: true
        }, () => {
            this.initList();
        });
    }

    close() {
        this.setState({
            visible: false
        });
    }

    render() {
        const { couponList, couponListLoading } = this.props;
        const { visible } = this.state;
        if (couponList) {
            const columns = [{
                title: "优惠券名称",
                dataIndex: "title",
                key: (record) => `title${record.id}`,
                render: (text, record) => {
                    return <div className={styles.item}>
                        <div>
                            <div>
                                <span>{record.coupon_type === 1 ? record["coupon_type1"].reduce_amount : record["coupon_type2"].discount}</span>
                                {record.threshold_choice === 1 ? <em>无门槛</em> :
                                  <em>满¥{record.threshold_order_amount}{record.coupon_type === 1 ? "减" : "折"}</em>}
                            </div>
                            <div>
                                <h3>{record.title}</h3>
                                <em>{dayjs(record.valid_start_time * 1000).format("YYYY.MM.DD")} - {dayjs(record.valid_end_time, "X").format("YYYY.MM.DD")}</em>
                                <i>{record.goods_choice === 1 ? "全店商品可用" : "部分商品可用"}</i>
                            </div>
                        </div>
                    </div>;
                }
            }, {
                title: "创建时间",
                dataIndex: "create_time",
                render: text => text ? dayjs(text * 1000).format("YYYY-MM-DD HH:mm") : "-"
            }, {
                title: "",
                render: (text, record) => <Button onClick={() => {
                    this.setState({
                        value: record
                    }, () => {
                        this.props.getState(this.state);
                    });
                }}>选择</Button>
            }];
            return (
              <Modal
                title="选择优惠券"
                visible={visible}
                onCancel={() => {
                    this.close();
                }}
                style={{ top: 20 }}
                width={756}
                footer={null}
              >
                  <View>
                      <Table
                        loading={couponListLoading}
                        dataSource={couponList.list}
                        columns={columns}
                        rowKey={record => record.id}
                        pagination={{
                            showSizeChanger: false,
                            showTotal: (total, range) => `共 ${total} 条`,
                            pageSize: this.state.rows,
                            total: couponList.total_number,
                            current: this.state.page
                        }}
                        onChange={({ current, pageSize }) => {
                            this.setState({
                                page: current, rows: pageSize
                            }, () => {
                                this.initList();
                            });
                        }}
                      />
                  </View>
              </Modal>
            );
        } else {
            return null;
        }
    }

    init() {
        this.setState({ value: null, page: 1, rows: 10 });
    }
}
