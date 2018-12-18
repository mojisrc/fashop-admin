import React,{ Component } from 'react'
import { connect } from "dva";
import {
    getBroadcastUserSearch,
    getBroadcastSurplus,
    createWechatBroadcast,
} from "@/actions/wechat/message";
import {
    getWechatUserTagList,
} from "@/actions/wechat/userTags";
import { Modal, Button, Tag, Popover, DatePicker, Radio, message } from 'antd'
import { View } from '@/components/flexView'
import styles from './index.css'
import { data } from './testData'
import MsgTab from '../public/msgTab'
import SendTimingModal from './sendTimingModal'
import moment from 'moment'

const { RangePicker } = DatePicker;
//
// type Props = {
//     broadcastRecordUserSearch:{
//         total_number:number
//     },
//     broadcastRecordSurplus:{
//         send_number:number,
//         can_send_state:number
//     },
//     wechatConfigInfo:{},
//     userTagList:Array<{}>
// }
// type State = {
//     timingSendVisible:boolean,
//     condition:{
//         sex:Array<number>,
//         province:Array<string>,
//         cost_average_price:Array<string>,
//         cost_times:Array<string>,
//         resent_cost_time:Array<string>,
//         resent_visit_time:Array<string>,
//         register_time:Array<string>,
//         user_tag:Array<number>,
//     },
//     provinceMore:boolean
// }

@connect(
    ({view:{
        message:{ broadcastRecordUserSearch, broadcastRecordSurplus },
        wechatUserTags:{ userTagList },
    }}) => ({
        broadcastRecordUserSearch,
        broadcastRecordSurplus,
        userTagList
    }),
)
export default class SendTable extends Component {
    state = {
        timingSendVisible: false,
        condition:{
            sex:[],
            province:[],
            cost_average_price:[],
            cost_times:[],
            resent_cost_time:[],
            resent_visit_time:[],
            register_time:[],
            user_tag:[],
        },
        provinceMore:false
    }
    componentDidMount(){
        const { dispatch } = this.props
        dispatch(getBroadcastUserSearch({params:{condition_type:1}}))
        dispatch(getBroadcastSurplus({params:{send_time:moment().format('X'),condition_type:1}}))
        // dispatch(getWechatUserTagList())
    }
    render() {
        const { timingSendVisible } = this.state
        // console.log(this.props);
        const { broadcastRecordUserSearch, broadcastRecordSurplus, wechatConfigInfo, userTagList } = this.props
        const { send_number, can_send_state } = broadcastRecordSurplus
        // 订阅号每日能发1条，服务号每月最多能发4条
        let ableTimes = wechatConfigInfo.level===1 ? 1-send_number :
        wechatConfigInfo.level===2 ? 4-send_number :
        wechatConfigInfo.level===3 ? 1-send_number :
        wechatConfigInfo.level===4 ? 4-send_number : 0
        let newData = [
            ...data,
            {
                title: "会员标签",
                name: "user_tag",
                type:'checkbox',
                list:userTagList
            }
        ]
        return (
            <View style={{ width: "100%" }}>
                {/* <View className={styles.userClass}>
                    {
                        newData.map((item, index) =>
                            <View
                                key={index}
                                className={styles.userList}
                            >
                                <View className={styles.itemTitle}>
                                    {item.title} :
                                </View>
                                {
                                    item.name==='sex' ? this.sex_view(item) :
                                    item.name==='province' ? this.province_view(item) :
                                    item.name==='cost_average_price' ? this.cost_average_price_view(item) :
                                    item.name==='cost_times' ? this.cost_times_view(item) :
                                    item.name==='resent_cost_time' ? this.resent_cost_time_view(item) :
                                    item.name==='resent_visit_time' ? this.resent_visit_time_view(item) :
                                    item.name==='register_time' ? this.register_time_view(item) :
                                    item.name==='user_tag' ? this.user_tag_view(item) : null
                                }
                            </View>
                        )
                    }
                </View> */}
                <View className={styles.sendToView}>
                    <View className={styles.itemTitle}>
                        发送范围 :
                    </View>
                    <Radio checked>全部粉丝</Radio>
                </View>
                <View className={styles.sendToView}>
                    <View className={styles.itemTitle}>
                        发送给 :
                    </View>
                    <span>{broadcastRecordUserSearch.total_number}</span>人
                </View>
                <MsgTab
                    ref={(e)=> this.MsgTab = e }
                    showTabKey={[1,2,3,4,5]}
                    size='large'
                    initialValue={{}}
                />
                <View className={styles.footerBtn}>
                    <Button
                        type="primary"
                        onClick={()=>{
                            this.props.dispatch(createWechatBroadcast({params:{
                                condition_type:1,
                                send_time:moment().format('X'),
                                send_content:this.MsgTab.state.send_content[0]
                            }}))
                        }}
                    >
                        立即群发
                    </Button>
                    <Button
                        onClick={()=>{
                            this.setState({
                                timingSendVisible: true,
                            })
                        }}
                    >
                        定时群发
                    </Button>
                    <Button>预览</Button>
                    <Tag>您今天还可群发{can_send_state ? ableTimes : 0}次</Tag>
                </View>
                <Modal
                    visible={timingSendVisible}
                    cancelText='取消'
                    okText='定时群发'
                    title={(
                        <View
                            style={{ flexDirection: "row", alignItems: "center" }}
                        >
                        <View style={{ marginRight: "12px" }}>定时群发</View>
                            <Tag>您今天还可群发{can_send_state ? ableTimes : 0}次</Tag>
                        </View>
                    )}
                    onCancel={()=>{
                        this.setState({
                            timingSendVisible: false,
                        })
                    }}
                    onOk={()=>{
                        const { day, time } = this.SendTimingModal.state
                        const { send_content } = this.MsgTab.state
                        if(day.length&&time.length){
                            let send_time = moment(`${day} ${time}`).format('X')
                            // console.log('send_time',send_time);
                            if(send_content.length){
                                this.props.dispatch(createWechatBroadcast({params:{
                                    condition_type:1,
                                    send_time,
                                    send_content:send_content[0]
                                }}))
                            }else {
                                message.warn('发送内容必选！',1);
                            }
                        }else{
                            message.warn('请选择发送时间！',1);
                        }
                    }}
                >
                    <SendTimingModal
                        {...this.props}
                        ref={e=>this.SendTimingModal=e}
                    />
                </Modal>
            </View>
        )
    }
    sex_view(item:{list:Array<{id:number,title:string}>}){
        const { condition } = this.state
        // console.log(condition.sex);
        return(
            <View className={`${styles.broadcastItem}`}>
                <Button
                    className={!condition.sex.length ? styles.activeSpan : ''}
                    onClick={()=>{
                        this.setState({
                            condition:Object.assign({},condition,{sex:[]})
                        })
                    }}
                >
                    不限
                </Button>
                {
                    item.list&&item.list.map((sexItem,index) =>
                    <Button
                        key={index}
                        className={condition.sex.indexOf(sexItem.id)>-1 ? styles.activeSpan : ''}
                        onClick={()=>{
                            let ifIndex = condition.sex.indexOf(sexItem.id)
                            if(ifIndex>-1){
                                let newusertag = condition.sex.concat()
                                newusertag.splice(ifIndex, 1)
                                this.setState({
                                    condition:Object.assign({},condition,{sex:newusertag})
                                })
                            }else{
                                this.setState({
                                    condition:Object.assign({},condition,{sex:[...condition.sex,sexItem.id]})
                                })
                            }
                        }}
                    >
                        {
                            sexItem.title
                        }
                    </Button>
                    )
                }
            </View>
        )
    }
    province_view(item:{list:Array<{id:string,title:string}>}){
        const { condition, provinceMore } = this.state
        // console.log(condition.province);
        return(
            <View className={`${styles.broadcastItem}`}>
                <Button
                    className={!condition.province.length ? styles.activeSpan : ''}
                    onClick={()=>{
                        this.setState({
                            condition:Object.assign({},condition,{province:[]})
                        })
                    }}
                >
                    不限
                </Button>
                {
                    item.list[0].map((resentCostTimeItem,index) =>
                    <Button
                        key={index}
                        className={condition.province.indexOf(resentCostTimeItem.id)>-1 ? styles.activeSpan : ''}
                        onClick={()=>{
                            let ifIndex = condition.province.indexOf(resentCostTimeItem.id)
                            if(ifIndex>-1){
                                let newusertag = condition.province.concat()
                                newusertag.splice(ifIndex, 1)
                                this.setState({
                                    condition:Object.assign({},condition,{province:newusertag})
                                })
                            }else{
                                this.setState({
                                    condition:Object.assign({},condition,{province:[...condition.province,resentCostTimeItem.id]})
                                })
                            }
                        }}
                    >
                        {
                            resentCostTimeItem.title
                        }
                    </Button>
                    )
                }
                <a
                    onClick={()=>{
                        this.setState({
                            provinceMore:true
                        })
                    }}
                >
                    更多...
                </a>
                <Modal
                    title=""
                    width={888}
                    visible={provinceMore}
                    onOk={()=>{
                        // this.setState({
                        //     provinceMore:true
                        // })
                    }}
                    onCancel={()=>{
                        this.setState({
                            provinceMore:false
                        })
                    }}
                >
                    {
                        this.provinceMoreView(item)
                    }
                </Modal>
            </View>
        )
    }
    cost_average_price_view(item:{list:Array<{id:string,title:string}>}){
        const { condition } = this.state
        // console.log(condition.user_tag);
        return(
            <View className={`${styles.broadcastItem}`}>
                <Button
                    className={!condition.cost_average_price.length ? styles.activeSpan : ''}
                    onClick={()=>{
                        this.setState({
                            condition:Object.assign({},condition,{cost_average_price:[]})
                        })
                    }}
                >
                    不限
                </Button>
                {
                    item.list.map((constAveragePriceItem,index) =>
                    <Button
                        key={index}
                        className={condition.cost_average_price.indexOf(constAveragePriceItem.id)>-1 ? styles.activeSpan : ''}
                        onClick={()=>{
                            let ifIndex = condition.cost_average_price.indexOf(constAveragePriceItem.id)
                            if(ifIndex>-1){
                                let newusertag = condition.cost_average_price.concat()
                                newusertag.splice(ifIndex, 1)
                                this.setState({
                                    condition:Object.assign({},condition,{cost_average_price:newusertag})
                                })
                            }else{
                                this.setState({
                                    condition:Object.assign({},condition,{cost_average_price:[...condition.cost_average_price,constAveragePriceItem.id]})
                                })
                            }
                        }}
                    >
                        {
                            constAveragePriceItem.title
                        }
                    </Button>
                    )
                }
            </View>
        )
    }
    cost_times_view(item:{list:Array<{id:string,title:string}>}){
        const { condition } = this.state
        // console.log(condition.cost_times);
        return(
            <View className={`${styles.broadcastItem}`}>
                <Button
                    className={!condition.cost_times.length ? styles.activeSpan : ''}
                    onClick={()=>{
                        this.setState({
                            condition:Object.assign({},condition,{cost_times:[]})
                        })
                    }}
                >
                    不限
                </Button>
                {
                    item.list.map((costTimesItem,index) =>
                    <Button
                        key={index}
                        className={condition.cost_times.indexOf(costTimesItem.id)>-1 ? styles.activeSpan : ''}
                        onClick={()=>{
                            let ifIndex = condition.cost_times.indexOf(costTimesItem.id)
                            if(ifIndex>-1){
                                let newusertag = condition.cost_times.concat()
                                newusertag.splice(ifIndex, 1)
                                this.setState({
                                    condition:Object.assign({},condition,{cost_times:newusertag})
                                })
                            }else{
                                this.setState({
                                    condition:Object.assign({},condition,{cost_times:[...condition.cost_times,costTimesItem.id]})
                                })
                            }
                        }}
                    >
                        {
                            costTimesItem.title
                        }
                    </Button>
                    )
                }
            </View>
        )
    }
    resent_cost_time_view(item:{list:Array<{id:string,title:string}>}){
        const { condition } = this.state
        // console.log(condition.resent_cost_time);
        return(
            <View className={`${styles.broadcastItem}`}>
                <Button
                    className={!condition.resent_cost_time.length ? styles.activeSpan : ''}
                    onClick={()=>{
                        this.setState({
                            condition:Object.assign({},condition,{resent_cost_time:[]})
                        })
                    }}
                >
                    不限
                </Button>
                {
                    item.list.map((resentCostTimeItem,index) =>
                    <Button
                        key={index}
                        className={condition.resent_cost_time.indexOf(resentCostTimeItem.id)>-1 ? styles.activeSpan : ''}
                        onClick={()=>{
                            let ifIndex = condition.resent_cost_time.indexOf(resentCostTimeItem.id)
                            if(ifIndex>-1){
                                let newusertag = condition.resent_cost_time.concat()
                                newusertag.splice(ifIndex, 1)
                                this.setState({
                                    condition:Object.assign({},condition,{resent_cost_time:newusertag})
                                })
                            }else{
                                this.setState({
                                    condition:Object.assign({},condition,{resent_cost_time:[...condition.resent_cost_time,resentCostTimeItem.id]})
                                })
                            }
                        }}
                    >
                        {
                            resentCostTimeItem.title
                        }
                    </Button>
                    )
                }
                {
                    this.customTime()
                }
            </View>
        )
    }
    resent_visit_time_view(item:{list:Array<{id:string,title:string}>}){
        const { condition } = this.state
        // console.log(condition.resent_visit_time);
        return(
            <View className={`${styles.broadcastItem}`}>
                <Button
                    className={!condition.resent_visit_time.length ? styles.activeSpan : ''}
                    onClick={()=>{
                        this.setState({
                            condition:Object.assign({},condition,{resent_visit_time:[]})
                        })
                    }}
                >
                    不限
                </Button>
                {
                    item.list.map((resentVisitTimeItem,index) =>
                    <Button
                        key={index}
                        className={condition.resent_visit_time.indexOf(resentVisitTimeItem.id)>-1 ? styles.activeSpan : ''}
                        onClick={()=>{
                            let ifIndex = condition.resent_visit_time.indexOf(resentVisitTimeItem.id)
                            if(ifIndex>-1){
                                let newusertag = condition.resent_visit_time.concat()
                                newusertag.splice(ifIndex, 1)
                                this.setState({
                                    condition:Object.assign({},condition,{resent_visit_time:newusertag})
                                })
                            }else{
                                this.setState({
                                    condition:Object.assign({},condition,{resent_visit_time:[...condition.resent_visit_time,resentVisitTimeItem.id]})
                                })
                            }
                        }}
                    >
                        {
                            resentVisitTimeItem.title
                        }
                    </Button>
                    )
                }
            </View>
        )
    }
    register_time_view(item:{list:Array<{id:string,title:string}>}){
        const { condition } = this.state
        // console.log(condition.register_time);
        return(
            <View className={`${styles.broadcastItem}`}>
                <Button
                    className={!condition.register_time.length ? styles.activeSpan : ''}
                    onClick={()=>{
                        this.setState({
                            condition:Object.assign({},condition,{register_time:[]})
                        })
                    }}
                >
                    不限
                </Button>
                {
                    item.list.map((registerTimeItem,index) =>
                    <Button
                        key={index}
                        className={condition.register_time.indexOf(registerTimeItem.id)>-1 ? styles.activeSpan : ''}
                        onClick={()=>{
                            let ifIndex = condition.register_time.indexOf(registerTimeItem.id)
                            if(ifIndex>-1){
                                let newusertag = condition.register_time.concat()
                                newusertag.splice(ifIndex, 1)
                                this.setState({
                                    condition:Object.assign({},condition,{register_time:newusertag})
                                })
                            }else{
                                this.setState({
                                    condition:Object.assign({},condition,{register_time:[...condition.register_time,registerTimeItem.id]})
                                })
                            }
                        }}
                    >
                        {
                            registerTimeItem.title
                        }
                    </Button>
                    )
                }
                {
                    this.customTime()
                }
            </View>
        )
    }
    user_tag_view(item:{list:Array<{id:number,name:string}>}){
        const { condition } = this.state
        // console.log(condition.user_tag);
        return(
            <View className={`${styles.broadcastItem}`}>
                <Button
                    className={!condition.user_tag.length ? styles.activeSpan : ''}
                    onClick={()=>{
                        this.setState({
                            condition:Object.assign({},condition,{user_tag:[]})
                        })
                    }}
                >
                    不限
                </Button>
                {
                    item.list&&item.list.map((usertagItem,index) =>
                    <Button
                        key={index}
                        className={condition.user_tag.indexOf(usertagItem.id)>-1 ? styles.activeSpan : ''}
                        onClick={()=>{
                            let ifIndex = condition.user_tag.indexOf(usertagItem.id)
                            if(ifIndex>-1){
                                let newusertag = condition.user_tag.concat()
                                newusertag.splice(ifIndex, 1)
                                this.setState({
                                    condition:Object.assign({},condition,{user_tag:newusertag})
                                })
                            }else{
                                this.setState({
                                    condition:Object.assign({},condition,{user_tag:[...condition.user_tag,usertagItem.id]})
                                })
                            }
                        }}
                    >
                        {
                            usertagItem.name
                        }
                    </Button>
                    )
                }
            </View>
        )
    }
    customTime(){
        return(
            <Popover
                trigger="click"
                placement="left"
                content={(
                    <View className={styles.rangePickerView}>
                        <RangePicker
                            onChange={(date, dateString) => {
                                console.log(date, dateString);
                            }}
                        />
                        <View className={styles.rangePickerOperation}>
                            <Button>取消</Button>
                            <Button type='primary'>确定</Button>
                        </View>
                    </View>
                )}
            >
                <a>自定义...</a>
            </Popover>
        )
    }
    provinceMoreView(item:{list:Array<{id:string,title:string}>}){
        const { condition } = this.state
        const allProvince = []
        item.list[0].map((item,index)=>allProvince.push(item.id))
        item.list[1].map((item,index)=>allProvince.push(item.id))
        item.list[2].map((item,index)=>allProvince.push(item.id))
        allProvince.splice(1, 1)
        return(
            <View className={styles.provinceMoreView}>
                <View className={styles.broadcastItem}>
                    {
                        item.list[0].map((resentCostTimeItem,index) =>
                        <Button
                            key={index}
                            className={condition.province.indexOf(resentCostTimeItem.id)>-1 ? styles.activeSpan : ''}
                            onClick={()=>{
                                let ifIndex = condition.province.indexOf(resentCostTimeItem.id)
                                if(ifIndex>-1){
                                    let newusertag = condition.province.concat()
                                    newusertag.splice(ifIndex, 1)
                                    this.setState({
                                        condition:Object.assign({},condition,{province:newusertag})
                                    })
                                }else{
                                    this.setState({
                                        condition:Object.assign({},condition,{province:[...condition.province,resentCostTimeItem.id]})
                                    })
                                }
                            }}
                        >
                            {
                                resentCostTimeItem.title
                            }
                        </Button>
                        )
                    }
                </View>
                <View className={styles.broadcastItem}>
                    {
                        item.list[1].map((resentCostTimeItem,index) =>
                        <Button
                            key={index}
                            className={condition.province.indexOf(resentCostTimeItem.id)>-1 ? styles.activeSpan : ''}
                            onClick={()=>{
                                let ifIndex = condition.province.indexOf(resentCostTimeItem.id)
                                if(ifIndex>-1){
                                    let newusertag = condition.province.concat()
                                    newusertag.splice(ifIndex, 1)
                                    this.setState({
                                        condition:Object.assign({},condition,{province:newusertag})
                                    })
                                }else{
                                    this.setState({
                                        condition:Object.assign({},condition,{province:[...condition.province,resentCostTimeItem.id]})
                                    })
                                }
                            }}
                        >
                            {
                                resentCostTimeItem.title
                            }
                        </Button>
                        )
                    }
                </View>
                <View className={styles.broadcastItem}>
                    {
                        item.list[2].map((resentCostTimeItem,index) =>
                        <Button
                            key={index}
                            className={condition.province.indexOf(resentCostTimeItem.id)>-1 ? styles.activeSpan : ''}
                            onClick={()=>{
                                let ifIndex = condition.province.indexOf(resentCostTimeItem.id)
                                if(ifIndex>-1){
                                    let newusertag = condition.province.concat()
                                    newusertag.splice(ifIndex, 1)
                                    this.setState({
                                        condition:Object.assign({},condition,{province:newusertag})
                                    })
                                }else{
                                    this.setState({
                                        condition:Object.assign({},condition,{province:[...condition.province,resentCostTimeItem.id]})
                                    })
                                }
                            }}
                        >
                            {
                                resentCostTimeItem.title
                            }
                        </Button>
                        )
                    }
                </View>
                <View className={styles.broadcastItem}>
                    <Button
                        className={condition.province.length===65 ? styles.activeSpan : ''}
                        onClick={()=>{
                            if(condition.province.length===65){
                                this.setState({
                                    condition:Object.assign({},condition,{province:[]})
                                })
                            }else{
                                this.setState({
                                    condition:Object.assign({},condition,{province:allProvince})
                                })
                            }
                        }}
                    >
                        全选
                    </Button>
                </View>
            </View>
        )
    }
}
