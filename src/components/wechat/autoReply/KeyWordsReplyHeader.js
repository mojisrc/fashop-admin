import React,{ Component } from 'react'
import { Input, Button } from 'antd';
import { View } from '@/components/flexView'
import styles from './index.css'
const Search = Input.Search;
//
// type Props = {
//     history:{
//         push:Function
//     },
//     getKeyWordsReplyList:Function
// }

export default class KeyWordsReplyHeader extends Component {
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
                        router.push({
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
