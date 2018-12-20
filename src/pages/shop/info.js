import React, { Component } from "react";
import { connect } from "dva";
import { Form, Input, Button, Card, message } from "antd";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import UploadImage from "@/components/uploadImage";

const { TextArea } = Input;
const FormItem = Form.Item;
@Form.create()
@connect(({ shop, loading }) => ({
    shopInfo: shop.info.result,
    shopInfoLoading: loading.effects["shop/info"],
    setBaseInfoLoading: loading.effects["shop/setBaseInfo"]
}))
export default class Info extends Component {
    static defaultProps = {
        shopInfo: {
            info: {}
        },
        shopInfoLoading: true,
        setBaseInfoLoading: false
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: "shop/info"
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const { dispatch } = this.props;
            if (!err) {
                dispatch({
                    type: "shop/setBaseInfo",
                    payload: values,
                    callback: (response) => {
                        if (response.code === 0) {
                            message.success("已保存");
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

    render() {
        const { form, shopInfo, setBaseInfoLoading } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 }
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
                    offset: 6
                }
            }
        };
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true}>
                <Card bordered={false}>
                    <Form onSubmit={this.handleSubmit} style={{ maxWidth: "600px" }}>
                        <FormItem
                            {...formItemLayout}
                            extra="建议尺寸：200 x 200 像素小于120KB，支持.jpg、.gif、.png格式"
                            label="店铺logo"
                        >
                            {getFieldDecorator("logo", {
                                initialValue: shopInfo.info && shopInfo.info.logo,
                                rules: [{
                                    required: true,
                                    message: "请上传Logo"
                                }],
                                valuePropName: "url"
                            })(
                                <UploadImage />
                            )}
                        </FormItem>
                        <FormItem
                            label="店铺名称"
                            {...formItemLayout}
                        >
                            {getFieldDecorator("name", {
                                initialValue: shopInfo.info && shopInfo.info.name,
                                rules: [{
                                    required: true,
                                    message: "Please input shop name!"
                                }]
                            })(
                                <Input
                                    placeholder="输入店铺名称"
                                    style={{ width: "100%" }}
                                />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="联系电话"
                        >
                            {getFieldDecorator("contact_number", {
                                initialValue: shopInfo.info && shopInfo.info.contact_number
                            })(
                                <Input
                                    placeholder="输入联系电话"
                                    style={{ width: "100%" }}
                                />
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="店铺简介"
                            extra="微信分享店铺给好友时会显示这里的文案"
                        >
                            {getFieldDecorator("description", {
                                initialValue: shopInfo.info && shopInfo.info.description
                            })(
                                <TextArea
                                    placeholder="请输入简介"
                                    autosize={{ minRows: 3, maxRows: 6 }}
                                    style={{ width: "100%" }}
                                />
                            )}
                        </FormItem>
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" loading={setBaseInfoLoading}>保存</Button>
                        </FormItem>
                    </Form>
                </Card>
            </PageHeaderWrapper>
        );
    }
}
