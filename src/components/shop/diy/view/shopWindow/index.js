import React,{ Component } from "react";
import styles from "./index.css";
import Image from "@/components/image/index";
//
// type Props = {
//         options: {
//             layout_style: number
//         },
//         data: Array<{
//             img: {
//                 url: string
//             },
//             title: string,
//             link: {
//                 action: LinkActionType,
//                 param: {}
//             }
//         }>
// }
// type State = {}

export default class Index extends Component{
    render() {
        const { data, options } = this.props
        const { layout_style } = options
        return (
            <div>
                {
                    layout_style===1 ? <div className={styles.shopWindowPhoneWarp}>
                        <div className={styles.shopWindowPhoneLeft}>
                            <Image src={data[0]&&data[0].img.url}/>
                        </div>
                        <div className={styles.shopWindowPhoneRight}>
                            <Image src={data[1]&&data[1].img.url}/>
                            <Image src={data[2]&&data[2].img.url}/>
                        </div>
                    </div> : <div className={styles.shopWindowPhoneWarp}>
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
                    </div>
                }
            </div>
        )
    }
}
