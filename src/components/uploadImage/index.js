import React, { Component } from "react";
import { Icon, Upload, message } from 'antd';
import { View } from "@/components/flexView";
import styles from './index.css'
import { imageUpload } from "@/utils";
import ImageGroup from "./imageGroup";

export default class UploadImage extends Component {
    static defaultProps = {
        is_save: 0,
    }
    triggerChange = (e) => {
        const {
            onChange
        } = this.props
        if (onChange) {
            onChange(e.origin.path)
        } else {
            message.warning('没有提供onChange属性');
        }
    }

    render() {
        const {
            children,
            is_save,
        } = this.props
        return (
            <Upload
                listType={children ? 'text' : 'picture-card'}
                showUploadList={false}
                beforeUpload={beforeUpload}
                customRequest={({ file }) => {
                    imageUpload({
                        file,
                        onSuccess: this.triggerChange,
                        is_save,
                    })
                }}
            >
                {
                    children
                        ? this.props.children
                        : this.defaultView()
                }
            </Upload>
        )
    }

    defaultView() {
        const {
            url
        } = this.props
        if (url) {
            return (
                <img
                    src={url}
                    alt=''
                    style={{ width: '80px' }}
                />
            )
        } else {
            return (
                <View className={styles.uploadBtn}>
                    <Icon type='plus' />
                    <p>Upload</p>
                </View>
            )
        }
    }
}

export class UploadGroupImage extends Component{
    static defaultProps = {
        preview: () => {
        },
        onChange: (e) => {
        }
    }
    triggerChange = (e) => {
        const { onChange, url } = this.props
        if (onChange) {
            onChange([...url ? url : [], e.origin.path])
        } else {
            message.warning('没有提供onChange属性');
        }
    }

    render() {
        const { url, onChange, onClick, preview } = this.props
        return (
            <View className={styles.view1}>
                <ImageGroup
                    url={url ? url : []}
                    onChange={(e) => {
                        onChange(e)
                    }}
                    onClick={onClick}
                    preview={preview}
                    addButton={
                        <View
                            className={styles.uploadView}
                            onClick={() => {
                                onClick(onChange, url)
                            }}
                            style={{ marginBottom: 15 }}
                        >
                            <Icon type='plus' />
                            <span style={{lineHeight: 1.5}}>上传</span>
                        </View>
                    }
                />

            </View>
        )
    }
}


function beforeUpload(file) {
    const isImage = file.type.includes('image') !== -1;
    if (!isImage) {
        message.error('你只能上传图片!');
    }
    const isLimit = file.size / 1024 / 1024 < 5;
    if (!isLimit) {
        message.error('图片不能超过5MB!');
    }
    return isImage && isLimit;
}
