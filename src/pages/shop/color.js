import React,{ Component } from "react";
import { View } from "@/components/flexView";
import { Row, Col, Button,Card } from 'antd';
import PageHeaderWrapper from '@/components/pageHeaderWrapper';
import styles from '@/styles/shop/shopColor.css'
export default class Color extends Component {
    state = {
        colorList : [
            {
                color:['#ff595d','#f39802','#fff'],
                example:[
                    require('../../assets/images/shop/color1-1.jpg'),
                    require('../../assets/images/shop/color1-2.jpg'),
                    require('../../assets/images/shop/color1-3.jpg'),
                ],
            }, {
                color:['#ff547a','#ffe6e8','#fff'],
                example:[
                    require('../../assets/images/shop/color2-1.jpg'),
                    require('../../assets/images/shop/color2-2.jpg'),
                    require('../../assets/images/shop/color2-3.jpg'),
                ],
            }, {
                color:['#ff4444','#545454','#fff'],
                example:[
                    require('../../assets/images/shop/color3-1.jpg'),
                    require('../../assets/images/shop/color3-2.jpg'),
                    require('../../assets/images/shop/color3-3.jpg'),
                ],
            }, {
                color:['#fcc602','#1d2630','#fff'],
                example:[
                    require('../../assets/images/shop/color4-1.jpg'),
                    require('../../assets/images/shop/color4-2.jpg'),
                    require('../../assets/images/shop/color4-3.jpg'),
                ],
            }, {
                color:['#64c4a9','#ddf1eb','#fff'],
                example:[
                    require('../../assets/images/shop/color5-1.jpg'),
                    require('../../assets/images/shop/color5-2.jpg'),
                    require('../../assets/images/shop/color5-3.jpg'),
                ],
            }, {
                color:['#c3a869','#f3eee3','#fff'],
                example:[
                    require('../../assets/images/shop/color6-1.jpg'),
                    require('../../assets/images/shop/color6-2.jpg'),
                    require('../../assets/images/shop/color6-3.jpg'),
                ],
            }, {
                color:['#00bc07','#373737','#fff'],
                example:[
                    require('../../assets/images/shop/color7-1.jpg'),
                    require('../../assets/images/shop/color7-2.jpg'),
                    require('../../assets/images/shop/color7-3.jpg'),
                ],
            }
        ],
        currentColor:-1
    }
    render() {
        const { colorList, currentColor } = this.state
        const { shopInfo, editShopColorScheme } = this.props
        let newCurrentColor = currentColor!==-1 ? currentColor : shopInfo.info ? shopInfo.info.color_scheme : 0
        let currentItem = colorList.filter((filterItem,index)=>{
            return index===newCurrentColor
        })[0]
        return (
            <Card bordered={false}>
                <h3>配色方案</h3>
                <Row type="flex" justify="start">
                    {
                        colorList.map((item,index) =>
                            <Col span={3} key={index}>
                                <View
                                    className={styles.item}
                                    style={
                                        newCurrentColor===index ? {
                                            border:'1px solid #188fff'
                                        } : {}
                                    }
                                    onClick={()=>{
                                        this.setState({currentColor:index})
                                    }}
                                >
                                    {
                                        item.color.map((colorItem,j) =>
                                            <p
                                                key={j}
                                                className={`${styles.colorItem} ${colorItem==='#fff' ? `${styles.whiteColorItem}` : ''}`}
                                                style={{
                                                    backgroundColor:`${colorItem}`
                                                }}
                                            ></p>
                                        )
                                    }
                                </View>
                            </Col>
                        )
                    }
                </Row>
                <h3>方案示例</h3>
                <View className={styles.example}>
                    {
                        currentItem.example.map((item,index)=>
                            <img alt='' src={item} key={index}/>
                        )
                    }
                </View>
                <View className={styles.botBtnView}>
                    <Button
                        type='primary'
                        onClick={()=>{
                            editShopColorScheme({
                                params:{
                                    color_scheme:newCurrentColor
                                }
                            })
                            this.setState({
                                currentColor:-1
                            })
                        }}
                    >
                        保存
                    </Button>
                </View>
            </Card>
        )
    }
}
