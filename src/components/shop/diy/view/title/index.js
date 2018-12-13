import React, { Component } from "react";
import styles from "./index.css";
//
// type Props = {
//     options: {
//         title: string,
//         align: string,
//         background_color: string,
//         font_color: string,
//         leading_image: {
//             url: string
//         }
//     }
// }
// type State = {}

export default class Index extends Component {
    render() {
        const { options } = this.props
        const { title, align, background_color, font_color, leading_image } = options
        return (
            <p
                className={styles.titlePhoneWarp}
                style={{
                    textAlign: `${align}`,
                    color: `${font_color}`,
                    backgroundColor: `${background_color}`,
                }}
            >
                <img
                    alt=''
                    src={leading_image.url}
                />
                {title}
            </p>
        )
    }
}
