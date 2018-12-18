import React,{ Component } from "react";
import { View } from "@/components/flexView";
import styles from "./index.css";
import Image from '../../image'

// type Props = {
//     extra:Array<{
//         title:string,
//         cover_pic:string,
//     }>
// }
// type State = {}

export default class ModalLocalNews extends Component {
    render(){
        const { extra } = this.props
        return(
            <View className={styles.manyArticleView}>
                <View className={styles.manyArticleTop}>
                    <View>
                        <Image
                            src={extra[0].cover_pic}
                            style={{
                                width: '100%'
                            }}
                        />
                        <p>{extra[0].title}</p>
                    </View>
                </View>
                {
                    extra.map((extraItem,index) =>
                        index>0 ? <View className={styles.childListItem} key={index}>
                            <p>{extraItem.title}</p>
                            <View>
                                <Image
                                    src={extraItem.cover_pic}
                                    style={{
                                        width: '100%'
                                    }}
                                />
                            </View>
                        </View> : null
                    )
                }
            </View>
        )
    }
}
