//@flow
import React,{ Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import * as actions from "../../actions/wechat";
import { Layout, Menu, Icon, Alert } from 'antd'
import { View } from 'react-web-dom'
import Page from '../../components/public/page/index'
import styles from '../../styles/wechat/management.css'
import { publicFunction } from '../../utils'

import SelfMenu from '../../components/wechat/selfMenu'
import AutoReply from '../../components/wechat/autoReply'
import MessageSend from '../../components/wechat/message'
import UserManagement from '../../components/wechat/userManagement'
import MessageManagement from '../../components/wechat/message'
import Material from '../../components/wechat/material'
import PublicAccountsSetting from '../../components/wechat/publicAccountsSetting'

import AddReply from './addReply'
import EditReply from './editReply'
import AddWechatMaterial from './addWechatMaterial'
import AddServerMaterial from './addServerMaterial'
import EditWechatMaterial from './editWechatMaterial'
import EditServerMaterial from './editServerMaterial'

const { Content, Sider } = Layout
const { parseQuery } = publicFunction

type Props = {
    history:{
        push:Function,
        replace:Function,
        goBack:Function,
    },
    location:{
        search:string
    },
    form:{
        getFieldValue:Function,
        setFieldsValue:Function,
        validateFields:Function,
        getFieldDecorator:Function,
    },
    getWechatApiStatus:Function,
    wechatApiStatus: boolean
}
type State = {}

@connect(
    ({view:{wechat:{ wechatApiStatus }}}) => ({
        wechatApiStatus
    }),
    dispatch => bindActionCreators(actions,dispatch),
)
export default class BindTruePublicAccounts extends Component<Props,State> {
    componentDidMount(){
        this.props.getWechatApiStatus()
    }
    render() {
        const { location, history, wechatApiStatus } = this.props
        const search = parseQuery(location.search)
        const menuList = [
            {
                title: "自定义菜单",
                key: "1",
            }, {
                title: "自动回复",
                key: "2",
            }, {
                title: "消息群发",
                key: "3",
            }, {
                title: "用户管理",
                key: "4",
            },
            // {
            //     title: "消息管理",
            //     key: "5",
            // },
            {
                title: "素材管理",
                key: "6",
            }, {
                title: "公众号设置",
                key: "7",
            }
        ]
        return (
            <div className={styles.page}>
                <View className={!wechatApiStatus ? styles.alertView : styles.alertViewNone}>
                    <Alert
                        message="微信授权失败"
                        description={(
                            <p>
                                可能原因：
                                1.秘钥失败错误，<a>去设置</a>&nbsp;
                                2.授权给了其他<a>微信公众号</a>&nbsp;
                                3.已设置，<a>刷新状态</a>
                            </p>
                        )}
                        type="error"
                        showIcon
                    />
                </View>
                <Layout style={{ background: '#fff' }}>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            style={{ minHeight: '722px' }}
                            selectedKeys={[search.menu ? search.menu : "1"]}
                            className={styles.menu}
                            onClick={(item)=>{
                                history.replace({
                                    search:`?menu=${item.key}`
                                })
                            }}
                        >
                        {
                            menuList.map((data, index) =>
                                <Menu.Item
                                    key={data.key}
                                    style={
                                        index===0 ? {marginTop:8} :
                                        (index+1)%3===0 ?
                                        { borderBottom: "1px solid #ebebeb", marginBottom: "0" } : {}
                                    }
                                >
                                    {data.title}
                                </Menu.Item>
                            )
                        }
                        </Menu>
                    </Sider>
                    <Content style={{ padding: '24px' }}>
                        {
                            search.router ?
                            this.renderContentRoute(search) :
                            this.renderContent(search)
                        }
                    </Content>
                </Layout>
            </div>
        )
    }
    renderContentRoute(search){
        switch (search.router) {
            case 'addReply': return <AddReply {...this.props} pathSearch={search} />
            case 'editReply': return <EditReply {...this.props} pathSearch={search} />
            case 'addWechatMaterial': return <AddWechatMaterial {...this.props} pathSearch={search} />
            case 'addServerMaterial': return <AddServerMaterial {...this.props} pathSearch={search} />
            case 'editWechatMaterial': return <EditWechatMaterial {...this.props} pathSearch={search} />
            case 'editServerMaterial': return <EditServerMaterial {...this.props} pathSearch={search} />
        }
    }
    renderContent(search){
        switch (search.menu) {
            case 1: return <SelfMenu {...this.props} pathSearch={search} />
            case 2: return <AutoReply {...this.props} pathSearch={search} />
            case '3': return <MessageSend {...this.props} pathSearch={search} />
            case '4': return <UserManagement {...this.props} pathSearch={search} />
            case '5': return <MessageManagement {...this.props} pathSearch={search} />
            case '6': return <Material  {...this.props} pathSearch={search} />
            case '7': return <PublicAccountsSetting {...this.props} pathSearch={search} />
            default: return <SelfMenu {...this.props} pathSearch={search} />
        }
    }
}
