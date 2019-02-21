import React,{ Component } from 'react'

import { connect } from "dva";
import * as actions from "@/actions/wechat/material";
import { Popconfirm, Row, Col, Spin, Pagination } from 'antd';
import { View } from '@/components/flexView'
import styles from './index.css'
import EmptyView from '../emptyView'
import Image from '@/image'
import moment from 'moment'
//
// type Props = {
//     localNewsMaterialList:{
//         list:Array<{
//             create_time:string,
//             media:Array<{
//                 title:string,
//                 cover_pic:string,
//                 link:{
//                     action:string,
//                     param:{
//                         id:number
//                     }
//                 }
//             }>
//         }>,
//         total_number:number
//     },
//     getLocalNewsMaterialList:Function,
//     delLocalNewsMaterialList:Function,
//     localNewsCurrentPage:number,
//     localNewsPageSize:number,
//     localNewsMaterialListLoading:boolean,
// }

@connect(
    ({view:{material:{ localNewsMaterialList, localNewsCurrentPage, localNewsPageSize, localNewsMaterialListLoading }}}) => ({
        localNewsMaterialList,
        localNewsCurrentPage,
        localNewsPageSize,
        localNewsMaterialListLoading,
    }),

)
export default class LocalArticleTable extends Component {
    componentDidMount(){
        this.props.getLocalNewsMaterialList({
            params:{
                page:1,
                rows:10,
            }
        })
    }
    render() {
        console.log('LocalArticleTable',this.props);
        const { history, localNewsMaterialList, getLocalNewsMaterialList, localNewsCurrentPage, localNewsPageSize, localNewsMaterialListLoading, delLocalNewsMaterialList } = this.props
        const { list, total_number } = localNewsMaterialList
        console.log('localNewsMaterialList',localNewsMaterialList);
        let newList = []
        let imageTextList = [[], [], [], []]
        if(list&&list.length){
            for (let i = 0; i < list.length;) {
                let arr = []
                for (let j = 0; j < 4; j++) {
                    arr.push(list[i])
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
            <Spin tip="Loading..." spinning={localNewsMaterialListLoading}>
                <Row gutter={24}>
                    {
                        list&&list.length ? imageTextList.map((imageTextListItem, index) =>
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
                                                    moment(itemItem.create_time,'X').format('YYYY-MM-DD HH:mm:ss')
                                                }
                                            </p>
                                            {
                                                itemItem.media.length>1 ?
                                                this.manyArticle({listItem:itemItem.media}) :
                                                this.singleArticle({listItem:itemItem.media})
                                            }
                                            <View className={styles.operation}>
                                                <a
                                                    onClick={() => {
                                                        router.push({
                                                            search:`?menu=6&router=editServerMaterial&id=${itemItem.id}`
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
                                                    onConfirm={() => {
                                                        delLocalNewsMaterialList({
                                                            params:{
                                                                id:itemItem.id
                                                            }
                                                        })
                                                    }}
                                                >
                                                    <a>删除</a>
                                                </Popconfirm>
                                            </View>
                                        </View>
                                    )
                                }
                            </Col>
                        ) : <Col span={24}>
                            <EmptyView/>
                        </Col>
                    }
                </Row>
                <View className={styles.pageView}>
                    <Pagination
                        current={localNewsCurrentPage}
                        pageSize={localNewsPageSize ? localNewsPageSize : 10}
                        total={total_number ? total_number : 1}
                        showSizeChanger
                        showQuickJumper
                        hideOnSinglePage
                        pageSizeOptions={['5','10','15','20']}
                        onChange={(page, pageSize)=>{
                            getLocalNewsMaterialList({
                                params:{
                                    type:'news',
                                    offset:page===1 ? '0' : (page-1)*pageSize-1,
                                    count:pageSize,
                                }
                            })
                        }}
                        onShowSizeChange={(current, size)=>{
                            getLocalNewsMaterialList({
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
    manyArticle({listItem}:{listItem:Array<{cover_pic:string,title:string}>}){
        return(
            <View className={styles.manyArticleView}>
                <View className={styles.manyArticleTop}>
                    <View>
                        <Image
                            src={listItem[0].cover_pic}
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
                                color:'#fff'
                            }}
                            target='_blank'
                        >
                            预览
                        </a>
                    </View>
                </View>
                {
                    listItem.map((childListItem,index) =>
                        index>0 ? <View className={styles.childListItem} key={index}>
                            <p>{childListItem.title}</p>
                            <View>
                                <Image
                                    src={childListItem.cover_pic}
                                    style={{
                                        width: '100%'
                                    }}
                                />
                            </View>
                            <View className={styles.cover}>
                                <a
                                    href={childListItem.url}
                                    style={{
                                        color:'#fff'
                                    }}
                                    target='_blank'
                                >
                                    预览
                                </a>
                            </View>
                        </View> : null
                    )
                }
            </View>
        )
    }
    singleArticle({listItem}:{listItem:Array<{cover_pic:string,title:string}>}){
        return(
            <View className={styles.singleArticleView}>
                <p>{listItem[0].title}</p>
                <View className={styles.singleArticleImgView}>
                    <Image
                        src={listItem[0].cover_pic}
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
