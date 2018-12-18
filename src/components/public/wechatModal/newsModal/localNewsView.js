import React, { Component } from "react";

import { connect } from 'dva';
import * as actions from "@/actions/wechat/material";
import { View } from "@/components/flexView";
import {  Row, Col,  Pagination, Radio, Spin } from "antd";
import styles from "./index.css";
import Image from "@/image";

const RadioGroup = Radio.Group
//
// type Props = {
//     changeState:Function,
//     getLocalNewsMaterialList:Function,
//     localNewsCurrentPage:number,
//     localNewsPageSize:number,
//     localNewsMaterialListLoading:boolean,
//     localNewsMaterialList:{
//         list:Array<{
//             media:Array<{
//                 cover_pic:string,
//                 title:string,
//             }>,
//             id:number
//         }>,
//         total_number:number
//     },
// }
// type State = {
//     checkedValues:string,
// }

@connect(
    ({view:{material:{
        localNewsMaterialList,
        localNewsCurrentPage,
        localNewsPageSize,
        localNewsMaterialListLoading,
    }}}) => ({
        localNewsMaterialList,
        localNewsCurrentPage,
        localNewsPageSize,
        localNewsMaterialListLoading,
    }),

)
export default class LocalNewsView extends Component {
    state = {
        checkedValues:'',
    }
    componentDidMount(){
        const { getLocalNewsMaterialList } = this.props
        getLocalNewsMaterialList({
            params:{
                page:1,
                rows:10,
            }
        })
    }
    render() {
        const { checkedValues } = this.state
        const {
            changeState,
            localNewsMaterialList,
            getLocalNewsMaterialList,
            localNewsCurrentPage,
            localNewsPageSize,
            localNewsMaterialListLoading
        } = this.props
        const {  total_number } = localNewsMaterialList
        return(
            <Spin tip="Loading..." spinning={localNewsMaterialListLoading}>
                <RadioGroup
                    value={checkedValues}
                    onChange={(e)=>{
                        this.setState({checkedValues:e.target.value})
                        let detail = localNewsMaterialList.list.filter((filterItem,index)=>{
                            return e.target.value===filterItem.id
                        })[0]
                        changeState({
                            value:e.target.value,
                            detail
                        })
                    }}
                >
                    <View className={styles.imgContent}>
                        <Row gutter={16}>
                            {
                                localNewsMaterialList.list&&localNewsMaterialList.list.map((item,index)=>
                                <Col span={8} key={index}>
                                    <View
                                        className={styles.imgItem}
                                        style={
                                            checkedValues===item.id ?
                                            {
                                                borderColor:'#188fff'
                                            } : {}
                                        }
                                    >
                                        {/* <ModalLocalNews
                                            extra={item.media}
                                        /> */}
                                        <View className={styles.modalNewsView}>
                                            <View className={styles.contentView}>
                                                <p>{item.media[0].title}</p>
                                                <View className={styles.imgView}>
                                                    <Image
                                                        src={`https://demo.fashop.cn/admin/mix/wechatImage?url=${item.media[0].cover_pic}`}
                                                        style={{
                                                            width: '100%'
                                                        }}
                                                    />
                                                </View>
                                                <p>{''}</p>
                                            </View>
                                        </View>
                                        <Radio
                                            value={item.id}
                                            style={{
                                                position: 'absolute',
                                                bottom: 5,
                                                right: 0,
                                            }}
                                        />
                                    </View>
                                </Col>
                                )
                            }
                        </Row>
                    </View>
                </RadioGroup>
                <View className={styles.paginationView}>
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
}
