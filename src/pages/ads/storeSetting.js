//@flow
import React,{ Component } from "react";
import { connect } from "react-redux";
import {getAdsInfo,saveAdsInfo} from "../../actions/ads"
import { Form,  Button, Modal } from 'antd';
import { View } from "react-web-dom";
import Page from '../../components/public/page'
import { formType, handleSubmitType } from '../../utils/flow'
import {UploadGroupImage} from "../../components/uploadImage";
import PhotoGallery from '../../components/public/photoGallery'
import {getGoodsCategoryList} from "../../actions/goods/category";
import {getGoodsSpecList} from "../../actions/goods/spec";
import {getFreightList} from "../../actions/deliver/freight";

const FormItem = Form.Item;
type Props = {
    form:formType,
}
type State = {
    photoGalleryVisible: boolean,
    photoGalleryOnOk: Function,
    previewVisible: boolean,
    previewImage: string,
    adsInfo: Array,
}

@Form.create()
@connect()
export default class StoreSetting extends Component<Props,State> {
    state = {
        photoGalleryVisible: false,
        photoGalleryOnOk: (e: any) => {
        },
        previewVisible: false,
        previewImage: '',
        adsInfo: null
    };
    async componentDidMount(){
        const response = await getAdsInfo();
        if (response.code === 0) {
            const { list } = response.result;
            const tmpArray = new Array(0);
            for(let i = 0; i < list.length; i++){
                tmpArray.push(list[i].img);
            }
            this.setState({
                adsInfo:tmpArray
            })
        }
    };
    openPhotoGallery = ({ photoGalleryOnOk }: { photoGalleryOnOk: Function }) => {
        this.setState({
            photoGalleryVisible: true,
            photoGalleryOnOk,
        })
    };
    openPreviewModal = ({ previewImage }: { previewImage: string }) => {
        this.setState({
            previewVisible: true,
            previewImage,
        })
    };
    onCancelPhotoGallery = () => {
        this.setState({
            photoGalleryVisible: false
        })
    };
    onOkPhotoGallery = (e: any) => {
        this.state.photoGalleryOnOk(e)
        this.onCancelPhotoGallery()
    };
    previewCancel = () => {
        this.setState({
            previewVisible: false
        })
    };
    handleSubmit = (e:handleSubmitType) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const images = values.images;
                saveAdsInfo({ params : { images } });
            }
        })
    };
    render() {
        const { photoGalleryVisible, previewVisible, previewImage,adsInfo } = this.state
        console.log(adsInfo);
        const { form } = this.props
        const { getFieldDecorator } = form
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
                {/* <h3>店铺信息</h3> */}
                <Form onSubmit={this.handleSubmit} style={{maxWidth: '1000px'}}>
                    <FormItem
                        {...formItemLayout}
                        extra="建议尺寸：375 x 180 像素，支持.jpg、.gif、.png格式"
                        label='顶部轮播广告'
                    >
                        {getFieldDecorator('images', {
                            rules: [{ required: true, message: '请选择广告图!' }],
                            valuePropName: 'url',
                            initialValue: adsInfo,
                        })(
                            <UploadGroupImage
                                onClick={(onChange, values) => {
                                    values = values ? values : []
                                    this.openPhotoGallery({
                                        photoGalleryOnOk: (e) => {
                                            onChange([...e, ...values])
                                        }
                                    })
                                }}
                                preview={(previewImage) => {
                                    this.openPreviewModal({
                                        previewImage,
                                    })
                                }}
                            />
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">保存</Button>
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
