import React, { Component } from "react";
import { connect } from "dva";
import { View } from "react-web-dom";
import styles from './img.css'
@connect()
export default class Img extends Component{
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

