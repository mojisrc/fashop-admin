import React, { Component } from "react";
import { connect } from "dva";
import { Form, Button, Modal, message, Card, Spin } from "antd";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import Sku from "@/components/goods/add/sku";
import Editor from "@/components/goods/add/editor";
import PhotoGallery from "@/components/public/photoGallery";
import moment from "moment";
import styles from "./edit.css";

@Form.create()
@connect(({ goods, goodsCategory, goodsSpec, freight, loading }) => ({
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
    state = {
        photoGalleryVisible: false,
        photoGalleryOnOk: (e) => {
        },
        previewVisible: false,
        previewImage: '',
        shippingCostSelect: 'freight',
        freightList: [],
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
        ],
        // 是否为多规格
        multiSpec: false
    }

    componentDidMount() {
        const {
            dispatch,
        } = this.props
        dispatch(list())
        dispatch(specList())
        dispatch(list({ params: { page: 1, rows: 1000 } }))
    }

    refreshFreightList = (callback) => {
        const {
            dispatch
        } = this.props
        dispatch(list(callback))
    }
    openPhotoGallery = ({ photoGalleryOnOk }) => {
        this.setState({
            photoGalleryVisible: true,
            photoGalleryOnOk,
        })
    }
    onCancelPhotoGallery = () => {
        this.setState({
            photoGalleryVisible: false
        })
    }
    onOkPhotoGallery = (e) => {
        this.state.photoGalleryOnOk(e)
        this.onCancelPhotoGallery()
    }
    previewCancel = () => {
        this.setState({
            previewVisible: false
        })
    }
    // : { previewImage: string }
    openPreviewModal = ({ previewImage }) => {
        this.setState({
            previewVisible: true,
            previewImage,
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                const { title, images, category_ids, body, skus, sale_time, freight_fee, freightData, freight_id, } = values
                const params = { title, images, category_ids, body, skus, freight_fee, freight_id, sale_time }
                if (freightData.key === 'freight') {
                    params.freight_fee = freightData.value
                } else if (freightData.key === 'freight_id') {
                    params.freight_id = freightData.value
                }
                if (sale_time.key === 0) {
                    params.sale_time = moment().unix()
                } else {
                    params.sale_time = sale_time.value.unix()
                }
                const e = await Fetch.fetch({
                    api: GoodsApi.add,
                    params
                })
                if (e.code === 0) {
                    message.success('添加成功')
                    router.goBack()
                } else {
                    message.warn(e.msg)
                }
            }
        })
    }

    render() {
        const { photoGalleryVisible, previewVisible, previewImage, shippingCostSelect, skus, multiSpec } = this.state
        const { categoryTree, specList, freightList, form, } = this.props
        const { getFieldDecorator, getFieldValue, } = form
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 4,
                },
            },
        };
        return (
            <PageHeaderWrapper hiddenBreadcrumb={true}>
            <Card bordered={false}>
                <Form onSubmit={this.handleSubmit} style={{ width: 1000 }}>

                    <Detail
                        getFieldDecorator={getFieldDecorator}
                        formItemLayout={formItemLayout}
                        specList={specList}
                        skus={skus}
                        setSkus={(skus) => {
                            this.setState({ skus })
                        }}
                        multiSpec={multiSpec}
                        onMultiSpecChange={(e) => {
                            this.setState({
                                multiSpec: !!e.multi
                            })
                        }}
                    />
                    <FreightOther
                        getFieldDecorator={getFieldDecorator}
                        formItemLayout={formItemLayout}
                        freightList={freightList}
                        shippingCostSelect={shippingCostSelect}
                        refreshFreightList={this.refreshFreightList}
                        freight_fee={0}
                    />
                    <Editor
                        getFieldDecorator={getFieldDecorator}
                        formItemLayout={formItemLayout}
                        getFieldValue={getFieldValue}
                        openPhotoGallery={this.openPhotoGallery}
                    />
                    <FormItem {...tailFormItemLayout}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                                marginRight: 10
                            }}
                        >
                            上架出售
                        </Button>
                        {/*<Button htmlType="submit">*/}
                        {/*放入仓库*/}
                        {/*</Button>*/}
                    </FormItem>
                </Form>
                <PhotoGallery
                    visible={photoGalleryVisible}
                    onCancel={this.onCancelPhotoGallery}
                    onOk={this.onOkPhotoGallery}
                />
                <Modal visible={previewVisible} footer={null} onCancel={this.previewCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </Card>
            </PageHeaderWrapper>
        )
    }
}
