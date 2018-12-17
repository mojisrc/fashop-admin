import React,{ Component } from 'react'

import { connect } from 'dva';
import * as actions from "../../actions/wechat";
import { Form, Input, Button, Select } from 'antd'
import PageHeaderWrapper from '@/components/pageHeaderWrapper';
import UploadImage from "@/components/uploadImage";
import { formType, historyType } from "@/utils/flow";

const { TextArea } = Input
const FormItem = Form.Item;
const Option = Select.Option;


@connect(
    ({view:{wechat:{ wechatConfigInfo }}}) => ({
        wechatConfigInfo
    }),

)
@Form.create()
export default class BindOfficialAccounts extends Component {
    handleSubmit = (e:{preventDefault:Function}) => {
        e.preventDefault();
        const { form, editConfig } = this.props
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                editConfig({
                    params:values
                })
                router.goBack()
            }
        });
    }
    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 3 },
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
                    span: 14,
                    offset: 3,
                },
            },
        };
        const accountType = [
            {
                id:1,
                title:'普通订阅号',
            }, {
                id:2,
                title:'普通服务号',
            }, {
                id:3,
                title:'认证订阅号',
            }, {
                id:4,
                title:'认证服务号/认证媒体/政府订阅号',
            }
        ]
        const { getFieldDecorator } = this.props.form;
        return (
            <Page >
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="公众号名称"
                        extra="填写公众号的账号名称"
                    >
                        {getFieldDecorator('name', {
                            rules: [{
                                required: true, message: '请填写公众号的账号名称!',
                            }],
                        })(
                            <Input
                                placeholder='请输入'
                                style={{
                                    width:440
                                }}
                            />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='公众号描述'
                        extra="用于说明此公众号的功能及用途"
                    >
                        {getFieldDecorator("description", {
                            rules: [
                                {
                                    required: true,
                                    message: "请填写公众号描述!",
                                }
                            ]
                        })(
                            <TextArea
                                placeholder='请输入'
                                autosize={{ minRows: 4, maxRows: 6 }}
                            />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="账号"
                        extra="填写公众号的账号，一般为英文账号，如：9476400@qq.com"
                    >
                        {getFieldDecorator('account', {
                            rules: [{
                                required: true, message: '请填写公众号的账号名称!',
                            }],
                        })(
                            <Input
                                placeholder='请输入'
                                style={{
                                    width:440
                                }}
                            />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="原始ID"
                        extra="原始ID，原始ID不能修改，请谨慎填写，如：gh_9468ce6ce474"
                    >
                        {getFieldDecorator('original', {
                            rules: [{
                                required: true, message: '请填写公众号的账号名称!',
                            }],
                        })(
                            <Input
                                placeholder='请输入'
                                style={{
                                    width:440
                                }}
                            />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="账号类型"
                        extra='注意：即使公众平台显示为“未认证” 但只要【公众号设置】/【账号详情】下【认证情况】显示资质审核通过，即可认定为认证号'
                    >
                        {getFieldDecorator('level', {
                            rules: [
                                { required: true, message: '请选择账号类型!' },
                            ],
                        })(
                            <Select
                                placeholder="请选择账号类型"
                                style={{
                                    width:440
                                }}
                            >
                                {
                                    accountType.map((accountTypeItem,index)=>
                                        <Option
                                            key={index}
                                            value={accountTypeItem.id}
                                        >
                                            {
                                                accountTypeItem.title
                                            }
                                        </Option>
                                    )
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="AppId"
                        extra="请填写微信公众平台后台的AppId"
                    >
                        {getFieldDecorator('app_key', {
                            rules: [{
                                required: true, message: '请填写公众号的账号名称!',
                            }],
                        })(
                            <Input
                                placeholder='请输入'
                                style={{
                                    width:440
                                }}
                            />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="AppSecret"
                        extra="请填写微信公众平台后台的AppSecret"
                    >
                        {getFieldDecorator('app_secret', {
                            rules: [{
                                required: true, message: '请填写公众号的账号名称!',
                            }],
                        })(
                            <Input
                                placeholder='请输入'
                                style={{
                                    width:440
                                }}
                            />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        extra="图片格式只支持：BMP、JPEG、JPG、GIF、PNG，大小不超过2M"
                        label="上传头像"
                    >
                        {getFieldDecorator('headimg', {
                            rules: [{
                                required: true,
                                message: '请上传头像!',
                            }],
                            valuePropName: 'url',
                        })(
                            <UploadImage />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="上传二维码"
                    >
                        {getFieldDecorator('qrcode', {
                            rules: [{
                                required: true,
                                message: '请上传二维码!',
                            }],
                            valuePropName: 'url',
                        })(
                            <UploadImage />
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                                marginRight:'20px'
                            }}
                        >
                            提交
                        </Button>
                        <Button
                            onClick={()=>{
                                router.goBack()
                            }}
                        >
                            返回
                        </Button>
                    </FormItem>
                </Form>
            </Card>
        )
    }
}
