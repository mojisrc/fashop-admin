import React, { Component } from "react";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import { Card, Form, Button, message } from "antd";
import router from "umi/router";
import {
    Basic,
    Goods,
} from "@/components/marketing/group"
import moment from "moment";
import { connect } from "dva";

const FormItem = Form.Item;

@Form.create()
@connect(({ goods, loading }) => ({
    skuList: goods.skuList.result,
    skuListLoading: loading.effects["goods/skuList"]
}))
export default class GroupAdd extends Component {
    state={
        step: 1
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const { dispatch } = this.props;
                const {
                    title,
                    time_over_day,
                    time_over_hour,
                    time_over_minute,
                    time,
                    limit_buy_num,
                    limit_group_num,
                    limit_goods_num,
                } = values;
                const group_goods = values.group_goods.map((item,index)=>{
                    return {
                        goods_id: item.goods_id,
                        goods_sku_id: item.id,
                        group_price: item.group_price,
                        captain_price: item.captain_price,
                    }
                })
                const params = {
                    title,
                    time_over_day,
                    time_over_hour,
                    time_over_minute,
                    start_time: moment(time[0]).format('YYYY-MM-DD HH:mm:ss'),
                    end_time: moment(time[1]).format('YYYY-MM-DD HH:mm:ss'),
                    limit_buy_num,
                    limit_group_num,
                    limit_goods_num,
                    group_goods,
                };
                dispatch({
                    type: "group/add",
                    payload: params,
                    callback: (e) => {
                        if (e.code === 0) {
                            message.success("添加成功");
                            router.goBack();
                        } else {
                            message.warn(e.msg);
                        }
                    }
                });
            }
        });
    }
    getGoodsSku = () => {
        const { dispatch, form } = this.props;
        if (form.getFieldValue('goods_info') && form.getFieldValue('goods_info').id) {
            dispatch({
                type: "goods/skuList",
                payload: {
                    page: 1,
                    rows: 100,
                    goods_id: form.getFieldValue('goods_info').id
                },
                callback: (res) => {
                    form.setFieldsValue({
                        group_goods: res.result.list.map((item => {
                            item.group_price = null
                            item.captain_price = null
                            return item
                        }))
                    })
                }
            });
        }
    };
    render() {
        const { form } = this.props;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 3 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 3,
                },
            },
        };
        return <PageHeaderWrapper hiddenBreadcrumb={true}>
            <Card>
                <Form onSubmit={this.handleSubmit}>
                    <Basic
                        form={form}
                        formItemLayout={formItemLayout}
                    />
                    <Goods
                        form={form}
                        formItemLayout={formItemLayout}
                        getGoodsSku={this.getGoodsSku}
                    />
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">保 存</Button>
                    </FormItem>
                </Form>
            </Card>
        </PageHeaderWrapper>
    }
}
