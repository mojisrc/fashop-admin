import React, { Component } from "react";
import { Row, Col, Button, Input, Select, DatePicker } from "antd";
import styles from "./index.css";
import { View } from "@/components/flexView";
import { getQueryPath } from "@/utils/index";
import moment from "moment";
import Query from "@/utils/query";
import update from "immutability-helper";

const InputGroup = Input.Group;
const Option = Select.Option;
const { RangePicker } = DatePicker;
export default class OrderManagementHeader extends Component {
    state = {
        queryParams: {
            keywords_type: "goods_name",
            keywords: null,
            create_time: [],
            state_type: "all",
            order_kind: "all"
        }
    };

    componentDidMount() {
        this.initQueryParams()
    }
    initQueryParams(){
        const params = Query.getQuery();
        this.setState({
            queryParams: {
                keywords_type: params["keywords_type"] !== undefined ? params["keywords_type"] : "goods_name",
                keywords: params["keywords"] !== undefined ? params["keywords"] : null,
                create_time: params["create_time"] !== undefined ? params["create_time"] : [],
                state_type: params["state_type"] !== undefined ? params["state_type"] : "all",
                order_kind: params["order_kind"] !== undefined ? params["order_kind"] : "all"
            }
        });
    }

    render() {
        const { queryParams } = this.state;
        const { keywords_type, keywords, create_time, state_type, order_kind } = queryParams;
        let create_time_moment = [];
        if (create_time.length > 0) {
            create_time_moment = [moment(create_time[0]), moment(create_time[1])];
        }
        const state_type_list = [
            {
                name: "全部订单",
                state_type: "all"
            }, {
                name: "待发货",
                state_type: "state_pay"
            }, {
                name: "待付款",
                state_type: "state_new"
            }, {
                name: "已发货",
                state_type: "state_send"
            }
            , {
                name: "已完成",
                state_type: "state_success"
            }, {
                name: "已关闭",
                state_type: "state_cancel"
            }
        ];
        const order_kind_list = [
            {
                name: "全部",
                order_kind: "all"
            }, {
                name: "普通订单",
                order_kind: "ordinary"
            }, {
                name: "拼团",
                order_kind: "group"
            }
        ];
        return (
            <Row style={{
                paddingBottom: "24px",
                marginBottom: "24px",
                borderBottom: "1px dashed #ededed"
            }}
            >
                <Col span={5}>
                    <InputGroup compact>
                        <Select
                            style={{ minWidth: "115px" }}
                            placeholder="搜索条件"
                            value={keywords_type}
                            onChange={(keywords_type) => {
                                this.setState(update(this.state, {
                                    queryParams: { keywords_type: { $set: keywords_type } }
                                }));
                            }}
                        >
                            <Option value="goods_name">商品名称</Option>
                            <Option value="order_no">订单号</Option>
                            <Option value="receiver_name">收货人姓名</Option>
                            <Option value="receiver_phone">收货人电话</Option>
                            <Option value="courier_number">快递单号</Option>
                        </Select>
                        <Input
                            placeholder={`请输入${keywords_type ? this.returnKeywordsType(keywords_type) : ""}`}
                            onChange={(e) => {
                                this.setState(update(this.state, {
                                    queryParams: { keywords: { $set: e.target.value } }
                                }));
                            }}
                            style={{ width: "56%" }}
                            value={keywords}
                        />
                    </InputGroup>
                </Col>
                <Col span={6} className={styles.div1}>
                    <View className={styles.view1}>
                        <p className={styles.p1}>下单时间</p>
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
                <Col span={3} className={styles.div1}>
                    <View className={styles.view1}>
                        <p className={styles.p1}>订单类型</p>
                        <Select
                            placeholder="请选择"
                            style={{ flex: 1 }}
                            value={order_kind}
                            onChange={(order_kind) => {
                                this.setState(update(this.state, {
                                    queryParams: { order_kind: { $set: order_kind } }
                                }));
                            }}
                        >
                            {
                                order_kind_list.map((item, index) =>
                                    <Option
                                        value={item.order_kind}
                                        key={index}
                                    >
                                        {item.name}
                                    </Option>
                                )
                            }
                        </Select>
                    </View>
                </Col>
                <Col span={3} className={styles.div1}>
                    <View className={styles.view1}>
                        <p className={styles.p1}>订单状态</p>
                        <Select
                            placeholder="请选择"
                            style={{ flex: 1 }}
                            value={state_type}
                            onChange={(state_type) => {
                                this.setState(update(this.state, {
                                    queryParams: { state_type: { $set: state_type } }
                                }));
                            }}
                        >
                            {
                                state_type_list.map((item, index) =>
                                    <Option
                                        value={item.state_type}
                                        key={index}
                                    >
                                        {item.name}
                                    </Option>
                                )
                            }
                        </Select>
                    </View>
                </Col>

                <Col span={4} className={styles.div1}>
                    <View
                        style={{
                            flexDirection: "row"
                        }}
                    >
                        <Button
                            type="primary"
                            onClick={() => {
                                const path = getQueryPath("/order/list", {
                                    page: 1,
                                    rows: 10,
                                    keywords_type,
                                    keywords,
                                    create_time,
                                    state_type,
                                    order_kind
                                });
                                router.push(path);

                            }}
                            style={{ marginRight: 14 }}
                        >
                            筛选
                        </Button>
                        <Button
                            onClick={() => {
                                const path = getQueryPath("/order/list");
                                router.push(path);
                            }}
                        >
                            清空筛选
                        </Button>
                    </View>
                </Col>
            </Row>
        );
    }

    returnKeywordsType(serachValue) {
        switch (serachValue) {
            case "goods_name":
                return "商品名称";
            case "order_no":
                return "订单号";
            case "receiver_name":
                return "收货人姓名";
            case "receiver_phone":
                return "收货人电话";
            case "courier_number":
                return "快递单号";
            default:
                return "";
        }
    }
}
