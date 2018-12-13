import React, { Component } from "react";
import { connect } from 'dva';
import { Form, Button, Modal, message } from "antd";
import Page from '@/components/public/page'
import Basic from '@/components/goods/add/basic'
import Detail from '@/components/goods/add/detail'
import Editor from '@/components/goods/add/editor'
import Freight from '@/components/goods/add/detail/freight'
import PhotoGallery from '@/components/public/photoGallery'

import { Fetch, publicFunction } from "@/utils";
import moment from "moment";
import GoodsApi from "@/services/goods";

import { query } from "@/utils/fa"

const FormItem = Form.Item;
@connect(({
              view: {
                  goods: {
                      categoryTree,
                      specList
                  },
                  freight: {
                      list: freightList
                  },
              }
          }) => ({
    categoryTree,
    specList,
    freightList,
}))
@Form.create()
export default class Add extends Component {
    state = {
        photoGalleryVisible: false,
        photoGalleryOnOk: (e: any) => {
        },
        previewVisible: false,
        previewImage: '',
        shippingCostSelect: 'freight',
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
        ],
        // 是否为多规格
        multiSpec: false
    }

    async componentWillMount() {
        const { dispatch, location } = this.props
        const { id } = query.getParams()
        const response = await info({ params: { id } })

        if (response.code === 0) {
            const { info } = response.result
            this.setState({
                info,
                skus: info.sku_list,
                multiSpec: info.sku_list[0].spec[0].id > 0,
            }, () => {
                dispatch(list())
                dispatch(specList())
                dispatch(list({ params: { page: 1, rows: 1000 } }))
            })
        }

    }

    refreshfreightList = (callback: Function) => {
        const { dispatch } = this.props
        dispatch(list(callback))
    }
    openPhotoGallery = ({ photoGalleryOnOk }: { photoGalleryOnOk: Function }) => {
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
    onOkPhotoGallery = (e: any) => {
        this.state.photoGalleryOnOk(e)
        this.onCancelPhotoGallery()
    }
    previewCancel = () => {
        this.setState({
            previewVisible: false
        })
    }
    openPreviewModal = ({ previewImage }: { previewImage: string }) => {
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
                    api: GoodsApi.edit,
                    params: { ...params, id: this.state.info.id }
                })
                if (e.code === 0) {
                    message.success('修改成功')
                    this.props.history.goBack()
                } else {
                    message.warn(e.msg)
                }
            }
        })
    }

    render() {
        const { photoGalleryVisible, previewVisible, previewImage, shippingCostSelect, info, skus, multiSpec } = this.state
        const { body, freight_fee, sale_time } = info
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
        if (!info.id) {
            return null
        }
        return (
            <Page>
                <Form onSubmit={this.handleSubmit} style={{ width: 1000 }}>
                    <Basic
                        location={this.props.location}
                        form={this.props.form}
                        history={this.props.history}
                        formItemLayout={formItemLayout}
                        openPhotoGallery={this.openPhotoGallery}
                        categoryTree={categoryTree}
                        openPreviewModal={this.openPreviewModal}
                        images={info.images}
                        title={info.title}
                        categoryIds={info.category_ids}
                    />
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
                    <Freight
                        getFieldDecorator={getFieldDecorator}
                        formItemLayout={formItemLayout}
                        freightList={freightList}
                        shippingCostSelect={shippingCostSelect}
                        refreshfreightList={this.refreshfreightList}
                        freight_fee={freight_fee}
                        sale_time={sale_time}
                    />
                    <Editor
                        getFieldDecorator={getFieldDecorator}
                        formItemLayout={formItemLayout}
                        getFieldValue={getFieldValue}
                        openPhotoGallery={this.openPhotoGallery}
                        body={body}
                    />
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
            </Page>
        )
    }
}
