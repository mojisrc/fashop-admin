import React, { Component } from "react";
import styles from "./index.css";
import Image from "@/components/image/index";
import GoodsPrice from "@/components/goods/price";

export default class GoodsRelationView extends Component {
    render() {
        const { data, options } = this.props;
        const { layout_style } = options;
        return (
            <div className={styles[`goodsListWarp${layout_style}`]}>
                {
                    Array.isArray(data) && data.length > 0 ? data.map((item, index) => {
                        if (layout_style === 1) {
                            return this.small(item, index);
                        } else if (layout_style === 2) {
                            return this.big(item, index);
                        } else if (layout_style === 3) {
                            return this.oneBigTwoSmall(item);
                        } else if (layout_style === 4) {
                            return this.list(item, index);
                        }
                    }) : <div className={styles.goodsEmpty}>至少选择一件商品</div>
                }
            </div>
        );
    }

    // small(item: goodsItem, index, showTitle, showPrice, showMarketPrice) {
    small(item, index) {
        const { options } = this.props;
        const { goods_title_rows } = options;
        const rows = `lineClamp${goods_title_rows}`;
        const imgWidth = (375 - 18 - 2) / 2 + "px";
        return (
            <div
                className={styles.smallWarp}
                key={index}
                style={{ width: imgWidth, marginRight: index % 2 === 0 ? "6px" : 0 }}
            >
                <div className={styles.smallImgWarp}>
                    <Image src={item.img} style={{ width: imgWidth, height: imgWidth }} />
                </div>
                <div className={styles.smallBot}>
                    <p className={`${styles.smallTitle} ${styles[rows]}`}>{item.title}</p>
                    <div className={styles.smallPrice}>
                        <GoodsPrice price={item.price} fontSize={14} />
                    </div>
                </div>
            </div>
        );
    }

    big(item, index) {
        const { options } = this.props;
        const { goods_title_rows } = options;
        const rows = `lineClamp${goods_title_rows}`;
        return (
            <div
                className={styles.bigWarp}
                key={index}
            >
                <div className={styles.bigImgWarp}>
                    <Image src={item.img} />
                </div>
                <div className={styles.smallBot}>
                    <p className={`${styles.smallTitle} ${styles[rows]}`}>{item.title}</p>
                    <div className={styles.smallPrice}>
                        <GoodsPrice price={item.price} fontSize={14} />
                    </div>
                </div>
            </div>
        );
    }

    oneBigTwoSmall(item, index) {
        const { options } = this.props;
        const { goods_title_rows } = options;
        const rows = `lineClamp${goods_title_rows}`;
        const imgWidth = (375 - 18 - 2) / 2 + "px";
        return (
            <div
                key={index}
                style={{
                    width: `${
                        (index + 1) % 3 === 0 || (index + 1) % 3 === 2 ? imgWidth : "100%"
                        }`,
                    marginRight: `${
                        (index + 1) % 3 === 2 ? "6px" : "0"
                        }`

                }}
            >
                <div className={styles.smallImgWarp}>
                    <Image src={item.img}
                           style={{
                               width: `${
                                   (index + 1) % 3 === 0 || (index + 1) % 3 === 2 ? imgWidth : "100%"
                                   }`,
                               height: `${
                                   (index + 1) % 3 === 0 || (index + 1) % 3 === 2 ? imgWidth : "auto"
                                   }`
                           }}

                    />
                </div>
                <div className={styles.smallBot}>
                    <p className={`${styles.smallTitle} ${styles[rows]}`}>{item.title}</p>
                    <div className={styles.smallPrice}>
                        <GoodsPrice price={item.price} fontSize={14} />
                    </div>
                </div>
            </div>
        );
    }

    list(item, index) {
        const { options } = this.props;
        const { goods_title_rows } = options;
        const rows = `lineClamp${goods_title_rows}`;
        return (
            <div
                className={styles.listWarp}
                key={index}
            >
                <div className={styles.listImgWarp}>
                    <Image src={item.img} />
                </div>
                <div className={styles.listRight}>
                    <p className={`${styles.listTitle} ${styles[rows]}`}>{item.title}</p>
                    <div className={styles.listPrice}>
                        <GoodsPrice price={item.price} fontSize={14} />
                    </div>
                </div>
            </div>
        );
    }
}
