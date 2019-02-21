import React from 'react'

import { connect } from "dva";
import * as actions from "@/actions/wechat/autoReply";
import { Table, Popconfirm } from 'antd';
import { View } from '@/components/flexView'
import KeyWordsReplyHeader from './KeyWordsReplyHeader'
import styles from './index.css'
// type Props = {
//     getKeyWordsReplyList:Function,
//     delAutoReplyKeywords:Function,
//     keyWordsReplyListLoading:boolean,
//     keyWordsReplyList:{
//         list:Array<{}>,
//         total_number:number
//     }
// }

@connect(
    ({view:{wechatAutoReply:{ keyWordsReplyList, keyWordsReplyListLoading }}}) => ({
        keyWordsReplyList,
        keyWordsReplyListLoading,
    }),

)
export default class KeyWordsReply extends React.Component {
    componentDidMount(){
        this.props.getKeyWordsReplyList({params:{}})
    }
    render() {
        const { keyWordsReplyListLoading, keyWordsReplyList, delAutoReplyKeywords, history } = this.props
        const { list, total_number } = keyWordsReplyList
        const columns = [
            {
                title: '规则名称',
                dataIndex: 'rule_name',
            }, {
                title: '关键词',
                dataIndex: 'keys',
                render:(text,record) => <span>
                    {
                        text.map((textItem,index) => `${textItem}${index===text.length-1 ? '' : ','}`)
                    }
                </span>
            }, {
                title: '回复内容',
                dataIndex: 'reply_content',
                render:(text,record) => {
                    let textNum = text.filter((filterItem,index)=>filterItem.type==='text').length
                    let imageNum = text.filter((filterItem,index)=>filterItem.type==='image').length
                    let newsNum = text.filter((filterItem,index)=>filterItem.type==='news').length
                    let voiceNum = text.filter((filterItem,index)=>filterItem.type==='voice').length
                    let videoNum = text.filter((filterItem,index)=>filterItem.type==='video').length
                    let local_newsNum = text.filter((filterItem,index)=>filterItem.type==='local_news').length
                    return(
                        <span>
                            {textNum>0 ? `${textNum}文本 ` : null}
                            {imageNum>0 ? `${imageNum}图片 ` : null}
                            {newsNum>0 ? `${newsNum}图文 ` : null}
                            {voiceNum>0 ? `${voiceNum}音频 ` : null}
                            {videoNum>0 ? `${videoNum}视频 ` : null}
                            {local_newsNum>0 ? `${local_newsNum}本地文本` : null}
                        </span>
                    )
                }
            }, {
                title: '操作',
                render: (text, record) =>
                <View className={styles.opration}>
                    <a
                        style={{marginRight:12}}
                        onClick={()=>{
                            router.push({
                                search:`?menu=2&router=editReply&editReplyId=${record.id}`
                            })
                        }}
                    >
                        编辑
                    </a>
                    <Popconfirm
                        trigger='hover'
                        title="确认删除？"
                        okText="确定"
                        cancelText="取消"
                        onConfirm={()=>{
                            delAutoReplyKeywords({
                                params:{id:record.id}
                            })
                        }}
                    >
                        <a>删除</a>
                    </Popconfirm>
                </View>
            },
        ]
        return (
            <View>
                <KeyWordsReplyHeader {...this.props} />
                <Table
                    loading={keyWordsReplyListLoading}
                    columns={columns}
                    dataSource={list ? list : []}
                    className={styles.tabWrap}
                    rowKey={record => record.id}
                    pagination={{
                        // current:videoCurrentPage,
                        // pageSize:videoPageSize ? videoPageSize : 10,
                        total:total_number ? total_number : 1,
                        // showSizeChanger:true,
                        // showQuickJumper:true,
                        hideOnSinglePage:true,
                        // pageSizeOptions:['5','10','15','20'],
                        // onChange:(page, pageSize)=>{
                        //     getKeyWordsReplyList({
                        //         params:{}
                        //     })
                        // },
                        // onShowSizeChange:(current, size)=>{
                        //     getKeyWordsReplyList({
                        //         params:{}
                        //     })
                        // },
                    }}
                />
            </View>
        )
    }
}
