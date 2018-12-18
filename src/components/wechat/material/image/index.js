import React,{ Component } from 'react'
import { View } from '@/components/flexView'
import ImageHeader from './header'
import ImageTable from './table'
export default class Image extends Component {
    render() {
        return (
            <View>
                <ImageHeader {...this.props}/>
                <ImageTable {...this.props} />
            </View>
        )
    }
}
