
import React,{ Component } from "react";
import { View } from "@/components/flexView";
import styles from "./index.css";
import moment from 'moment'

type Props = {
    title:string,
    time:string
}
type State = {
    voiceing:boolean
}

export default class ModalVoice extends Component{
    state = {
        voiceing:false
    }
    render(){
        const { title, time } = this.props
        const { voiceing } = this.state
        return(
            <View className={styles.modalVoiceView}>
                <View
                    className={styles.voiceImgView}
                    onClick={()=>{
                        this.setState({
                            voiceing:!voiceing
                        })
                    }}
                >
                    {
                        voiceing ?
                        <img
                            src={require('@/assets/images/wechat/voiceing.gif')}
                            style={{
                                width:'100%',
                                height:'100%',
                            }}
                        /> :
                        <img
                            src={require('@/assets/images/wechat/voice.png')}
                            style={{
                                width:'100%',
                                height:'100%',
                            }}
                        />
                    }
                </View>
                <View className={styles.voiceContentView}>
                    <p>
                        <span>{title}</span>
                    </p>
                    <p>
                        {
                            moment(time,'X').format('YYYY-MM-DD')
                        }
                    </p>
                </View>
            </View>
        )
    }
}
