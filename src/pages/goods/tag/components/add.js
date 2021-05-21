import { Form } from '@ant-design/compatible';
import React, { Component } from "react";
import { Button, Modal,  Input, message } from "antd";
import { connect } from "umi";

const FormItem = Form.Item;
@Form.create()
@connect(({ loading }) => ({
    goodsTagAddLoading: loading.effects["goodsTag/add"]
}), null, null, {
    forwardRef: true
})
export default class BrandAdd extends Component {
    static defaultProps = {
        goodsTagAddLoading: false,
        onAdd: () => {
        }
    };
    state = {
        visible: false,
        userInfo: { id: 0 }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const { dispatch } = this.props;
            if (!err) {
                dispatch({
                    type: "goodsTag/add",
                    payload: {
                        title: values.title,
                        font_color: values.font_color,
                        background_color: values.background_color,
                        border_color: values.border_color
                    },
                    callback: (response) => {
                        if (response.code === 0) {
                            message.success("添加成功");
                            this.props.onAdd();
                        } else {
                            message.error(response.msg);
                        }
                    }
                });
            } else {
                message.error(err);
            }
        });
    };

    show() {
        this.setState({
            visible: true
        });
    }

    close() {
        this.setState({
            visible: false
        });
    }

    render() {
        const { visible } = this.state;
        const { goodsTagAddLoading } = this.props;
        const { getFieldDecorator } = this.props.form;
        return <Modal
            title="添加标签"
            visible={visible}
            width={756}
            footer={false}
            onCancel={() => {
                this.setState({
                    visible: false
                });
            }}
        >
            <Form onSubmit={this.handleSubmit} style={{ maxWidth: 600 }}>
                <FormItem
                    label="标签名称"
                    {...formItemLayout}
                >
                    {getFieldDecorator("title", {
                        rules: [{
                            required: true,
                            message: "请输入标签名称"
                        }]
                    })(
                        <Input
                            placeholder='请输入标签名称'
                        />
                    )}
                </FormItem>
                <FormItem
                    label="字体色"
                    {...formItemLayout}
                >
                    {getFieldDecorator("font_color", {
                        rules: [{
                            required: true,
                            message: "请选择字体色"
                        }],
                        initialValue: "#cf3900"
                    })(
                        <Input
                            type={"color"}
                            style={{ width: 50 }}
                        />
                    )}
                </FormItem>
                <FormItem
                    label="背景色"
                    {...formItemLayout}
                >
                    {getFieldDecorator("background_color", {
                        rules: [{
                            required: true,
                            message: "请选择背景色"
                        }],
                        initialValue: "#cf3900"
                    })(
                        <Input
                            type={"color"}
                            style={{ width: 50 }}
                        />
                    )}
                </FormItem>
                <FormItem
                    label="边框色"
                    {...formItemLayout}
                >
                    {getFieldDecorator("border_color", {
                        rules: [{
                            required: true,
                            message: "请选择边框色"
                        }],
                        initialValue: "#cf3900"
                    })(
                        <Input
                            type={"color"}
                            style={{ width: 50 }}
                        />
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" loading={goodsTagAddLoading}>保存</Button>
                </FormItem>
            </Form>
        </Modal>;
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

