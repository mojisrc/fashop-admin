import React, { Component } from "react";
import {  Button, Input, Select,  Form } from "antd";
import { View } from "react-web-dom";
import { getQueryPath } from "@/utils"
import moment from "moment";
import Query from "@/utils/query";
import update from 'immutability-helper'

const Option = Select.Option;
const FormItem = Form.Item;

export default class ListHeader extends Component {

    state = {
        queryParams: {
            keywords_type: 'goods_name',
            keywords: null,
            create_time: [],
            state_type: 'all',
            order_kind: 'all'
        }
    }

    componentDidMount() {
        const params = Query.getQuery()
        this.setState({
            queryParams: {
                keywords_type: params['keywords_type'] !== undefined ? params['keywords_type'] : 'goods_name',
                keywords: params['keywords'] !== undefined ? params['keywords'] : null,
                create_time: params['create_time'] !== undefined ? params['create_time'] : [],
                state_type: params['state_type'] !== undefined ? params['state_type'] : 'all',
                order_kind: params['order_kind'] !== undefined ? params['order_kind'] : 'all',
            }
        })
    }

    render() {
        const { queryParams } = this.state
        const { keywords_type, keywords, create_time, state_type, order_kind } = queryParams
        let create_time_moment = []
        if (create_time.length > 0) {
            create_time_moment = [moment(create_time[0]), moment(create_time[1])]
        }
        const state_type_list = [
            {
                name: '全部订单',
                state_type: 'all'
            }, {
                name: '待发货',
                state_type: 'state_pay'
            }, {
                name: '待付款',
                state_type: 'state_new'
            }, {
                name: '已发货',
                state_type: 'state_send'
            }
            , {
                name: '已完成',
                state_type: 'state_success'
            }, {
                name: '已关闭',
                state_type: 'state_cancel'
            }
        ]
        const order_kind_list = [
            {
                name: '全部',
                order_kind: 'all'
            }, {
                name: '普通订单',
                order_kind: 'ordinary'
            }, {
                name: '拼团',
                order_kind: 'group'
            }
        ]
        return (
            <Form
                layout="inline"
                className="ant-advanced-search-form"
            >
                <FormItem label={`名称`}>
                    <Input
                        placeholder={`请输入活动名称`}
                        onChange={(e) => {
                            this.setState(update(this.state, {
                                queryParams: { keywords: { $set: e.target.value } }
                            }))
                        }}
                        value={keywords}
                    />
                </FormItem>
                <FormItem label={`订单状态`}>
                    <Select
                        placeholder="请选择"
                        style={{ width: 100 }}
                        value={order_kind}
                        onChange={(order_kind) => {
                            this.setState(update(this.state, {
                                queryParams: { order_kind: { $set: order_kind } }
                            }))
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
                </FormItem>
                <FormItem>
                    <Button
                        type="primary"
                        onClick={() => {
                            const path = getQueryPath('/order/list', {
                                page: 1,
                                rows: 10,
                                keywords_type,
                                keywords,
                                create_time,
                                state_type,
                                order_kind,
                            })
                            this.props.history.push(path)
                        }}
                        style={{ marginRight: 14 }}
                    >
                        筛选
                    </Button>
                    <Button
                        onClick={() => {
                            const path = getQueryPath('/order/list')
                            this.props.history.push(path)
                        }}
                    >
                        清空筛选
                    </Button>
                </FormItem>
            </Form>
        );
    }

    returnKeywordsType(serachValue: string) {
        switch (serachValue) {
            case 'goods_name':
                return '商品名称'
            case 'order_no':
                return '订单号'
            case 'receiver_name':
                return '收货人姓名'
            case 'receiver_phone':
                return '收货人电话'
            case 'courier_number':
                return '快递单号'
            default:
                return ''
        }
    }
}
