//@flow
import React,{ Component } from 'react'
import { View } from 'react-web-dom'
import { Button, Input } from 'antd'
import styles from './index.css'

type Props = {
    okFunc:Function,
    closePopover:Function,
    initValue:string
}
type State = {
    value:string
}

export default class PublicPopoverContent extends Component<Props,State> {
    static defaultValue = {
        initValue:''
    }
    state = {
        value:''
    }
    render(){
        const { okFunc, initValue, closePopover } = this.props
        const { value } = this.state
        return(
            <View className={styles.publicPopoverContentView}>
                <Input
                    placeholder="请输入"
                    value={value.length ? value : initValue}
                    style={{
                        width:299
                    }}
                    onChange={(e)=>{
                        this.setState({
                            value:e.target.value
                        })
                    }}
                />
                <View className={styles.publicPopoverContentBtnGroup}>
                    <Button
                        onClick={()=>{
                            closePopover()
                            this.setState({
                                value:''
                            })
                        }}
                    >
                        取消
                    </Button>
                    <Button
                        type="primary"
                        onClick={()=>{
                            closePopover()
                            this.setState({
                                value:''
                            })
                            if(value.length&&value!==initValue){
                                okFunc(value)
                            }
                        }}
                    >
                        确定
                    </Button>
                </View>
            </View>
        )
    }
}
