import React, { Component } from "react";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import { Card, Form, Button, message } from "antd";
import router from "umi/router";
import {
    Basic,
    Goods,
} from "@/components/marketing/discount"
import moment from "moment";
import { connect } from "dva";

const FormItem = Form.Item;

@Form.create()
@connect()
export default class DiscountAdd extends Component {
    state={
        step: 1
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                const { dispatch } = this.props;
                const {
                    title,
                    start_time,
                    end_time,
                    limit_goods_num,
                    // discount_goods,
                } = values;
                const params = {
                    title,
                    start_time: moment(start_time).format('YYYY-MM-DD HH:mm:ss'),
                    end_time: moment(end_time).format('YYYY-MM-DD HH:mm:ss'),
                    limit_goods_num,
                    discount_goods: [],
                };
                dispatch({
                    type: "discount/add",
                    payload: params,
                    callback: (e) => {
                        if (e.code === 0) {
                            // message.success("添加成功");
                            // router.goBack();
                        } else {
                            message.warn(e.msg);
                        }
                    }
                });
            }
        });
    }
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
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">选择商品</Button>
                    </FormItem>
                    {/* <Goods
                        form={form}
                        formItemLayout={formItemLayout}
                    /> */}
                    {/* <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">保 存</Button>
                    </FormItem> */}
                </Form>
            </Card>
        </PageHeaderWrapper>
    }
}
