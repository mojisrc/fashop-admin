import React from "react";
import styles from "./index.css";
import { View } from 'react-web-dom'

const EmptyView = ()=>(
    <View className={styles.emptyView}>
        暂无数据
    </View>
)

export default EmptyView
