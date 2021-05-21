import React, { Component } from "react";
import { Carousel } from "antd";
import styles from "./index.css";

export default class ImageGallery extends Component {
    render() {
        const { data, options } = this.props;
        const { layout_style } = options;
        let images = data;
        return (
            Array.isArray(images) && images.length > 0 ? <div className={styles.imageAdsPhoneWarp}>
                {
                    layout_style === 1 ?
                        <Carousel autoplay={images.length > 1} style={{ lineHeight: 0 }}>
                            {
                                images.map((item, index) => {
                                    return <div key={index} className={styles.carouselItem}>
                                        <img src={item.img.url} />
                                    </div>;
                                })
                            }
                        </Carousel> :
                        images.map((item, index) => {
                            return <div key={index}>
                                <img src={item.img.url} style={{ width: "100%" }} />
                            </div>;
                        })
                }
            </div> : <div className={styles.goodsEmpty}>至少选择一张图片</div>
        );
    }
}
