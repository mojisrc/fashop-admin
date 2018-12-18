import React, { Component } from "react";
import { connect } from 'dva';
import { View } from "@/components/flexView";
import { Modal, Button,  Row, Col, Pagination, Radio, Spin, Upload, message } from "antd";
import styles from "./index.css";
import ModalImg from "../../wechatItem/modalImg";
const RadioGroup = Radio.Group
//
// type Props = {
//     visible:boolean,
//     close:Function,
//     onOk:Function,
//     newsType:string,
//     imageMaterialList:{
//         item:Array<{
//             name:string,
//             url:string,
//             media_id:string,
//         }>
//     },
//     wechatMaterialListLoading:boolean,
//     wechatMaterialList:Function,
// }
// type State = {
//     newsTypeValue:string,
//     checkedValues:{
//         media_id:string
//     }
// }

@connect(
    ({view:{material:{ imageMaterialList, imageCurrentPage, imagePageSize, wechatMaterialListLoading }}}) => ({
        imageMaterialList,
        imageCurrentPage,
        imagePageSize,
        wechatMaterialListLoading,
    }),

)
export default class ImageModal extends Component {
    state = {
        newsTypeValue:this.props.newsType,
        checkedValues:{
            media_id:''
        }
    }
    componentDidMount(){
        this.props.wechatMaterialList({
            params:{
                type:'image',
                offset:'0',
                count:'10',
            }
        })
    }
    render() {
        const { visible, close, onOk, imageMaterialList } = this.props
        const { checkedValues } = this.state
        return (
            <Modal
                title="添加图片"
                cancelText='取消'
                okText='确定'
                visible={visible}
                style={{ top: 20 }}
                width={880}
                onCancel={()=>{
                    close()
                    this.setState({
                        newsTypeValue:''
                    })
                }}
                onOk={()=>{
                    onOk(checkedValues.media_id,checkedValues)
                    close()
                    this.setState({checkedValues:{media_id:''}})
                }}
            >
                {
                    this.returnImgList()
                }
            </Modal>
        )
    }
    returnImgList(){
        const { checkedValues, newsTypeValue } = this.state
        const {
            newsType,
            imageMaterialList,
            wechatMaterialList,
            imageCurrentPage,
            imagePageSize,
            wechatMaterialListLoading
        } = this.props
        const { item, item_count, total_count } = imageMaterialList
        return(
            <View className={styles.imgList}>
                <View className={styles.imgListTop}>
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
                                    this.props.wechatMaterialList({
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
                            上传{
                                newsTypeValue.length&&newsTypeValue==='wechat' ? '微信' :
                                newsTypeValue==='local' ? '高级' :
                                !newsTypeValue.length&&newsType==='wechat' ? '微信' :
                                newsType==='local' ? '高级' : ''
                            }图片
                        </Button>
                    </Upload>
                    <Radio.Group
                        value={newsTypeValue.length ? newsTypeValue : newsType}
                        onChange={(e)=>{
                            this.setState({
                                newsTypeValue:e.target.value
                            })
                        }}
                    >
                        <Radio.Button value="wechat">微信</Radio.Button>
                        <Radio.Button value="local" disabled>服务器</Radio.Button>
                    </Radio.Group>
                </View>
                <Spin tip="Loading..." spinning={wechatMaterialListLoading}>
                    <RadioGroup
                        value={checkedValues.media_id}
                        onChange={(e)=>{
                            let detail = imageMaterialList.item.filter((filterItem,index)=>{
                                return e.target.value===filterItem.media_id
                            })[0]
                            this.setState({checkedValues:detail})
                        }}
                    >
                        <View className={styles.imgContent}>
                            <Row gutter={16}>
                                {
                                    imageMaterialList.item&&imageMaterialList.item.map((item,index)=>
                                    <Col span={6} key={index}>
                                        <View
                                            className={styles.imgItem}
                                            style={
                                                checkedValues.media_id===item.media_id ?
                                                {
                                                    borderColor:'#188fff'
                                                } : {}
                                            }
                                        >
                                            <ModalImg
                                                title={item.name}
                                                img={item.url}
                                            />
                                            <Radio
                                                value={item.media_id}
                                                style={{
                                                    position: 'absolute',
                                                    bottom: 10,
                                                    right: 10,
                                                }}
                                            />
                                        </View>
                                    </Col>
                                    )
                                }
                            </Row>
                        </View>
                    </RadioGroup>
                </Spin>
                <View className={styles.paginationView}>
                    <Pagination
                        current={imageCurrentPage}
                        pageSize={imagePageSize ? imagePageSize : 10}
                        total={total_count ? total_count : 1}
                        showSizeChanger
                        showQuickJumper
                        hideOnSinglePage
                        pageSizeOptions={['5','10','15','20']}
                        onChange={(page, pageSize)=>{
                            wechatMaterialList({
                                params:{
                                    type:'image',
                                    offset:page===1 ? '0' : (page-1)*pageSize-1,
                                    count:pageSize,
                                }
                            })
                        }}
                        onShowSizeChange={(current, size)=>{
                            wechatMaterialList({
                                params:{
                                    type:'image',
                                    offset:'0',
                                    count:size,
                                }
                            })
                        }}
                    />
                </View>
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
