import { Form } from '@ant-design/compatible';
import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { formItemLayout } from "@/pages/shop/page/components/diy/formLayout";
import ActionLink from "../actionLink/index";
import ColorPicker from "@/components/public/colorPicker";
import styles from "./index.css";
import {  Input } from "antd";
import ImageSpace from "@/components/uploadImage/imageSpace";

const FormItem = Form.Item;
// 返回组内一条的数据格式
const _response = {
    title: "",
    img: {
        url: ""
    },
    link: {
        action: "portal",
        param: {}
    },
    background_color: "#FFFFFF",
    font_color: "#333333"
};
export default class GroupCardItem extends PureComponent {
    static propTypes = {
        title: PropTypes.string,
        img: PropTypes.object,
        link: PropTypes.object,
        backgroundColor: PropTypes.string,
        fontColor: PropTypes.string,
        onChange: PropTypes.func.isRequired,
        getExtraData: PropTypes.func
    };
    // 传值、返回的值根据后端接口返回规律进行正确返回，临时解决方案
    //     title:''
    // img: {
    //     url: ''
    // },
    //     link:{
    //         action: 'portal',
    //         param: {}
    //     }
    // backgroundColor: '#FFFFFF'},
    // fontColor:'#333333},
    static defaultProps = {
        title: null,
        img: null,
        link: null,
        backgroundColor: null,
        fontColor: null,
        onChange: (data) => {
        },
        getExtraData: (data) => {
        }
    };
    state = {
        response: { ..._response }
    };

    constructor(props) {
        super(props);
        let __response = { ..._response };
        const { title, img, link, backgroundColor, fontColor } = this.props;
        if (!title) {
            delete __response["title"];
        } else {
            __response["title"] = title;
        }
        if (!img) {
            delete __response["img"];
        } else {
            __response["img"] = img;
        }
        if (!link) {
            delete __response["link"];
        } else {
            __response["link"] = link;
        }
        if (!backgroundColor) {
            delete __response["background_color"];
        } else {
            __response["background_color"] = backgroundColor;
        }
        if (!fontColor) {
            delete __response["font_color"];
        } else {
            __response["font_color"] = fontColor;
        }
        this.state = {
            response: __response
        };
    }

    render() {
        const { title, img, link, backgroundColor, fontColor, getExtraData } = this.props;
        return <div className={styles.itemBot}>
            {img ? <div className={styles.itemLeft}>
                <ImageSpace
                    multi={false}
                    batch={false}
                    url={img.url}
                    onChange={(e) => {
                        this.setResponse("img", { url: e});
                    }}
                />
            </div> : null}
            <div style={{ flex: 1 }}>
                {title ? <FormItem
                    {...formItemLayout}
                    label="标题"
                >
                    <Input
                        style={{ width: 240 }}
                        placeholder='标题必填'
                        value={title}
                        onChange={(e) => {
                            this.setResponse("title", e.target.value);
                        }}
                    />
                </FormItem> : null}
                {link ? <FormItem
                    {...formItemLayout}
                    label="链接"
                >
                    <ActionLink
                        type={link.action}
                        selectGoodsVisible={false}
                        selectPageVisible={false}
                        inputUrlVisible={false}
                        onChange={(res, extra) => {
                            this.setResponse("link", {
                                action: res.action,
                                param: res.param
                            },extra);
                            if (typeof getExtraData === "function") {
                                getExtraData({
                                    ...extra, ... {
                                        action: res.action,
                                        param: res.param
                                    }
                                });
                            }

                        }}
                        value={() => {
                            switch (link.action) {
                                case "portal":
                                    return;
                                case "goods":
                                    return link.param;
                                case "page":
                                    return link.param;
                                case "url":
                                    return link.param;
                            }
                        }}
                    />
                </FormItem> : null}
                {backgroundColor ? <FormItem
                    {...formItemLayout}
                    label="背景颜色"
                >
                    <ColorPicker
                        color={backgroundColor}
                        colorChange={(color) => {
                            this.setResponse("background_color", color.hex);
                        }}
                    />
                </FormItem> : null}
                {fontColor ? <FormItem
                    {...formItemLayout}
                    label="文字颜色"
                >
                    <ColorPicker
                        color={fontColor}
                        colorChange={(color) => {
                            this.setResponse("font_color", color.hex);
                        }}
                    />
                </FormItem> : null}
            </div>
        </div>;
    }

    setResponse(field, value,extra) {
        const { onChange } = this.props;
        let { response } = this.state;
        response[field] = value;
        onChange({ ...response },extra);
    }
}
