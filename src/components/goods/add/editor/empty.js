import React,{ Component } from "react";
import { connect } from "dva";
import { View } from "@/components/flexView";
import styles from './empty.css'
@connect()
export default class Empty extends Component {
    render() {
        return (
            <View className={styles.emptyDetail}>

            </View>
        )
    }
}
