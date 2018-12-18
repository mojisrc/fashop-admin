import React,{ Component } from 'react'

import { connect } from 'dva';
import * as actions from "../../actions/wechat";
import { View } from "@/components/flexView";
import BindPublicAccountsTrue from "./bindTrue";
import BindPublicAccountsFalse from "./bindFalse";
@connect(
    ({view:{wechat:{ wechatConfigInfo }}}) => ({
        wechatConfigInfo
    }),

)
export default class PublicAccounts extends Component {
    componentDidMount(){
        this.props.configInfo()
    }
    render() {
        const { wechatConfigInfo } = this.props
        return (
            <View>
                {
                    wechatConfigInfo.app_key ?
                    <BindPublicAccountsTrue
                        {...this.props}
                    /> :
                    <BindPublicAccountsFalse
                        {...this.props}
                    />
                }
            </View>
        )
    }
}
