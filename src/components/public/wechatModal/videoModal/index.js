import React, { Component } from "react";

import { connect } from 'dva';
import * as actions from "@/actions/wechat/material";
import { View } from "@/components/flexView";
import { Modal, Button, Radio, Table, Icon } from "antd";
import styles from "./index.css";
import moment from 'moment'
import AddVideoForm from '@/wechat/material/video/addVideoForm'
//
// type Props = {
//     visible:boolean,
//     close:Function,
//     onOk:Function,
//     newsType:string,
//     rowSelectionType:string,
//     wechatMaterialList:Function,
//     videoMaterialList:{
//         item:Array<{}>
//     },
//     wechatMaterialListLoading:boolean,
// }
// type State = {
//     newsTypeValue:string,
//     selectedRowKeys:Array<number>,
//     selectedValue:{media_id:string},
//     addVideoVisible:boolean,
// }

@connect(
    ({view:{material:{ videoMaterialList, videoCurrentPage, videoPageSize, wechatMaterialListLoading }}}) => ({
        videoMaterialList,
        videoCurrentPage,
        videoPageSize,
        wechatMaterialListLoading,
    }),

)
export default class VideoModal extends Component {
    state = {
        newsTypeValue:this.props.newsType,
        selectedRowKeys:[],
        selectedValue:{media_id:''},
        addVideoVisible:false
    }
    componentDidMount(){
        this.props.wechatMaterialList({
            params:{
                type:'video',
                offset:'0',
                count:'10',
            }
        })
    }
    render() {
        const { visible, close, onOk, videoMaterialList } = this.props
        const { selectedRowKeys, addVideoVisible, selectedValue } = this.state
        return (
            <View>
                <Modal
                    title="添加视频"
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
                        onOk(selectedValue.media_id,selectedValue)
                        close()
                        this.setState({
                            selectedRowKeys:[],
                            selectedValue:{
                                media_id:''
                            }
                        })
                    }}
                >
                    {
                        this.returnImgList()
                    }
                </Modal>
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
                         hideModal={()=>{
                             this.setState({
                                 addVideoVisible:false,
                             })
                             this.props.wechatMaterialList({
                                 params:{
                                     type:'video',
                                     offset:'0',
                                     count:'10',
                                 }
                             })
                         }}
                     />
                 </Modal>
            </View>
        )
    }
    onSelectChange = (selectedRowKeys:Array<number>) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        let { videoMaterialList } = this.props
        let selectedValue = videoMaterialList.item.filter((filterItem,index)=>{
            return selectedRowKeys[0]===filterItem.media_id
        })[0]
        this.setState({
            selectedRowKeys,
            selectedValue
        });
    }
    returnImgList(){
        const { selectedRowKeys, newsTypeValue } = this.state
        const {
            newsType,
            rowSelectionType,
            videoMaterialList,
            wechatMaterialListLoading,
            videoCurrentPage,
            videoPageSize,
            wechatMaterialList,
            newVideoBtn,
        } = this.props
        const { total_count } = videoMaterialList
        // console.log('videoMaterialList',videoMaterialList);
        const rowSelection = {
            type:rowSelectionType,
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const columns = [
            {
                title: '视频',
                dataIndex: 'video',
                width:'20%',
                render:(text,record) => <View className={styles.imgView}>
                    <Icon type="video-camera" />
                </View>
            }, {
                title: '标题',
                dataIndex: 'name',
            }, {
                title: '更新时间',
                dataIndex: 'update_time',
                render: (text, record) => <span>
                    {
                        moment(text,'X').format('YYYY-MM-DD')
                    }
                </span>
            }, {
                title: '状态',
                dataIndex: 'status',
            }
        ]
        return(
            <View className={styles.imgList}>
                <View className={styles.imgListTop}>
                    <Button
                        type='primary'
                        onClick={()=>{
                            this.setState({
                                addVideoVisible:true,
                            })
                        }}
                    >
                        上传{
                            newsTypeValue.length&&newsTypeValue==='wechat' ? '微信' :
                            newsTypeValue==='local' ? '高级' :
                            !newsTypeValue.length&&newsType==='wechat' ? '微信' :
                            newsType==='local' ? '高级' : ''
                        }视频
                    </Button>
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
                <Table
                    bordered
                    loading={wechatMaterialListLoading}
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={videoMaterialList.item ? videoMaterialList.item : []}
                    rowKey={record => record.media_id}
                    pagination={{
                        current:videoCurrentPage,
                        pageSize:videoPageSize ? videoPageSize : 10,
                        total:total_count ? total_count : 1,
                        showSizeChanger:true,
                        showQuickJumper:true,
                        hideOnSinglePage:true,
                        pageSizeOptions:['5','10','15','20'],
                        onChange:(page, pageSize)=>{
                            wechatMaterialList({
                                params:{
                                    type:'video',
                                    offset:page===1 ? '0' : (page-1)*pageSize-1,
                                    count:pageSize,
                                }
                            })
                        },
                        onShowSizeChange:(current, size)=>{
                            wechatMaterialList({
                                params:{
                                    type:'video',
                                    offset:'0',
                                    count:size,
                                }
                            })
                        },
                    }}
                />
            </View>
        )
    }
}
