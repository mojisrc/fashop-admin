import { Form } from '@ant-design/compatible';
import React, { Component } from "react";
import {  Input } from "antd";
import GroupCard from "../common/groupCard/index";

const FormItem = Form.Item;

export default class Icon extends Component {

    static defalutProps = {
        componentName: "icon"
    };

    render() {
        const { data, getValues, options } = this.props;
        return (
            <Form>
                <FormItem
                    label="标题"
                >
                    <Input
                        value={options.title}
                        placeholder="请输入组标题"
                        onChange={(e) => {
                            getValues({
                                options: { title: e.target.value },
                                data
                            });
                        }}
                    />
                </FormItem>
                <GroupCard.Make
                    defaultValue={{
                        img: {
                            url: require("@/assets/images/page/view/image-nav-default.png")
                        },
                        title: "文字",
                        link: {
                            action: "portal",
                            param: {}
                        }
                    }}
                    dataSource={data}
                    onChange={(data,index,extra) => {
                        let item = data[index]
                        if( extra  && typeof extra['action'] !== "undefined" && extra['action'] === "goods_category" && extra.value.icon){
                            if(item.img.url.indexOf("data:")!== -1){
                                data[index].img.url = extra.value.icon
                                data[index].title = extra.value.name
                            }
                        }
                        getValues({
                            options,
                            data
                        });
                    }}
                    getExtraData={(data)=>{
                    }}
                />
            </Form>
        );
    }
}
