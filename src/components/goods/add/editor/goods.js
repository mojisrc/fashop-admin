import React,{ Component } from "react";
import { View } from "@/components/flexView";
import styles from './goods.css'
import Image from '@/image'

export default class Goods extends Component{
    render() {
        const { item } = this.props
        const value = item.value
        return (
            <View
                className={styles.listWarp}
            >
                <View className={styles.listImgWarp}>
                    <Image alt='' src={value.img.url}/>
                </View>
                <View className={styles.listRight}>
                    <span className={styles.listTitle}>{value.title}</span>
                    <span className={styles.listPrice}>
                        ￥{value.price}
                    </span>
                </View>
            </View>
        )
    }
}
