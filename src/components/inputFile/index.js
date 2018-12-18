import React, { Component } from "react";
import styles from "./index.css";
import { Icon } from "antd";
import { View } from "@/components/flexView";

export default class InputFile extends Component {
    state = {
        url: ""
    };
    handleChange = (e) => {
        // TODO
        const { uploadUrl, uploadFunc } = this.props;
        let formData = new FormData();
        formData.append("media", e.target.files[0]);
        let url = `${env.domain}/admin/${uploadUrl}`;
        Fetch.formData(url, formData)
            .then((e) => {
                console.log("handleChange", e);
                if (e.code === 0) {
                    uploadFunc(e.result);
                    // this.triggerChange();
                }
            });
    };
    triggerChange = () => {
        const onChange = this.props.onChange;
        if (onChange) {
            onChange();
        }
    };

    render() {
        const { url } = this.state;
        return (
            <View className={styles.uploadWarp}>
                <input
                    type="file"
                    onChange={this.handleChange}
                    className={styles.logoInput}
                />
                {
                    url.length ?
                        <img
                            src={url}
                            alt=''
                            style={{ width: "80px" }}
                        /> :
                        <View className={styles.uploadBtn}>
                            <Icon type='plus' />
                            <p>Upload</p>
                        </View>
                }
            </View>
        );
    }
}
