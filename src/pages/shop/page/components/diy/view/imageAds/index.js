import React, { Component } from "react";
import { Carousel } from "antd";
import styles from "./index.css";
export default class Index extends Component {
    render() {
        const { data, options } = this.props;
        const { layout_style } = options;
        let _ads = data;
        return (
            <div className={styles.imageAdsPhoneWarp}>
                {
                    layout_style === 1 ?
                        <Carousel autoplay={_ads.length > 1} style={{lineHeight:0}}>
                            {
                                _ads.map((item, index) => {
                                    return <div key={index} className={styles.carouselItem}>
                                        <img src={item.img.url} />
                                    </div>;
                                })
                            }
                        </Carousel> :
                        _ads.map((item, index) => {
                            return <div key={index}>
                                <img src={item.img.url} style={{ width: "100%" }} />
                            </div>;
                        })
                }
            </div>
        );
    }
}
