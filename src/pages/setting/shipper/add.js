import React, { Component } from "react";
import { Input, Button, Form, Cascader,Card } from 'antd';
import PageHeaderWrapper from '@/components/pageHeaderWrapper';
import { connect } from 'dva';
const FormItem = Form.Item;
@Form.create()
@connect()
export default class Add extends Component {
    state = {
        areaList: []
    }

    async componentDidMount() {
        this.setState({
            areaList: await cascader()
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { dispatch } = this.props
                let params = {
                    name: values.name,
                    contact_number: values.contact_number,
                    area_id: values.areas[2],
                    address: values.address
                }
                dispatch(add({ params }))
            }
        });
    }

    render() {
        const { areaList } = this.state
        const { getFieldDecorator } = this.props.form
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true}>
            <Card bordered={false}>
                <Form onSubmit={this.handleSubmit} style={{ width: 1000 }}>
                    <FormItem
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 4 }}
                        label='联系人'
                    >
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入联系人' }],
                        })(
                            <Input
                                placeholder="请输入联系人"
                            />
                        )}
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 6 }}
                        label='联系方式'
                    >
                        {getFieldDecorator('contact_number', {
                            rules: [{ required: true, message: '请输入联系方式' }],
                        })(
                            <Input
                                placeholder="请输入联系方式"
                            />
                        )}
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 6 }}
                        label="所在地区"
                    >
                        {getFieldDecorator('areas', {
                            rules: [{
                                type: 'array',
                                required: true,
                                message: '请选择所在地区'
                            }],
                        })(
                            <Cascader options={areaList} placeholder='请选择所在地区' />
                        )}
                    </FormItem>
                    <FormItem
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 10 }}
                        label='详细地址'
                    >
                        {getFieldDecorator('address', {
                            rules: [{ required: true, message: '请输入详细地址' }],
                        })(
                            <Input
                                placeholder="请输入详细地址"
                            />
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
            </Card>
            </PageHeaderWrapper>
        )
    }
}
