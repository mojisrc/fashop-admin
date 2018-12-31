//@flow

import React, { Component } from "react";
import {
    Layout,
    Row,
    Col,
} from "antd";

const { Footer } = Layout;

export default class LayoutFooter extends Component<{}, {}> {
    render() {
        return (
            <Footer>
                <Row>
                    <Col span={8}>
                    </Col>
                    <Col span={8}>
                        <p
                            style={{
                                width: "100%",
                                textAlign: "center",
                                color:'#999'
                            }}
                        >
                            Powered by CM ( www.iotiotiot.cn )
                        </p>
                    </Col>
                    <Col span={8} />
                </Row>
            </Footer>
        );
    }
}
