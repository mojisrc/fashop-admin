import React, { Component } from "react";
import { Button, Input, Select, Form } from "antd";
import { View } from "@/components/flexView";
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
        if (create_time.length > 0) {
            create_time_moment = [moment(create_time[0]), moment(create_time[1])]
        }
        const status_list = [
            {
                name: '全部',
                status: 'all'
            }, {
                name: '未开始',
                status: '1'
            }, {
                name: '已开始生效中',
                status: '2'
            }, {
                name: '已开始未生效',
                status: '3'
            }, {
                name: '已过期生效中',
                status: '4'
            }, {
                name: '已过期未生效',
                status: '5'
            }
        ]
        return (
            <Form
                layout="inline"
                style={{
                    paddingBottom: "24px",
                    marginBottom: "24px",
                    borderBottom: "1px dashed #ededed"
                }}
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
                <FormItem label={`活动状态`}>
                    <Select
                        placeholder="请选择"
                        style={{ width: 130 }}
                        value={order_kind}
                        onChange={(order_kind) => {
                            this.setState(update(this.state, {
                                queryParams: { order_kind: { $set: order_kind } }
                            }))
                        }}
                    >
                        {
                            status_list.map((item, index) =>
                                <Option
                                    value={item.status}
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
                            router.push(path)
                        }}
                        style={{ marginRight: 14 }}
                    >
                        筛选
                    </Button>
                    <Button
                        onClick={() => {
                            const path = getQueryPath('/order/list')
                            router.push(path)
                        }}
                    >
                        清空筛选
                    </Button>
                </FormItem>
            </Form>
        );
    }

    returnKeywordsType(serachValue) {
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
