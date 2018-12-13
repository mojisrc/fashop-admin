
import React,{ Component } from 'react'
import { Tabs } from 'antd'
import { View } from 'react-web-dom'
import styles from './index.css'

import MessageManagementHeader from './header'
import MessageManagementTable from './table'

const TabPane = Tabs.TabPane

type Props = {}
type State = {}

export default class MessageManagement extends Component<Props,State> {
    render() {
        const tabList = [
            {
                key:1,
                tab:'全部消息',
            }, {
                key:2,
                tab:'未读消息',
            }, {
                key:'3',
                tab:'未回复消息',
            }, {
                key:'4',
                tab:'加星消息',
            }
        ]
        return (
            <Tabs defaultActiveKey="1">
                {
                    tabList.map(({key,tab,main}:{key:string,tab:string})=>
                        <TabPane tab={tab} key={key}>
                            <MessageManagementHeader {...this.props} />
                            <MessageManagementTable {...this.props} />
                        </TabPane>
                    )
                }
            </Tabs>
        )
    }
}
