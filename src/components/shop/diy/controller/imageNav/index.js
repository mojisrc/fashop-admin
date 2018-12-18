import React, { Component } from "react";
import { Icon, Radio, Form, Card } from "antd";
import styles from "./index.css";
import { View } from "react-web-dom";
import { formItemLayout } from "@/components/shop/diy/formLayout";
import ClickSort from "@/components/shop/diy/controller/common/clickSort";
import ListCard from "@/components/shop/diy/controller/common/listCard";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

// type LinkActionType = 'portal' | 'goods' | 'page' | 'url'
//
// type Props = {
//     componentName?: string,
//     getValues: Function,
//     options: {
//         rows: number,
//         each_row_display: number,
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
// type State = {}

export default class Index extends Component {

    static defalutProps = {
        componentName: "imageNav"
    };

    render() {
        const { data, options, getValues } = this.props;
        const { rows, each_row_display } = options;
        return (
            <Form>
                {/*<Row>*/}
                {/*<Col span={4}>行数：</Col>*/}
                {/*<Col span={19}>*/}
                {/*<RadioGroup*/}
                {/*value={rows}*/}
                {/*onChange={(e) => {*/}
                {/*let _options = options*/}
                {/*_options.rows = e.target.value*/}
                {/*getValues({*/}
                {/*options: _options,*/}
                {/*data*/}
                {/*})*/}
                {/*}}*/}
                {/*>*/}
                {/*<Radio value={1}>1 行</Radio>*/}
                {/*<Radio value={2}>2 行</Radio>*/}
                {/*<Radio value={3}>3 行</Radio>*/}
                {/*<Radio value={4}>4 行</Radio>*/}
                {/*</RadioGroup>*/}
                {/*</Col>*/}
                {/*</Row>*/}
                <FormItem
                    {...formItemLayout}
                    label="每行数"
                >
                    <RadioGroup
                        value={each_row_display}
                        onChange={(e) => {
                            let _options = options;
                            _options.each_row_display = e.target.value;
                            getValues({
                                options: _options,
                                data
                            });
                        }}
                    >
                        <Radio value={1}>1 个</Radio>
                        <Radio value={2}>2 个</Radio>
                        <Radio value={3}>3 个</Radio>
                        <Radio value={4}>4 个</Radio>
                        <Radio value={5}>5 个</Radio>
                    </RadioGroup>
                </FormItem>

                <FormItem
                    {...formItemLayout}
                    label="设置图片"
                >
                    <RadioGroup
                        value={each_row_display}
                        onChange={(e) => {
                            let _options = options;
                            _options.each_row_display = e.target.value;
                            getValues({
                                options: _options,
                                data
                            });
                        }}
                    >
                        <Radio value={1}>1 个</Radio>
                        <Radio value={2}>2 个</Radio>
                        <Radio value={3}>3 个</Radio>
                        <Radio value={4}>4 个</Radio>
                        <Radio value={5}>5 个</Radio>
                    </RadioGroup>
                </FormItem>
                {
                    data.map((listItem, index) => (
                        <Card
                            className={styles.imgNavCtrlItem}
                            // title={'建议图片像素为40 x 40'}
                            key={`card${index}`}
                            type={"inner"}
                            extra={
                                <ClickSort
                                    index={index}
                                    data={data}
                                    onChange={(data) => {
                                        getValues({
                                            options,
                                            data
                                        });
                                    }}
                                />
                            }
                        >
                            { listItem.map((sub, subIndex) => <ListCard
                                img={sub.img}
                                title={sub.title}
                                link={sub.link}
                                onChange={(response) => {
                                    let _data = data;
                                    _data[index][subIndex] = response;
                                    getValues({
                                        options,
                                        data: _data
                                    });
                                }}
                            />)}
                        </Card>
                    ))
                }
                <div
                    className={styles.imgNavCtrlItemAdd}
                    onClick={() => {
                        let _data = [
                            ...data,
                            {
                                img: {
                                    url: require("@/assets/images/page/view/image-nav-default.png")
                                },
                                title: "文字",
                                link: {
                                    action: "portal",
                                    param: {}
                                }
                            }
                        ];
                        getValues({
                            options,
                            data: _data
                        });
                    }}
                >
                    <Icon type='plus' /> 添加
                </div>
            </Form>
        );
    }
}
