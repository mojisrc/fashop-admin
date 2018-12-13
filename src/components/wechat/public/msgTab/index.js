import React,{ Component } from 'react'
import {
    Button,
    Tabs,
    Input,
    Icon,
    message,
    Upload,
    Modal,
} from 'antd'
import { View } from 'react-web-dom'
import styles from './index.css'
import Emoji from "@/public/emoji";
import { env } from '@/config/root'
import ModalNews from "@/public/wechatItem/modalNews";
import NewsModal from "@/public/wechatModal/newsModal";
import ImageModal from "@/public/wechatModal/imageModal";
import VoiceModal from "@/public/wechatModal/voiceModal";
import VideoModal from "@/public/wechatModal/videoModal";
import AddVideoForm from '../../material/video/addVideoForm'
import Image from "@/image";

const TabPane = Tabs.TabPane
const { TextArea } = Input
//
// type Props = {
//     showTabKey:Array<number>,
//     size:string,
//     initialValue:{
//         type:string,
//         content:string,
//         media_id:string
//     },
//     getWechatMaterialList:Function,
//     getLocalNewsMaterialList:Function,
//     imageMaterialList:{
//         item:Array<{
//             name:string,
//             url:string,
//             media_id:string,
//         }>
//     },
//     materialListLoading:boolean,
//     newsMaterialList:{
//         item:Array<{
//             content:{
//                 news_item:Array<{
//                     digest:string,
//                     thumb_url:string,
//                     title:string,
//                 }>,
//                 update_time:string,
//             },
//             media_id:string
//         }>
//     },
//     localNewsMaterialList:{
//         item:Array<{
//             content:{
//                 news_item:Array<{
//                     digest:string,
//                     thumb_url:string,
//                     title:string,
//                 }>,
//                 update_time:string,
//             },
//             media_id:string
//         }>
//     },
//     voiceMaterialList:{
//         item:Array<{}>,
//         item_count:number,
//         total_count:number,
//     },
//     videoMaterialList:{
//         item:Array<{}>,
//     },
// }
// type State = {
//     textValue:string,
//     newsVisible:boolean,
//     imageVisible:boolean,
//     voiceVisible:boolean,
//     videoVisible:boolean,
//     addVideoVisible:boolean,
//     send_content:Array<{type:string,extra:mixed}>,
//     currentArticleValue:{},
//     currentImageValue:{},
//     currentVoiceValue:{},
//     currentVideoValue:{},
// }

export default class MsgTab extends Component {
    state = {
        textValue:'',
        newsVisible:false,
        imageVisible:false,
        voiceVisible:false,
        videoVisible:false,
        addVideoVisible:false,
        send_content:[],
        currentArticleValue:{},
        currentImageValue:{},
        currentVoiceValue:{},
        currentVideoValue:{},
    }
    render() {
        const { showTabKey, size, initialValue } = this.props
        const { addVideoVisible, newsVisible, imageVisible, voiceVisible, videoVisible, textValue, send_content } = this.state
        const tabList = [
            {
                id:1,
                tab:'图文',
                type:'news',
                main:() => this.article(),
                addFunc:() => this.addarticle()
            }, {
                id:2,
                tab:'文字',
                type:'text',
                // main:() => this.text()
            }, {
                id:3,
                tab:'图片',
                type:'image',
                main:() => this.images(),
                addFunc:() => this.addimages()
            }, {
                id:4,
                tab:'语音',
                type:'voice',
                main:() => this.voice(),
                addFunc:() => this.addvoice()
            }, {
                id:5,
                tab:'视频',
                type:'video',
                main:() => this.video(),
                addFunc:() => this.addvideo()
            }
        ]
        return (
            <View>
                <Tabs
                    tabBarStyle={{
                        background: "#fafafa" ,
                        borderBottom:'1px solid #e9e9e9',
                        marginBottom:0
                    }}
                    style={{
                        border:'1px solid #e9e9e9',
                        borderRadius:'4px',
                    }}
                >
                    {
                        tabList.map((tabListItem,index) =>
                            showTabKey.indexOf(tabListItem.id)>-1&&
                            <TabPane
                                tab={tabListItem.tab}
                                key={tabListItem.id}
                            >
                                {
                                    tabListItem.id===2 ?
                                    <View className={styles.textTabView}>
                                         <View
                                             className={size==='small' ? styles.smallTabPaneView : styles.tabPaneView}
                                         >
                                             <TextArea
                                                 value={
                                                     textValue.length ? textValue :
                                                     initialValue.type==='text' ? initialValue.content : ''
                                                 }
                                                 rows={8}
                                                 // autosize={{ minRows: 8, maxRows: 10 }}
                                                 onChange={(e)=>{
                                                     this.setState({
                                                         textValue:e.target.value,
                                                         send_content:[
                                                             ...send_content,
                                                             {
                                                                 type:'text',
                                                                 content:e.target.value,
                                                             }
                                                         ]
                                                     })
                                                 }}
                                             />
                                         </View>
                                         <View className={styles.textViewBot}>
                                             <Emoji
                                                 clickFunc={(emoji)=>{
                                                     let value = `${textValue}${emoji}`
                                                     this.setState({textValue:value})
                                                 }}
                                             />
                                             <p>还可输入{600-textValue.length}字，按Enter换行</p>
                                         </View>
                                     </View> :
                                     send_content.filter((item,index)=>item.type===tabListItem.type).length ?
                                     tabListItem.main() :
                                     <View
                                         className={size==='small' ? styles.smallTabPaneView : styles.tabPaneView}
                                     >
                                        <Button
                                            className={size==='small' ? styles.smallTabPaneButton : styles.tabPaneButton}
                                            onClick={()=>{
                                                switch (tabListItem.id) {
                                                    case 1: return this.setState({newsVisible:true})
                                                    case 3: return this.setState({imageVisible:true})
                                                    case 4: return this.setState({voiceVisible:true})
                                                    case 5: return this.setState({videoVisible:true})
                                                    default:
                                                }
                                            }}
                                        >
                                            从素材库选择
                                        </Button>
                                        {
                                            tabListItem.addFunc()
                                        }
                                    </View>
                                }
                            </TabPane>
                        )
                    }
                </Tabs>
                <NewsModal
                    {...this.props}
                    visible={newsVisible}
                    newsType='wechat'
                    close={()=>{
                        this.setState({newsVisible:false})
                    }}
                    onOk={(media_id,detail)=>{
                        this.setState({
                            send_content:[
                                ...send_content,
                                {
                                    type:'news',
                                    media_id,
                                    extra:detail.content.news_item
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
                        this.setState({
                            send_content:[
                                ...send_content,
                                {
                                    type:'image',
                                    media_id,
                                    extra:{
                                        url:detail.url
                                    }
                                }
                            ],
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
                        this.setState({
                            send_content:[
                                ...send_content,
                                {
                                    type:'voice',
                                    media_id,
                                    extra:{
                                        name:detail.name
                                    }
                                }
                            ],
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
                        this.setState({
                            send_content:[
                                ...send_content,
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
                <Modal
                     title="新增视频"
                     width={820}
                     visible={addVideoVisible}
                     footer={null}
                     maskClosable={true}
                     onCancel={()=>{
                         this.setState({
                             addVideoVisible:false
                         })
                     }}
                 >
                     <AddVideoForm
                         hideModal={(result,file)=>{
                             this.setState({
                                 addVideoVisible:false,
                                 send_content:[
                                     ...send_content,
                                     {
                                         type:'video',
                                         media_id:result.media_id,
                                         extra:{
                                             name:file.name
                                         }
                                     }
                                 ]
                             })
                         }}
                     />
                 </Modal>
            </View>
        )
    }
    article(){
        const { send_content } = this.state
        let extra = send_content.filter((filterItem,index)=>filterItem.type==='news')[0].extra
        return(
            <View className={styles.warp}>
                <View className={`${styles.contentItem} ${styles.newsContent}`}>
                    <ModalNews
                        extra={extra}
                    />
                </View>
                <a
                    style={{
                        marginLeft:10
                    }}
                    onClick={()=>{
                        let new_send_content = send_content.concat()
                        let index = new_send_content.findIndex((item,index)=>item.type==='news')
                        new_send_content.splice(index,1)
                        this.setState({
                            send_content:new_send_content,
                            currentArticleValue:{}
                        })
                    }}
                >
                    删除
                </a>
            </View>
        )
    }
    images(){
        const { send_content } = this.state
        let extra = send_content.filter((filterItem,index)=>filterItem.type==='image')[0].extra
        return(
            <View className={styles.warp}>
                <View>
                    <Image
                        style={{width: 98}}
                        src={`https://demo.fashop.cn/admin/mix/wechatImage?url=${extra.url}`}
                    />
                </View>
                <a
                    style={{
                        marginLeft:10
                    }}
                    onClick={()=>{
                        let new_send_content = send_content.concat()
                        let index = new_send_content.findIndex((item,index)=>item.type==='image')
                        new_send_content.splice(index,1)
                        console.log(new_send_content);
                        this.setState({
                            send_content:new_send_content
                        })
                    }}
                >
                    删除
                </a>
            </View>
        )
    }
    voice(){
        const { send_content } = this.state
        let extra = send_content.filter((filterItem,index)=>filterItem.type==='voice')[0].extra
        return(
            <View className={styles.warp}>
                <View className={`${styles.contentItem} ${styles.voiceContent}`}>
                    <img
                        src={require('@/images/wechat/voice.png')}
                        style={{
                            width:70,
                            height:70,
                        }}
                    />
                    <p>
                        {extra.name}
                    </p>
                </View>
                <a
                    style={{
                        marginLeft:10
                    }}
                    onClick={()=>{
                        let new_send_content = send_content.concat()
                        let index = new_send_content.findIndex((item,index)=>item.type==='voice')
                        new_send_content.splice(index,1)
                        this.setState({
                            send_content:new_send_content
                        })
                    }}
                >
                    删除
                </a>
            </View>
        )
    }
    video(){
        const { send_content } = this.state
        let extra = send_content.filter((filterItem,index)=>filterItem.type==='video')[0].extra
        return(
            <View className={styles.warp}>
                <View className={`${styles.contentItem} ${styles.videoContent}`}>
                    <View className={styles.videoContentIconView}>
                        <Icon type="video-camera" />
                    </View>
                    <p>{extra.name}</p>
                </View>
                <a
                    style={{
                        marginLeft:10
                    }}
                    onClick={()=>{
                        let new_send_content = send_content.concat()
                        let index = new_send_content.findIndex((item,index)=>item.type==='video')
                        new_send_content.splice(index,1)
                        this.setState({
                            send_content:new_send_content
                        })
                    }}
                >
                    删除
                </a>
            </View>
        )
    }
    addarticle(){
        return(
            <Button
                className={this.props.size==='small' ? styles.smallTabPaneButton : styles.tabPaneButton}
                onClick={()=>{
                    console.log(this.props);
                }}
            >
                + 新增图文
            </Button>
        )
    }
    addimages(){
        const { send_content } = this.state
        return(
            <View className={this.props.size==='small' ? styles.smallTabPaneButton : styles.tabPaneButton}>
                <Upload
                    showUploadList={false}
                    beforeUpload={imageBeforeUpload}
                    customRequest={({file})=>{
                        let formData = new FormData()
                        formData.append('media',file)
                        let url = `${env.domain}/admin/wechat/materialUploadImage`
                        Fetch.formData(url,formData)
                        .then((e)=>{
                            // console.log('handleChange',e);
                            if(e.code===0){
                                this.setState({
                                    send_content:[
                                        ...send_content,
                                        {
                                            type:'image',
                                            media_id:e.result.media_id,
                                            extra:{
                                                url:e.result.url
                                            }
                                        }
                                    ],
                                })
                            }
                        })
                    }}
                >
                    + 新增图片
                </Upload>
            </View>
        )
    }
    addvoice(){
        const { send_content } = this.state
        return(
            <View className={this.props.size==='small' ? styles.smallTabPaneButton : styles.tabPaneButton}>
                <Upload
                    showUploadList={false}
                    beforeUpload={voiceBeforeUpload}
                    customRequest={({file})=>{
                        let formData = new FormData()
                        formData.append('media',file)
                        let url = `${env.domain}/admin/wechat/materialUploadVoice`
                        Fetch.formData(url,formData)
                        .then((e)=>{
                            if(e.code===0){
                                // console.log('handleChange',e);
                                this.setState({
                                    send_content:[
                                        ...send_content,
                                        {
                                            type:'voice',
                                            media_id:e.result.media_id,
                                            extra:{
                                                name:file.name
                                            }
                                        }
                                    ],
                                })
                            }
                        })
                    }}
                >
                    + 新增语音
                </Upload>
            </View>
        )
    }
    addvideo(){
        return(
            <Button
                className={this.props.size==='small' ? styles.smallTabPaneButton : styles.tabPaneButton}
                onClick={()=>{
                    this.setState({
                        addVideoVisible:true
                    })
                }}
            >
                + 新增视频
            </Button>
        )
    }
}

function imageBeforeUpload(file) {
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

function voiceBeforeUpload(file) {
    const isaudio = file.type === 'audio/mp3';
    if (!isaudio) {
        message.error('只能上传音频文件!');
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
        message.error('语音大小不超过 5M!');
    }
    return isaudio && isLt5M;
}
