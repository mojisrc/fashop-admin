import React,{ Component } from 'react'
import { View } from 'react-web-dom'
import VoiceHeader from './header'
import VoiceTable from './table'

export default class Voice extends Component {
    render() {
        return (
            <View>
                <VoiceHeader {...this.props}/>
                <VoiceTable {...this.props} />
            </View>
        )
    }
}
