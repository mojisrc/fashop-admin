import React, { Component } from "react";
import { Form } from "antd";
import GroupCard from "@/components/shop/diy/controller/common/groupCard";

const GroupCardMake = GroupCard.Make;
export default class Index extends Component {

    static defaultProps = {
        componentName: "textNav"
    };

    render() {
        const { options, data, getValues } = this.props;
        return (
            <Form>
                <GroupCardMake
                    defaultValue={{
                        title: "这是标题",
                        link: {
                            action: "portal",
                            param: {}
                        },
                        background_color: "#FFFFFF",
                        font_color: "#333333"
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
