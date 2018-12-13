
import React,{ Component } from 'react'
import { Tabs } from 'antd'
import { View } from 'react-web-dom'
import styles from './index.css'

import BasicsSetting from './basicsSetting'

const TabPane = Tabs.TabPane

type Props = {}
type State = {}

export default class PublicAccountsSetting extends Component<Props,State> {
    render() {
        const tabList = [
            {
                key:1,
                tab:'基础设置',
                main:() => <BasicsSetting {...this.props} />
            }, {
                key:2,
                tab:'预留设置',
                main:() => <BasicsSetting {...this.props} />
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
