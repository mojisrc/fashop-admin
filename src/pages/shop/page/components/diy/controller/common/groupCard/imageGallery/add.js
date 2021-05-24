import PlusOutlined from "@ant-design/icons/PlusOutlined";
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import styles from "./index.css";

import ImageSpaceModal from "@/components/imageSpace";

export default class GroupCardImageGalleryAdd extends Component {
    static propTypes = {
        onClick: PropTypes.func.isRequired
    };
    static defaultProps = {
        onClick: () => {

        },
        onChange: (urls) => {

        }
    };

    render() {
        const { onClick, onChange } = this.props;
        return <Fragment>
            <div
                className={styles.itemAdd}
                onClick={() => {
                    this.ImageSpaceModal && this.ImageSpaceModal.show();
                    onClick();
                }}
            >

                <PlusOutlined /> 添加
            </div>
            <ImageSpaceModal
                ref={e => this.ImageSpaceModal = e}
                onCancel={() => {
                    this.ImageSpaceModal && this.ImageSpaceModal.close();
                }}
                onOk={(e) => {
                    this.ImageSpaceModal && this.ImageSpaceModal.close();
                    onChange(e);
                }}
                multi={true}
                batch={true}
            />
        </Fragment>;
    }
}
