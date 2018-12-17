import React, { Component } from "react";
import { Button, Input, Select, Form } from "antd";
import Query from "@/utils/query";
import { getQueryPath } from "@/utils/index";

const Option = Select.Option;
const FormItem = Form.Item;
const status_list = [
    {
        id: "all",
        title: "全部"
    }, {
        id: "1",
        title: "未开始"
    }, {
        id: "2",
        title: "进行中"
    }, {
        id: "3",
        title: "已结束"
    }
];
const type_list = [
    {
        id: "all",
        title: "全部"
    },
    {
        id: "1",
        title: "满减券"
    }, {
        id: "2",
        title: "折扣券"
    }, {
        id: "3",
        title: "随机金额券"
    }
];

@Form.create()
export default class CouponListHeader extends Component {
    state = {
        queryParams: {
            sale_state: "all",
            title: null,
            order_type: "all"
        }
    };
    componentDidMount() {
        const params = Query.getQuery();
        this.setState({
            queryParams: {
                sale_state: params["sale_state"] !== undefined ? params["sale_state"] : "all",
                title: params["title"] !== undefined ? params["title"] : null,
                order_type: params["order_type"] !== undefined ? params["order_type"] : "all"
            }
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            const path = getQueryPath("/goods/list", {
                page: 1,
                rows: 10,
                sale_state: values.sale_state,
                title: values.title,
                order_type: values.order_type
            });
            router.push(path);
        });
    };

    render() {
        const { form, loading } = this.props;
        const { getFieldDecorator } = form;
        const { sale_state, title, order_type } = this.state.queryParams;
        return (
            <Form
                layout="inline"
                style={{
                    paddingBottom: "24px",
                    marginBottom: "24px",
                    borderBottom: "1px dashed #ededed"
                }}
                onSubmit={this.handleSubmit}
            >
                <FormItem label="优惠券名称">
                    {getFieldDecorator("title", { initialValue: title })(
                        <Input
                            placeholder='请输入优惠券名称'
                        />
                    )}
                </FormItem>
                <FormItem
                    label="优惠券状态"
                >
                    {getFieldDecorator("sale_state", {
                        initialValue: sale_state
                    })(
                        <Select
                            placeholder="请选择"
                            style={{ width: 200 }}
                        >
                            {
                                status_list.map((e, i) => (
                                    <Option value={e.id} key={i}>{e.title}</Option>
                                ))
                            }
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    label="优惠券类型"
                >
                    {getFieldDecorator("order_type", { initialValue: order_type })(
                        <Select
                            placeholder="请选择"
                            style={{ width: 200 }}
                        >
                            {
                                type_list.map((e, i) => (
                                    <Option value={e.id} key={i}>{e.title}</Option>
                                ))
                            }
                        </Select>
                    )}
                </FormItem>
                <FormItem>
                    <Button
                        type="primary"
                        style={{ marginRight: 15 }}
                        htmlType="submit"
                        loading={loading}
                    >
                        筛选
                    </Button>
                    <Button
                        onClick={() => {
                            router.push("/goods/list");
                        }}
                    >
                        清空筛选
                    </Button>
                </FormItem>
            </Form>
        );
    }
}
