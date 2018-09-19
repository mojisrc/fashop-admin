//@flow
import React, { Component } from "react";
import {
    Button,
    Modal,
    Form,
    Input,
    Upload,
    Avatar,
    message,
} from "antd";
import types from "../../../constants";
import { connect } from "react-redux";
import {imageUpload} from "../../../utils";

const FormItem = Form.Item;

type Props = {
    visible: boolean,
    form: {
        getFieldDecorator: Function,
        validateFieldsAndScroll: Function,
        resetFields: Function,
        getFieldValue: Function,
        validateFields: Function,
        setFieldsValue: Function,
    },
    dispatch: Function,
    onCancel: Function,
    initialValue: {
        nickname: string,
        avatar: string,
    },
    memberAddLoading: boolean,
    id: number,
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
        initialValue: {
            nickname: '',
        },
        form: {
            getFieldDecorator: ()=>{},
            validateFieldsAndScroll: ()=>{},
            resetFields: ()=>{},
            getFieldValue: ()=>{},
            validateFields: ()=>{},
            setFieldsValue: ()=>{},
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
            id,
        } = this.props
        const {
            validateFieldsAndScroll
        } = form
        e.preventDefault();
        validateFieldsAndScroll((err, values) => {
            if (!err) {
                dispatch({
                    type: types.member.MEMBER_EDIT,
                    params: {...values,...{id}},
                    func: this.addSuccess,
                })
            }
        });
    }
    onCancel = ()=>{
        const {
            onCancel,
            form,
        } = this.props
        onCancel()
        form.resetFields()
    }
    avatarUpload = (e:string)=>{
        const {
            form
        } = this.props
        form.setFieldsValue({
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
        })
    }
    render() {
        const {
            visible,
            initialValue,
            memberAddLoading,
        } = this.props
        const {
            nickname,
            avatar,
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
                title={'编辑成员'}
                visible={visible}
                footer={null}
                onCancel={this.onCancel}
            >
                <Form onSubmit={this.handleSubmit}>
                    <FormItem {...formItemLayout} label="头像">
                        {getFieldDecorator("avatar", {
                            valuePropName: "avatar",
                            initialValue: avatar,
                            rules:[{
                                required: true,
                                message: '给他设置头像！',
                            }],
                        })(
                            <AvatarUpload
                                nickname={nickname}
                                change={this.avatarUpload}
                            />
                        )}
                    </FormItem>

                    <FormItem {...formItemLayout} label="昵称">
                        {getFieldDecorator('nickname',{
                            initialValue: nickname,
                            rules:[{
                                required: true,
                                message: '给他设置昵称！',
                            }],
                        })(
                            <Input placeholder="请输入昵称" />
                        )}
                    </FormItem>
                    <FormItem {...formItemLayout} label="密码">
                        {getFieldDecorator('password', {
                            rules: [{
                                required: false,
                                message: '给他设置密码！',
                            }],
                        })(
                            <Input type="password" placeholder='请输入密码' />
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button
                            style={{marginRight:'10px'}}
                            onClick={this.onCancel}
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


class AvatarUpload extends Component<{avatar:string,nickname:string,change:Function},{}>{
    static defaultProps = {
        avatar: '',
    }
    render(){
        const {
            avatar,
            nickname,
            change,
        } = this.props
        return(
            <Upload
                name="avatar"
                listType="picture-card"
                showUploadList={false}
                beforeUpload={beforeUpload}
                customRequest={({file})=>{
                    imageUpload({
                        file,
                        onSuccess:change
                    })
                }}
            >
                <Avatar
                    src={avatar}
                    size={'large'}
                >
                    {nickname}
                </Avatar>
            </Upload>
        )
    }
}


function beforeUpload(file) {
    const isImage = file.type.includes('image')!==-1;
    if (!isImage) {
        message.error('你只能上传图片!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('图片不能超过2MB!');
    }
    return isImage && isLt2M;
}
