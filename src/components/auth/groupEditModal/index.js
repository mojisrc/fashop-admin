//@flow

import React, { Component } from "react";
import {
    Button,
    Modal,
    Form,
    Input,
} from "antd";
import types from "../../../constants";

const FormItem = Form.Item;

type Props = {
    visible: boolean,
    initialValue: {name: string},
    onCancel: Function,
    form: {
        getFieldDecorator: Function,
        validateFieldsAndScroll: Function,
        resetFields: Function,
    },
    dispatch: Function,
    id: null|number,
}

type State = {

}

@Form.create()
export default class RoleMembersModal extends Component<Props,State>{
    static defaultProps = {
        form: {
            getFieldDecorator: ()=>{},
            validateFieldsAndScroll: ()=>{},
            resetFields: ()=>{},
        },
    }
    handleSubmit = (e:{preventDefault: Function}) => {
        const {
            form,
            dispatch,
            id,
        } = this.props
        const {
            validateFieldsAndScroll
        } = form
        e.preventDefault();
        validateFieldsAndScroll(null,{first:true},(err,value) => {
            if (!err) {
                const {
                    name
                } = value
                dispatch({
                    type: types.auth.AUTH_GROUPEDIT,
                    func: this.onCancel,
                    id,
                    name,
                })
            }
        });
    }
    onCancel = ()=>{
        const {
            onCancel,
            form,
        } = this.props
        const {
            resetFields
        } = form
        onCancel()
        setTimeout(()=>{
            resetFields(['name'])
        },500)
    }
    render() {
        const {
            visible,
            initialValue,
            onCancel,
            form,
        } = this.props
        const {
            name,
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
        const { getFieldDecorator } = form;
        return (
            <Modal
                title={"修改组名"}
                visible={visible}
                footer={null}
                onCancel={this.onCancel}
            >
                <Form onSubmit={this.handleSubmit}>
                    <FormItem {...formItemLayout} label="组名">
                        {getFieldDecorator('name', {
                            initialValue: name,
                            rules: [{
                                required: true,
                                message: '组名必填',
                            }],
                        })(
                            <Input placeholder="请输入组名" />
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button
                            style={{marginRight:'10px'}}
                            onClick={this.onCancel}
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
