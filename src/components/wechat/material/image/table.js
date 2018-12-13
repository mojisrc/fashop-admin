import React from 'react'
import { connect } from "dva";
import { Popconfirm, Row, Col, Pagination, Spin, Button, Upload, message } from 'antd';
import { View } from 'react-web-dom'
import styles from './index.css'

import Image from '@/image'
//
// type Props = {
//     imageMaterialList:{
//         item:Array<{
//             name:string,
//             url:string,
//             media_id:string,
//         }>,
//         item_count:number,
//         total_count:number
//     },
//     getWechatMaterialList:Function,
//     imageCurrentPage:number,
//     imagePageSize:number,
//     materialListLoading:boolean,
//     delWechatMaterial:Function,
// }

@connect(
    ({view:{material:{ imageMaterialList, imageCurrentPage, imagePageSize, materialListLoading }}}) => ({
        imageMaterialList,
        imageCurrentPage,
        imagePageSize,
        materialListLoading,
    }),

)
export default class ImageTable extends React.Component {
    componentDidMount(){
        this.props.getWechatMaterialList({
            params:{
                type:'image',
                offset:'0',
                count:'10',
            }
        })
    }
    render() {
        // console.log('ImageTable',this.props);
        const { imageMaterialList, getWechatMaterialList, imageCurrentPage, imagePageSize, materialListLoading, delWechatMaterial } = this.props
        const { item, item_count, total_count } = imageMaterialList
        return (
            <Spin tip="Loading..." spinning={materialListLoading}>
                <Row gutter={24}>
                    {
                        item&&item.length ? item.map((imageitem, index) =>
                            <Col span={6} key={index}>
                                <View className={styles.imageTableView}>
                                    <p style={{margin:0}}>
                                        {imageitem.name}
                                    </p>
                                    <View className={styles.imgView} id={`${index}`}>
                                        <Image
                                            src={`https://demo.fashop.cn/admin/mix/wechatImage?url=${imageitem.url}`}
                                            style={{
                                                width:'100%'
                                            }}
                                        />
                                    </View>
                                    <View className={styles.operation}>
                                        <a
                                            onClick={() => {}}
                                        >
                                            编辑
                                        </a>
                                        <Popconfirm
                                            placement='bottom'
                                            title="确定删除此素材？"
                                            okText="删除"
                                            cancelText="取消"
                                            overlayStyle={{}}
                                            onConfirm={() => {
                                                delWechatMaterial({
                                                    params:{
                                                        media_id:imageitem.media_id
                                                    },
                                                    callParams:{
                                                        type:'image',
                                                        offset:'0',
                                                        count:'10',
                                                    }
                                                })
                                            }}
                                        >
                                            <a>删除</a>
                                        </Popconfirm>
                                    </View>
                                </View>
                            </Col>
                        ) : <Col span={24}>
                            {
                                this.emptyImage()
                            }
                        </Col>
                    }
                </Row>
                <View className={styles.pageView}>
                    <Pagination
                        current={imageCurrentPage}
                        pageSize={imagePageSize ? imagePageSize : 10}
                        total={total_count ? total_count : 1}
                        showSizeChanger
                        showQuickJumper
                        hideOnSinglePage
                        pageSizeOptions={['5','10','15','20']}
                        onChange={(page, pageSize)=>{
                            getWechatMaterialList({
                                params:{
                                    type:'image',
                                    offset:page===1 ? '0' : (page-1)*pageSize-1,
                                    count:pageSize,
                                }
                            })
                        }}
                        onShowSizeChange={(current, size)=>{
                            getWechatMaterialList({
                                params:{
                                    type:'image',
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
    emptyImage(){
        return(
            <View className={styles.emptyImageView}>
                <img
                    alt=''
                    src={require('@/images/fetchStatus/emptyImage.png')}
                />
                <strong>暂时还没有图片资源</strong>
                <Upload
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    customRequest={({file})=>{
                        let formData = new FormData()
                        formData.append('media',file)
                        let url = `${env.domain}/admin/wechat/materialUploadImage`
                        Fetch.formData(url,formData)
                        .then((e)=>{
                            console.log('handleChange',e);
                            if(e.code===0){
                                message.success('上传成功！')
                                this.props.getWechatMaterialList({
                                    params:{
                                        type:'image',
                                        offset:'0',
                                        count:'10',
                                    }
                                })
                            }
                        })
                    }}
                >

                    <Button
                        type='primary'
                    >
                        立即添加
                    </Button>
                </Upload>
            </View>
        )
    }
}

function beforeUpload(file) {
    const isImage = file.type.includes('image')!==-1;
    if (!isImage) {
        message.error('你只能上传图片!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('图片不能超过2MB!');
    }
    return isImage && isLt2M;
}
