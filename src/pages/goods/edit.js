import React, { Component } from "react";
import { connect } from "dva";
import {
    Form,
    Button,
    Modal,
    message,
    Card,
    Spin,
    Input,
    TreeSelect,
    DatePicker
} from "antd";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import Sku from "@/components/goods/add/sku";
import Editor from "@/components/goods/add/editor";
import PhotoGallery from "@/components/public/photoGallery";
import styles from "./edit.css";
import { UploadGroupImage } from "@/components/uploadImage";
import Arr from "@/utils/array";
import Antd from "@/utils/antd";
import router from "umi/router";
import moment from "moment";
import GoodsFreight from "@/components/goods/add/freight";

const FormItem = Form.Item;

@Form.create()
@connect(({ goods, goodsCategory, goodsSpec, loading }) => ({
    goodsInfo: goods.info.result,
    goodsCategory: goodsCategory.list.result,
    specList: goodsSpec.list.result,
    goodsListLoading: loading.effects["goods/list"],
    goodsInfoLoading: loading.effects["goods/info"],
    goodsCategoryLoading: loading.effects["goodsCategory/list"],
    specListLoading: loading.effects["goodsSpec/list"]
}))

class GoodsEdit extends Component {
    static defaultProps = {
        goodsInfo: { info: {} },
        goodsCategory: { list: [] },
        specList: { list: [] },
        goodsListLoading: true,
        goodsInfoLoading: true,
        goodsCategoryLoading: true,
        specListLoading: true
    };
    state = {
        photoGalleryVisible: false,
        photoGalleryOnOk: (e) => {
        },
        previewVisible: false,
        previewImage: "",
        info: {
            body: [], freight_fee: 0, freight_id: 0, sale_time: null, title: "", images: [], category_ids: []
        },
        skus: [
            {
                spec: [
                    {
                        id: 0,
                        name: null,
                        value_id: 0,
                        value_name: null,
                        value_img: null
                    }
                ],
                price: null,
                stock: null,
                code: null,
                weight: null
            }
        ]
    }
    componentDidMount() {
        const { dispatch, location: { query: { id } } } = this.props;
        dispatch({
            type: "goods/info",
            payload: { id },
            callback: (response) => {
                if (response.code === 0) {
                    const { info } = response.result;
                    this.setState({
                        info,
                        skus: info.sku_list,
                        photoGalleryVisible: false,
                        photoGalleryOnOk: (e) => {},
                        previewVisible: false,
                        previewImage: "",
                    });
                }
            }
        });
        dispatch({
            type: "goodsCategory/list"
        });
        this.refreshSpecList();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                const { dispatch } = this.props;
                const { title, images, category_ids, body, skus, sale_time, freight } = values;
                const id = this.state.info.id;
                const params = {
                    id,
                    title,
                    images,
                    category_ids,
                    body,
                    skus,
                    freight_fee: freight.freight_fee,
                    freight_id: freight.freight_id,
                    sale_time: sale_time.unix()
                };
                dispatch({
                    type: "goods/edit",
                    payload: params,
                    callback: (e) => {
                        if (e.code === 0) {
                            message.success("修改成功");
                            dispatch({
                                type: "goods/info",
                                payload: { id },
                                callback: (response) => {
                                    if (response.code === 0) {
                                        const { info } = response.result;
                                        this.setState({
                                            info,
                                            skus: info.sku_list,
                                        });
                                    }
                                }
                            });
                        } else {
                            message.warn(e.msg);
                        }
                    }
                });
            }
        });
    };

    render() {
        const { photoGalleryVisible, previewVisible, previewImage, info, skus } = this.state;
        const { body, freight_fee, freight_id, sale_time, title, images, category_ids } = info;
        const { goodsCategory, form, goodsInfoLoading } = this.props;
        const { getFieldDecorator, getFieldValue, setFieldsValue } = form;
        if (!info.id) {
            return null;
        }
        let tree = Arr.toTree(goodsCategory.list);
        const categoryTree = Antd.treeData(tree);
        // TreeSelect 只接受string
        let _categoryIds = [];
        if (Array.isArray(category_ids) && category_ids.length > 0) {
            _categoryIds = category_ids.map((item) => {
                return item + "";
            });
        }
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true}>
                <Card bordered={false}>
                    <Spin size="large" spinning={goodsInfoLoading}>
                        <Form onSubmit={this.handleSubmit} style={{ width: 1000 }}>
                            <div className={styles.item}>
                                <h3>基本信息</h3>
                                <FormItem
                                    {...formItemLayout}
                                    label='商品图'
                                >
                                    {getFieldDecorator("images", {
                                        rules: [{ required: true, message: "请选择商品图" }],
                                        valuePropName: "url",
                                        initialValue: images
                                    })(
                                        <UploadGroupImage
                                            onClick={(onChange, values) => {
                                                values = values ? values : [];
                                                this.openPhotoGallery({
                                                    photoGalleryOnOk: (e) => {
                                                        onChange([...values, ...e]);
                                                    }
                                                });
                                            }}
                                            preview={(previewImage) => {
                                                this.openPreviewModal({
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
                            </div>
                            <div className={styles.item}>
                                <h3>型号价格</h3>
                                <FormItem {...formItemLayout}>
                                    {getFieldDecorator("skus", {
                                        rules: [{
                                            validator: Sku.validator,
                                            required: true
                                        }],
                                        initialValue: skus.length > 0 ? skus : null
                                    })(<Sku form={form} />)}
                                </FormItem>
                            </div>
                            <div className={styles.item}>
                                <h3>运费其他</h3>
                                <FormItem {...formItemLayout} label={"运费"}>
                                    {getFieldDecorator("freight", {
                                        rules: [{
                                            required: true
                                        }],
                                        initialValue: {
                                            freight_id,
                                            freight_fee
                                        }
                                    })(<GoodsFreight />)}
                                </FormItem>
                                <FormItem {...formItemLayout} label={"开售时间"}>
                                    {getFieldDecorator("sale_time", {
                                        rules: [{
                                            required: true
                                        }],
                                        initialValue: moment(parseInt(sale_time + "000"))
                                    })(
                                        <DatePicker
                                            showTime
                                            format="YYYY-MM-DD HH:mm:ss"
                                            placeholder="选择时间"
                                            style={{ marginRight: 15 }}
                                        />
                                    )}
                                </FormItem>
                                <h3>商品详情</h3>
                            </div>
                            <FormItem {...formItemLayout} label='商品详情'>
                                {getFieldDecorator("body", {
                                    rules: [{ required: true, message: "请添加商品详情" }],
                                    initialValue: body
                                })(<Editor
                                    openPhotoGallery={this.openPhotoGallery}
                                    title={getFieldValue("title")}
                                    images={getFieldValue("images")}
                                />)}
                            </FormItem>
                            <FormItem {...tailFormItemLayout}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{
                                        marginRight: 10
                                    }}
                                >
                                    保存修改
                                </Button>
                            </FormItem>
                        </Form>
                        <PhotoGallery
                            visible={photoGalleryVisible}
                            onCancel={this.onCancelPhotoGallery}
                            onOk={this.onOkPhotoGallery}
                        />
                        <Modal visible={previewVisible} footer={null} onCancel={this.previewCancel}>
                            <img alt="example" style={{ width: "100%" }} src={previewImage} />
                        </Modal>
                    </Spin>
                </Card>
            </PageHeaderWrapper>
        );
    }
    refreshSpecList = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "goodsSpec/list"
        });
    };

    openPhotoGallery = ({ photoGalleryOnOk }) => {
        this.setState({
            photoGalleryVisible: true,
            photoGalleryOnOk
        });
    };
    onCancelPhotoGallery = () => {
        this.setState({
            photoGalleryVisible: false
        });
    };
    onOkPhotoGallery = (e) => {
        this.state.photoGalleryOnOk(e);
        this.onCancelPhotoGallery();
    };
    previewCancel = () => {
        this.setState({
            previewVisible: false
        });
    };
    // : { previewImage: string }
    openPreviewModal = ({ previewImage }) => {
        this.setState({
            previewVisible: true,
            previewImage
        });
    };

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

export default GoodsEdit;
