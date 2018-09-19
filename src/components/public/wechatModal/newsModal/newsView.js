//@flow
import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import * as actions from "../../../../actions/wechat/material";
import { View } from "react-web-dom";
import { Modal, Button, Input, Row, Col, Card, Checkbox, Pagination, Radio, Spin } from "antd";
import styles from "./index.css";
import ModalNews from "../../wechatItem/modalNews";

const RadioGroup = Radio.Group
const CheckboxGroup = Checkbox.Group;

type Props = {
    getWechatMaterialList:Function,
    changeState:Function,
    newsCurrentPage:number,
    newsPageSize:number,
    materialListLoading:boolean,
    newsMaterialList:{
        item:Array<{
            content:{
                news_item:Array<{
                    digest:string,
                    thumb_url:string,
                    title:string,
                }>,
                update_time:string,
            },
            media_id:string
        }>,
        total_count:number
    },
}
type State = {
    checkedValues:string,
}

@connect(
    ({view:{material:{
        newsMaterialList, newsCurrentPage, newsPageSize, materialListLoading ,
    }}}) => ({
        newsMaterialList,
        newsCurrentPage,
        newsPageSize,
        materialListLoading,
    }),
    dispatch => bindActionCreators(actions,dispatch),
)
export default class NewsView extends Component<Props,State> {
    state = {
        checkedValues:'',
    }
    componentDidMount(){
        const { getWechatMaterialList } = this.props
        getWechatMaterialList({
            params:{
                type:'news',
                offset:'0',
                count:'10',
            }
        })
    }
    render() {
        const { checkedValues } = this.state
        const {
            changeState,
            newsMaterialList,
            getWechatMaterialList,
            newsCurrentPage,
            newsPageSize,
            materialListLoading
        } = this.props
        const { item, total_count } = newsMaterialList
        return(
            <Spin tip="Loading..." spinning={materialListLoading}>
                <RadioGroup
                    value={checkedValues}
                    onChange={(e)=>{
                        this.setState({checkedValues:e.target.value})
                        let detail = newsMaterialList.item.filter((filterItem,index)=>{
                            return e.target.value===filterItem.media_id
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
                                newsMaterialList.item&&newsMaterialList.item.map((item,index)=>
                                <Col span={8} key={index}>
                                    <View
                                        className={styles.imgItem}
                                        style={
                                            checkedValues===item.media_id ?
                                            {
                                                borderColor:'#188fff'
                                            } : {}
                                        }
                                    >
                                        <ModalNews
                                            extra={item.content.news_item}
                                        />
                                        <Radio
                                            value={item.media_id}
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
}
