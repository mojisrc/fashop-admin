import React,{ Component } from "react";
import { View } from "react-web-dom";
import styles from './line.css'

export default class Line extends Component{
    render() {
        return (
            <View className={styles.lineDetail}>
                <p></p>
            </View>
        )
    }
}
