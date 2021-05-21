import { Form } from '@ant-design/compatible';
import React, { Component } from "react";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import { Card, message, Spin } from "antd";
import { connect } from "umi";
import {  Input, Button, TreeSelect } from "antd";
import { history as router } from "umi";
import Arr from "@/utils/array";
import ImageSpace from "@/components/uploadImage/imageSpace";

const FormItem = Form.Item;

@Form.create()
@connect(({ goodsCategory, loading }) => ({
    goodsCategory: goodsCategory.list.result,
    goodsCategoryLoading: loading.effects["goodsCategory/list"]
}))
export default class GoodsCategoryEdit extends Component {
    static defaultProps = {
        goodsCategoryLoading: true,
        goodsCategory: {
            list: []
        }
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: "goodsCategory/list"
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const { dispatch } = this.props;
            if (!err) {
                dispatch({
                    type: "goodsCategory/add",
                    payload: values,
                    callback: (response) => {
                        if (response.code === 0) {
                            dispatch({
                                type:'goodsCategory/list'
                            })
                            message.success("添加成功");
                            router.goBack();
                        } else {
                            message.error(response.msg);
                        }
                    }
                });
            }else{
                message.error(err)
            }
        });
    };

    render() {
        const { form, goodsCategory, goodsCategoryLoading } = this.props;
        const { getFieldDecorator,getFieldValue } = form;
        const tree = Arr.toTree(goodsCategory.list);
        // 最多3级
        let treeData = [];
        tree.forEach(function(item) {
            treeData.push({
                title: item.name,
                value: `${item.id}`,
                key: `${item.id}`,
                children: typeof item["children"] === "undefined" ? [] : ((item) => {
                    let _data = [];
                    item.children.map((sub) => {
                        _data.push({
                            title: sub.name,
                            value: `${sub.id}`,
                            key: `${sub.id}`
                        });
                    });
                    return _data;
                })(item)
            });
        });
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true} policy={'goodscategory/add'}>
                <Card bordered={false}>
                    <Spin size="large" spinning={goodsCategoryLoading}>
                        <Form onSubmit={this.handleSubmit} style={{ maxWidth: 600 }}>
                            <FormItem
                                label="分类名称"
                                {...formItemLayout}
                            >
                                {getFieldDecorator("name", {
                                    rules: [{
                                        required: true,
                                        message: "请输入分类名称"
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
                                help="如不选择，则默认为一级分类"
                                {...formItemLayout}
                            >
                                {getFieldDecorator("pid", {
                                })(
                                    <TreeSelect
                                        treeData={treeData}
                                        showSearch
                                        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                                        placeholder="请输入分类名称"
                                        allowClear
                                        treeDefaultExpandAll
                                    />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                extra="分类展示图，建议尺寸：140*140 像素"
                                label="上传分类图"
                            >
                                {getFieldDecorator("icon", {
                                    rules: [{
                                        message: "请上传封面图"
                                    }]
                                })(
                                    <ImageSpace
                                        multi={false}
                                        batch={false}
                                        url={getFieldValue("icon")}
                                        itemStyle={{
                                            width: 100,
                                            height: 100
                                        }}
                                    />
                                )}
                            </FormItem>
                            <FormItem {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit" loading={goodsCategoryLoading} style={{
                                    marginRight: 10
                                }}>保存</Button>
                                <Button
                                    onClick={() => {
                                        router.goBack();
                                    }}
                                >
                                    返回
                                </Button>
                            </FormItem>
                        </Form>
                    </Spin>
                </Card>
            </PageHeaderWrapper>
        );
    }

}
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
