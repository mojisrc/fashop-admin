import PlusOutlined from "@ant-design/icons/PlusOutlined";
import React, { Component } from "react";
import {  Modal } from "antd";
import { View } from "@/components/flexView";
import styles from "./index.css";
import ImageGroup from "./imageGroup";
import PropTypes from "prop-types";
import ImageSpaceModal from "@/components/imageSpace";
import { isEmpty } from "@/utils";

// 对imageSpace modal的升级 临时写法
export default class UploadImageSpace extends Component {
    static propTypes = {
        disabled: PropTypes.bool,
        // 是否多选
        multi: PropTypes.bool,
        // 是否显示批量操作
        batch: PropTypes.bool,
        url: PropTypes.any,
        // multi = false 返回字符串 true是数组
        onChange: PropTypes.func,
        itemStyle: PropTypes.object
    };
    static defaultProps = {
        itemStyle: {},
        disabled: false,
        multi: true,
        batch: true,
        url: [],
        onChange: (e) => {
        }
    };


    state = {
        previewVisible: false,
        previewImage: ""
    };

    render() {
        const { disabled, multi, url, batch, itemStyle } = this.props;
        const { previewVisible, previewImage } = this.state;
        let _url = [];
        if (multi === true) {
            _url = Array.isArray(url) ? url : [];
        } else {
            _url = !isEmpty(url) ? [url] : [];
        }
        return (
            <View className={styles.view1}>
                <ImageSpaceModal
                    ref={e => this.ImageSpaceModal = e}
                    onCancel={() => {
                        this.ImageSpaceModal.close();
                    }}
                    onOk={(e) => {
                        this.onChange([..._url, ...e]);
                    }}
                    multi={multi}
                    batch={batch}
                />
                <ImageGroup
                    itemStyle={itemStyle}
                    url={_url}
                    onChange={this.onChange}
                    onPreview={this.onPreview}
                    addButton={
                        multi === false && _url.length > 0 ? "" : <View
                            className={styles.uploadView}
                            style={itemStyle}
                            onClick={() => {
                                disabled === false && this.ImageSpaceModal.show();
                            }}
                        >
                            <PlusOutlined />
                            <span style={{ lineHeight: 1.5 }}>上传</span>
                        </View>
                    }
                />
                <Modal visible={previewVisible} footer={null} onCancel={this.onPreviewCancel}>
                    <img style={{ width: "100%" }} src={previewImage} />
                </Modal>
            </View>
        );
    }

    onChange = (e) => {
        const { multi, url, onChange } = this.props;
        this.ImageSpaceModal.close();
        // 防止闪烁点击不了删除预览
        if (JSON.stringify(e) !== JSON.stringify(url)) {
            if (multi === true) {
                onChange(e);
            } else {
                onChange(Array.isArray(e) && e.length > 0 ? e[0] : "");
            }
        }
    };
    onPreviewCancel = () => {
        this.setState({
            previewVisible: false
        });
    };
    onPreview = (url) => {
        this.setState({
            previewVisible: true,
            previewImage: url
        });
    };
}

