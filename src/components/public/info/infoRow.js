import React, { Component } from "react";
import { Row, Col } from "antd";
import styles from "./index.css";

export default class InfoRow extends Component {
    render() {
        const { infoList } = this.props;
        return (
            <Row>
                {
                    infoList.map((infoListItem, index) =>
                        <Col span={8} key={index}>
                            <p className={styles.infoItem}>
                                {infoListItem.title}：
                                {
                                    infoListItem.typeLink ?
                                        <a>{infoListItem.info}</a> :
                                        infoListItem.img_List ? null :
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
                                {
                                    infoListItem.img_List && infoListItem.img_List.map((imgListItem, m) =>
                                        <img
                                            key={m}
                                            src={imgListItem.img}
                                            alt=''
                                        />
                                    )
                                }
                            </p>
                        </Col>
                    )
                }
            </Row>
        );
    }
}
