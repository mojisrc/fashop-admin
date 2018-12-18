import React from 'react'
import { connect } from "dva";
import * as actions from "@/actions/wechat/material";
import { Popconfirm, Row, Col, Pagination, Spin } from 'antd';
import { View } from '@/components/flexView'
import styles from './index.css'
import EmptyView from '../emptyView'
import moment from 'moment'
//
// type Props = {
//     voiceMaterialList:{
//         item:Array<{
//             name:string,
//             update_time:string,
//             media_id:string,
//         }>,
//         item_count:number,
//         total_count:number
//     },
//     getWechatMaterialList:Function,
//     voiceCurrentPage:number,
//     voicePageSize:number,
//     materialListLoading:boolean,
//     delWechatMaterial:Function,
// }

@connect(
    ({view:{material:{ voiceMaterialList, voiceCurrentPage, voicePageSize, materialListLoading }}}) => ({
        voiceMaterialList,
        voiceCurrentPage,
        voicePageSize,
        materialListLoading,
    }),

)
export default class VoiceTable extends React.Component {
    state = {
        voiceActive:""
    }
    componentDidMount(){
        this.props.getWechatMaterialList({
            params:{
                type:'voice',
                offset:'0',
                count:'10',
            }
        })
    }
    render() {
        // console.log('VoiceTable',this.props);
        const { voiceMaterialList, getWechatMaterialList, voiceCurrentPage, voicePageSize, materialListLoading, delWechatMaterial } = this.props
        const { item, item_count, total_count } = voiceMaterialList
        const { voiceActive } = this.state
        return (
            <Spin tip="Loading..." spinning={materialListLoading}>
                <Row gutter={24}>
                    {
                        item&&item.length ? item.map((item, index) =>
                            <Col span={8} key={index}>
                                <View className={styles.voiceTableView}>
                                    <View className={styles.voiceTableTop}>
                                        <View
                                            className={styles.imgView}
                                            onClick={()=>{
                                                if(voiceActive===item.media_id){
                                                    this.setState({
                                                        voiceActive:''
                                                    })
                                                }else {
                                                    this.setState({
                                                        voiceActive:item.media_id
                                                    })
                                                }
                                            }}
                                        >
                                            {
                                                voiceActive===item.media_id ?
                                                <img
                                                    src={require('@/assets/images/wechat/voiceing.gif')}
                                                    style={{
                                                        width:'100%',
                                                        height:'100%',
                                                    }}
                                                /> :
                                                <img
                                                    src={require('@/assets/images/wechat/voice.png')}
                                                    style={{
                                                        width:'100%',
                                                        height:'100%',
                                                    }}
                                                />
                                            }
                                        </View>
                                        <View className={styles.topRightView}>
                                            <View className={styles.topRightTop}>
                                                <span>{item.name}</span>
                                                {/* <span>{item.length}</span> */}
                                            </View>
                                            <p>
                                                {
                                                    moment(item.update_time,'X').format('YYYY-MM-DD')
                                                }
                                            </p>
                                        </View>
                                    </View>
                                    <View className={styles.operation}>
                                        <a
                                            onClick={() => {}}
                                        >
                                            编辑
                                        </a>
                                        <Popconfirm
                                            placement='bottom'
                                            title="确定删除此素材？"
                                            okText="删除"
                                            cancelText="取消"
                                            overlayStyle={{}}
                                            onConfirm={() => {
                                                delWechatMaterial({
                                                    params:{
                                                        media_id:item.media_id
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
                                </View>
                            </Col>
                        ) : <Col span={24}>
                            <EmptyView/>
                        </Col>
                    }
                </Row>
                <View className={styles.pageView}>
                    <Pagination
                        current={voiceCurrentPage}
                        pageSize={voicePageSize ? voicePageSize : 10}
                        total={total_count ? total_count : 1}
                        showSizeChanger
                        showQuickJumper
                        hideOnSinglePage
                        pageSizeOptions={['5','10','15','20']}
                        onChange={(page, pageSize)=>{
                            getWechatMaterialList({
                                params:{
                                    type:'voice',
                                    offset:page===1 ? '0' : (page-1)*pageSize-1,
                                    count:pageSize,
                                }
                            })
                        }}
                        onShowSizeChange={(current, size)=>{
                            getWechatMaterialList({
                                params:{
                                    type:'voice',
                                    offset:'0',
                                    count:size,
                                }
                            })
                        }}
                    />
                </View>
            </Spin>
        )
    }
}
