
import React,{ Component } from 'react'
import { Input, Button } from 'antd';
import { View } from 'react-web-dom'
import styles from './index.css'

const Search = Input.Search;

type Props = {
    history:{
        push:Function
    },
    getKeyWordsReplyList:Function
}
type State = {}

export default class KeyWordsReplyHeader extends Component<Props,State> {
    render() {
        const { history, getKeyWordsReplyList } = this.props
        return (
            <View className={styles.keyWordsReplyHeaderView}>
                <Search
                    placeholder="搜索关键词/规则名称"
                    style={{ width: 230 }}
                    onSearch={value => {
                        getKeyWordsReplyList({params:{keywords:value}})
                    }}
                />
                <Button
                    type="primary"
                    onClick={()=>{
                        history.push({
                            search:`?menu=2&router=addReply`
                        })
                    }}
                >
                    新增回复
                </Button>
            </View>
        )
    }
}
