import React, { Component } from "react";
import { View } from "@/components/flexView";
import { Modal, Button,   Radio } from "antd";
import styles from "./index.css";
import NewsView from "./newsView";
import LocalNewsView from "./localNewsView";

//
// type Props = {
//     visible:boolean,
//     close:Function,
//     onOk:Function,
//     newsType:string,
// }
// type State = {
//     newsTypeValue:string,
//     news:{
//         value:string,
//         detail:{}
//     },
//     localNews:{
//         value:string,
//         detail:{}
//     }
// }

export default class NewsModal extends Component {
    state = {
        newsTypeValue:this.props.newsType,
        news:{
            value:"",
            detail:{}
        },
        localNews:{
            value:"",
            detail:{}
        },
    }
    render() {
        const { visible, close, onOk, newsType } = this.props
        const { news, localNews } = this.state
        return (
            <Modal
                title="添加图文"
                cancelText='取消'
                okText='确定'
                visible={visible}
                style={{ top: 20 }}
                width={880}
                onCancel={()=>{
                    close()
                    this.setState({
                        newsTypeValue:''
                    })
                }}
                onOk={()=>{;
                    if(newsType==='wechat'&&news.value.length){
                        onOk(news.value,news.detail)
                    }
                    if (newsType==='local'&&String(localNews.value).length) {
                        onOk(localNews.value,localNews.detail)
                    }
                    close()
                    this.setState({
                        news:{
                            value:"",
                            detail:{}
                        },
                        localNews:{
                            value:"",
                            detail:{}
                        },
                    })
                }}
            >
                {
                    this.returnImgList()
                }
            </Modal>
        )
    }
    returnImgList(){
        const { newsTypeValue } = this.state
        const { newsType } = this.props
        let value = newsTypeValue.length ? newsTypeValue : newsType
        // console.log(currentList);
        return(
            <View className={styles.imgList}>
                <View className={styles.imgListTop}>
                    <Button
                        type='primary'
                    >
                        新建{
                            newsTypeValue.length&&newsTypeValue==='wechat' ? '微信' :
                            newsTypeValue==='local' ? '高级' :
                            !newsTypeValue.length&&newsType==='wechat' ? '微信' :
                            newsType==='local' ? '高级' : ''
                        }图文
                    </Button>
                    <Radio.Group
                        value={value}
                        onChange={(e)=>{
                            this.setState({
                                newsTypeValue:e.target.value
                            })
                        }}
                    >
                        <Radio.Button value="wechat">微信</Radio.Button>
                        <Radio.Button value="local">服务器</Radio.Button>
                    </Radio.Group>
                </View>
                {
                    value==='wechat' ?
                    <NewsView
                        changeState = {({value,detail})=>{
                            this.setState({
                                news:{
                                    value,
                                    detail
                                }
                            })
                        }}
                    /> :
                    <LocalNewsView
                        changeState = {({value,detail})=>{
                            this.setState({
                                localNews:{
                                    value,
                                    detail
                                }
                            })
                        }}
                    />
                }
            </View>
        )
    }
}
