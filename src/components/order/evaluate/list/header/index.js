import React, { Component } from "react";
import { Row, Col, Button, Input, Select, DatePicker } from "antd";
import styles from "./index.css";
import { View } from "@/components/flexView";
import Query from "@/utils/query";
import moment from "moment";
import update from "immutability-helper";
import { getQueryPath } from "@/utils/index";
import router from "umi/router";

const InputGroup = Input.Group;
const Option = Select.Option;
const { RangePicker } = DatePicker;

export default class EvaluateListHeader extends Component {
    state = {
        reply_content: "",
        queryParams: {
            keywords_type: "goods_name",
            keywords: null,
            create_time: [],
            type: "all"
        }
    };

    componentDidMount() {
        const params = Query.getQuery();
        this.setState({
            queryParams: {
                keywords_type: params["keywords_type"] !== undefined ? params["keywords_type"] : "goods_name",
                keywords: params["keywords"] !== undefined ? params["keywords"] : null,
                create_time: params["create_time"] !== undefined ? params["create_time"] : [],
                type: params["type"] !== undefined ? params["type"] : "all"
            }
        });
    }

    render() {
        const type_list = [
            {
                name: "全部评价",
                type: "all"
            }, {
                name: "好评",
                type: "positive"
            }, {
                name: "中评",
                type: "moderate"
            }, {
                name: "差评",
                type: "negative"
            }
        ];
        const { queryParams } = this.state;
        const { keywords_type, keywords, create_time, type } = queryParams;
        let create_time_moment = [];
        if (create_time.length > 0) {
            create_time_moment = [moment(create_time[0]), moment(create_time[1])];
        }
        return (
            <Row
                style={{
                    paddingBottom: "24px",
                    marginBottom: "24px",
                    borderBottom: "1px dashed #ededed"
                }}
            >
                <Col span={6}>
                    <InputGroup compact>
                        <Select
                            style={{ minWidth: "40%" }}
                            placeholder="搜索条件"
                            value={keywords_type}
                            onChange={(keywords_type) => {
                                this.setState(update(this.state, {
                                    queryParams: { keywords_type: { $set: keywords_type } }
                                }));
                            }}
                        >
                            <Option value="goods_name">商品名称</Option>
                            <Option value="user_nicknname">用户昵称</Option>
                            <Option value="usesearchValuer_phone">用户手机号</Option>
                        </Select>
                        <Input
                            placeholder={`请输入${keywords_type ? this.returnSearchValue(keywords_type) : ""}`}
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
                <Col span={4} className={styles.div1}>
                    <View className={styles.view1}>
                        <p className={styles.p1}>评价类型</p>
                        <Select
                            placeholder="请选择"
                            style={{ flex: 1 }}
                            value={type}
                            onChange={(type) => {
                                this.setState(update(this.state, {
                                    queryParams: { type: { $set: type } }
                                }));
                            }}
                        >
                            {
                                type_list.map((item, index) =>
                                    <Option
                                        value={item.type}
                                        key={index}
                                    >
                                        {item.name}
                                    </Option>
                                )
                            }
                        </Select>
                    </View>
                </Col>
                <Col span={6} className={styles.div1}>
                    <View
                        style={{
                            flexDirection: "row"
                        }}
                    >
                        <Button
                            type="primary"
                            onClick={() => {
                                const path = getQueryPath("/order/evaluate", {
                                    page: 1,
                                    rows: 10,
                                    keywords_type,
                                    keywords,
                                    create_time,
                                    type
                                });
                                router.push(path);
                            }}
                            style={{ marginRight: 14 }}
                        >
                            筛选
                        </Button>
                        <Button
                            onClick={() => {
                                const path = getQueryPath("/order/evaluate");
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

    returnSearchValue(serachValue) {
        switch (serachValue) {
            case "goods_name":
                return "商品名称";
            case "user_nicknname":
                return "用户昵称";
            case "user_phone":
                return "用户手机号";
            default:
                return "";
        }
    }
}
