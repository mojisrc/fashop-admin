import React, { Component } from "react";
import { connect } from "dva";
import { Card } from "antd";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import { Form, Input, Button, message } from "antd";

const FormItem = Form.Item;

@Form.create()
@connect(({ payment, loading }) => ({
    selfPasswordLoading: loading.effects["member/selfPassword"]
}))
class Payment extends Component {
    static defaultProps = {
        selfPasswordLoading: false
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const { oldpassword, password } = values;
                const { dispatch } = this.props;
                dispatch({
                    type: "member/selfPassword",
                    payload: {
                        oldpassword,
                        password
                    },
                    callback: (response) => {
                        if (response.code === 0) {
                            message.success("修改成功");
                        } else {
                            message.warn(response.msg);
                        }
                    }
                });
            }
        });
    };

    render() {
        const { form, selfPasswordLoading } = this.props;
        const { getFieldDecorator } = form;
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true}>
                <Card bordered={false} title="修改个人密码">
                    <Form
                        onSubmit={this.handleSubmit}
                    >
                        <FormItem
                            {...formItemLayout}
                            label="当前密码"
                        >
                            {getFieldDecorator("oldpassword", {
                                rules: [
                                    {
                                        required: true,
                                        message: "请输入"
                                    }
                                ]
                            })(<Input placeholder="请输入" type="password" />)}
                        </FormItem>
                        <FormItem {...formItemLayout} label="新密码" extra='当前密码和新密码不能相同'>
                            {getFieldDecorator("password", {
                                rules: [
                                    {
                                        required: true,
                                        message: "请输入"
                                    }
                                ]
                            })(<Input placeholder="请输入" />)}
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" loading={selfPasswordLoading}>
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
        sm: { span: 2 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 }
    }
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0
        },
        sm: {
            span: 10,
            offset: 2
        }
    }
};
export default Payment;
