import React, { Component } from "react";
import {  Select, Form } from "antd";
import { getQueryPath } from "@/utils/index";
import moment from "moment";
import Query from "@/utils/query";
import update from "immutability-helper";
import { initialValue } from "@/utils/form";
import router from "umi/router";
import FormSearch from "@/components/public/formSearch";

const Option = Select.Option;

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
    submit = ()=>{

    }
    render() {
        // 待完成 TODO
        const { getFieldDecorator } = this.props.form;
        const { queryParams } = this.state;
        const { keywords_type, keywords, create_time, state_type, order_kind } = queryParams;
        let create_time_moment = [];
        if (create_time.length > 0) {
            create_time_moment = [moment(create_time[0]), moment(create_time[1])];
        }
        return (
           <FormSearch
               onSubmit={(values)=>{
                   console.log(values)
               }}
               items={[
               {
                   type: "select_input",
                   options: {
                       label: null,
                       select: {
                           field: 'keywords_type',
                           style: { minWidth: 115 },
                           placeholder: null,
                           onChange: (value) => {
                           },
                           initialValue: null,
                           data: keywords_type_list
                       },
                       input: {
                           field: 'keywords',
                           placeholder: '请输入关键词',
                           onChange: (value) => {
                           },
                           initialValue: null
                       }
                   }
               },
               {
                   type: "range_picker",
                   options: {
                       label: "下单时间",
                       rangePicker: {
                           field: 'create_time',
                           style: null,
                           placeholder: null,
                           onChange: (value) => {
                           },
                           allowClear: true,
                           initialValue: null
                       }
                   }
               },
               {
                   type: "select",
                   options: {
                       label: "订单类型",
                       select: {
                           field: 'order_kind',
                           style: {width:100},
                           placeholder: '全部类型',
                           onChange: (value) => {
                           },
                           allowClear: true,
                           initialValue: null,
                           data: order_kind_list
                       }
                   }
               },
               {
                   type: "select",
                   options: {
                       label: "订单状态",
                       select: {
                           field: 'state_type',
                           style: {width:100},
                           placeholder: '全部状态',
                           onChange: (value) => {
                           },
                           allowClear: true,
                           initialValue: null,
                           data: state_type_list
                       }
                   }
               },
               {
                   type: "submit",
                   options: {
                       button:{}
                   }
               },
               {
                   type: "reset",
                   options: {
                       button: {
                           onChange: (value) => {
                           }
                       }
                   }
               }
           ]} />
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
]
