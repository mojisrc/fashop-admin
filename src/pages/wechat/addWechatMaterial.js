
import React,{ Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import * as actions from "../../actions/wechat/material";
import { View } from "react-web-dom";
import { Row, Col, Card, Form, Input, Button, Upload, Icon, message, Checkbox, Popover } from "antd";
import RouterBreadcrumb from "../../components/wechat/public/routerBreadcrumb";
import InputFile from "../../components/inputFile";
import styles from "../../styles/wechat/addMaterial.css";
import Editor from "react-umeditor";
import {
    handleSubmitType,
    formType,
    historyType,
} from "../../utils/flow";
import { Fetch } from '../../utils'
import { env } from '../../config/root'

const FormItem = Form.Item;
const { TextArea } = Input;
@connect(
    ({view:{material:{ wechatMaterialInfo }}}) => ({
        wechatMaterialInfo
    }),
    dispatch => bindActionCreators(actions,dispatch),
)
export default class AddMaterial extends Component {
    current:{
        title: string,
        thumb_media_id: string,
        thumb_url: string,
        show_cover_pic: number,
        author: string,
        digest: string,
        content: string,
        content_source_url: string
    }
    state = {
        media:[
            {
                title: '我是标题',
                thumb_media_id: '',
                thumb_url: '',
                show_cover_pic: 0,
                author: '我是作者',
                digest: '我是摘要',
                content: '我是正文',
                content_source_url: ''
            }
        ],
        active:0,
    }
    getIcons(){
		var icons = [
			"source | undo redo | bold italic underline strikethrough fontborder emphasis | ",
			"paragraph fontfamily fontsize | superscript subscript | ",
			"forecolor backcolor | removeformat | insertorderedlist insertunorderedlist | selectall | ",
			"cleardoc  | indent outdent | justifyleft justifycenter justifyright | touppercase tolowercase | ",
			"horizontal date time  | image emotion spechars | inserttable"
		]
		return icons;
	}
	getPlugins(){
		return {
			"image": {
				"uploader": {
					"name":"file",
					"url": "/api/upload"
				}
			}
		}
	}
    render() {
        const { history, pathSearch } = this.props
        const { media, active } = this.state
        let current = media[active]
        let icons = this.getIcons();
        let plugins = this.getPlugins();
        return (
            <View>
                <RouterBreadcrumb
                    pushFunc={()=>{
                        history.replace({
                            search:`?menu=6`
                        })
                    }}
                    oneLevel='图文消息'
                    twoLevel='新建微信图文'
                />
                <Row
                    gutter={24}
                    className={styles.row}
                >
                    <Col span={9}>
                        <View className={styles.leftTop}>
                            <img
                                alt=''
                                src={(require('../../images/wechat/diyPhone.png'))}
                            />
                        </View>
                        <View className={styles.leftContent}>
                            {
                                pathSearch.num==='single' ?
                                <LeftContentSingle
                                    {...this.props}
                                    media={media[0]}
                                    changeMedia={({media})=>{
                                        this.setState({
                                            media
                                        })
                                    }}
                                /> :
                                <LeftContentMany
                                    {...this.props}
                                    media={media}
                                    active={active}
                                    changeMedia={({media})=>{
                                        this.setState({
                                            media
                                        })
                                    }}
                                    changeActive={({active})=>{
                                        this.setState({
                                            active
                                        })
                                    }}
                                />
                            }
                        </View>
                    </Col>
                    <Col span={15}>
                        <Card
                            title={pathSearch.num==='single' ? '单条图文' : '多条图文'}
                            style={{ width: '100%' }}
                            className={styles.rightCard}
                        >
                            <View>
                                <CardContent
                                    {...this.props}
                                    media={media}
                                    active={active}
                                    changeMedia={({media})=>{
                                        this.setState({
                                            media
                                        })
                                    }}
                                    changeActive={({active})=>{
                                        this.setState({
                                            active
                                        })
                                    }}
                                />
                                <Editor
                                    icons={icons}
                                    plugins={plugins}
                                    value={current.content}
                                    onChange={(content)=>{
                                        let newMedia = [...media]
                                        let newCurrent = {...current}
                                        newCurrent.content=content
                                        newMedia.splice(active, 1, newCurrent)
                                        this.setState({
                                            media:newMedia
                                        })
                                    }}
                                />
                            </View>
                        </Card>
                    </Col>
                </Row>
            </View>
        )
    }
}

class LeftContentSingle extends Component<
    {
        media:{
            title: string,
            thumb_media_id: string,
            thumb_url: string,
            show_cover_pic: number,
            author: string,
            digest: string,
            content: string,
            content_source_url: string
        },
        changeMedia:Function
    },{}>{
    render(){
        const { media } = this.props
        return(
            <View className={styles.singleView}>
                <View className={styles.singleTop}>
                    <img
                        alt=''
                        src={media.thumb_url}
                    />
                </View>
                <View className={styles.singleBot}>
                    <p style={{margin:0}}>{media.title}</p>
                    {
                        media.digest&&media.digest.length ?
                        <span>{media.digest}</span> : null
                    }
                </View>
                <a>
                    编辑
                </a>
                <View className={styles.cover}/>
            </View>
        )
    }
}

class LeftContentMany extends Component<
    {
        media:Array<{
            title: string,
            thumb_media_id: string,
            thumb_url: string,
            show_cover_pic: number,
            author: string,
            digest: string,
            content: string,
            content_source_url: string
        }>,
        active:number,
        changeMedia:Function,
        changeActive:Function,
    },{}>{
    componentDidMount(){
        const { changeMedia, media } = this.props
        changeMedia({
            media:[...media, {
                title: '标题',
                thumb_media_id: '',
                thumb_url: '',
                show_cover_pic: 0,
                author: '作者',
                digest: '摘要',
                content: '正文',
                content_source_url: ''
            }]
        })
    }
    render(){
        const { media, active, changeMedia, changeActive } = this.props
        return(
            <Popover
                visible={true}
                placement='bottom'
                content={(
                    <View
                        className={styles.popoverContent}
                        onClick={()=>{
                            media.length===8 ?
                            message.warning('内容最多 8 个',1) :
                            changeMedia({
                                media:[...media,{
                                    title: '标题',
                                    thumb_media_id: '',
                                    thumb_url: '',
                                    show_cover_pic: 1,
                                    author: '作者',
                                    digest: '摘要',
                                    content: '正文',
                                    content_source_url: ''
                                }]
                            })
                        }}
                    >
                        <Icon type="plus" />
                    </View>
                )}
            >
                <View className={styles.listView}>
                    {
                        media.map((mediaItem,index)=>
                            index===0 ?
                            <View
                                className={`${styles.listItem} ${styles.itemOne} ${active===index ? styles.activeItem : ''}`}
                                key={index}
                                onClick={()=>{
                                    changeActive({
                                        active:index
                                    })
                                }}
                            >
                                <View>
                                    <img
                                        alt=''
                                        src={mediaItem.thumb_url}
                                    />
                                </View>
                                <p style={{margin:0}}>{mediaItem.title}</p>
                                <View className={styles.cover}/>
                            </View> :
                            <View
                                className={`${styles.listItem} ${styles.item} ${active===index ? styles.activeItem : ''}`}
                                key={index}
                                onClick={()=>{
                                    changeActive({
                                        active:index
                                    })
                                }}
                            >
                                <View>
                                    <p>{mediaItem.title}</p>
                                </View>
                                <View>
                                    <img
                                        alt=''
                                        src={mediaItem.thumb_url}
                                    />
                                </View>
                                <View className={styles.cover}/>
                            </View>
                        )
                    }
                </View>
            </Popover>
        )
    }
}

class CardContent extends Component<
    {
        media:Array<{
            title: string,
            thumb_media_id: string,
            thumb_url: string,
            show_cover_pic: number,
            author: string,
            digest: string,
            content: string,
            content_source_url: string
        }>,
        active:number,
        pathSearch:{
            num:string
        },
        addMaterial:Function,
        changeMedia:Function,
        changeActive:Function
    },{}>{
    current:{
        title: string,
        thumb_media_id: string,
        thumb_url: string,
        show_cover_pic: number,
        author: string,
        digest: string,
        content: string,
        content_source_url: string
    }
    render(){
        const { media, active, pathSearch, changeMedia, addMaterial } = this.props
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 3 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 19 },
            },
        }
        const formTailLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 19, offset: 3 },
        }
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        }
        const uploadButton = (
            <View className={styles.uploadBtnView}>
                <Icon type='plus' />
                <p>上传</p>
            </View>
        )
        let current = media[active]
        return(
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="标题"
                    required
                    help={current.title&&current.title.length ? '' : '正文必填！'}
                    hasFeedback={current.title&&current.title.length ? false : true}
                    validateStatus={current.title&&current.title.length ? '' : 'error'}
                >
                    <Input
                        placeholder="输入标题"
                        value={current.title}
                        onChange={(e)=>{
                            let newMedia = [...media]
                            let newCurrent = {...current}
                            newCurrent.title=e.target.value
                            newMedia.splice(active, 1, newCurrent)
                            changeMedia({
                                media:newMedia
                            })
                        }}
                    />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="作者"
                >
                    <Input
                        placeholder="输入作者"
                        value={current.author}
                        onChange={(e)=>{
                            let newMedia = [...media]
                            let newCurrent = {...current}
                            newCurrent.author=e.target.value
                            newMedia.splice(active, 1, newCurrent)
                            changeMedia({
                                media:newMedia
                            })
                        }}
                    />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="封面"
                    extra='建议尺寸：900*500 像素 图片格式png、jpg'
                >
                    <Upload
                        listType="picture-card"
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        customRequest={({file})=>{
                            let formData = new FormData()
                            formData.append('media',file)
                            let url = `${env.domain}/admin/wechat/materialUploadThumb`
                            Fetch.formData(url,formData)
                            .then((e)=>{
                                if(e.code===0){
                                    // message.success('上传成功！')
                                    let newMedia = [...media]
                                    let newCurrent = {...current}
                                    newCurrent.thumb_media_id = e.result.media_id
                                    newCurrent.thumb_url = e.result.url
                                    newMedia.splice(active, 1, newCurrent)
                                    changeMedia({
                                        media:newMedia
                                    })
                                }
                            })
                        }}
                    >
                        {
                            current.thumb_url.length ?
                            <img
                                src={current.thumb_url}
                                alt=''
                                style={{
                                    width:102,
                                    height:102,
                                }}
                            /> :
                            uploadButton
                        }
                    </Upload>
                </FormItem>
                <FormItem {...formTailLayout}>
                    <Checkbox
                        checked={current.show_cover_pic ? true : false}
                        onChange={(e)=>{
                            let newMedia = [...media]
                            let newCurrent = {...current}
                            newCurrent.show_cover_pic=e.target.checked ? 1 : 0
                            newMedia.splice(active, 1, newCurrent)
                            changeMedia({
                                media:newMedia
                            })
                        }}
                    >
                        封面图显示在正文中
                    </Checkbox>
                </FormItem>
                {
                    pathSearch.num==='single' ?
                    <FormItem
                        {...formItemLayout}
                        label="摘要"
                    >
                        <TextArea
                            placeholder="请输入摘要"
                            autosize={{ minRows: 3, maxRows: 6 }}
                            value={current.digest}
                            onChange={(e)=>{
                                let newMedia = [...media]
                                let newCurrent = {...current}
                                newCurrent.digest=e.target.value
                                newMedia.splice(active, 1, newCurrent)
                                changeMedia({
                                    media:newMedia
                                })
                            }}
                        />
                    </FormItem> : null
                }
                <FormItem
                    {...formItemLayout}
                    label="正文"
                    required
                    help={current.content&&current.content.length ? '' : '正文必填！'}
                    hasFeedback={current.content&&current.content.length ? false : true}
                    validateStatus={current.content&&current.content.length ? '' : 'error'}
                />
                <FormItem
                    // {...tailFormItemLayout}
                    style={{
                        position: 'absolute',
                        top:540,
                        left: '-200px',
                    }}
                >
                    <Button
                        type="primary"
                        // htmlType="submit"
                        style={{
                            marginRight:20
                        }}
                        onClick={()=>{
                            addMaterial({
                                params:{
                                    media
                                }
                            })
                        }}
                    >
                        保存
                    </Button>
                    <Button>预览</Button>
                </FormItem>
            </Form>
        )
    }
}

function beforeUpload(file) {
    const isImage = file.type.includes('image')!==-1;
    if (!isImage) {
        message.error('你只能上传图片!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('图片不能超过2MB!');
    }
    return isImage && isLt2M;
}
