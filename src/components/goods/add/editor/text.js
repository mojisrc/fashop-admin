//@flow
import React,{ Component } from "react";
import { connect } from "react-redux";
import { View } from "react-web-dom";
import { Input } from "antd";
import styles from './text.css'

const { TextArea } = Input;

class Text extends Component<
    {
        setGoodsDetailData:Function,
        data:Array<{value:{content:string}}>,
        index:number,
        item:{},
    },
    {}
> {
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

const mapStateToProps = ({view}) => {
    return {

    }
}

export default connect(mapStateToProps)(Text)
