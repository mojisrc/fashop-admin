import React, { Component } from 'react'
import { connect } from "dva";
import * as actions from "@/actions/wechat/material";
import { Button, Upload, message } from 'antd';
import { View } from '@/components/flexView'
// type Props = {
//     hideModal: Function
// }

@connect(
    ({ view: { material: { voiceMaterialList, voiceCurrentPage, voicePageSize, materialListLoading } } }) => ({
        voiceMaterialList,
        voiceCurrentPage,
        voicePageSize,
        materialListLoading,
    }),
    dispatch => bindActionCreators(actions, dispatch),
)
// todo fetch
export default class AddVoiceForm extends Component {
    state = {
        fileList : []
    }
    render() {
        const { hideModal, getWechatMaterialList } = this.props
        return (
            <View>
                <Upload
                    showUploadList={false}
                    beforeUpload={beforeUpload}
                    customRequest={({ file }) => {
                        let formData = new FormData()
                        formData.append('media', file)
                        let url = `${env.domain}/admin/wechat/materialUploadVoice`
                        Fetch.formData(url, formData)
                            .then((e) => {
                                console.log('handleChange', e);
                                if (e.code === 0) {
                                    message.success('上传成功！')
                                    getWechatMaterialList({
                                        params: {
                                            type: 'voice',
                                            offset: '0',
                                            count: '10',
                                        }
                                    })
                                    hideModal()
                                }
                            })
                    }}
                >
                    <Button>
                        上传文件
                    </Button>
                </Upload>
                <p style={{ marginTop: 16 }}>
                    格式支持mp3、wma、wav、amr，文件大小不超过30M，语音时长不超过30分钟
                </p>
            </View>
        )
    }
}

function beforeUpload(file) {
    const isaudio = file.type === 'audio/mp3';
    if (!isaudio) {
        message.error('只能上传音频文件!');
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
        message.error('语音大小不超过 5M!');
    }
    return isaudio && isLt5M;
}
