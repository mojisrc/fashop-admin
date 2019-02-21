import React, { Component } from "react";

import { connect } from 'dva';
import { View } from "@/components/flexView";
import { Modal, Button,  Row, Col,   Pagination, Radio, Spin, Upload, message } from "antd";
import styles from "./index.css";
import ModalVoice from "../../wechatItem/modalVoice";
import EmptyView from "@/wechat/material/emptyView";

const RadioGroup = Radio.Group
//
// type Props = {
//     visible:boolean,
//     close:Function,
//     onOk:Function,
//     newsType:string,
//     wechatMaterialList:Function,
//     // voiceCurrentPage:number,
//     // voicePageSize:number,
//     wechatMaterialListLoading:boolean,
//     voiceMaterialList:{
//         item:Array<{
//             // name:string,
//             // update_time:string,
//             // media_id:string,
//         }>,
//         item_count:number,
//         total_count:number,
//     },
// }
// type State = {
//     newsTypeValue:string,
//     checkedValues:{
//         media_id:string
//     }
// }

@connect(
    ({view:{material:{ voiceMaterialList, voiceCurrentPage, voicePageSize, wechatMaterialListLoading }}}) => ({
        voiceMaterialList,
        voiceCurrentPage,
        voicePageSize,
        wechatMaterialListLoading,
    }),

)
export default class VoiceModal extends Component {
    state = {
        newsTypeValue:this.props.newsType,
        checkedValues:{media_id:''}
    }
    componentDidMount(){
        this.props.wechatMaterialList({
            params:{
                type:'voice',
                offset:'0',
                count:'10',
            }
        })
    }
    render() {
        const { visible, close, onOk, voiceMaterialList } = this.props
        const { checkedValues } = this.state
        return (
            <Modal
                title="添加语音"
                cancelText='取消'
                okText='确定'
                visible={visible}
                style={{ top: 20 }}
                width={880}
                onCancel={()=>{
                    close()
                    this.setState({
                        newsTypeValue:''
                    })
                }}
                onOk={()=>{
                    onOk(checkedValues.media_id,checkedValues)
                    close()
                    this.setState({checkedValues:{media_id:''}})
                }}
            >
                {
                    this.returnImgList()
                }
            </Modal>
        )
    }
    returnImgList(){
        const { checkedValues, newsTypeValue } = this.state
        const {
            newsType,
            voiceMaterialList,
            wechatMaterialList,
            voiceCurrentPage,
            voicePageSize,
            wechatMaterialListLoading
        } = this.props
        const { item_count, total_count } = voiceMaterialList
        return(
            <View className={styles.imgList}>
                <View className={styles.imgListTop}>
                    <Upload
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        customRequest={({file})=>{
                            let formData = new FormData()
                            formData.append('media',file)
                            let url = `${env.domain}/admin/wechat/materialUploadVoice`
                            Fetch.formData(url,formData)
                            .then((e)=>{
                                console.log('handleChange',e);
                                if(e.code===0){
                                    message.success('上传成功！')
                                    wechatMaterialList({
                                        params:{
                                            type:'voice',
                                            offset:'0',
                                            count:'10',
                                        }
                                    })
                                }
                            })
                        }}
                    >
                        <Button type='primary'>
                            上传{
                                newsTypeValue.length&&newsTypeValue==='wechat' ? '微信' :
                                newsTypeValue==='local' ? '高级' :
                                !newsTypeValue.length&&newsType==='wechat' ? '微信' :
                                newsType==='local' ? '高级' : ''
                            }语音
                        </Button>
                    </Upload>
                    <Radio.Group
                        value={newsTypeValue.length ? newsTypeValue : newsType}
                        onChange={(e)=>{
                            this.setState({
                                newsTypeValue:e.target.value
                            })
                        }}
                    >
                        <Radio.Button value="wechat">微信</Radio.Button>
                        <Radio.Button value="local" disabled>服务器</Radio.Button>
                    </Radio.Group>
                </View>
                <Spin tip="Loading..." spinning={wechatMaterialListLoading}>
                    <RadioGroup
                        style={{
                            width: '100%'
                        }}
                        value={checkedValues.media_id}
                        onChange={(e)=>{
                            let detail = voiceMaterialList.item.filter((filterItem,index)=>{
                                return e.target.value===filterItem.media_id
                            })[0]
                            this.setState({checkedValues:detail})
                        }}
                    >
                        <View className={styles.imgContent}>
                            <Row gutter={16}>
                                {
                                    voiceMaterialList.item&&voiceMaterialList.item.length ? voiceMaterialList.item.map((item,index)=>
                                    <Col span={8} key={index}>
                                        <View
                                            className={styles.imgItem}
                                            style={
                                                checkedValues.media_id===item.media_id ?
                                                {
                                                    borderColor:'#188fff'
                                                } : {}
                                            }
                                        >
                                            <ModalVoice
                                                time={item.update_time}
                                                title={item.name}
                                            />
                                            <Radio
                                                value={item.media_id}
                                                style={{
                                                    position: 'absolute',
                                                    bottom: 10,
                                                    right: 10,
                                                }}
                                            />
                                        </View>
                                    </Col>
                                ) : <Col span={24}>
                                        <EmptyView />
                                    </Col>
                                }
                            </Row>
                        </View>
                    </RadioGroup>
                </Spin>
                <View className={styles.paginationView}>
                    <Pagination
                        current={voiceCurrentPage}
                        pageSize={voicePageSize ? voicePageSize : 10}
                        total={total_count ? total_count : 1}
                        showSizeChanger
                        showQuickJumper
                        hideOnSinglePage
                        pageSizeOptions={['5','10','15','20']}
                        onChange={(page, pageSize)=>{
                            wechatMaterialList({
                                params:{
                                    type:'voice',
                                    offset:page===1 ? '0' : (page-1)*pageSize-1,
                                    count:pageSize,
                                }
                            })
                        }}
                        onShowSizeChange={(current, size)=>{
                            wechatMaterialList({
                                params:{
                                    type:'voice',
                                    offset:'0',
                                    count:size,
                                }
                            })
                        }}
                    />
                </View>
            </View>
        )
    }
}

function beforeUpload(file) {
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
