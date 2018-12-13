
import React,{ Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import * as actions from "../../../actions/wechat/autoReply";
import { Tabs, Alert, Switch } from 'antd'
import { View } from 'react-web-dom'
import styles from './index.css'
import KeyWordsReplyTable from './keyWordsReply'
import FollowedReply  from './followedReply'

const TabPane = Tabs.TabPane;

type Props = {
    history:{
        push:Function,
        replace:Function,
    },
    pathSearch:{
        menu:string,
        tab:string,
    },
    getAutoReplyStatus:Function,
    setAutoReplyStatus:Function,
    autoReplyStatus:number
}
type State = {}

@connect(
    ({view:{wechatAutoReply:{ autoReplyStatus }}}) => ({
        autoReplyStatus
    }),
    dispatch => bindActionCreators(actions,dispatch),
)
export default class AutoReply extends Component<Props,State> {
    componentDidMount(){
        this.props.getAutoReplyStatus()
    }
    render() {
        const { pathSearch, history, autoReplyStatus } = this.props
        const tabList = [
            {
                key:1,
                tab:'关键词回复',
                main:() => <KeyWordsReplyTable {...this.props} />
            }, {
                key:2,
                tab:'被关注回复',
                main:() => <FollowedReply {...this.props} />
            }
        ]
        return (
            <Tabs defaultActiveKey="1">
                {
                    tabList.map(({tab,main,key}:{tab:string,main:Function,key:string})=>
                        <TabPane tab={tab} key={key}>
                            <View className={styles.alertSwitchView}>
                                <Alert
                                    message="自动回复"
                                    description="通过编辑内容或关键词规则，快速进行自动回复设置。关闭自动回复之后，将立即对所有用户生效。"
                                    type="info"
                                    showIcon
                                />
                                <Switch
                                    checked={autoReplyStatus ? true : false}
                                    onChange={()=>{
                                        this.props.setAutoReplyStatus({params:{status:autoReplyStatus ? 0 : 1}})
                                    }}
                                />
                            </View>
                            {
                                autoReplyStatus ? main() : ''
                            }
                        </TabPane>
                    )
                }
            </Tabs>
        )
    }
}
