import React, { Component } from "react";
import { Icon, Radio, Form } from "antd";
import { View } from "react-web-dom";
import UploadImage from "@/components/uploadImage";
import ActionLink from "../common/actionLink";
import { formItemLayout } from "@/components/shop/diy/formLayout";
import styles from "./index.css";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
// type LinkActionType = 'portal' | 'goods' | 'page' | 'url'
//
// type Props = {
//     componentName: string,
//     getValues: Function,
//     options: {
//         layout_style: number
//     },
//     data: Array<{
//         img: {
//             url: string
//         },
//         title: string,
//         link: {
//             action: LinkActionType,
//             param: {}
//         }
//     }>
// }
// type State = {
// }

export default class Index extends Component {
    static defaultProps = {
        componentName: "shopWindow"
    };

    render() {
        const { options, data, getValues } = this.props;
        const { layout_style } = options;
        return (
            <Form>
                <FormItem
                    {...formItemLayout}
                    label="展现形式"
                >
                    <RadioGroup
                        value={layout_style}
                        onChange={(e) => {
                            getValues({
                                options: {
                                    ...options,
                                    layout_style: e.target.value
                                },
                                data
                            });
                        }}
                    >
                        <Radio value={1}>2列,一大两小</Radio>
                        <Radio value={2}>3列,三小图</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="设置图片"
                    help="一大两小模式，左侧大图建议比例284 x 592px，小图300 x 300px"
                >
                    <RadioGroup
                        value={layout_style}
                        onChange={(e) => {
                            getValues({
                                options: {
                                    ...options,
                                    layout_style: e.target.value
                                },
                                data
                            });
                        }}
                    >
                        <Radio value={1}>2列,一大两小</Radio>
                        <Radio value={2}>3列,三小图</Radio>
                    </RadioGroup>
                </FormItem>
                {
                    data.map((listItem, index) => {
                        return <View
                            className={styles.shopWindowCtrlItem}
                            key={index}
                        >
                            <View className={styles.shopWindowCtrlItemBot}>
                                <View className={styles.shopWindowCtrlItemLeft}>
                                    <UploadImage
                                        onChange={(e) => {
                                            let _data = data;
                                            _data[index].img = { url: e };
                                            getValues({
                                                options,
                                                data: _data
                                            });
                                        }}
                                        is_save={1}
                                    >
                                        {
                                            listItem.img.url.length ?
                                                <img
                                                    src={listItem.img.url}
                                                    alt=''
                                                    style={{ width: "80px" }}
                                                /> :
                                                <View className={styles.uploadBtn}>
                                                    <Icon type='plus' />
                                                    <p>上传图标</p>
                                                </View>
                                        }
                                    </UploadImage>
                                </View>
                                <View className={styles.shopWindowCtrlItemRight}>
                                    {/* <p>
                                        <span>标题：</span>
                                        <Input style={{width:240}}/>
                                    </p> */}
                                    <div className={styles.shopWindowCtrlItemRightRow}>
                                        <span>链接：</span>
                                        <ActionLink
                                            type={listItem.link.action}
                                            getValues={(state) => {
                                                let _data = data;
                                                _data[index].link.action = state.type;
                                                _data[index].link.param = state.value;
                                                getValues({
                                                    options,
                                                    data: _data
                                                });
                                            }}
                                            value={() => {
                                                switch (listItem.link.action) {
                                                    case "portal":
                                                        return;
                                                    case "goods":
                                                        return listItem.link.param;
                                                    case "page":
                                                        return listItem.link.param;
                                                    case "url":
                                                        return listItem.link.param;
                                                }
                                            }}
                                        />
                                    </div>
                                </View>
                            </View>
                        </View>;
                    })
                }
            </Form>
        );
    }
}
