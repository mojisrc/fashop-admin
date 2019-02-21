import React, { Component } from "react";
import { View } from "@/components/flexView";
import { Popover, Icon } from "antd";
import styles from "./index.css";
import { emojiShow } from "./testData";

export default class Emoji extends Component {
    render() {
        return (
            <Popover
                content={(
                    this.popoverContent()
                )}
                placement='bottom'
            >
                <Icon
                    type="smile-o"
                    style={{
                        fontSize:24,
                        color:'#999'
                    }}
                />
            </Popover>
        )
    }
    popoverContent(){
        let emojiList = new Array(99);
        for(let i = 0;i < 99;i++){
            emojiList[i]=i;
        }
        const { clickFunc } = this.props
        return(
            <View className={styles.popoverContentView}>
                {
                    emojiList.map((emojiListItem,index) =>
                        <p
                            key={index}
                            onClick={()=>{
                                clickFunc(emojiShow[index])
                            }}
                        >
                            <span
                                style={{
                                    backgroundPosition:`0px -${20*emojiListItem}px`
                                }}
                            />
                        </p>
                    )
                }
            </View>
        )
    }
}
