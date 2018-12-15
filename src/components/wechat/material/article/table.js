import React,{ Component } from 'react'

import { connect } from "dva";
import * as actions from "@/actions/wechat/material";
import { Popconfirm, Row, Col, Spin, Pagination, message } from 'antd';
import { View } from 'react-web-dom'
import styles from './index.css'

import Image from '@/image'
import moment from 'moment'
//
// type Props = {
//     newsMaterialList:{
//         item:Array<{
//             update_time:string,
//             content:{
//                 news_item:Array<{
//                     title:string,
//                     digest:string,
//                     thumb_url:string,
//                     url:string
//                 }>
//             }
//         }>,
//         item_count:number,
//         total_count:number
//     },
//     getWechatMaterialList:Function,
//     newsCurrentPage:number,
//     newsPageSize:number,
//     materialListLoading:boolean,
//     history:historyType
// }

@connect(
    ({view:{material:{ newsMaterialList, newsCurrentPage, newsPageSize, materialListLoading }}}) => ({
        newsMaterialList,
        newsCurrentPage,
        newsPageSize,
        materialListLoading,
    }),

)
export default class ArticleTable extends Component {
    componentDidMount(){
        this.props.getWechatMaterialList({
            params:{
                type:'news',
                offset:'0',
                count:'10',
            }
        })
    }
    render() {
        // console.log('ArticleTable',this.props);
        const { history, newsMaterialList, getWechatMaterialList, newsCurrentPage, newsPageSize, materialListLoading } = this.props
        const { item, item_count, total_count } = newsMaterialList
        let newList = []
        let imageTextList = [[], [], [], []]
        if(item&&item.length){
            for (let i = 0; i < item.length;) {
                let arr = []
                for (let j = 0; j < 4; j++) {
                    arr.push(item[i])
                    i++;
                }
                newList.push(arr);
            }
            newList.map((listitem, index) => {
                listitem.map((itemItem, j) => {
                    itemItem && imageTextList[j].push(itemItem)
                })
            })
        }
        return (
            <Spin tip="Loading..." spinning={materialListLoading}>
                <Row gutter={24}>
                    {
                        imageTextList.map((imageTextListItem, index) =>
                            <Col span={8} key={index}>
                                {
                                    imageTextListItem.map((itemItem, j) =>
                                        <View
                                            className={styles.articleItem}
                                            key={j}
                                            onClick={()=>{}}
                                        >
                                            <p className={styles.articleUpdateTime}>
                                                {
                                                    moment(itemItem.update_time,'X').format('YYYY-MM-DD HH:mm:ss')
                                                }
                                            </p>
                                            {
                                                itemItem.content.news_item.length>1 ?
                                                this.manyArticle({listItem:itemItem.content.news_item,media_id:itemItem.media_id}) :
                                                this.singleArticle({listItem:itemItem.content.news_item})
                                            }
                                            <View className={styles.operation}>
                                                <a
                                                    onClick={() => {
                                                        itemItem.content.news_item.length>1 ?
                                                        message.warn('请选择单个图文进行修改！') :
                                                        router.push({
                                                            search:`?menu=6&router=editWechatMaterial&media_id=${itemItem.media_id}`
                                                        })
                                                    }}
                                                >
                                                    编辑
                                                </a>
                                                <Popconfirm
                                                    placement='bottom'
                                                    title="确认删除吗？"
                                                    okText="删除"
                                                    cancelText="取消"
                                                    overlayStyle={{}}
                                                    onConfirm={() => {}}
                                                >
                                                    <a>删除</a>
                                                </Popconfirm>
                                            </View>
                                        </View>
                                    )
                                }
                            </Col>
                        )
                    }
                </Row>
                <View className={styles.pageView}>
                    <Pagination
                        current={newsCurrentPage}
                        pageSize={newsPageSize ? newsPageSize : 10}
                        total={total_count ? total_count : 1}
                        showSizeChanger
                        showQuickJumper
                        hideOnSinglePage
                        pageSizeOptions={['5','10','15','20']}
                        onChange={(page, pageSize)=>{
                            getWechatMaterialList({
                                params:{
                                    type:'news',
                                    offset:page===1 ? '0' : (page-1)*pageSize-1,
                                    count:pageSize,
                                }
                            })
                        }}
                        onShowSizeChange={(current, size)=>{
                            getWechatMaterialList({
                                params:{
                                    type:'news',
                                    offset:'0',
                                    count:size,
                                }
                            })
                        }}
                    />
                </View>
            </Spin>
        )
    }
    manyArticle({listItem,media_id}:{listItem:Array<{thumb_url:string,title:string,url:string,digest:string}>,media_id:string}){
        return(
            <View className={styles.manyArticleView}>
                <View className={styles.manyArticleTop}>
                    <View>
                        <Image
                            src={`https://demo.fashop.cn/admin/mix/wechatImage?url=${listItem[0].thumb_url}`}
                            style={{
                                width: '100%'
                            }}
                        />
                        <p>{listItem[0].title}</p>
                    </View>
                    <View className={styles.cover}>
                        <a
                            href={listItem[0].url}
                            style={{
                                color:'#fff',
                                marginRight:10
                            }}
                            target='_blank'
                        >
                            预览
                        </a>
                        <a
                            style={{
                                color:'#fff'
                            }}
                            onClick={() => {
                                router.push({
                                    search:`?menu=6&router=editWechatMaterial&media_id=${media_id}&index=0`
                                })
                            }}
                        >
                            编辑
                        </a>
                    </View>
                </View>
                {
                    listItem.map((childListItem,index) =>
                        index>0 ? <View className={styles.childListItem} key={index}>
                            <p>{childListItem.title}</p>
                            <View>
                                <Image
                                    src={`https://demo.fashop.cn/admin/mix/wechatImage?url=${childListItem.thumb_url}`}
                                    style={{
                                        width: '100%'
                                    }}
                                />
                            </View>
                            <View className={styles.cover}>
                                <a
                                    href={childListItem.url}
                                    style={{
                                        color:'#fff',
                                        marginRight:10
                                    }}
                                    target='_blank'
                                >
                                    预览
                                </a>
                                <a
                                    style={{
                                        color:'#fff'
                                    }}
                                    onClick={() => {
                                        router.push({
                                            search:`?menu=6&router=editWechatMaterial&media_id=${media_id}&index=${index}`
                                        })
                                    }}
                                >
                                    编辑
                                </a>
                            </View>
                        </View> : null
                    )
                }
            </View>
        )
    }
    singleArticle({listItem}:{listItem:Array<{thumb_url:string,title:string,digest:string,url:string}>}){
        return(
            <View className={styles.singleArticleView}>
                <p>{listItem[0].title}</p>
                <View className={styles.singleArticleImgView}>
                    <Image
                        src={`https://demo.fashop.cn/admin/mix/wechatImage?url=${listItem[0].thumb_url}`}
                        style={{
                            width: '100%'
                        }}
                    />
                </View>
                {
                    listItem[0].digest ? <span>{listItem[0].digest}</span> : null
                }
                <View className={styles.cover}>
                    <a
                        href={listItem[0].url}
                        style={{
                            color:'#fff'
                        }}
                        target='_blank'
                    >
                        预览
                    </a>
                </View>
            </View>
        )
    }
}
