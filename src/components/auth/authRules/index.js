//@flow
import * as React from 'react'
import { connect } from "react-redux";
import {
    Exception403,
} from "../../../pages/exception/view";


type AuthComProps = {
    userInfo: {rules:Array<string>},
    rules: Array<string>,
    children: any,
    hide: boolean,
}

type authHocProps = {
    rules: Array<string>,
    hide: boolean,
}

type AuthRulesProps = {
    userInfo: {rules:Array<string>},
    rules: Array<string>,
    children: any,
    hide: boolean,
    showView: React.Node,
    polyfill: boolean,
}

class AuthRules extends React.Component<AuthRulesProps,{}>{
    static defaultProps = {
        showView: <div>没有权限</div>,
        polyfill: false,
    }
    render() {
        const {
            userInfo,
            rules,
            hide,
            showView,
            polyfill,
        } = this.props
        const meetAuth = rules.filter((e)=>userInfo.rules.includes(e))
        const result = polyfill ? meetAuth.length>0 : meetAuth.length===rules.length
        if(result){
            return this.props.children
        }else {
            if(hide){
                return null
            }else {
                return showView
            }
        }
    }
}



@connect(({app:{user:{userInfo}}})=>({
    userInfo
}))
class AuthCom extends React.Component<AuthComProps,{}> {
    static defaultProps = {
        dispatch:()=>{},
        userInfo: {rules:[]},
        rules: [],
        hide: true,
    }
    render() {
        const {
            userInfo,
            rules,
            hide,
        } = this.props
        return (
            <AuthRules userInfo={userInfo} rules={rules} hide={hide} showView={<Exception403/>}>
                {this.props.children}
            </AuthRules>
        )
    }
}


const authHoc = (initHocParams:authHocProps={hide:false,rules:[]})=>{
    const hocParams = Object.assign({}, {
        rules: [],
        hide: false,
    }, initHocParams)
    return (WrappedComponent:any)=>{
        return (
            connect(({app:{user:{userInfo}}})=>({
                userInfo
            }))(
                class AuthContainer extends WrappedComponent {
                    render() {
                        const {
                            userInfo,
                        } = this.props
                        const {
                            rules,
                            hide,
                        } = hocParams
                        return (
                            <AuthRules userInfo={userInfo} rules={rules} hide={hide} showView={<Exception403/>} polyfill={true}>
                                <WrappedComponent {...this.props}/>
                            </AuthRules>
                        )
                    }
                }
            )
        )
    }
}



export {
    AuthCom,
    authHoc,
}
