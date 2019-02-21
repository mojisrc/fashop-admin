import React,{ Component } from 'react'
import { connect } from "dva";
import { View } from '@/components/flexView'
import SendRecordHeader from './sendRecordHeader'
import SendRecordTable from './sendRecordTable'
//
// type Props = {
//     getBroadcastRecord:Function,
//     broadcastRecord:{
//         list:Array<{}>,
//         total_number:number
//     },
//     broadcastRecordLoading:boolean
// }

@connect(
    ({view:{message:{ broadcastRecordLoading, broadcastRecord }}}) => ({
        broadcastRecordLoading,
        broadcastRecord,
    }),

)
export default class SendRecord extends Component {
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
