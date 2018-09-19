//@flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { View } from "react-web-dom";
import styles from './img.css'
@connect()
export default class Img extends Component<{
    data: Array<{
        images: Array<{ url: string }>
    }>,
    index: number,
    item: {
        value: {
            url: string
        }
    },
},
    {}> {
    render() {
        const { item } = this.props
        return (
            <View className={styles.imgDetail}>
                <img
                    alt=''
                    src={item.value.url}
                />
            </View>
        )
    }
}

