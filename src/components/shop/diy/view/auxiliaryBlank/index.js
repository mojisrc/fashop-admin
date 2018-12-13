
import React, { Component } from "react";
import { View } from "react-web-dom";

type Props = {
    options: {
        height: number
    }
}
type State = {}

export default class Index extends Component {
    render() {
        const { options } = this.props
        const { height } = options
        return (
            <View
                style={{
                    height: `${height}px`
                }}
            >
            </View>
        )
    }
}
