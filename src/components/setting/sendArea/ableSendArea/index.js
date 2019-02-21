
import React, { Component } from "react";
import { connect } from "dva";
import {
    Button,
    Modal,
    Radio,
} from "antd";
import { View } from "@/components/flexView";
import styles from "./index.css";

const RadioGroup = Radio.Group;

class AbleSendAreaModal extends Component<
    {
        ableSendAreaVisible:boolean,
        ableSensAreaCancel:Function,
        ableSensAreaOk:Function,
        btnClick:Function,
    },
    {
        value:number
    }
> {
    state = {
        value:1
    }
    render() {
        const { value } = this.state
        const {
            ableSendAreaVisible,
            ableSensAreaCancel,
            ableSensAreaOk,
            btnClick,
        } = this.props
        const radioList = [
            {
                id:1,
                title:'模版名称',
                desc:'陕西省（西安市，宝鸡市，咸阳市，渭南市）'
            }, {
                id:2,
                title:'模版名称',
                desc:'陕西省（西安市，宝鸡市，咸阳市，渭南市）'
            }, {
                id:3,
                title:'模版名称',
                desc:'陕西省（西安市，宝鸡市，咸阳市，渭南市）'
            }, {
                id:4,
                title:'模版名称',
                desc:'陕西省（西安市，宝鸡市，咸阳市，渭南市）'
            }
        ]
        return (
            <Modal
                title='可配送区域选择'
                okText='确定'
                cancelText='取消'
                width={756}
                visible={ableSendAreaVisible}
                onCancel={ableSensAreaCancel}
                onOk={()=>{
                    let selected = radioList.filter((filterItem,index)=>{
                        return filterItem.id===value
                    })[0]
                    ableSensAreaOk(selected)
                }}
            >
                <Button
                    type='primary'
                    onClick={()=>{
                        btnClick()
                    }}
                >
                    设置可配送区域
                </Button>
                <View>
                    <RadioGroup
                        onChange={(e)=>{
                            console.log('radio checked', e.target.value);
                            this.setState({value:e.target.value})
                        }}
                        value={value}
                    >
                        {
                            radioList.map((item,index)=>
                                <View className={styles.item} key={index}>
                                    <View className={styles.itemLeft}>
                                        <p>{item.title}</p>
                                        <span>{item.desc}</span>
                                    </View>
                                    <Radio value={item.id}/>
                                </View>
                            )
                        }
                    </RadioGroup>
                </View>
            </Modal>
        );
    }
}

export default AbleSendAreaModal
