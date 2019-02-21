import React, { Component } from "react";
import styles from "./index.css";
//
// type Props = {
//     options: {
//         rows: number,
//         each_row_display: number,
//     },
//     data: Array<{
//         img: {
//             url: string
//         },
//         title: string,
//         link: {
//             action: LinkActionType,
//             param: {}
//         }
//     }>
// }
// type State = {}

export default class Index extends Component {
    render() {
        const { data,options } = this.props
        const {each_row_display} = options
        return (
            <div
                className={styles.imgNavPhoneWarp}
            >
                {
                    data.map((item, index) => {
                        return <div
                            key={index}
                            className={styles.imgNavPhonItem}
                            style={{ width: 100 / each_row_display + '%' ,marginTop:(index+1 > each_row_display ) ? 5 :0  }}
                        >
                            <img alt='' src={item.img.url} />
                            <p>{item.title}</p>
                        </div>
                    })
                }
            </div>
        )
    }
}
