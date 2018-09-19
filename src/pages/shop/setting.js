//@flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { Tabs } from 'antd';
import { View } from "react-web-dom";
import styles from '../../styles/shop/shopSetting.css'
import { setDiyData } from '../../actions/shop/decorate'

import ShopBasicInfo from './basicInfo'

const TabPane = Tabs.TabPane;

class Setting extends Component<{},
    {}> {
    render() {
        const tabsList = [
            {
                id: 1,
                tab: '基本信息',
                pageRender: () => <ShopBasicInfo {...this.props} />
            }
        ]
        return (
            <View className={`${styles.shopSettingWarp} shopSetting`}>
                <Tabs defaultActiveKey='1'>
                    {
                        tabsList.map(({ tab, id, pageRender }, index) =>
                            <TabPane tab={tab} key={id}>
                                {
                                    pageRender()
                                }
                            </TabPane>
                        )
                    }
                </Tabs>
            </View>
        )
    }
}

const mapStateToProps = ({ view }) => {
    return {
        options: view.shop.options,
        body: view.shop.body,
    }
}

export default connect(mapStateToProps, { setDiyData })(Setting)
