//@flow
import React,{ Component } from 'react'
import { Tabs } from 'antd'
import { View } from 'react-web-dom'
import styles from './index.css'

import FollowTable from './follow'
import BlackList from './blackList'

const TabPane = Tabs.TabPane

type Props = {}
type State = {}

export default class UserManagement extends Component<Props,State> {
    render() {
        const tabList = [
            {
                key:1,
                tab:'已关注',
                main:() => <FollowTable {...this.props} />
            }, {
                key:2,
                tab:'黑名单',
                main:() => <BlackList {...this.props} />
            }
        ]
        return (
            <Tabs defaultActiveKey="1">
                {
                    tabList.map(({key,tab,main}:{key:string,tab:string,main:Function})=>
                        <TabPane tab={tab} key={key}>
                            {
                                main()
                            }
                        </TabPane>
                    )
                }
            </Tabs>
        )
    }
}
