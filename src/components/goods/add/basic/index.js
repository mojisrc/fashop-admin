import React, { Component, Fragment } from "react";
import { connect } from "dva";
import { Form, Input, TreeSelect } from "antd";
import { UploadGroupImage } from "@/components/uploadImage";
import router from "umi/router";
import Arr from "@/utils/array";
import Antd from "@/utils/antd";

const FormItem = Form.Item;
@connect()
export default class Basic extends Component {
    render() {
        const { formItemLayout, openPhotoGallery, categoryList, openPreviewModal, title, images, categoryIds, form } = this.props;
        const { getFieldDecorator, setFieldsValue } = form;
        let tree = Arr.toTree(categoryList);
        const categoryTree = Antd.treeData(tree);
        // TreeSelect 只接受string
        let _categoryIds = [];
        if (Array.isArray(categoryIds) && categoryIds.length > 0) {
            _categoryIds = categoryIds.map((item) => {
                return item + "";
            });
        }
        return (
            <Fragment>
                <FormItem
                    {...formItemLayout}
                    label='商品图'
                >
                    {getFieldDecorator("images", {
                        rules: [{ required: true, message: "请选择商品图!" }],
                        valuePropName: "url",
                        initialValue: images
                    })(
                        <UploadGroupImage
                            onClick={(onChange, values) => {
                                values = values ? values : [];
                                openPhotoGallery({
                                    photoGalleryOnOk: (e) => {
                                        onChange([...e, ...values]);
                                    }
                                });
                            }}
                            preview={(previewImage) => {
                                openPreviewModal({
                                    previewImage
                                });
                            }}
                        />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='商品名称'
                >
                    {getFieldDecorator("title", {
                        rules: [{ required: true, message: "请输入商品名称" }],
                        initialValue: title
                    })(
                        <Input
                            placeholder="请输入商品名称"
                        />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='商品分类'
                >
                    {getFieldDecorator("category_ids", {
                        initialValue: _categoryIds,
                        rules: [{ required: true, message: "请选择商品分类" }]
                    })(
                        <TreeSelect
                            treeData={categoryTree}
                            showSearch
                            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                            placeholder="请选择商品分类"
                            allowClear
                            multiple
                            treeDefaultExpandAll
                            onChange={(value) => {
                                setFieldsValue({
                                    category_ids: value
                                });
                            }}
                        />
                    )}
                    <a
                        onClick={() => {
                            router.push("/goods/category/add");
                        }}
                    >
                        新增分类
                    </a>
                </FormItem>
            </Fragment>
        );
    }
}
