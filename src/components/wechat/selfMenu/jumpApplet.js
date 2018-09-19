//@flow
import React,{ Component } from 'react'
import { View } from 'react-web-dom'
import { Card, Button } from 'antd'
import styles from './index.css'

type Props = {}
type State = {}

export default class JumpApplet extends Component<Props,State>{
    render(){
        return(
            <View>
                <Card>
                    <View className={styles.JumpAppletCardView}>
                        <p>自定义菜单可跳转已绑定的小程序，本公众号尚未绑定小程序。</p>
                        <Button>
                            前往绑定
                        </Button>
                    </View>
                </Card>
            </View>
        )
    }
}
