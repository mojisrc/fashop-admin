import { Form } from '@ant-design/compatible';
import React, { Component } from "react";

import GroupCard from "@/pages/shop/page/components/diy/controller/common/groupCard/index";

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
                    allowFields={['title','link','backgroundColor','fontColor']}
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
