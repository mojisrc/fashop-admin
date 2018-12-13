
import React,{ Component } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Row, Col } from 'antd'
import LeftCol from './leftCol'
import RightCol from './rightCol'
import * as actions from "../../../actions/wechat";
import { formType, handleSubmitType } from "@/utils/flow";

type Props = {
    form:formType,
    wechatMenuList:{
        menu:{
            button:Array<{
                name:string,
                type:string,
                sub_button:Array<{
                    name:string,
                    type:string,
                }>
            }>,
        }
    },
    currentMenu:Array<number>,
    setWechatMenuList:Function,
    setCurrentMenu:Function,
    getWechatMenuList:Function,
}
type State = {
    sort:boolean
}

@connect(
    ({view:{wechat:{ menuList, currentMenu, wechatMenuList }}}) => ({
        currentMenu,
        wechatMenuList,
    }),
    dispatch => bindActionCreators(actions,dispatch),
)
export default class SelfMenu extends Component<Props,State>{
    state = {
        sort:false
    }
    componentDidMount(){
        this.props.getWechatMenuList()
    }
    render(){
        const { sort } = this.state
        // console.log(this.props);
        return(
            <Row gutter={24}>
                <Col span={9}>
                    <LeftCol
                        {...this.props}
                        sort={sort}
                        sortEnd={()=>this.setState({sort:false})}
                        sortStart={()=>this.setState({sort:true})}
                    />
                </Col>
                <Col span={15}>
                    <RightCol
                        {...this.props}
                        sort={sort}
                    />
                </Col>
            </Row>
        )
    }
}
