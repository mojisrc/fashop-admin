import { Icon } from '@ant-design/compatible';
import React, { Component, Fragment } from "react";
import {  Upload, Button } from "antd";
import PropTypes from "prop-types";

export default class UploadVideo extends Component {
    static propTypes = {
        disabled: PropTypes.bool,
        url: PropTypes.string,
        onChange: PropTypes.func,
        onClear: PropTypes.func
    };
    static defaultProps = {
        disabled: false,
        is_save: 0,
        onChange: (e) => {
        }
    };
    state = {
        fileList: []
    };

    // TODO 封装起来，这儿我认为是umi.js的一个bug，自动索引出来的域名是http的
    render() {
        const name = "media";
        let action = "/admin/goodsmedia/add";
        action = process.env.NODE_ENV === "production" ? process.env.production.api.url + action : action;
        const token = JSON.parse(localStorage.getItem("token"));
        const { fileList } = this.state;
        const headers = { "Access-Token": token.accessToken };

        return (
            <Fragment>
                <Upload
                    accept={".mp4"}
                    name={name}
                    action={action}
                    headers={headers}
                    onChange={e => {
                        this.onChange(e);
                    }}
                    fileList={fileList}
                    listType={"text"}
                    data={{ type: 1 }}
                >
                    <Button>
                        <Icon type="upload" /> 上传视频
                    </Button>
                </Upload>
            </Fragment>
        );
    }

    onChange = info => {
        let fileList = info.fileList;
        fileList = fileList.slice(-1);
        fileList = fileList.map(file => {
            if (file.response) {
                file.path = file.response.result.path;
                file.name = "视频";
            }
            return file;
        });
        let _return = false
        fileList = fileList.filter(file => {
            if (file.response) {
                if(file.response.code === 0){
                    _return = true
                    this.setState({ fileList:[] });
                    this.props.onChange()
                }
                return file.response.code === 0;
            }
            return true;
        });
        _return === false && this.setState({ fileList });
    };

}

