import React,{ Component } from 'react'
import { connect } from "dva";
import { Button, Radio, Upload, message } from 'antd';
import { View } from '@/components/flexView'
import styles from '../index.css'
@connect(
    ({view:{material:{ imageMaterialList }}}) => ({
        imageMaterialList,
    }),

)
export default class ImageHeader extends Component {
    state = {
        type:'wechat'
    }
    render() {
        const { type } = this.state
        return (
            <View className={styles.headerView}>
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
                        type="primary"
                        onClick={()=>{

                        }}
                    >
                        上传{type==='wechat' ? '微信' : '服务器'}图片
                    </Button>
                </Upload>
                <Radio.Group
                    value={type}
                    onChange={(e)=>{
                        this.setState({
                            type:e.target.value
                        })
                    }}
                >
                    <Radio.Button value="wechat">微信</Radio.Button>
                    <Radio.Button value="server" disabled>服务器</Radio.Button>
                </Radio.Group>
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
