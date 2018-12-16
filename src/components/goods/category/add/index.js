import React, { Component } from "react";
import { connect } from "dva";
import { Form, Select, Input, Button } from "antd";
import UploadImage from "@/components/uploadImage";
import router from "umi/router";

const FormItem = Form.Item;
const Option = Select.Option;
@Form.create()
@connect(({ goodsCategory, loading }) => ({
    goodsCategory: goodsCategory.list.result,
    goodsCategoryLoading: loading.effects["goodsCategory/list"]
}))
export default class CategoryAdd extends Component {
    static defaultProps = {
        goodsCategoryLoading: true,
        goodsCategory: {
            list: []
        }

    };

    componentDidMount() {
        this.initList();
    }

    initList() {
        const { dispatch } = this.props;
        dispatch({
            type: "goodsCategory/list"
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { dispatch } = this.props;
                dispatch({
                    type: "goodsCategory/add",
                    payload: values,
                    callback: (response) => {
                        if (response.code === 0) {
                            router.goBack();
                        }
                    }
                });
            }
        });
    };

    render() {
        const { form, goodsCategory } = this.props;
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
            <Form onSubmit={this.handleSubmit} style={{ maxWidth: "600px" }}>
                <FormItem
                    label="分类名称"
                    {...formItemLayout}
                >
                    {getFieldDecorator("name", {
                        rules: [{
                            required: true,
                            message: "请输入分类名称!"
                        }]
                    })(
                        <Input
                            placeholder='请输入分类名称'
                            style={{ width: "100%" }}
                        />
                    )}
                </FormItem>
                <FormItem
                    label="上级分类"
                    extra='如不选择，则默认为一级分类'
                    {...formItemLayout}
                >
                    {getFieldDecorator("pid", {})(
                        <Select
                            placeholder="请输入分类名称"
                            style={{ width: "100%" }}
                        >
                            <Option value={0} key={"null"}>设为一级分类</Option>
                            {
                                Array.isArray(goodsCategory.list) && goodsCategory.list.map((item, i) => {
                                    if (item.pid === 0) {
                                        return <Option value={item.id} key={i}>{item.name}</Option>;
                                    }
                                })
                            }
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    extra="分类展示图，建议尺寸：140*140 像素"
                    label="上传分类图"
                >
                    {getFieldDecorator("icon", {
                        rules: [{
                            message: "请上传分类图!"
                        }],
                        valuePropName: "url"
                    })(
                        <UploadImage />
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                            marginRight: 10
                        }}
                        onClick={() => {

                        }}
                    >
                        保存
                    </Button>
                    <Button
                        onClick={() => {
                            router.goBack();
                        }}
                    >
                        返回
                    </Button>
                </FormItem>
            </Form>
        );
    }
}
