import React, { Component } from "react";
import { Carousel } from "antd";
import styles from "./index.css";
import Image from "@/components/image/index";
//
// type Props = {
//     options: {
//         layout_style: number
//     },
//     data: Array<{
//         img: {
//             url: string
//         },
//         title: string,
//         link: {
//             action: LinkActionType,
//             param: {}
//         }
//     }>
// }
// type State = {}

export default class Index extends Component {
    render() {
        const { data, options } = this.props;
        const { layout_style } = options;
        let _ads = data;
        return (
            <div className={styles.imageAdsPhoneWarp}>
                {
                    layout_style === 1 ?
                        <Carousel autoplay={_ads.length > 1}>
                            {
                                _ads.map((item, index) => {
                                    return <div key={index} className={styles.carouselItem}>
                                        <Image src={item.img.url} />
                                    </div>;
                                })
                            }
                        </Carousel> :
                        _ads.map((item, index) => {
                            return <div key={index}>
                                <Image src={item.img.url} style={{ width: "100%" }} />
                            </div>;
                        })
                }
            </div>
        );
    }
}
