import React,{ Component } from "react";
import { connect } from 'dva';
import { Tabs } from 'antd';
import { View } from "react-web-dom";
import Page from '@/components/public/page/index'
import styles from '@/styles/setting/paymentSetting.css'
import OrderProcess from '@/components/setting/order/process/index'

const TabPane = Tabs.TabPane;

class Index extends Component{
    render() {
        const { location, history } = this.props
        const tabsList = [
            {
                id:1,
                tab: '订单流程',
                type: 'order',
                renderView:()=><OrderProcess {...this.props} />
            },
            // {
            //     id:2,
            //     tab: '维权流程',
            //     type: 'rights',
            //     renderView:()=><RightsProcess {...this.props} />
            // }
        ]
        return (
            <View className={`${styles.orderSettingWarp} orderSetting`}>
                <Tabs
                    activeKey={location.state ? location.state.type : 'order'}
                    onChange={(key)=>{
                        // console.log('key',key)
                        router.push({
                            pathname:'/setting/orderSetting',
                            state:{
                                type:key
                            }
                        })
                    }}
                >
                    {
                        tabsList.map(({tab,id,type,renderView}) =>
                            <TabPane tab={tab} key={type}>
                                <Page>
                                    {
                                        renderView ? renderView() : null
                                    }
                                </Page>
                            </TabPane>
                        )
                    }
                </Tabs>
            </View>
        )
    }
}

const mapStateToProps = ({view}) => {
    return {

    }
}

export default connect(mapStateToProps)(Index)
