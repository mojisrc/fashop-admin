//@flow
import React,{ Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import * as actions from "../../../actions/wechat/message";
import { View } from 'react-web-dom'
import SendRecordHeader from './sendRecordHeader'
import SendRecordTable from './sendRecordTable'

type Props = {
    getBroadcastRecord:Function,
    broadcastRecord:{
        list:Array<{}>,
        total_number:number
    },
    broadcastRecordLoading:boolean
}
type State = {}

@connect(
    ({view:{message:{ broadcastRecordLoading, broadcastRecord }}}) => ({
        broadcastRecordLoading,
        broadcastRecord,
    }),
    dispatch => bindActionCreators(actions,dispatch),
)
export default class SendRecord extends Component<Props,State> {
    componentDidMount(){
        this.props.getBroadcastRecord({params:{}})
    }
    render() {
        return (
            <View>
                <SendRecordHeader {...this.props} />
                <SendRecordTable {...this.props} />
            </View>
        )
    }
}
