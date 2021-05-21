import React, { Component } from "react";
import { Modal, Input } from "antd";

const { TextArea } = Input;
export default class InputGoods extends Component {
    static defaultProps = {
        getState: () => {
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            urlValue: {
                url: ""
            },
            visible: false
        };
    }

    show() {
        this.setState({
            visible: true
        }, () => {
        });
    }

    close() {
        this.setState({
            visible: false
        });
    }

    render() {
        const { visible, urlValue } = this.state;
        return (
            <Modal
                title="自定义链接"
                visible={visible}
                onCancel={() => {
                    this.close();
                }}
                onOk={() => {
                    this.props.getState(this.state);
                }}
                width={756}
            >
                    <TextArea
                        placeholder="请输入自定义链接"
                        autosize={{ minRows: 2, maxRows: 6 }}
                        value={urlValue && typeof(urlValue["url"]) !== "undefined" ? urlValue.url : ""}
                        onChange={(e) => {
                            this.setState({
                                urlValue: {
                                    url: e.target.value
                                }
                            });
                        }} />
            </Modal>
        );

    }
}
