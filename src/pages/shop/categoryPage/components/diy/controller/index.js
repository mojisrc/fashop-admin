import React, { Component } from "react";
import { ScrollView } from "@/components/flexView";
import { Card } from "antd";
import Icon from "./icon/index";
import Banner from "./banner/index";


export default class Controller extends Component {
    static defaultProps = {
        data: [],
        setData: (e) => {
        },
        leftIndex: 0,
        rightIndex: 0
    };

    render() {
        const { data, leftIndex, rightIndex } = this.props;
        if (data.length > 0 && typeof data[leftIndex] !== "undefined" && typeof data[leftIndex]["children"] !== "undefined" && data[leftIndex]["children"][rightIndex] !== "undefined") {
            let _data = data[leftIndex].children[rightIndex];
            let item = "";
            if (_data) {
                switch (_data.type) {
                    case "icon":
                        item = <Icon
                            options={_data.options}
                            data={_data.data}
                            getValues={this.getValues}
                        />;
                        break;
                    case "banner":
                        item = <Banner
                            options={_data.options}
                            data={_data.data}
                            getValues={this.getValues}
                        />;
                        break;
                    default:
                }
            }
            return (
                <ScrollView style={{ height: "80vh" }} block={true}>
                    <Card bordered={false} key={`${leftIndex}_${rightIndex}`}>{item}</Card>
                </ScrollView>
            );
        } else {
            return "";
        }

    }

    getValues = (itemData) => {
        const { data, setData, leftIndex, rightIndex } = this.props;
        let _data = [ ...data ];
        _data[leftIndex]["children"][rightIndex].options = itemData.options;
        _data[leftIndex]["children"][rightIndex].data = itemData.data;
        setData(_data);
    };
}
