
import React,{ Component } from 'react'
import { View } from 'react-web-dom'
import ImageHeader from './header'
import ImageTable from './table'

type Props = {}
type State = {}

export default class Image extends Component<Props,State> {
    render() {
        return (
            <View>
                <ImageHeader {...this.props}/>
                <ImageTable {...this.props} />
            </View>
        )
    }
}
