import React, { Component } from "react";
import { connect } from "dva";
import { Form, Button, Modal, message, Card, Spin } from "antd";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import Basic from "@/components/goods/add/basic";
import Sku from "@/components/goods/add/sku";
import Editor from "@/components/goods/add/editor";
import FreightOther from "@/components/goods/add/freightOther";
import PhotoGallery from "@/components/public/photoGallery";
import moment from "moment";
import styles from "./edit.css";

const FormItem = Form.Item;
@Form.create()
@connect(({ goods, goodsCategory, goodsSpec, freight, loading }) => ({
    goodsInfo: goods.info.result,
    goodsCategory: goodsCategory.list.result,
    specList: goodsSpec.list.result,
    freightList: freight.list.result,
    goodsListLoading: loading.effects["goods/list"],
    goodsInfoLoading: loading.effects["goods/info"],
    goodsCategoryLoading: loading.effects["goodsCategory/list"],
    specListLoading: loading.effects["goodsSpec/list"],
    freightListLoading: loading.effects["freightList/list"]
}))

export default class Add extends Component {
    static defaultProps = {
        goodsInfo: { info: {} },
        goodsCategory: { list: [] },
        specList: { list: [] },
        freightList: { list: [] },
        goodsListLoading: true,
        goodsInfoLoading: true,
        goodsCategoryLoading: true,
        specListLoading: true,
        freightListLoading: true
    };
    state = {
        photoGalleryVisible: false,
        photoGalleryOnOk: (e) => {
        },
        previewVisible: false,
        previewImage: "",
        shippingCostSelect: "freight",
        freightList: [],
        info: {},
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

    };

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
                        multiSpec: info.sku_list[0].spec[0].id > 0
                    });
                }
            }
        });
        dispatch({
            type: "goodsCategory/list"
        });
        this.refreshSpecList();
        this.refreshFreightList();
    }

    refreshSpecList = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "goodsSpec/list"
        });
    };
    refreshFreightList = (callback = () => {
    }) => {
        const { dispatch } = this.props;
        dispatch({
            type: "freight/list",
            payload: {
                page: 1,
                rows: 1000
            },
            callback
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
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                const { dispatch } = this.props;
                const { title, images, category_ids, body, skus, sale_time, freight_fee, freightData, freight_id } = values;
                const params = { title, images, category_ids, body, skus, freight_fee, freight_id, sale_time };
                if (freightData.key === "freight") {
                    params.freight_fee = freightData.value;
                } else if (freightData.key === "freight_id") {
                    params.freight_id = freightData.value;
                }
                if (sale_time.key === 0) {
                    params.sale_time = moment().unix();
                } else {
                    params.sale_time = sale_time.value.unix();
                }
                const id = this.state.info.id;
                dispatch({
                    type: "goods/edit",
                    payload: { ...params, id },
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
                                            multiSpec: info.sku_list[0].spec[0].id > 0
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

    // todo 重构涉及的组件，在当前页面直接输出
    render() {
        const { photoGalleryVisible, previewVisible, previewImage, shippingCostSelect, info, skus } = this.state;
        const { body, freight_fee, sale_time } = info;
        const { goodsCategory, freightList, form, goodsInfoLoading } = this.props;
        const { getFieldDecorator, getFieldValue } = form;
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
        if (!info.id) {
            return null;
        }
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true}>
                <Card bordered={false}>
                    <Spin size="large" spinning={goodsInfoLoading}>
                        <Form onSubmit={this.handleSubmit} style={{ width: 1000 }}>
                            <div className={styles.item}>
                                <h3>基本信息</h3>
                                <Basic
                                    location={this.props.location}
                                    history={this.props.history}
                                    formItemLayout={formItemLayout}
                                    openPhotoGallery={this.openPhotoGallery}
                                    categoryList={goodsCategory.list}
                                    openPreviewModal={this.openPreviewModal}
                                    images={info.images}
                                    title={info.title}
                                    form={form}
                                    categoryIds={info.category_ids}
                                />
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
                                <FreightOther
                                    getFieldDecorator={getFieldDecorator}
                                    formItemLayout={formItemLayout}
                                    freightList={freightList.list}
                                    shippingCostSelect={shippingCostSelect}
                                    refreshFreightList={this.refreshFreightList}
                                    freight_fee={freight_fee}
                                    sale_time={sale_time}
                                />
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


}
