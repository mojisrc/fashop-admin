import { Icon } from '@ant-design/compatible';
import { Form } from '@ant-design/compatible';
import React, { Component } from "react";
import {   InputNumber, Row, Col } from "antd";
import "braft-editor/dist/index.css";
import BraftEditor from "braft-editor";
import UploadImage from "@/components/uploadImage";
import { formItemLayout } from "@/pages/shop/page/components/diy/formLayout";
import ColorPicker from "@/components/public/colorPicker";

const FormItem = Form.Item;

export default class RichText extends Component {

    static defaultProps = {
        componentName: "richText",
        getValues: () => {
        }
    };
    state = {
        editorState: BraftEditor.createEditorState(null)
    };

    componentDidMount() {
        const { data } = this.props;
        this.setState({
            editorState: BraftEditor.createEditorState(data.html_content)
        });
    }

    render() {
        const { options, getValues, data } = this.props;
        const { background_color, padding } = options;
        const { editorState } = this.state;
        const controls = ["undo", "redo", "remove-styles", "hr", "bold", "italic", "underline", "text-color", "line-height", "letter-spacing", "text-indent", "font-size", "text-align"];
        const extendControls = [
            {
                key: "antd-uploader",
                type: "component",
                component: (
                    <UploadImage
                        onChange={(url) => {
                            this.setState({
                                editorState: ContentUtils.insertMedias(this.state.editorState, [{
                                    type: "IMAGE",
                                    url: url
                                }])
                            });

                        }}
                    >
                        <button type="button" className="control-item button upload-button" data-title="插入图片">
                            <Icon type="picture" theme="filled" />
                        </button>
                    </UploadImage>
                )
            }
        ];

        return (
            <Form {...formItemLayout}>
                <Row gutter={16}>
                    <Col span={7}>
                        <FormItem label="背景颜色" style={{ width: 300 }}>
                            <ColorPicker
                                color={background_color}
                                colorChange={(color) => {
                                    getValues({
                                        options: { ...options, ...{ background_color: color.hex } },
                                        data: { ...data }
                                    });
                                }}

                            />
                        </FormItem>
                    </Col>

                    <Col span={12}>
                        <FormItem label="内边距">
                            <InputNumber
                                value={padding}
                                defaultValue={padding}
                                min={0}
                                max={50}
                                formatter={value => `${value}px`}
                                parser={value => value.replace("px", "")}
                                onChange={(e) => {
                                    getValues({
                                        options: { ...options, ...{ padding: e } },
                                        data: { ...data }
                                    });
                                }}
                            />
                        </FormItem>
                    </Col>
                </Row>
                <BraftEditor
                    extendControls={extendControls}
                    value={editorState}
                    onChange={(editorState) => {
                        console.log(editorState.toHTML());
                        this.setState({ editorState }, () => {
                            getValues({
                                options: { ...options },
                                data: {
                                    html_content: editorState.toHTML()
                                }
                            });
                        });
                    }}
                    controls={controls}
                />
            </Form>
        );
    }
}
