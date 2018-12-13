import React, { Component } from "react";
import { Input, Button, Form, Switch } from 'antd';
import Page from '@/components/public/page'
import { connect } from 'dva';
import { add } from "../../actions/deliver/express";
const FormItem = Form.Item;
@Form.create()
@connect()
export default class ExpressAdd extends Component {
    state = {}

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { dispatch } = this.props
                let params = {
                    company_name: values.company_name,
                    is_commonly_use: values.is_commonly_use ? 1 : 0,
                }
                dispatch(add({ params }))
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Page>
                <Form onSubmit={this.handleSubmit} style={{ width: 1000 }}>
                    <FormItem
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 4 }}
                        label='物流公司名称'
                    >
                        {getFieldDecorator('company_name', {
                            rules: [{ required: true, message: '请输入物流公司名称' }],
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
                        {getFieldDecorator('is_commonly_use', {
                            initialValue: false,
                            rules: [{ required: true, message: '请选择是否常用' }],
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
                        >
                            添加
                        </Button>
                    </FormItem>
                </Form>
            </Page>
        )
    }
}
