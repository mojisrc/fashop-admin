//@flow
import React,{ Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import * as actions from "../../actions/shop";
import { Form, Input,  Button } from 'antd';
import { View } from "react-web-dom";
import Page from '../../components/public/page'
import { formType, handleSubmitType } from '../../utils/flow'
import UploadImage from "../../components/uploadImage";

const { TextArea } = Input;
const FormItem = Form.Item;

type Props = {
    form:formType,
    getShopInfo:Function,
    editShopInfo:Function,
    shopInfo:{
        info:{
            logo:string,
            name:string,
            contact_number:string,
            description:string,
        }
    },
}
type State = {

}

@Form.create()
@connect(
    ({view:{shop:{ shopInfo }}}) => ({
        shopInfo
    }),
    dispatch => bindActionCreators(actions,dispatch),
)
export default class BasicInfo extends Component<Props,State> {
    componentDidMount(){
        this.props.getShopInfo()
    }
    handleSubmit = (e:handleSubmitType) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.props.editShopInfo({
                    params:values
                })
            }
        })
    }
    render() {
        const { form, shopInfo } = this.props
        const { getFieldDecorator } = form
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 18 },
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
                    offset: 6,
                },
            },
        };
        return (
            <Page>
                {/* <h3>店铺信息</h3> */}
                <Form onSubmit={this.handleSubmit} style={{maxWidth: '600px'}}>
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
                        {...formItemLayout}
                        extra="建议尺寸：200 x 200 像素小于120KB，支持.jpg、.gif、.png格式"
                        label="店铺logo"
                    >
                        {getFieldDecorator('logo', {
                            initialValue:shopInfo.info&&shopInfo.info.logo,
                            rules: [{
                                required: true,
                                message: 'Please Upload logo',
                            }],
                            valuePropName: 'url',
                        })(
                            <UploadImage />
                        )}
                    </FormItem>
                    <FormItem
                        label="店铺名称"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('name', {
                            initialValue:shopInfo.info&&shopInfo.info.name,
                            rules: [{
                                required: true,
                                message: 'Please input shop name!'
                            }],
                        })(
                            <Input
                                placeholder="输入店铺名称"
                                style={{ width: '100%' }}
                            />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="联系电话"
                    >
                        {getFieldDecorator('contact_number',{
                            initialValue:shopInfo.info&&shopInfo.info.contact_number,
                        })(
                            <Input
                                placeholder="输入联系电话"
                                style={{ width: '100%' }}
                            />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="店铺简介"
                        extra="微信分享店铺给好友时会显示这里的文案"
                    >
                        {getFieldDecorator('description',{
                            initialValue:shopInfo.info&&shopInfo.info.description,
                        })(
                            <TextArea
                                placeholder="请输入简介"
                                autosize={{ minRows: 3, maxRows: 6 }}
                                style={{ width: '100%' }}
                            />
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">保存</Button>
                    </FormItem>
                </Form>
            </Page>
        )
    }
}
