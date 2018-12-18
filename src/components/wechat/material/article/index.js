import React,{ Component } from 'react'
import { View } from '@/components/flexView'
import ArticleHeader from './header'
import ArticleTable from './table'
import LocalArticleTable from './localTable'

export default class Article extends Component {
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
