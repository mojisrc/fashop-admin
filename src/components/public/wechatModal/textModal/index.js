import React, { Component } from "react";
import { View } from "@/components/flexView";
import { Modal, Input } from "antd";
import styles from "./index.css";
import Emoji from "../../emoji";
const { TextArea } = Input;
//
// type Props = {
//     visible:boolean,
//     close:Function,
//     onOk:Function,
//     initialValue:string
// }
// type State = {
//     textValue:string
// }

export default class TextModal extends Component {
    state = {
        textValue:''
    }
    render() {
        const { visible, close, onOk } = this.props
        const { textValue } = this.state
        return (
            <Modal
                title="添加文字"
                cancelText='取消'
                okText='确定'
                visible={visible}
                bodyStyle={{ padding: 0 }}
                onCancel={()=>{
                    close()
                }}
                onOk={()=>{
                    onOk(textValue)
                    close()
                    this.setState({textValue:''})
                }}
            >
                {
                    this.returnText()
                }
            </Modal>
        )
    }
    returnText(){
        const { textValue } = this.state
        const { initialValue } = this.props
        return(
            <View className={styles.textView}>
                <TextArea
                    value={initialValue.length&&!textValue.length ? initialValue : textValue}
                    autosize={{ minRows: 8, maxRows: 10 }}
                    onChange={(e)=>{
                        this.setState({textValue:e.target.value})
                    }}
                />
                <View className={styles.textViewBot}>
                    <Emoji
                        clickFunc={(emoji)=>{
                            let value = `${textValue}${emoji}`
                            this.setState({textValue:value})
                        }}
                    />
                    <p>还可输入{600-textValue.length}字，按Enter换行</p>
                </View>
            </View>
        )
    }
}
