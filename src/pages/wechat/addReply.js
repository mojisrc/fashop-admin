import React,{ Component } from 'react'
import { connect } from 'dva';
import { View } from "react-web-dom";
import { Form, Input, Icon, Button, Select, Radio, Card, Popover } from "antd";
import "@/styles/wechat/addReply.less";
import RouterBreadcrumb from "@/components/wechat/public/routerBreadcrumb";
import ModalNews from "@/components/public/wechatItem/modalNews";
import ModalLocalNews from "@/components/public/wechatItem/modalLocalNews";
import NewsModal from "@/components/public/wechatModal/newsModal";
import ImageModal from "@/components/public/wechatModal/imageModal";
import VoiceModal from "@/components/public/wechatModal/voiceModal";
import VideoModal from "@/components/public/wechatModal/videoModal";
import TextModal from "@/components/public/wechatModal/textModal";

import Image from "@/components/image";

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

let uuid = 0;
@Form.create()
@connect(
    ({view:{wechatAutoReply:{ keyWordsReplyList, keyWordsReplyListLoading }}}) => ({
        keyWordsReplyList,
        keyWordsReplyListLoading,
    }),

)
export default class AddReply extends Component {
    state = {
        newsVisible:false,
        localNewsVisible:false,
        imageVisible:false,
        textVisible:false,
        voiceVisible:false,
        videoVisible:false,
        textInit:'',
        reply_content_index:-1,
    }
    remove = (k:string) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        // if (keys.length === 1) {
        //     return;
        // }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    add = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(uuid);
        uuid++;
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    handleSubmit = (e:handleSubmitType) => {
        e.preventDefault();
        const { form, addAutoReplyKeywords } = this.props
        form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const { rule_name, key, match_mode, reply_content, reply_mode } = values
                let keywords = []
                key.map((match_modeItem,index) =>
                    keywords.push({
                        key:match_modeItem,
                        match_mode:match_mode[index]
                    })
                )
                let params = {
                    rule_name,
                    keywords,
                    reply_content,
                    reply_mode,
                }
                addAutoReplyKeywords({params})
            }
        });
    }
    render() {
        const { newsVisible, localNewsVisible, imageVisible, textVisible, voiceVisible, videoVisible, textInit, reply_content_index } = this.state
        const { history } = this.props
        const { getFieldDecorator, getFieldValue, setFieldsValue } = this.props.form;
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
                    span: 20,
                    offset: 3,
                },
            },
        };
        getFieldDecorator('reply_content', { initialValue: [] });
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => {
            return (
                <FormItem
                    {...formItemLayout}
                    label={' '}
                    colon={false}
                    key={k}
                >
                    {getFieldDecorator(`key[${k+1}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            whitespace: true,
                            message: "关键词必填!",
                        }],
                    })(
                        <Input
                            style={{ width: 440 }}
                            placeholder="关键词"
                            addonBefore={getFieldDecorator(`match_mode[${k+1}]`, {
                                validateTrigger: ['onChange', 'onBlur'],
                                initialValue:"contain",
                                rules: [{
                                    required: true,
                                    whitespace: true,
                                    message: "匹配模式必选!",
                                }],
                            })(
                                <Select>
                                    <Option value="contain">半匹配</Option>
                                    <Option value="equal">全匹配</Option>
                                </Select>
                            )}
                        />
                    )}
                    <a
                        style={{
                            color:'#f5222d',
                            marginLeft:'10px'
                        }}
                        onClick={() => this.remove(k)}
                    >
                        删除
                    </a>
                </FormItem>
            );
        });
        return (
            <View>
                <RouterBreadcrumb
                    pushFunc={()=>{
                        history.replace({
                            search:`?menu=2`
                        })
                    }}
                    oneLevel='关键词回复'
                    twoLevel='新增回复'
                />
                <Form
                    onSubmit={this.handleSubmit}
                    className={`addReplyForm`}
                >
                    <FormItem
                        {...formItemLayout}
                        label="规则名称"
                        extra="最多60个字"
                    >
                        {getFieldDecorator('rule_name', {
                            rules: [{
                                required: true,
                                message: '规则名称必填!'
                            }],
                        })(
                            <Input
                                placeholder='请输入规则名称'
                                style={{
                                    width:440
                                }}
                            />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='关键词'
                    >
                        {getFieldDecorator(`key[${0}]`, {
                            validateTrigger: ['onChange', 'onBlur'],
                            rules: [{
                                required: true,
                                whitespace: true,
                                message: "关键词必填!",
                            }],
                        })(
                            <Input
                                style={{ width: 440 }}
                                placeholder="关键词"
                                addonBefore={getFieldDecorator(`match_mode[${0}]`, {
                                    validateTrigger: ['onChange', 'onBlur'],
                                    initialValue:"contain",
                                    rules: [{
                                        required: true,
                                        whitespace: true,
                                        message: "匹配模式必选!",
                                    }],
                                })(
                                    <Select>
                                        <Option value="contain">半匹配</Option>
                                        <Option value="equal">全匹配</Option>
                                    </Select>
                                )}
                            />
                        )}
                    </FormItem>
                    {formItems}
                    <FormItem {...tailFormItemLayout}>
                        <a
                            onClick={this.add}
                        >
                            新增关键词
                        </a>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="回复内容"
                        required={true}
                    >
                        <Card
                            bodyStyle={{
                                padding:24
                            }}
                        >
                            {
                                getFieldValue('reply_content').map((replyItem,index) =>
                                    <View className='replyItem' key={index}>
                                        {
                                            replyItem.type==='text' ?
                                            <View className={`textContent`}>
                                                <span>{replyItem.content}</span>
                                            </View> :
                                            replyItem.type==='image' ?
                                            <View>
                                                <Image
                                                    style={{width: 98,marginBottom:24}}
                                                    src={`https://demo.fashop.cn/admin/mix/wechatImage?url=${replyItem.extra.url}`}
                                                />
                                            </View> :
                                            replyItem.type==='news' ?
                                            <View className={`newsContent contentItem`}>
                                                <ModalNews
                                                    extra={replyItem.extra}
                                                />
                                            </View> :
                                            replyItem.type==='local_news' ?
                                            <View className={`newsContent contentItem`}>
                                                <ModalLocalNews
                                                    extra={replyItem.extra}
                                                />
                                            </View> :
                                            replyItem.type==='video' ?
                                            <View className={`videoContent contentItem`}>
                                                <View className='videoContentIconView'>
                                                    <Icon type="video-camera" />
                                                </View>
                                                <p>{replyItem.extra.name}</p>
                                            </View> :
                                            replyItem.type==='voice' ?
                                            <View className={`voiceContent contentItem`}>
                                                <img
                                                    src={require('../../images/wechat/voice.png')}
                                                    style={{
                                                        width:70,
                                                        height:70,
                                                    }}
                                                />
                                                <p>
                                                    {replyItem.extra.name}
                                                </p>
                                            </View> : null
                                        }
                                        <View className={`reply_content_operation`}>
                                            {
                                                replyItem.type==='text' ?
                                                <a
                                                    onClick={()=>{
                                                        this.setState({
                                                            reply_content_index:index,
                                                            textVisible:true,
                                                            textInit:replyItem.content
                                                        })
                                                    }}
                                                >
                                                    编辑
                                                </a> : null
                                            }
                                            <a
                                                style={{
                                                    marginLeft:10
                                                }}
                                                onClick={()=>{
                                                    let newContent = getFieldValue('reply_content').concat()
                                                    newContent.splice(index,1)
                                                    setFieldsValue({
                                                        reply_content:newContent
                                                    })
                                                }}
                                            >
                                                删除
                                            </a>
                                        </View>
                                    </View>
                                )
                            }
                        </Card>
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Popover
                            placement='right'
                            overlayStyle={{
                                zIndex:999
                            }}
                            content={(
                                <View className='popoverView'>
                                    <p onClick={()=>{this.setState({newsVisible:true})}}>微信图文</p>
                                    <p onClick={()=>{this.setState({localNewsVisible:true})}}>高级图文</p>
                                    <p onClick={()=>{this.setState({imageVisible:true})}}>图片</p>
                                    <p onClick={()=>{this.setState({textVisible:true})}}>文字</p>
                                    <p onClick={()=>{this.setState({voiceVisible:true})}}>语音</p>
                                    <p onClick={()=>{this.setState({videoVisible:true})}}>视频</p>
                                </View>
                            )}
                        >
                            <a>
                                新增回复内容
                            </a>
                        </Popover>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="回复方式"
                    >
                        {getFieldDecorator('reply_mode',{
                            initialValue:"reply_all",
                            rules: [{
                                required: true,
                                message: "回复方式必选!",
                            }],
                        })(
                            <RadioGroup>
                                <Radio value="reply_all">回复全部</Radio>
                                <Radio value="random_one">随机回复一条</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                                marginRight:20
                            }}
                        >
                            保存
                        </Button>
                        <Button
                            onClick={()=>{
                                history.goBack()
                            }}
                        >
                            返回
                        </Button>
                    </FormItem>
                </Form>
                <NewsModal
                    {...this.props}
                    visible={newsVisible}
                    newsType='wechat'
                    close={()=>{
                        this.setState({newsVisible:false})
                    }}
                    onOk={(media_id,detail)=>{
                        setFieldsValue({
                            reply_content:[
                                ...getFieldValue('reply_content'),
                                {
                                    type:'news',
                                    media_id,
                                    extra:detail.content.news_item
                                }
                            ]
                        })
                    }}
                />
                <NewsModal
                    {...this.props}
                    visible={localNewsVisible}
                    newsType='local'
                    close={()=>{
                        this.setState({localNewsVisible:false})
                    }}
                    onOk={(local_news_id,detail)=>{
                        setFieldsValue({
                            reply_content:[
                                ...getFieldValue('reply_content'),
                                {
                                    type:'local_news',
                                    local_news_id,
                                    extra:detail.media,
                                }
                            ]
                        })
                    }}
                />
                <ImageModal
                    {...this.props}
                    visible={imageVisible}
                    newsType='wechat'
                    close={()=>{
                        this.setState({imageVisible:false})
                    }}
                    onOk={(media_id,detail)=>{
                        setFieldsValue({
                            reply_content:[
                                ...getFieldValue('reply_content'),
                                {
                                    type:'image',
                                    media_id,
                                    extra:{
                                        url:detail.url
                                    }
                                }
                            ]
                        })
                    }}
                />
                <TextModal
                    {...this.props}
                    visible={textVisible}
                    initialValue={textInit}
                    close={()=>{
                        this.setState({
                            textVisible:false,
                            textInit:'',
                            reply_content_index:-1
                        })
                    }}
                    onOk={(content)=>{
                        if(reply_content_index!==-1){
                            let newContent = getFieldValue('reply_content').concat()
                            newContent[reply_content_index] = {
                                type:'text',
                                content
                            }
                            setFieldsValue({
                                reply_content:newContent
                            })
                        }else {
                            setFieldsValue({
                                reply_content:[
                                    ...getFieldValue('reply_content'),
                                    {
                                        type:'text',
                                        content
                                    }
                                ]
                            })
                        }
                        this.setState({
                            textInit:'',
                            reply_content_index:-1
                        })
                    }}
                />
                <VoiceModal
                    {...this.props}
                    visible={voiceVisible}
                    newsType='wechat'
                    close={()=>{
                        this.setState({voiceVisible:false})
                    }}
                    onOk={(media_id,detail)=>{
                        setFieldsValue({
                            reply_content:[
                                ...getFieldValue('reply_content'),
                                {
                                    type:'voice',
                                    media_id,
                                    extra:{
                                        name:detail.name
                                    }
                                }
                            ]
                        })
                    }}
                />
                <VideoModal
                    {...this.props}
                    visible={videoVisible}
                    newsType='wechat'
                    rowSelectionType='radio'
                    close={()=>{
                        this.setState({videoVisible:false})
                    }}
                    onOk={(media_id,detail)=>{
                        setFieldsValue({
                            reply_content:[
                                ...getFieldValue('reply_content'),
                                {
                                    type:'video',
                                    media_id,
                                    extra:{
                                        name:detail.name
                                    }
                                }
                            ]
                        })
                    }}
                />
            </View>
        )
    }
}
