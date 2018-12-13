
import React,{ Component } from 'react'
import { View } from 'react-web-dom'
import ArticleHeader from './header'
import ArticleTable from './table'
import LocalArticleTable from './localTable'

type Props = {
    history:{
        push:Function
    },
}
type State = {
    articleType:string
}

export default class Article extends Component<Props,State> {
    state = {
        articleType:'wechat'
    }
    render() {
        const { articleType } = this.state
        return (
            <View>
                <ArticleHeader
                    {...this.props}
                    articleType={articleType}
                    changeType={(articleType)=>{
                        this.setState({articleType})
                    }}
                />
                {
                    articleType==='wechat' ?
                    <ArticleTable {...this.props} /> :
                    <LocalArticleTable {...this.props} />
                }
            </View>
        )
    }
}
