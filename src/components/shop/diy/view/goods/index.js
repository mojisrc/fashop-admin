import React, { Component } from "react";
import styles from "./index.css";
import Image from "@/components/image/index";
//
// type Props = {
//     data: GoodsDataType,
//     options: GoodsOptionsType
// }
// type State = {}
export default class Index extends Component  {
    render() {
        const { data, options } = this.props
        const { layout_direction } = options
        return (
            <div className={styles.goodsPhoneWarp}>
                {
                    data.map((item, index) => {
                        if (layout_direction === 1) {
                            return this.small(item, index)
                        } else if (layout_direction === 2) {
                            return this.big(item, index)
                        } else if (layout_direction === 3) {
                            return this.oneBigTwoSmall(item, index)
                        } else if (layout_direction === 4) {
                            return this.list(item, index)
                        }
                    })
                }
            </div>
        )
    }
// : {
//     img: string,
//     title: string,
//     market_price: number,
//     price: number,
// }
    small(item, index) {
        const imgWidth = (375 - 18 - 2) / 2 + 'px'
        return (
            <View
                className={styles.smallWarp}
                key={index}
                style={{ width: imgWidth, marginRight: index % 2 === 0 ? '6px' : 0 }}
            >
                <View className={styles.smallImgWarp}>
                    <Image
                        src={item.img}
                        style={{ width: imgWidth, height: imgWidth }}
                    />
                </View>
                <View className={styles.smallBot}>
                    <p className={styles.smallTitle}>{item.title}</p>
                    <p className={styles.smallPrice}>
                        {/*<span>￥{item.market_price}</span>*/}
                        ￥{item.price}
                    </p>
                </View>
            </View>
        )
    }
// : {
//     img: string,
//     title: string,
//     market_price: number,
//     price: number,
// }
    big(item, index) {
        return (
            <View
                className={styles.bigWarp}
                key={index}
            >
                <View className={styles.smallImgWarp}>
                    <Image
                        src={item.img}
                    />
                </View>
                <View className={styles.smallBot}>
                    <p className={styles.smallTitle}>{item.title}</p>
                    <p className={styles.smallPrice}>
                        {/*<span>￥{item.market_price}</span>*/}
                        ￥{item.price}
                    </p>
                </View>
            </View>
        )
    }
// : {
//     img: string,
//     title: string,
//     market_price: number,
//     price: number,
// }
    oneBigTwoSmall(item, index) {
        const imgWidth = (375 - 18 - 2) / 2 + 'px'
        return (
            <View
                key={index}
                style={{
                    width: `${
                        (index + 1) % 3 === 0 || (index + 1) % 3 === 2 ? imgWidth : '100%'
                        }`,
                    marginRight: `${
                        (index + 1) % 3 === 2 ? '6px' : '0'
                        }`
                }}
            >
                <View className={styles.smallImgWarp}>
                    <Image
                        src={item.img}
                        style={{
                            width: `${
                                (index + 1) % 3 === 0 || (index + 1) % 3 === 2 ? imgWidth : '100%'
                                }`,
                            height: `${
                                (index + 1) % 3 === 0 || (index + 1) % 3 === 2 ? imgWidth : 'auto'
                                }`,
                        }}
                    />
                </View>
                <View className={styles.smallBot}>
                    <p className={styles.smallTitle}>{item.title}</p>
                    <p className={styles.smallPrice}>
                        {/*<span>￥{item.market_price}</span>*/}
                        ￥{item.price}
                    </p>
                </View>
            </View>
        )
    }
    // item: {
    //     img: string,
    //     title: string,
    //     market_price: number,
    //     price: number,
    // }
    list(item, index) {
        return (
            <View
                className={styles.listWarp}
                key={index}
            >
                <View className={styles.listImgWarp}>
                    <Image
                        src={item.img}
                    />
                </View>
                <View className={styles.listRight}>
                    <p className={styles.listTitle}>{item.title}</p>
                    <p className={styles.listPrice}>
                        {/*<span>￥{item.market_price}</span>*/}
                        ￥{item.price}
                    </p>
                </View>
            </View>
        )
    }
}
