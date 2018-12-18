import React,{ Component } from 'react'
import { connect } from "dva";
import * as actions from "@/actions/wechat/material";
import { Icon, Popconfirm, Table } from 'antd';
import { View } from '@/components/flexView'
import styles from './index.css'
import moment from 'moment'
//
// type Props = {
//     videoMaterialList:{
//         item:Array<{
//             name:string,
//             url:string,
//             media_id:string,
//         }>,
//         item_count:number,
//         total_count:number
//     },
//     getWechatMaterialList:Function,
//     videoCurrentPage:number,
//     videoPageSize:number,
//     materialListLoading:boolean,
//     delWechatMaterial:Function,
// }

@connect(
    ({view:{material:{ videoMaterialList, videoCurrentPage, videoPageSize, materialListLoading }}}) => ({
        videoMaterialList,
        videoCurrentPage,
        videoPageSize,
        materialListLoading,
    }),

)
export default class VideoTable extends Component {
    componentDidMount(){
        this.props.getWechatMaterialList({
            params:{
                type:'video',
                offset:'0',
                count:'10',
            }
        })
    }
    render() {
        // console.log('VideoTable',this.props);
        const { videoMaterialList, getWechatMaterialList, videoCurrentPage, videoPageSize, materialListLoading, delWechatMaterial } = this.props
        const { item, item_count, total_count } = videoMaterialList
        const columns = [
            {
                title: "视频",
                dataIndex: "video",
                render: (text, record) =>
                <View className={styles.imgView}>
                    <Icon type="video-camera" />
                </View>
            },{
                title: "标题",
                dataIndex: "name",
            },{
                title: "更新时间",
                dataIndex: "update_time",
                render: (text, record) => <span>
                    {
                        moment(text,'X').format('YYYY-MM-DD')
                    }
                </span>
            },{
                title: "状态",
                dataIndex: "status",
                width:'32%',
                render: (text, record) =>
                <span>
                    {
                        text===0 ? '转码失败' :
                        text===1 ? '转码成功' :
                        text===2 ? '转码中' : null
                    }
                </span>
            },{
                title: "操作",
                width:'16%',
                render: (text, record, index) =>
                <View className={styles.operation}>
                    {
                        record.status ?
                        <a
                            onClick={() => {}}
                        >
                            编辑
                        </a> : null
                    }
                    <Popconfirm
                        title={(<span>删除该视频后将无法恢复，所有使用该视<br/>频的网页中对应的视频都会被删除。</span>)}
                        okText="删除"
                        cancelText="取消"
                        onConfirm={() => {
                            delWechatMaterial({
                                params:{
                                    media_id:record.media_id
                                },
                                callParams:{
                                    type:'image',
                                    offset:'0',
                                    count:'10',
                                }
                            })
                        }}
                    >
                        <a>删除</a>
                    </Popconfirm>
                </View>
            }
        ]
        return (
            <Table
                bordered
                loading={materialListLoading}
                columns={columns}
                rowKey={record => record.media_id}
                dataSource={item}
                pagination={{
                    current:videoCurrentPage,
                    pageSize:videoPageSize ? videoPageSize : 10,
                    total:total_count ? total_count : 1,
                    showSizeChanger:true,
                    showQuickJumper:true,
                    hideOnSinglePage:true,
                    pageSizeOptions:['5','10','15','20'],
                    onChange:(page, pageSize)=>{
                        getWechatMaterialList({
                            params:{
                                type:'video',
                                offset:page===1 ? '0' : (page-1)*pageSize-1,
                                count:pageSize,
                            }
                        })
                    },
                    onShowSizeChange:(current, size)=>{
                        getWechatMaterialList({
                            params:{
                                type:'video',
                                offset:'0',
                                count:size,
                            }
                        })
                    },
                }}
            />
        )
    }
}
