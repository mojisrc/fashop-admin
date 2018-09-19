//@flow
import React, { Component } from "react";
import {
    Button,
    Modal,
    Form,
    Input,
} from "antd";
import types from "../../../constants";
import { connect } from "react-redux";


const FormItem = Form.Item;

type Props = {
    visible: boolean,
    initialValue: {},
    form: {
        getFieldDecorator: Function,
        validateFieldsAndScroll: Function,
        resetFields: Function,
        getFieldValue: Function,
        validateFields: Function,
    },
    dispatch: Function,
    onCancel: Function,
    type: string,
    initialValue: {
        username?: string,
        nickname?: string,
        password?: string,
    },
    memberAddLoading: boolean,
}

type State = {
    confirmDirty: boolean,
}



@Form.create()
@connect(({auth:{member:{memberAddLoading}}})=>({
    memberAddLoading
}))
export default class RoleMembersModal extends Component<Props,State> {
    static defaultProps = {
        initialValue: {},
        form: {
            getFieldDecorator: ()=>{},
            validateFieldsAndScroll: ()=>{},
            resetFields: ()=>{},
            getFieldValue: ()=>{},
            validateFields: ()=>{},
        },
        dispatch:()=>{},
        memberAddLoading: false,
    }
    state = {
        confirmDirty: false,
    }
    addSuccess = ()=>{
        const {
            onCancel,
            form
        } = this.props
        const {
            resetFields
        } = form
        onCancel()
        resetFields()
    }
    handleSubmit = (e:{preventDefault: Function}) => {
        const {
            dispatch,
            form,
        } = this.props
        const {
            validateFieldsAndScroll
        } = form
        e.preventDefault();
        validateFieldsAndScroll((err, values) => {
            if (!err) {
                delete values.confirm
                dispatch({
                    type: types.member.MEMBER_ADD,
                    params: values,
                    func: this.addSuccess
                })
            }
        });
    }
    handleConfirmBlur = (e:{target:{value:string}}) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    checkPassword = (rule:any, value:string, callback:Function) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次密码输入不一致!');
        } else {
            callback();
        }
    }
    checkConfirm = (rule:any, value:string, callback:Function) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    render() {
        const {
            visible,
            onCancel,
            initialValue,
            type,
            memberAddLoading,
        } = this.props
        const {
            username,
            nickname,
            password,
        } = initialValue
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
                title={'添加成员'}
                visible={visible}
                footer={null}
                onCancel={onCancel}
            >
                <Form onSubmit={this.handleSubmit}>
                    <FormItem {...formItemLayout} label="用户名">
                        {getFieldDecorator('username', {
                            initialValue:username,
                            rules: [{
                                required: true,
                                message: '用户名必填！',
                            }],
                        })(
                            <Input placeholder="请输入用户名" />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="昵称">
                        {getFieldDecorator('nickname',{
                            initialValue: nickname,
                        })(
                            <Input placeholder="请输入姓名" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="密码"
                        extra={`${type==='edit' ? '如不修改无须填写' : ''}`}
                    >
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true,
                                message: 'Please input your password!',
                            }, {
                                validator: this.checkConfirm,
                            }],
                        })(
                            <Input type="password" placeholder='请输入密码' />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="确认密码"
                    >
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true,
                                message: 'Please confirm your password!',
                            }, {
                                validator: this.checkPassword,
                            }],
                        })(
                            <Input
                                type="password"
                                onBlur={this.handleConfirmBlur}
                                placeholder='请输入确认密码'
                            />
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button
                            style={{marginRight:'10px'}}
                            onClick={onCancel}
                        >
                            取消
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={memberAddLoading}
                        >
                            确定
                        </Button>
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}
