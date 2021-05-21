import React, { Component } from "react";
import styles from "./index.css";
import Image from "@/components/image/index";
import { View } from "@/components/flexView";

export default class ShopWindowView extends Component{
    render() {
        const { data, options } = this.props;
        const { layout_style } = options;
        const styleKey = {
            1:styles.layoutstyle1,
            2:styles.layoutstyle2,
            112:styles.layoutstyle112,
            113:styles.layoutstyle113,
            114:styles.layoutstyle114,
        }

        return data.length > 0 ? <div>
            {
                layout_style === 1 ? <div className={styles.shopWindowPhoneWarp}>
                    <div className={styles.shopWindowPhoneLeft}>
                        {data.length > 0 && <Image src={data[0] && data[0].img.url} />}
                    </div>
                    <div className={styles.shopWindowPhoneRight}>
                        {data.length >= 1 && <Image src={data[1] && data[1].img.url} />}
                        {data.length >= 2 && <Image src={data[2] && data[2].img.url} />}
                    </div>
                </div> : <div className={styles.shopWindowPhoneWarp}>
                    {
                        data.map((item, index) => {
                            return <View
                                key={index}
                                className={`${styles.shopWindowPhoneItem} ${styleKey[layout_style]}`}
                            >
                                <Image src={item.img.url} />
                            </View>;
                        })
                    }
                </div>
            }
        </div> : <div />
    }
    }
