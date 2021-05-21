import React, { Component } from "react";
import { Modal } from "antd";
import { connect } from "umi";
import ImageManage from "@/pages/shop/images";
import PropTypes from "prop-types";

@connect(() => ({}), null, null, {
    forwardRef: true
})
export default class ImageSpace extends Component {
    static propTypes = {
        disabled: PropTypes.bool,
        // 是否多选
        multi: PropTypes.bool,
        // 是否显示批量操作
        batch: PropTypes.bool,
        onChange: PropTypes.func,
    };

    static defaultProps = {
        disabled: true,
        onCancel: () => {
        },
        onOk: () => {
        },
        multi: true,
        batch: true,
        onChange: (e) => {
        },
    };
    state = {
        visible: false
    };
    show = () => {
        this.setState({
            visible: true
        });
    };

    close = () => {
        this.setState({
            visible: false
        });
    };

    render() {
        const { onCancel, onOk, multi, batch } = this.props;
        const { visible } = this.state;

        return (
            <Modal
                title="图片空间"
                cancelText="取消"
                okText="确定"
                visible={visible}
                style={{ top: 20 }}
                width={980}
                onCancel={() => {
                    this.ImageManage.clearChecked();
                    onCancel();
                }}
                bodyStyle={{ padding: 0 }}
                onOk={() => {
                    this.ImageManage.clearChecked();
                    const imageList = this.ImageManage.getImagesCheckedList();
                    const urlList = imageList.map((item) => {
                        return item.url;
                    });
                    onOk(urlList);
                }}
            >
                <ImageManage
                    multi={multi}
                    batch={batch}
                    ref={e => this.ImageManage = e}
                    showSubFolder={false}
                    height={500}
                    inModal={true}
                />
            </Modal>
        );
    }

}
