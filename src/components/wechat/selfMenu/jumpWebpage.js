import React,{ Component } from 'react'
import { View } from '@/components/flexView'
import { Card, Input } from 'antd'
import styles from './index.css'
// type State = {
//     approve:boolean
// }

export default class JumpWebpage extends Component{
    state = {
        approve:false
    }
    render(){
        const { approve } = this.state
        return(
            <Card>
                <View className={styles.cardView}>
                    <p>订阅者点击该子菜单会跳到以下链接</p>
                    <View className={styles.jumpWebpageView}>
                        <span>页面地址</span>
                        <Input
                            disabled={!approve}
                            defaultValue="认证后才可手动输入地址"
                            style={{ width:282 }}
                        />
                    </View>
                    <a>从公众号图文消息中选择</a>
                </View>
            </Card>
        )
    }
}
