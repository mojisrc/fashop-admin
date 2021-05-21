import React, { Component } from "react";
import { Row, Col } from "antd";
import styles from "./index.css";
import Images from "@/components/images";

export default class InfoColumn extends Component {
    render() {
        const { infoList } = this.props;
        return (
            <Row>
                {
                    infoList.map((infoListItem, index) =>
                        <Col span={24} key={index}>
                            <div className={styles.infoItem}>
                                {infoListItem.title}：
                                {
                                    infoListItem.typeLink ?
                                        <a>{infoListItem.info}</a> :
                                        infoListItem.images ? null :
                                            <span
                                                style={
                                                    infoListItem.infoColor ? {
                                                        color: infoListItem.infoColor
                                                    } : {}
                                                }
                                            >
                                        {infoListItem.info}
                                    </span>
                                }
                                <Images
                                    size={100}
                                    list={infoListItem.images}
                                />
                            </div>
                        </Col>
                    )
                }
            </Row>
        );
    }
}
