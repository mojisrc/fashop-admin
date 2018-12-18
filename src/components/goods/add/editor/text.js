import React,{ Component } from "react";
import { connect } from "dva";
import { View } from "@/components/flexView";
import { Input } from "antd";
import styles from './text.css'

const { TextArea } = Input;
@connect()
export default class Text extends Component {
    render() {
        const { setGoodsDetailData, data, index, item } = this.props
        return (
            <View className={styles.textDetail}>
                <TextArea
                    value={item.value.content}
                    placeholder="请输入"
                    autosize={{ minRows: 2, maxRows: 6 }}
                    onChange={(e)=>{
                        const newdata = [...data]
                        newdata[index].value.content = e.target.value
                        setGoodsDetailData(newdata)
                    }}
                />
            </View>
        )
    }
}
