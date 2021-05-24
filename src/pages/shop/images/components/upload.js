import React, { Component } from "react";
import { Upload, Modal } from "antd";
import imageUpload from "@/utils/imageUpload";
import InboxOutlined from "@ant-design/icons/InboxOutlined";

const Dragger = Upload.Dragger;

export default class Folder extends Component {
    static defaultProps = {
        folderTree: [],
        folder_id: 0,
        onClose: () => {
        }
    };
    state = {
        fileList: []
    };
    callback = () => {

    };
    show = () => {
        this.setState({
            visible: true,
            fileList: []
        });
    };

    close = () => {
        const { fileList } = this.state;
        this.setState({
            visible: false,
            fileList: []
        }, () => {
            this.props.onClose(fileList);
        });
    };

    onChange = (info) => {
        let fileList = this.state.fileList;
        const { file } = info;
        if (typeof info["origin"] !== "undefined") {
            const { origin } = info;
            fileList.push(
              {
                  uid: file.uid,
                  name: `${file.name} - 上传成功`,
                  status: "done",
                  url: origin.path,
                  thumbUrl: origin.path
              }
            );
        }
        this.setState({
            fileList
        });
    };

    render() {
        const { folder_id } = this.props;
        const { fileList, visible } = this.state;
        return (
          <Modal
            title="上传图片"
            visible={visible}
            width={756}
            footer={false}
            onCancel={this.close}
          >
              <Dragger
                name='file'
                listType='picture'
                multiple={true}
                fileList={fileList}
                customRequest={({ file }) => {
                    imageUpload({
                        file,
                        onSuccess: this.onChange,
                        is_save: 1,
                        folder_id,
                        name: file.name
                    });
                }}
                showUploadList={{
                    showPreviewIcon: false,
                    showRemoveIcon: false
                }}
              >
                  <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">将图片或文件夹拖放到此处上传，或点击上传。</p>
                  <p className="ant-upload-hint">
                      为了保证图片的正常使用，仅支持3M以内jpg、jpeg、gif、png格式图片上传。
                  </p>
                  <p className="ant-upload-hint">
                      支持选择多张图片上传，支持拖拽文件夹上传。
                  </p>
              </Dragger>
          </Modal>
        );
    }

}
