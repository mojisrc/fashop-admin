import React,{ Component } from "react";
import { View } from "@/components/flexView";
import styles from "./index.css";
import Image from '../../image'

// type Props = {
//     extra:Array<{
//         title:string,
//         thumb_url:string,
//         digest:string
//     }>
// }
// type State = {}

export default class ModalNews extends Component {
    render(){
        const { extra } = this.props
        return(
            <View className={styles.modalNewsView}>
                <View className={styles.contentView}>
                    <p>{extra[0].title}</p>
                    <View className={styles.imgView}>
                        <Image
                            src={`https://demo.fashop.cn/admin/mix/wechatImage?url=${extra[0].thumb_url}`}
                            style={{
                                width: '100%'
                            }}
                        />
                    </View>
                    <p>{extra[0].digest}</p>
                </View>
            </View>
        )
    }
}
