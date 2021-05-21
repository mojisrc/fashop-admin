import React, { Component } from "react";
import { Carousel } from "antd";
import styles from "./index.css";
import Image from "@/components/image/index";

export default class Banner extends Component {
    render() {
        const { data } = this.props;
        return (
            <div className={styles.imageAdsPhoneWarp}>
                {Array.isArray(data) && data.length > 0 ? <Carousel autoplay={data.length > 1}>
                    {
                        Array.isArray(data) && data.length > 0 && data.map((item, index) => {
                            return <div key={index} className={styles.carouselItem}>
                                <Image src={item.img.url} />
                            </div>;
                        })
                    }
                </Carousel> : <div className={styles.goodsEmpty}>请添加图片</div>}
            </div>
        );
    }
}
