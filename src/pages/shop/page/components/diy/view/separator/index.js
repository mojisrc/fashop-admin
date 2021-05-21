import React, { Component } from "react";
import styles from "./index.css";
//
// type Props = {
//         options: {
//             color: string,
//             style: string
//         }
// }
// type State = {}

export default class Index extends Component {
    render() {
        const { options } = this.props
        const { color, style } = options
        return (
            <div className={styles.separatorPhoneWarp}>
                <p style={{
                    borderBottomStyle: `${style}`,
                    borderBottomColor: `${color}`
                }}
                />
            </div>
        )
    }
}
