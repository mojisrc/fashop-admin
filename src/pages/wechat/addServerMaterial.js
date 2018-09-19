//@flow
import React,{ Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import * as actions from "../../actions/wechat/material";
import { View } from "react-web-dom";
import { Row, Col, Card, Form, Input, Button, Upload, Icon, message, Checkbox, Popover, Select } from "antd";
import RouterBreadcrumb from "../../components/wechat/public/routerBreadcrumb";
import styles from "../../styles/wechat/addServerMaterial.css";
import { imageUpload } from "../../utils";
import {
    handleSubmitType,
    formType,
    historyType,
} from "../../utils/flow";

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;

type Props = {
    history:historyType,
    pathSearch:{
        num:string
    },
    addLocalNewsMaterialList:Function,
    media:Array<{
        title: string,
        digest: string,
        cover_pic: string,
        link:{
            action:string,
            param:{}
        }
    }>
}
type State = {
    media:Array<{
        title: string,
        digest: string,
        cover_pic: string,
        link:{
            action:string,
            param:{}
        }
    }>,
    active:number
}

@connect(
    ({view:{material:{ localnewsMaterialInfo }}}) => ({
        localnewsMaterialInfo
    }),
    dispatch => bindActionCreators(actions,dispatch),
)
export default class AddServerMaterial extends Component<Props,State> {
    state = {
        media:[
            {
                title : "我是标题",
                digest:"我是摘要",
                cover_pic : "",
                link : {
                    action : "",
                    param : {}
                }
            }
        ],
        active:0
    }

    render() {
        const { media, active } = this.state
        const { history, pathSearch } = this.props
        return (
            <View>
                <RouterBreadcrumb
                    pushFunc={()=>{
                        history.replace({
                            search:`?menu=6`
                        })
                    }}
                    oneLevel='图文消息'
                    twoLevel='新建高级图文'
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
                                    media={media}
                                    active={active}
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
                        </Card>
                    </Col>
                </Row>
            </View>
        )
    }
}


class LeftContentSingle extends Component<
    {
        media:Array<{
            title: string,
            digest: string,
            cover_pic: string,
            link:{
                action:string,
                param:{}
            }
        }>,
        active:number,
        changeMedia:Function
    },{}>{
    render(){
        const { media, active, changeMedia } = this.props
        let current = media[active]
        return(
            <View className={styles.singleView}>
                <View className={styles.singleBot}>
                    <p style={{margin:0}}>{current.title}</p>
                    {
                        current.digest ?
                        <span>{current.digest}</span> : null
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
            digest: string,
            cover_pic: string,
            link:{
                action:string,
                param:{}
            }
        }>,
        active:number,
        changeMedia:Function,
        changeActive:Function,
    },{}>{
    componentDidMount(){
        const { changeMedia, media } = this.props
        changeMedia({
            media:[...media, {
                title : "标题",
                digest:"摘要",
                cover_pic : "",
                link : {
                    action : "",
                    param : {}
                }
            }]
        })
    }
    render(){
        const { media, changeMedia, active, changeActive } = this.props
        // console.log(this.props);
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
                                media:[...media, {
                                    title : "标题",
                                    digest:"摘要",
                                    cover_pic : "",
                                    link : {
                                        action : "",
                                        param : {}
                                    }
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
                                        src={mediaItem.cover_pic}
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
                                    <p style={{margin:0}}>{mediaItem.title}</p>
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
        history:historyType,
        pathSearch:{
            num:string
        },
        media:Array<{
            title: string,
            digest: string,
            cover_pic: string,
            link:{
                action:string,
                param:{}
            }
        }>,
        active:number,
        changeMedia:Function,
        addLocalNewsMaterialList:Function,
    },{}>{
    current : {
        title: string,
        digest: string,
        cover_pic: string,
        link:{
            action:string,
            param:{}
        }
    }
    render(){
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
        const { pathSearch, media, active, addLocalNewsMaterialList, changeMedia } = this.props
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
                    label="链接"
                    required
                >
                    {/* <Select
                        placeholder="请选择链接"
                    >
                        <Option value="home">店铺主页</Option>
                        <Option value="goodssort">商品分类</Option>
                        <Option value="goodsdetail">商品详情</Option>
                        <Option value="self">自定义链接</Option>
                    </Select> */}
                    <Input
                        placeholder="输入链接"
                        value={current.link.action}
                        onChange={(e)=>{
                            let newMedia = [...media]
                            let newCurrent = {...current}
                            newCurrent.link.action=e.target.value
                            newMedia.splice(active, 1, newCurrent)
                            changeMedia({
                                media:newMedia
                            })
                        }}
                    />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="标题"
                    required
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
                    label="封面"
                    extra='建议尺寸：900*500 像素 图片格式png、jpg'
                    required={!pathSearch.num==='single'}
                >
                    <Upload
                        name="upload"
                        listType="picture-card"
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        customRequest={({file})=>{
                            imageUpload({
                                file,
                                onSuccess:(e:{origin:{path:string}})=>{
                                    let newMedia = [...media]
                                    let newCurrent = {...current}
                                    newCurrent.cover_pic =  e.origin.path
                                    newMedia.splice(active, 1, newCurrent)
                                    changeMedia({
                                        media:newMedia
                                    })
                                }
                            })
                        }}
                    >
                        {
                            current.cover_pic.length ?
                            <img
                                src={current.cover_pic}
                                alt=""
                                style={{
                                    width:102,
                                    height:102,
                                }}
                            /> : uploadButton
                        }
                    </Upload>
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
                    style={{
                        position: 'absolute',
                        top:540,
                        left: '-200px',
                    }}
                >
                    <Button
                        type="primary"
                        onClick={()=>{
                            // console.log(media);
                            addLocalNewsMaterialList({
                                params:{
                                    media,
                                }
                            })
                        }}
                        style={{
                            marginRight:20
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
