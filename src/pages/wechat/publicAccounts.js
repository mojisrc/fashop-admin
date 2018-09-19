//@flow
import React,{ Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import * as actions from "../../actions/wechat";
import { View } from "react-web-dom";
import BindPublicAccountsTrue from "./bindTrue";
import BindPublicAccountsFalse from "./bindFalse";

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
    wechatConfigInfo:{},
    getWechatConfigInfo:Function
}
type State = {}

@connect(
    ({view:{wechat:{ wechatConfigInfo }}}) => ({
        wechatConfigInfo
    }),
    dispatch => bindActionCreators(actions,dispatch),
)
export default class PublicAccounts extends Component<Props,State> {
    componentDidMount(){
        this.props.getWechatConfigInfo()
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
