//@flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Modal, message } from "antd";
import Page from '../../components/public/page'
import Basic from '../../components/goods/add/basic'
import Detail from '../../components/goods/add/detail'
import Editor from '../../components/goods/add/editor'
import Freight from '../../components/goods/add/detail/freight'
import PhotoGallery from '../../components/public/photoGallery'
import { formType, handleSubmitType, dispatchType } from '../../utils/flow'
import { getGoodsCategoryList } from '../../actions/goods/category'
import { getGoodsSpecList } from '../../actions/goods/spec'
import { Fetch } from "../../utils";
import moment from "moment";
import { GoodsApi } from "../../config/api/goods";
import { getFreightList } from "../../actions/deliver/freight";

const FormItem = Form.Item;
type SkusType = Array<{
    price: number | null,
    stock: number | null,
    code: string | null,
    weight: ? number | null,
    spec: Array<{
        id: number,
        name: string | null,
        value_id: number,
        value_name: string | null
    }>
}>
type Props = {
    location: { state: { type: string, record: {} }, search: string },
    form: formType,
    dispatch: dispatchType,
    categoryTree: Array<{}>,
    specList: Array<{
        id: number,
        name: string,
        values: Array<{
            id: number,
            name: string,
        }>
    }>,
    history: { goBack: Function, push: Function },
    freightList: Array<{
        id: number,
        name: string
    }>,
}

type State = {
    photoGalleryVisible: boolean,
    photoGalleryOnOk: Function,
    previewVisible: boolean,
    previewImage: string,
    photoGalleryOnOk: Function,
    shippingCostSelect: string,
    freightList: Array<{
        id: number,
        name: string
    }>,
    skus: SkusType,
    multiSpec: boolean
}

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
export default class Add extends Component<Props, State> {
    state = {
        photoGalleryVisible: false,
        photoGalleryOnOk: (e: any) => {
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
        dispatch(getGoodsCategoryList())
        dispatch(getGoodsSpecList())
        dispatch(getFreightList({ params: { page: 1, rows: 1000 } }))
    }

    refreshfreightList = (callback: Function) => {
        const {
            dispatch
        } = this.props
        dispatch(getFreightList(callback))
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
    handleSubmit = (e: handleSubmitType) => {
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
                    params.sale_time = sale_time.value
                }
                const e = await Fetch.fetch({
                    api: GoodsApi.add,
                    params
                })
                if (e.code === 0) {
                    message.success('添加成功')
                    this.props.history.goBack()
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
            </Page>
        )
    }
}
