//@flow
import React,{ Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import * as actions from "../../actions/shop";
import { Form, Input,  Button, Modal,Radio } from 'antd';
import { View } from "react-web-dom";
import Page from '../../components/public/page'
import { formType, handleSubmitType } from '../../utils/flow'
import UploadImage from "../../components/uploadImage";
import Editor from "../../components/shop/shopIndex/editor"
import PhotoGallery from '../../components/public/photoGallery'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
type Props = {
    form:formType,
    getShopInfo:Function,
    editIndexInfo:Function,
    shopInfo:{
        info:{
            top_desc:string,
            ads_status: 0 | 1,
            ads_img:string,
            ads_title:string,
            ads_title_sec:string,
        }
    },
}
type State = {
    photoGalleryVisible: boolean,
    photoGalleryOnOk: Function,
    previewVisible: boolean,
    previewImage: string,
    photoGalleryOnOk: Function
}

@Form.create()
@connect(
    ({view:{shop:{ shopInfo }}}) => ({
        shopInfo
    }),
    dispatch => bindActionCreators(actions,dispatch),
)
export default class BasicInfo extends Component<Props,State> {
    state = {
        photoGalleryVisible: false,
        photoGalleryOnOk: (e: any) => {
        },
        previewVisible: false,
        previewImage: ''
    }
    componentDidMount(){
        this.props.getShopInfo()
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
    handleSubmit = (e:handleSubmitType) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.editIndexInfo({
                    params:values
                })
            }
        })
    }
    render() {
        const { photoGalleryVisible, previewVisible, previewImage } = this.state
        const { form, shopInfo } = this.props

        const { getFieldDecorator,getFieldValue } = form
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
                    {/*<FormItem*/}
                        {/*{...formItemLayout}*/}
                        {/*label="店铺域名"*/}
                    {/*>*/}
                        {/*{getFieldDecorator('host',{*/}
                            {/*initialValue:'http://www.domain.cn',*/}
                        {/*})(*/}
                            {/*<Input*/}
                                {/*disabled*/}
                                {/*style={{ width: '100%' }}*/}
                            {/*/>*/}
                        {/*)}*/}
                    {/*</FormItem>*/}
                    <FormItem
                        label="顶部标语"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('top_desc', {
                            initialValue:shopInfo.info&&shopInfo.info.top_desc,
                        })(
                            <Input
                                placeholder="输入顶部标语"
                                style={{ width: '100%' }}
                            />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="广告设置"
                    >
                        {getFieldDecorator('ads_status', {
                            initialValue:shopInfo.info&&shopInfo.info.ads_status,

                        })(
                            <RadioGroup>
                                <Radio value={1}>开启</Radio>
                                <Radio value={0}>关闭</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        extra="建议尺寸：375 x 180 像素，支持.jpg、.gif、.png格式"
                        label="广告封面"
                    >
                        {getFieldDecorator('ads_img', {
                            initialValue:shopInfo.info&&shopInfo.info.ads_img,

                            valuePropName: 'url',
                        })(
                            <UploadImage />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="广告标题"
                    >
                        {getFieldDecorator('ads_title',{
                            initialValue:shopInfo.info&&shopInfo.info.ads_title,
                        })(
                            <Input
                                placeholder="请输入标题"
                                style={{ width: '100%' }}
                            />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="广告副标题"
                    >
                        {getFieldDecorator('ads_title_sec',{
                            initialValue:shopInfo.info&&shopInfo.info.ads_title_sec,
                        })(
                            <Input
                                placeholder="请输入副标题"
                                style={{ width: '100%' }}
                            />
                        )}
                    </FormItem>

                    <Editor
                        getFieldDecorator={getFieldDecorator}
                        formItemLayout={formItemLayout}
                        getFieldValue={getFieldValue}
                        openPhotoGallery={this.openPhotoGallery}
                        ads_body={shopInfo.info ? shopInfo.info.ads_body : null}
                    />
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
