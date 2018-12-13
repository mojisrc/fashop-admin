
import React,{ Component } from 'react'
import { View } from 'react-web-dom'
import VideoHeader from './header'
import VideoTable from './table'

type Props = {}
type State = {}

export default class Video extends Component<Props,State> {
    render() {
        return (
            <View>
                <VideoHeader {...this.props}/>
                <VideoTable {...this.props} />
            </View>
        )
    }
}
