//@flow
import React,{ Component } from "react";
import styles from "./index.css";
import { View } from "react-web-dom";
import Image from "../../../../image/index";
import type { LinkActionType } from "../../controller/common/actionLink"

type Props = {
        options: {
            layout_style: number
        },
        data: Array<{
            img: {
                url: string
            },
            title: string,
            link: {
                action: LinkActionType,
                param: {}
            }
        }>
}
type State = {}

export default class Index extends Component<Props,State>{
    render() {
        const { data, options } = this.props
        const { layout_style } = options
        return (
            <View>
                {
                    layout_style===1 ? <View className={styles.shopWindowPhoneWarp}>
                        <View className={styles.shopWindowPhoneLeft}>
                            <Image src={data[0]&&data[0].img.url}/>
                        </View>
                        <View className={styles.shopWindowPhoneRight}>
                            <Image src={data[1]&&data[1].img.url}/>
                            <Image src={data[2]&&data[2].img.url}/>
                        </View>
                    </View> : <View className={styles.shopWindowPhoneWarp}>
                        {
                            data.map((item,index)=>{
                                return <View
                                    key={index}
                                    className={styles.shopWindowPhoneItem}
                                >
                                    <Image src={item.img.url}/>
                                </View>
                            })
                        }
                    </View>
                }
            </View>
        )
    }
}
