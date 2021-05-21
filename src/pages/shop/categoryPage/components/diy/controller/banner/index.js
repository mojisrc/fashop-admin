import { Form } from '@ant-design/compatible';
import React, { Component } from "react";

import GroupCard from "../common/groupCard/index";
const GroupCardMake = GroupCard.Make;
// type LinkActionType = 'portal' | 'goods' | 'page' | 'url'
export default class Banner extends Component {
    static defalutProps = {
        componentName: "banner",
        options: {},
        data: [
            {
                title: "首页",
                img: {
                    url: ""
                },
                link: {
                    action: "portal",
                    param: {
                        id: ""
                    }
                }
            }
        ],
        getValues: () => {
        }
    };

    render() {
        const { data, options, getValues } = this.props;
        return (
            <Form>
                <GroupCardMake
                    defaultValue={{
                        img: {
                            url: require("@/assets/images/page/view/image-ads-default.png")
                        },
                        title: "",
                        link: {
                            action: "portal",
                            param: {}
                        }
                    }}
                    dataSource={data}
                    onChange={(data) => {
                        getValues({
                            options,
                            data
                        });
                    }}
                />
            </Form>
        );
    }
}
