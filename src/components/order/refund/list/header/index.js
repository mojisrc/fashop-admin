import React, { Component } from "react";
import { Row, Col, Button, Input, Select, DatePicker } from "antd";
import styles from "./index.css";
import { View } from "@/components/flexView";
import Query from "@/utils/query";
import moment from "moment";
import update from "immutability-helper";
import { getQueryPath } from "@/utils/index";
import router from "umi/router";

const { Fragment } = React;
const InputGroup = Input.Group;
const { RangePicker } = DatePicker;
const Option = Select.Option;
export default class RefundHeader extends Component {
    state = {
        queryParams: {
            keywords_type: "goods_name",
            keywords: null,
            create_time: [],
            refund_type: "all",
            refund_state: "all",
            order_type: "all"
        }
    };

    componentDidMount() {
        const params = Query.getQuery();
        this.setState({
            queryParams: {
                keywords_type: params["keywords_type"] !== undefined ? params["keywords_type"] : "goods_name",
                keywords: params["keywords"] !== undefined ? params["keywords"] : null,
                create_time: params["create_time"] !== undefined ? params["create_time"] : [],
                refund_type: params["refund_type"] !== undefined ? params["refund_type"] : "all",
                refund_state: params["refund_state"] !== undefined ? params["refund_state"] : "all",
                order_type: params["order_type"] !== undefined ? params["order_type"] : "all"
            }
        });
    }

    render() {
        const { queryParams } = this.state;
        const { keywords_type, keywords, create_time, refund_type, refund_state, order_type } = queryParams;
        let create_time_moment = [];
        if (create_time.length > 0) {
            create_time_moment = [moment(create_time[0]), moment(create_time[1])];
        }
        return (
            <Fragment>
                <Row
                    gutter={16}
                    style={{
                        paddingBottom: "24px"
                    }}
                >
                    <Col span={6}>
                        <InputGroup compact>
                            <Select
                                style={{ minWidth: "36%" }}
                                placeholder="搜索条件"
                                value={keywords_type}
                                onChange={(keywords_type) => {
                                    this.setState(update(this.state, {
                                        queryParams: { keywords_type: { $set: keywords_type } }
                                    }));
                                }}
                            >
                                <Option value="all">全部</Option>
                                <Option value="goods_name">商品名称</Option>
                                <Option value="order_no">订单号</Option>
                                <Option value="receiver_name">退款编号</Option>
                                <Option value="receiver_phone">收货人</Option>
                                <Option value="courier_number">联系方式</Option>
                            </Select>
                            <Input
                                placeholder={`请输入${keywords ? this.returnSearchValue(keywords_type) : ""}`}
                                value={keywords}
                                onChange={(e) => {
                                    this.setState(update(this.state, {
                                        queryParams: { keywords: { $set: e.target.value } }
                                    }));
                                }}
                                style={{ width: "56%" }}
                            />
                        </InputGroup>
                    </Col>
                    <Col span={4}>
                        <View className={styles.view1}>
                            <p className={styles.p1}>退款类型</p>
                            <Select
                                placeholder="请选择"
                                style={{ flex: 1 }}
                                value={refund_type}
                                onChange={(refund_type) => {
                                    this.setState(update(this.state, {
                                        queryParams: { refund_type: { $set: refund_type } }
                                    }));
                                }}
                            >
                                <Option value="all">全部</Option>
                                <Option value="1">仅退款</Option>
                                <Option value="2">退货退款</Option>
                            </Select>
                        </View>
                    </Col>
                    <Col span={5}>
                        <View className={styles.view1}>
                            <p className={styles.p1}>退款状态</p>
                            <Select
                                placeholder="请选择"
                                style={{ flex: 1 }}
                                value={refund_state}
                                onChange={(refund_state) => {
                                    this.setState(update(this.state, {
                                        queryParams: { refund_state: { $set: refund_state } }
                                    }));
                                }}
                            >
                                <Option value="all">全部</Option>
                                <Option value="1">申请退款，等待商家确认</Option>
                                <Option value="2">同意申请，等待买家退货</Option>
                                <Option value="3">买家已发货，等待收货</Option>
                                <Option value="4">已收货，确认退款</Option>
                                <Option value="5">退款成功</Option>
                                <Option value="6">退款关闭</Option>
                            </Select>
                        </View>
                    </Col>
                </Row>
                <Row
                    gutter={16}
                    style={{
                        paddingBottom: "24px",
                        marginBottom: "24px",
                        borderBottom: "1px dashed #ededed"
                    }}
                >
                    <Col span={6} className={styles.div1}>
                        <View className={styles.view1}>
                            <p className={styles.p1}>申请时间</p>
                            <RangePicker
                                style={{ flex: 1 }}
                                onChange={(dates, create_time) => {
                                    this.setState(update(this.state, {
                                        queryParams: { create_time: { $set: create_time } }
                                    }));
                                }}
                                value={create_time_moment}
                            />
                        </View>
                    </Col>

                    <Col span={4}>
                        <View className={styles.view1}>
                            <p className={styles.p1}>排序</p>
                            <Select
                                placeholder="请选择"
                                style={{ flex: 1 }}
                                value={order_type}
                                onChange={(order_type) => {
                                    this.setState(update(this.state, {
                                        queryParams: { order_type: { $set: order_type } }
                                    }));
                                }}
                            >
                                <Option value="all">默认</Option>
                                <Option value="1">申请时间早到晚</Option>
                                <Option value="2">申请时间晚到早</Option>
                            </Select>
                        </View>
                    </Col>
                    <Col span={4}>
                        <View
                            style={{
                                flexDirection: "row"
                            }}
                        >
                            <Button
                                type="primary"
                                onClick={() => {
                                    const path = getQueryPath("/order/refund", {
                                        page: 1,
                                        rows: 10,
                                        keywords_type,
                                        keywords,
                                        create_time,
                                        refund_type,
                                        refund_state,
                                        order_type
                                    });
                                    router.push(path);
                                }}
                                style={{ marginRight: 10 }}
                            >
                                筛选
                            </Button>
                            <Button
                                onClick={() => {
                                    const path = getQueryPath("/order/refund");
                                    router.push(path);
                                }}
                            >
                                清空筛选
                            </Button>
                        </View>
                    </Col>
                </Row>
            </Fragment>
        );
    }

    returnSearchValue(serachValue) {
        switch (serachValue) {
            case "goods_name":
                return "商品名称";
            case "order_no":
                return "订单号";
            case "receiver_name":
                return "退款编号";
            case "receiver_phone":
                return "收货人";
            case "courier_number":
                return "联系方式";
            default:
                return "";
        }
    }
}
