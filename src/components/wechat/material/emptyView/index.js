import React from "react";
import styles from "./index.css";
import { View } from '@/components/flexView'

const EmptyView = ()=>(
    <View className={styles.emptyView}>
        暂无数据
    </View>
)

export default EmptyView
