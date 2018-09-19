//@flow
import React,{ Component } from "react";
import { View } from "react-web-dom";
import styles from './video.css'

export default class Video extends Component<
    {
        item: {
            value: {
                url: string,
                img: string,
            }
        },
    },
    {}
> {
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
