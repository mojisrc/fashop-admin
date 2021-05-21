import { Form } from '@ant-design/compatible';
import React, { Component } from "react";
import { Button, Modal,  Input, message } from "antd";
import { connect } from "umi";
import ImageSpace from "@/components/uploadImage/imageSpace";

const { TextArea } = Input;
const FormItem = Form.Item;

@Form.create()
@connect(({ loading }) => ({
    brandEditLoading: loading.effects["brand/edit"]
}), null, null, {
    forwardRef: true
})
export default class BrandEdit extends Component {
    static defaultProps = {
        brandEditLoading: false,
        onEdit: () => {
        }
    };
    state = {
        id: 0,
        visible: false,
        userInfo: { id: 0 }
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const { dispatch } = this.props;
            if (!err) {
                const { id } = this.state;
                dispatch({
                    type: "brand/edit",
                    payload: {
                        id,
                        title: values.title,
                        logo: values.logo,
                        desc: values.desc,
                        content:values.content
                    },
                    callback: (response) => {
                        if (response.code === 0) {
                            message.success("已保存");
                            this.props.onEdit();
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

    initInfo() {
        const { dispatch } = this.props;
        const { id } = this.state;
        const { setFieldsValue } = this.props.form;
        dispatch({
            type: "brand/info",
            payload: { id },
            callback: (response) => {
                if (response.code === 0) {
                    setFieldsValue({
                        title: response.result.info.title,
                        logo: response.result.info.logo
                    });
                } else {
                    message.warning("品牌详情获取失败");
                }
            }
        });
    }

    show({ id }) {
        this.setState({
            id,
            visible: true
        }, () => {
            this.initInfo();
        });
    }

    close() {
        this.setState({
            visible: false
        });
    }

    render() {
        const { visible } = this.state;
        const { brandEditLoading } = this.props;
        const { getFieldDecorator, getFieldValue } = this.props.form;
        return <Modal
            title="添加品牌"
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
                    label="品牌名称"
                    {...formItemLayout}
                >
                    {getFieldDecorator("title", {
                        rules: [{
                            required: true,
                            message: "请输入品牌名称"
                        }]
                    })(
                        <Input
                            placeholder='请输入品牌名称'
                            style={{ width: "100%" }}
                        />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    extra="LOGO展示图，建议尺寸：140*140 像素"
                    label="上传LOGO图"
                >
                    {getFieldDecorator("logo", {
                        rules: [{
                            required: true,
                            message: "请上传LOGO图"
                        }]
                    })(
                        <ImageSpace
                            multi={false}
                            batch={false}
                            url={getFieldValue("logo")}
                        />
                    )}
                </FormItem>
                <FormItem
                    label="描述"
                    {...formItemLayout}
                >
                    {getFieldDecorator("desc", {
                        rules: [{
                            required: true,
                            message: "请输入描述"
                        }]
                    })(
                        <TextArea
                            rows={4}
                        />
                    )}
                </FormItem>
                <FormItem
                    label="详情"
                    {...formItemLayout}
                >
                    {getFieldDecorator("content", {
                        rules: [{
                            required: true,
                            message: "请输入详情"
                        }]
                    })(
                        <TextArea
                            rows={4}
                        />
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" loading={brandEditLoading}>保存</Button>
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
