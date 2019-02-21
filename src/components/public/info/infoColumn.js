import React, { Component } from "react";
import { Row, Col } from "antd";
import styles from "./index.css";
import PhotoGallery from "@/components/photoGallery";
import Image from "@/components/image";
import { View } from "@/components/flexView";

export default class InfoColumn extends Component {
    render() {
        const { infoList } = this.props;
        return (
            <Row>
                <PhotoGallery ref={(e) => {
                    this.PhotoGallery = e;
                }} />
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
                                {
                                    Array.isArray(infoListItem.images) && infoListItem.images.length > 0 ?
                                        <View className={styles.squareImageList}>
                                            {
                                                infoListItem.images.map((item, imgIndex) =>
                                                    <div key={`div_${imgIndex}`}>
                                                        <Image
                                                            key={imgIndex}
                                                            src={item.img}
                                                            onClick={() => {
                                                                this.PhotoGallery.setState({
                                                                    index: imgIndex,
                                                                    photos: infoListItem.images.map((image) => {
                                                                        return { src: image.img };
                                                                    }),
                                                                    open: true
                                                                });
                                                            }}
                                                        />
                                                    </div>
                                                )
                                            }
                                        </View> : null
                                }
                            </div>
                        </Col>
                    )
                }
            </Row>
        );
    }
}
