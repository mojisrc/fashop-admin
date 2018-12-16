import React, { Component } from "react";
import {
    Button,
    Modal,
    Form,
    Input,
    Radio,
    DatePicker,
} from "antd";
const FormItem = Form.Item;
// const RadioGroup = Radio.Group;
//
// type Props = {
//     form: formType,
//     customerVisible: boolean,
//     customerCancel: boolean,
//     type: string,
// }
// type State = {
//     confirmDirty: boolean,
// }
@Form.create()
export default class ListModal extends Component {
    state = {
        confirmDirty: false,
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err) => {
            if (!err) {
            }
        });
    }

    render() {
        const {
            customerVisible,
            customerCancel,
            type,
        } = this.props

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };
        const { getFieldDecorator } = this.props.form;

        return (
            <Modal
                title={`${type === 'edit' ? '编辑' : "新增客户"}`}
                visible={customerVisible}
                footer={null}
                onCancel={customerCancel}
            >
                <Form onSubmit={this.handleSubmit}>
                    <FormItem {...formItemLayout} label="姓名">
                        {getFieldDecorator('userName', {
                            rules: [{
                                required: true,
                                message: '姓名必填！',
                            }],
                        })(
                            <Input placeholder="请输入姓名" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="手机号"
                    >
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: 'Please input your phone number!' }],
                        })(
                            <Input placeholder="请输入手机号" />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="性别">
                        {getFieldDecorator('sex', {
                            rules: [{
                                required: true,
                                message: 'Please input state',
                            }],
                        })(
                            <RadioGroup>
                                <Radio value="1">男</Radio>
                                <Radio value="2">女</Radio>
                                <Radio value="0">未知</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="生日"
                    >
                        {getFieldDecorator('birthday')(
                            <DatePicker />
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button
                            style={{ marginRight: '10px' }}
                            onClick={customerCancel}
                        >
                            取消
                        </Button>
                        <Button type="primary" htmlType="submit">
                            确定
                        </Button>
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

