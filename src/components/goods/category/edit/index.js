import React, { Component } from "react";
import { connect } from "dva";
import { Form, Select, Input, Button, message } from "antd";
import UploadImage from "@/components/uploadImage";
import GoodsApi from "@/services/goods";
import router from "umi/router";
import { query } from "@/utils/fa";
import { getPageQuery } from "@/utils/utils";

const FormItem = Form.Item;
const Option = Select.Option;

@Form.create()
@connect(({ goodsCategory, loading }) => ({
    goodsCategory: goodsCategory.list.result,
    goodsCategoryLoading: loading.effects["goodsCategory/list"]
}))
export default class CategoryEdit extends Component {
    static defaultProps = {
        goodsCategoryLoading: true,
        goodsCategory: {
            list: []
        }

    };
    state = {
        categoryInfo: {}
    };

    async componentDidMount() {
        this.initList();
        const { id } = getPageQuery();
        if (!id) {
            return message.error("缺少必要参数，history异常");
        }
        const e = await GoodsApi.category.info({ id });
        this.setState({
            categoryInfo: e.result.info
        });
    }

    initList() {
        const { dispatch } = this.props;
        dispatch({
            type: "goodsCategory/list"
        });
    }

    handleSubmit = (e) => {
        const { id } = getPageQuery();
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { dispatch } = this.props;
                dispatch({
                    type: "goodsCategory/edit",
                    payload: {
                        ...values,
                        ...{ id }
                    },
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
        const { categoryInfo } = this.state;
        const { name, pid, icon } = categoryInfo || {};
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
        let hasChild = false;
        // 如果存在子分类不可以设所属
        if (categoryInfo && Array.isArray(goodsCategory.list) && goodsCategory.list.length > 0) {
            goodsCategory.list.map((e, i) => {
                (hasChild === false && e.pid === categoryInfo.id) ? hasChild = true : null;
            });
            return (
                <Form onSubmit={this.handleSubmit} style={{ maxWidth: "600px" }}>
                    <FormItem
                        label="分类名称"
                        {...formItemLayout}
                    >
                        {getFieldDecorator("name", {
                            initialValue: name,
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
                    {hasChild === false ? <FormItem
                        label="上级分类"
                        {...formItemLayout}
                    >
                        {getFieldDecorator("pid", {
                            initialValue: pid === 0 ? 0 : pid
                        })(
                            <Select
                                placeholder="请输入分类名称"
                                style={{ width: "100%" }}
                            >
                                <Option value={0} key={"null"}>设为一级分类</Option>
                                {
                                    goodsCategory.list.map((e, i) => {
                                        return e.id !== categoryInfo.id ?
                                            <Option value={e.id} key={i}>{e.name}</Option> : null;
                                    })
                                }
                            </Select>
                        )}
                    </FormItem> : null}
                    <FormItem
                        {...formItemLayout}
                        extra="分类展示图，建议尺寸：140*140 像素"
                        label="上传分类图"
                    >
                        {getFieldDecorator("icon", {
                            initialValue: icon,
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
        } else {
            return "";
        }


    }
}
