import React,{ Component } from 'react'
import { Button, Radio, Popover } from 'antd';
import { View } from '@/components/flexView'
import styles from '../index.css'
//
// type Props = {
//     history:{
//         push:Function
//     },
//     articleType:string,
//     changeType:Function
// }

export default class ArticleHeader extends Component {
    render() {
        const { articleType, changeType } = this.props
        return (
            <View className={styles.headerView}>
                <Popover
                    trigger='click'
                    placement='right'
                    content={(this.popoverContent())}
                >
                    <Button type="primary">
                        新建{articleType==='wechat' ? '微信' : '服务器'}图文
                    </Button>
                </Popover>
                {/* <Button
                    onClick={()=>{
                        Fetch.fetch({api:'WECHATGETTOKEN',params:{refresh:true}})
                        .then((e)=>console.log(e))
                    }}
                >
                    刷新
                </Button> */}
                <Radio.Group
                    value={articleType}
                    onChange={(e)=>{
                        changeType(e.target.value)
                    }}
                >
                    <Radio.Button value="wechat">微信</Radio.Button>
                    <Radio.Button value="server">服务器</Radio.Button>
                </Radio.Group>
            </View>
        )
    }
    popoverContent(){
        return(
            <View className={styles.popoverContentView}>
                <View
                    onClick={()=>{
                        this.pushFunc({num:'single'})
                    }}
                >
                    <p>单条图文</p>
                    <p/>
                </View>
                <View
                    onClick={()=>{
                        this.pushFunc({num:'many'})
                    }}
                >
                    <p>多条图文</p>
                    <View>
                        <p/>
                        <p/>
                    </View>
                </View>
            </View>
        )
    }
    pushFunc({num}:{num:string}){
        const { articleType, history } = this.props
        router.push({
            search:`?menu=6&router=${articleType==='wechat' ? 'addWechatMaterial' : 'addServerMaterial'}&num=${num}`
        })
    }
}
