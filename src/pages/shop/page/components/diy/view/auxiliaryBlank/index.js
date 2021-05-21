import React, { Component } from "react";
//
// type Props = {
//     options: {
//         height: number
//     }
// }
// type State = {}

export default class Index extends Component {
    render() {
        const { options } = this.props
        const { height } = options
        return (
            <div
                style={{
                    height: `${height}px`
                }}
            >
            </div>
        )
    }
}
