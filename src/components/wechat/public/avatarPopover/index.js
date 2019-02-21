import React,{ Component } from 'react'
import { View } from '@/components/flexView'
import { Popover, Icon, Button, Input, Popconfirm } from 'antd'
import styles from './index.css'
import TagPopover from '../tagPopover'
import Image from '@/image'
import moment from 'moment'
// type Props = {
//     record:{
//         openid:string,
//         headimgurl:string,
//         nickname:string,
//         sex:number,
//         subscribe_time:string,
//         remark:string,
//         // news:number,
//         // msg:number,
//         // marrow:number,
//         tagid_list:Array<string>
//     },
//     tagList:Array<{
//         name:string,
//         count:number,
//         id:number
//     }>,
//     editRemarkFunc:Function,
//     addTagFunc:Function,
//     tagWechatUserFunc:Function,
//     blackFunc:Function,
//     avatarType:string
// }
// type State = {
//     remarkValue:string,
//     editRemark:boolean
// }

export default class AvatarPopover extends Component {
    state = {
        editRemark:false,
        remarkValue:''
    }
    render() {
        return (
            <View className={styles.avatarPopoverView}>
                <Popover
                    overlayClassName='avatarPopover'
                    // getPopupContainer={() => document.getElementById('avatarPopoverView')}
                    placement="right"
                    content={(
                        this.contentView()
                    )}
                >
                    <View>
                        <Image
                            type='avatar'
                            src={this.props.record.headimgurl}
                            className={styles.avatar}
                        />
                    </View>
                </Popover>
            </View>
        )
    }
    contentView(){
        const { editRemark, remarkValue } = this.state
        const { record, tagList, editRemarkFunc, addTagFunc, avatarType, tagWechatUserFunc, blackFunc } = this.props
        const { headimgurl, nickname, sex, subscribe_time, remark, tagid_list, openid } = record
        const news = 0
        const msg = 0
        const marrow = 0
        return(
            <View className={styles.contentView}>
                <img
                    className={styles.popoverImg}
                    alt='headimgurl'
                    src={headimgurl}
                />
                <View className={styles.contentRight}>
                    <View className={styles.contentRightTop}>
                        <View className={styles.top}>
                            <p>
                                {nickname}
                                <Icon
                                    type={sex ? "man" : "woman"}
                                    className={sex ? styles.manIcon : styles.womanIcon}
                                />
                            </p>
                            <Popconfirm
                                title={
                                    avatarType==='black' ? '确认移出黑名单？' :
                                    <span>
                                        加入黑名单后，你将无法接收该用户<br/>
                                        发来的消息，且该用户无法接收公众<br/>
                                        号发出的消息，无法参与留言和赞赏，<br/>确认加入黑名单？
                                    </span>
                                }
                                okText="确定"
                                cancelText="取消"
                                onConfirm={()=>{
                                    blackFunc()
                                }}
                            >
                                <Button>
                                    {
                                        avatarType==='black' ? '移出' : '加入'
                                    }黑名单
                                </Button>
                            </Popconfirm>
                        </View>
                        <View className={styles.mid}>
                            <View className={styles.midItemView}>
                                <span>备注：</span>
                                {
                                    editRemark ?
                                    <Input
                                        defaultValue={remark}
                                        placeholder='请输入'
                                        style={{
                                            width: 200,
                                            height: 28
                                        }}
                                        onChange={(e)=>{
                                            this.setState({
                                                remarkValue:e.target.value
                                            })
                                        }}
                                    />
                                    : remark
                                }
                                {
                                    editRemark ?
                                    <a
                                        onClick={()=>{
                                            this.setState({editRemark:false})
                                            editRemarkFunc({
                                                openid,
                                                remark:remarkValue
                                            })
                                        }}
                                    >
                                        保存
                                    </a>
                                    : <a
                                        onClick={()=>{
                                            this.setState({editRemark:true})
                                        }}
                                    >
                                        修改
                                    </a>
                                }
                                {
                                    editRemark ?
                                    <a
                                        onClick={()=>{
                                            this.setState({editRemark:false})
                                        }}
                                    >
                                        取消
                                    </a>
                                    : null
                                }
                            </View>
                            <View className={styles.midItemView}>
                                <span>标签：</span>
                                {
                                    avatarType==='black' ? null :
                                    <TagPopover
                                        tagList={tagList}
                                        popoverTrigger="hover"
                                        record={record}
                                        addTagFunc={(name)=>{
                                            addTagFunc(name)
                                        }}
                                        addUserTagFunc={(id)=>{
                                            tagWechatUserFunc(id)
                                        }}
                                        popoverContent={()=>{
                                            return(
                                                <p>
                                                    {
                                                        !tagid_list.length ? '暂无标签 ' : ''
                                                    }
                                                    <Icon type="caret-down" />
                                                </p>
                                            )
                                        }}
                                    />
                                }
                            </View>
                            <View className={styles.midItemView}>
                                <span>互动：</span>
                                <p>消息{news ? news : 0} &nbsp;</p>
                                <p>留言{msg ? msg : 0} &nbsp;</p>
                                <p>精选留言{marrow ? marrow : 0}</p>
                            </View>
                        </View>
                    </View>
                    <p className={styles.contentRightBot}>
                        关注：{
                            moment(subscribe_time,'X').format('YYYY-MM-DD')
                        }
                    </p>
                </View>
            </View>
        )
    }
}
