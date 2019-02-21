import React from "react";
import {
    Row,
    Col,
    Input
} from "antd";

const Search = Input.Search;

export default class FollowHeader extends React.Component {
    render() {
        return (
            <Row
                gutter={24}
                style={{
                    paddingTop: "10px",
                    paddingBottom: "24px",
                    marginBottom: "24px",
                    borderBottom: "1px dashed #ededed"
                }}
            >
                <Col span={5}>
                    <Search
                        placeholder='请输入用户昵称'
                        onSearch={value => console.log(value)}
                    />
                </Col>
            </Row>
        );
    }
}
