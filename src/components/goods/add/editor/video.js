import React,{ Component } from "react";
import { View } from "react-web-dom";
import styles from './video.css'
// {
//     item: {
//         value: {
//             url: string,
//                 img: string,
//         }
//     },
// }
export default class Video extends Component{
    render() {
        const { item } = this.props
        return (
            <View className={styles.videoDetail}>
                <img
                    src={item.value.img}
                />
            </View>
        )
    }
}
