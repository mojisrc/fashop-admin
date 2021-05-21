import { Form } from '@ant-design/compatible';
import React, { Component } from "react";
import { Input, Button,  Switch, Card, message } from "antd";
import { connect } from "umi";
import { history as router } from "umi";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";

const FormItem = Form.Item;
@Form.create()
@connect(({ area, loading }) => ({
    expressAddLoading: loading.effects["express/add"]
}))
export default class Add extends Component {
    static defaultProps = {
        expressAddLoading: false
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { dispatch } = this.props;
                let payload = {
                    company_name: values.company_name,
                    is_commonly_use: values.is_commonly_use ? 1 : 0
                };
                dispatch({
                    type: "express/add",
                    payload,
                    callback: (response) => {
                        if (response.code === 0) {
                            message.success("添加成功");
                            router.goBack();
                        } else {
                            message.error(response.msg);
                        }
                    }
                });
            }
        });
    };

    render() {
        const { expressAddLoading } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true} policy={"express/add"}>
                <Card bordered={false}>
                    <Form onSubmit={this.handleSubmit} style={{ width: 1000 }}>
                        <FormItem
                            labelCol={{ span: 3 }}
                            wrapperCol={{ span: 4 }}
                            label='物流公司名称'
                        >
                            {getFieldDecorator("company_name", {
                                rules: [{ required: true, message: "请输入物流公司名称" }]
                            })(
                                <Input
                                    placeholder="请输入物流公司名称"
                                />
                            )}
                        </FormItem>
                        <FormItem
                            labelCol={{ span: 3 }}
                            wrapperCol={{ span: 6 }}
                            label='设为常用'
                        >
                            {getFieldDecorator("is_commonly_use", {
                                initialValue: false,
                                rules: [{ required: true, message: "请选择是否常用" }]
                            })(
                                <Switch checkedChildren="是" unCheckedChildren="否" />
                            )}
                        </FormItem>
                        <FormItem
                            wrapperCol={{ sm: { offset: 3 } }}
                        >
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={expressAddLoading}
                            >
                                添加
                            </Button>
                        </FormItem>
                    </Form>
                </Card>
            </PageHeaderWrapper>
        );
    }
}
