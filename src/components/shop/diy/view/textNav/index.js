import React, { Component } from "react";
import { Icon } from "antd";
import styles from "./index.css";
//
// type Props = {
//         options: any,
//         data: Array<{
//             title: string,
//             link: {
//                 action: LinkActionType,
//                 param: {}
//             },
//             background_color: string,
//             font_color: string
//         }>
// }
// type State = {}

export default class Index extends Component {
    render() {
        const { data } = this.props
        return (
            <div className={styles.textNavPhoneWarp}>
                {
                    data.map((listItem, index) => {
                        return <div
                            className={styles.textNavPhoneItem}
                            key={index}
                        >
                            <p>{listItem.title}</p>
                            <Icon type='right' />
                        </div>
                    })
                }
            </div>
        )
    }
}
