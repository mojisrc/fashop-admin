import React, { Component } from "react";
import { Button, Input, Select, DatePicker, Form } from "antd";
import { getQueryPath } from "@/utils/index";
import moment from "moment";
import Query from "@/utils/query";
import update from "immutability-helper";
import { initialValue } from "@/utils/form";
import router from "umi/router";

const Option = Select.Option;
const { RangePicker } = DatePicker;
const FormItem = Form.Item;

@Form.create()
export default class OrderManagementHeader extends Component {
    state = {
        queryParams: {
            keywords_type: "goods_name",
            keywords: null,
            create_time: [],
            state_type: null,
            order_kind: null
        }
    };

    componentDidMount() {
        this.initQueryParams();
    }

    initQueryParams() {
        const params = Query.getQuery();
        this.setState({
            queryParams: {
                keywords_type: params["keywords_type"] !== undefined ? params["keywords_type"] : "goods_name",
                keywords: params["keywords"] !== undefined ? params["keywords"] : null,
                create_time: params["create_time"] !== undefined ? params["create_time"] : [],
                state_type: params["state_type"] !== undefined ? params["state_type"] : null,
                order_kind: params["order_kind"] !== undefined ? params["order_kind"] : null
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { queryParams } = this.state;
        const { keywords_type, keywords, create_time, state_type, order_kind } = queryParams;
        let create_time_moment = [];
        if (create_time.length > 0) {
            create_time_moment = [moment(create_time[0]), moment(create_time[1])];
        }
        const prefixSelector = getFieldDecorator(`state_type`, {
            ...initialValue(keywords_type)
        })(<Select
            style={{ minWidth: "115px" }}
            placeholder="搜索条件"
            onChange={(keywords_type) => {
                this.setState(update(this.state, {
                    queryParams: { keywords_type: { $set: keywords_type } }
                }));
            }}
        >
            {keywords_type_list.map((item,index)=>{
                return <Option value={item.value} key={index}>{item.name}</Option>
            })}
        </Select>);
        return (
            <Form layout="inline" className="ant-advanced-search-form">
                <FormItem>
                    {getFieldDecorator(`keywords`, {
                        ...initialValue(keywords)
                    })(<Input addonBefore={prefixSelector}
                              placeholder={`请输入关键词`}
                              onChange={(e) => {
                                  this.setState(update(this.state, {
                                      queryParams: { keywords: { $set: e.target.value } }
                                  }));
                              }}
                    />)}
                </FormItem>

                <FormItem label={`下单时间`}>
                    {getFieldDecorator(`create_time`, {
                        ...initialValue(create_time_moment)
                    })(
                        <RangePicker
                            allowClear={true}
                            onChange={(dates, create_time) => {
                                this.setState(update(this.state, {
                                    queryParams: { create_time: { $set: create_time } }
                                }));
                            }}
                        />
                    )}
                </FormItem>

                <FormItem label={`订单类型`}>
                    {getFieldDecorator(`order_kind`, {
                        ...initialValue(order_kind)
                    })(
                        <Select
                            placeholder="全部类型"
                            allowClear={true}
                            style={{ width: 100 }}
                            onChange={(order_kind) => {
                                this.setState(update(this.state, {
                                    queryParams: { order_kind: { $set: order_kind } }
                                }));
                            }}
                        >
                            {
                                order_kind_list.map((item, index) =>
                                    <Option
                                        value={item.value}
                                        key={index}
                                    >
                                        {item.name}
                                    </Option>
                                )
                            }
                        </Select>
                    )}
                </FormItem>

                <FormItem label={`订单状态`}>
                    {getFieldDecorator(`state_type`, {
                        ...initialValue(state_type)
                    })(
                        <Select
                            placeholder="全部状态"
                            allowClear={true}
                            style={{ width: 100 }}
                            onChange={(state_type) => {
                                this.setState(update(this.state, {
                                    queryParams: { state_type: { $set: state_type } }
                                }));
                            }}
                        >
                            {
                                state_type_list.map((item, index) =>
                                    <Option
                                        value={item.value}
                                        key={index}
                                    >
                                        {item.name}
                                    </Option>
                                )
                            }
                        </Select>
                    )}
                </FormItem>
                <FormItem>
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
                </FormItem>
            </Form>
        );
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
    }
    , {
        name: "已完成",
        value: "state_success"
    }, {
        name: "已关闭",
        value: "state_cancel"
    }
];
const order_kind_list = [
    {
        name: "普通订单",
        value: "ordinary"
    }, {
        name: "拼团",
        value: "group"
    }
];

const keywords_type_list = [
    {
        name: "商品名称",
        value: "goods_name"
    },
    {
        name: "订单号",
        value: "goods_name"
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
]
