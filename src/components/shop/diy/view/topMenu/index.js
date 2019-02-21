import React, { Component } from "react";
import styles from "./index.css";
//
// type Props = {
//     options: {
//         menu_format: number,
//         menu_space: number
//     },
//     data: Array<{
//         img: {
//             url: string
//         },
//         title: string,
//         link: {
//             action: LinkActionType,
//             param: {}
//         },
//         background_color: string,
//         font_color: string
//     }>
// }
// type State = {}

export default class Index extends Component {
    render() {
        const { data, options } = this.props
        const { menu_format, menu_space } = options
        return (
            <div className={styles.topMenuPhoneWarp}>
                {
                    data.map((item, index) => {
                        return <div
                            key={index}
                            className={styles.topMenuPhoneItem}
                            style={{
                                color: `${item.font_color}`,
                                backgroundColor: `${item.background_color}`,
                                marginRight: `${
                                    menu_space === 2 && index < data.length - 1 ? '2px' : '0'
                                    }`
                            }}
                        >
                            {
                                menu_format === 2 ?
                                    <img alt='' src={item.img.url} style={{marginTop: 5}}/> : null
                            }
                            <p
                                style={
                                    menu_format === 2 ?
                                        {
                                            fontSize: '12px',
                                            marginTop: '2px',
                                        } : {}
                                }
                            >
                                {item.title}
                            </p>
                        </div>
                    })
                }
            </div>
        )
    }
}
