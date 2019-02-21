import React,{ Component } from 'react'

import { connect } from "dva";
import * as actions from "@/actions/wechat/autoReply";
import { Button, Modal } from 'antd'
import { View } from '@/components/flexView'
import styles from './index.css'
import MsgTab from '../public/msgTab'
//
// type Props = {
//     getFollowedReplyInfo:Function,
//     setFollowedReplyInfo:Function,
//     followedReplyInfo:{
//         reply_content:{
//             type:string,
//             content:string,
//         }
//     }
// }
@connect(
    ({view:{wechatAutoReply:{ followedReplyInfo }}}) => ({
        followedReplyInfo
    }),

)
export default class FollowedReply extends Component {
    componentDidMount(){
        this.props.getFollowedReplyInfo()
    }
    render() {
        const { followedReplyInfo, setFollowedReplyInfo } = this.props
        return (
            <View className={styles.followedReplyView}>
                <MsgTab
                    ref={(e) => this.msgTab = e }
                    showTabKey={[2,3,4,5]}
                    size='large'
                    initialValue={followedReplyInfo.reply_ceontent ? followedReplyInfo.reply_ceontent : {}}
                />
                <View className={styles.btnGroup}>
                    <Button
                        type="primary"
                        style={{marginRight:15}}
                        onClick={()=>{
                            const { send_content } = this.msgTab.state
                            setFollowedReplyInfo({
                                params:{
                                    reply_content:send_content[send_content.length-1]
                                }
                            })
                        }}
                    >
                        保存
                    </Button>
                    <Button
                        type="danger"
                        ghost
                        onClick={()=>{
                            Modal.confirm({
                                title: '确认删除回复?',
                                content: '删除后，关注该公众号的用户将不再接收该回复，确定删除？',
                                okText: '确认',
                                okType: 'danger',
                                cancelText: '取消',
                                onOk() {
                                    console.log('Ok');
                                },
                                onCancel() {
                                    console.log('Cancel');
                                },
                            });
                        }}
                    >
                        删除回复
                    </Button>
                </View>
            </View>
        )
    }
}
