import { Form } from '@ant-design/compatible';
import React, { Component } from "react";
import { Button,  Card, message } from "antd";
import { connect } from "umi";
import HeaderEditor from "@/components/page/editor";
import FooterEditor from "@/components/page/editor";
import { toolListData } from "./components/toolData";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";

const FormItem = Form.Item;

@Form.create()
@connect(({ loading }) => ({
    goodsBodyLoading: loading.effects["goods/bodyInfo"]
}))
export default class GoodsBody extends Component {
    static defaultProps = {
        goodsBodyLoading: false
    };

    componentDidMount() {
        this.initInfo();
    }

    initInfo() {
        const { dispatch } = this.props;
        const { setFieldsValue } = this.props.form;
        dispatch({
            type: "goods/bodyInfo",
            callback: (response) => {
                if (response.code === 0) {
                    const values = response.result.info;
                    console.warn(values)
                    let payload = {
                        header: values.header,
                        footer: values.footer
                    };
                    setFieldsValue(payload);
                } else {
                    message.warning("获取信息失败");
                }
            }
        });
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { dispatch } = this.props;
                let payload = {
                    header: values.header,
                    footer: values.footer
                };

                dispatch({
                    type: "goods/bodySet",
                    payload,
                    callback: (response) => {
                        if (response.code === 0) {
                            message.success("保存成功");
                        } else {
                            message.error(response.msg);
                        }
                    }
                });
            }
        });
    };

    render() {
        const { goodsBodyLoading, form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true} policy={"goods/bodySet"}>
                <Card bordered={false}>
                    <Form onSubmit={this.handleSubmit} >
                        <FormItem {...formItemLayout} label='公共头部'>
                            {getFieldDecorator("header", {
                                initialValue: [],
                                rules: [{
                                    required: true,
                                    message: "请装修详情"
                                }]
                            })(
                                <HeaderEditor
                                    title={"头部装修"}
                                    toolListData={toolListData}
                                />
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout} label='公共尾部'>
                            {getFieldDecorator("footer", {
                                initialValue: [],
                                rules: [{
                                    required: true,
                                    message: "请装修详情"
                                }]
                            })(
                                <FooterEditor
                                    title={"尾部装修"}
                                    toolListData={toolListData}
                                />
                            )}
                        </FormItem>
                        <FormItem
                            {...tailFormItemLayout}
                        >
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={goodsBodyLoading}
                            >
                                保存
                            </Button>
                        </FormItem>
                    </Form>
                </Card>
            </PageHeaderWrapper>
        );
    }
}
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
    }
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0
        },
        sm: {
            span: 16,
            offset: 4
        }
    }
};
