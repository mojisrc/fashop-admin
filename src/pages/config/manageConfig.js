import React,{ Component } from "react";
import { connect } from 'dva';
import Page from 'components/public/Page'
import SettingManageConfigHeader from 'components/setting/ManageConfigHeader'
import SettingManageConfigTable from 'components/setting/ManageConfigTable'
import { Tabs } from 'antd';

import SettingConfigGroup from './configGroup'


const TabPane = Tabs.TabPane;
class SettingManageConfig extends Component {
    render() {
        return (
            <Page>
                <Tabs >
                    <TabPane tab="配置管理" key="1">
                        <SettingManageConfigHeader {...this.props}/>
                        <SettingManageConfigTable/>
                    </TabPane>
                    <TabPane tab="分组管理" key="2">
                        <SettingConfigGroup/>
                    </TabPane>
                </Tabs>

            </Page>
        )
    }
}

const portal = store => {
    // const { shopCartIndex } = store.view
    return {
        login: store.app.member.login
    }
}

export default connect(portal)(SettingManageConfig)
