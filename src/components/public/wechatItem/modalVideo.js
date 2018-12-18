import React,{ Component } from "react";
import { View } from "@/components/flexView";
import styles from "./index.css";
import { Fetch } from '@/utils'

export default class ModalVideo extends Component{
    state = {

    }
    componentDidMount(){
        const { media_id } = this.props
        Fetch.fetch({api:'WECHATMATERIALGET',params:{media_id:'vD4JnBXuvuCMnDe18eWVn3TBkgICy_im9fon4dbo1Pw'}})
        .then((e)=>{
            console.log(e);
        })
    }
    render(){
        return(
            <View className={styles.modalImgView}>
                {/* <p>{title}</p>
                <View className={styles.coverView}>
                    <Image
                        src={`https://demo.fashop.cn/admin/mix/wechatImage?url=${img}`}
                    />
                </View> */}
            </View>
        )
    }
}
