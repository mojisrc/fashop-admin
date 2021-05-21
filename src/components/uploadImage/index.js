import { Icon } from '@ant-design/compatible';
import React, { Component, Fragment } from "react";
import {  Upload, message, Modal } from "antd";
import { View } from "@/components/flexView";
import styles from "./index.css";
import { imageUpload } from "@/utils";
import ImageGroup from "./imageGroup";
import PropTypes from "prop-types";

export default class UploadImage extends Component {
    static propTypes = {
        disabled: PropTypes.bool,
        url: PropTypes.string,
        onChange: PropTypes.func,
        onClear: PropTypes.func
    };
    static defaultProps = {
        disabled: false,
        is_save: 0
    };
    state = {
        previewVisible: false
    };
    triggerChange = (e) => {
        const { onChange } = this.props;
        if (onChange) {
            onChange(e.origin.path);
        } else {
            message.warning("没有提供onChange属性");
        }
    };
    handlePreview = () => {
        this.setState({
            previewVisible: true
        });
    };

    render() {
        const { children, is_save, disabled, url } = this.props;
        const { previewVisible } = this.state;

        return (
            <Fragment>
                <Upload
                    disabled={disabled}
                    listType={children ? "text" : "picture-card"}
                    fileList={url ? [
                        {
                            uid: "-1",
                            name: "xxx.png",
                            status: "done",
                            url
                        }
                    ] : []}
                    // showUploadList={false}
                    beforeUpload={beforeUpload}
                    onPreview={this.handlePreview}
                    onRemove={() => {
                        this.props.onChange("");
                    }}
                    customRequest={({ file }) => {
                        imageUpload({
                            file,
                            onSuccess: this.triggerChange,
                            is_save
                        });
                    }}
                >
                    {
                        children
                            ? this.props.children
                            : this.defaultView()
                    }

                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={() => {
                    this.setState({ previewVisible: false });
                }}>
                    <img style={{ width: "100%" }} src={url} />
                </Modal>
            </Fragment>
        );
    }

    defaultView() {
        const { url } = this.props;
        return (
            !url ? <View className={styles.uploadBtn}>
                <Icon type='plus' />
                <p>Upload</p>
            </View> : null
        );
    }
}

export class UploadGroupImage extends Component {
    static defaultProps = {
        url: [],
        onPreview: () => {
        },
        onChange: (e) => {
        },
        onClick: () => {
        }
    };
    triggerChange = (e) => {
        const { onChange, url } = this.props;
        if (onChange) {
            onChange([...url ? url : [], e.origin.path]);
        } else {
            message.warning("没有提供onChange属性");
        }
    };

    render() {
        const { url, onChange, onClick, onPreview } = this.props;
        return (
            <View className={styles.view1}>
                <ImageGroup
                    url={url ? url : []}
                    onChange={(e) => {
                        onChange(e);
                    }}
                    onClick={onClick}
                    onPreview={onPreview}
                    addButton={
                        <View
                            className={styles.uploadView}
                            onClick={() => {
                                onClick(onChange, url);
                            }}
                            style={{ marginBottom: 15 }}
                        >
                            <Icon type='plus' />
                            <span style={{ lineHeight: 1.5 }}>上传</span>
                        </View>
                    }
                />

            </View>
        );
    }
}


function beforeUpload(file) {
    const isImage = file.type.includes("image") !== -1;
    if (!isImage) {
        message.error("你只能上传图片!");
    }
    const isLimit = file.size / 1024 / 1024 < 5;
    if (!isLimit) {
        message.error("图片不能超过5MB!");
    }
    return isImage && isLimit;
}
