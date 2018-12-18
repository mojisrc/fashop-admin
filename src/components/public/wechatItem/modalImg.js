import React from "react";
import { View } from "@/components/flexView";
import styles from "./index.css";
import Image from '../../image'

const ModalImg = ({title,img}:{title:string,img:string}) => (
    <View className={styles.modalImgView}>
        <p>{title}</p>
        <View className={styles.coverView}>
            <Image
                src={`https://demo.fashop.cn/admin/mix/wechatImage?url=${img}`}
            />
        </View>
    </View>
)

export default ModalImg
