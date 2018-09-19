//@flow
import React,{ Component } from "react";
import { View } from "react-web-dom";
import styles from "./index.css";
import Image from '../../image'
import { Fetch } from '../../../utils'

type Props = {}
type State = {}

export default class ModalVideo extends Component<Props,State>{
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
