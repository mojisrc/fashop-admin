import React, { Component } from "react";
import { Input, Button, Form, Switch,Card } from 'antd';
import PageHeaderWrapper from '@/components/pageHeaderWrapper';
import { connect } from 'dva';
import { publicFunction } from "@/utils/index";
const {
    parseQuery
} = publicFunction
const FormItem = Form.Item;
@Form.create()
@connect()
export default class Edit extends Component {
    state = {
        areaList: [],
        info: {
            id: 0,
            company_name: '',
            is_commonly_use: 0,
        }
    }

    async componentDidMount() {
        const { location } = this.props
        const { id } = query.getParams()
        const e = await info({ params: { id } })
        if (e.code === 0) {
            const { info } = e.result
            this.setState({ info })
        }

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { dispatch } = this.props
                const { id } = parseQuery(this.props.location.search)
                let params = {
                    id,
                    company_name: values.company_name,
                    is_commonly_use: values.is_commonly_use ? 1 : 0,
                }
                dispatch(edit({ params }))
            }
        });
    }

    render() {
        const { info } = this.state
        const { company_name, is_commonly_use } = info
        console.log(is_commonly_use)
        const { getFieldDecorator } = this.props.form
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true}>
            <Card bordered={false}>
                <Form onSubmit={this.handleSubmit} style={{ width: 1000 }}>
                    <FormItem
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 4 }}
                        label='物流公司名称'
                    >
                        {getFieldDecorator('company_name', {
                            initialValue: company_name,
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
                            initialValue: !!is_commonly_use,
                            valuePropName: 'checked',
                            rules: [{ required: true, message: '请选择是否常用' }],
                        })(
                            <Switch />
                        )}
                    </FormItem>
                    <FormItem
                        wrapperCol={{ sm: { offset: 3 } }}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            保存
                        </Button>
                    </FormItem>
                </Form>
            </Card>
            </PageHeaderWrapper>
        )
    }
}
