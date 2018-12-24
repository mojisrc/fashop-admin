import React, { Component } from "react";
import { connect } from "dva";
import { Form, Button, Modal, message, Card,Spin } from "antd";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import Basic from "@/components/goods/add/basic";
import Detail from "@/components/goods/add/detail";
import Editor from "@/components/goods/add/editor";
import Freight from "@/components/goods/add/detail/freight";
import PhotoGallery from "@/components/public/photoGallery";
import moment from "moment";
import Arr from "@/utils/array";

const FormItem = Form.Item;

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

@Form.create()
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
        ],
        // 是否为多规格
        multiSpec: false
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
                    }, () => {
                        dispatch({
                            type: "goodsCategory/list"
                        });
                        dispatch({
                            type: "goodsSpec/list"
                        });
                        dispatch({
                            type: "freight/list",
                            payload: {
                                page: 1,
                                rows: 1000
                            }
                        });
                    });
                }
            }
        });
    }

    refreshfreightList = (callback) => {
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
                dispatch({
                    type: "goods/edit",
                    payload: { ...params, id: this.state.info.id },
                    callback: (e) => {
                        if (e.code === 0) {
                            message.success("修改成功");
                            dispatch({
                                type: "goods/info",
                                payload: { id }
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
        const { photoGalleryVisible, previewVisible, previewImage, shippingCostSelect, info, skus, multiSpec } = this.state;
        const { body, freight_fee, sale_time } = info;
        const { goodsCategory, specList, freightList, form, goodsInfoLoading } = this.props;
        let tree = Arr.toTree(goodsCategory.list)
        const categoryTree = categoryTreeData(tree);
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
                                specList={specList.list}
                                skus={skus}
                                setSkus={(skus) => {
                                    this.setState({ skus });
                                }}
                                multiSpec={multiSpec}
                                onMultiSpecChange={(e) => {
                                    this.setState({
                                        multiSpec: !!e.multi
                                    });
                                }}
                            />
                            <Freight
                                getFieldDecorator={getFieldDecorator}
                                formItemLayout={formItemLayout}
                                freightList={freightList.list}
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
                            <img alt="example" style={{ width: "100%" }} src={previewImage} />
                        </Modal>
                    </Spin>
                </Card>
            </PageHeaderWrapper>
        );
    }
}
const categoryTreeData = (list) => {
    // console.log(list)
    return list.map((e) => {
        return {
            title: e.name,
            value: `${e.id}`,
            key: `${e.id}`,
            children: categoryTreeData(e.children || [])
        };
    });
};
