import React, { Component } from "react";
import styles from "./index.css";
import Image from "@/components/image/index";
import GoodsPrice from "@/components/goods/price";

export default class Index extends Component {
    render() {
        const { data, options } = this.props;
        const { layout_style, goods_display_field } = options;
        let showTitle = goods_display_field.indexOf("title") > -1;
        let showPrice = goods_display_field.indexOf("price") > -1;
        let showMarketPrice = goods_display_field.indexOf("market_price") > -1;
        return (
            <div className={styles[`goodsListWarp${layout_style}`]}>
                {
                    Array.isArray(data) && data.length > 0 ? data.map((item, index) => {
                        if (layout_style === 1) {
                            return this.small(item, index, showTitle, showPrice, showMarketPrice);
                        } else if (layout_style === 2) {
                            return this.big(item, index, showTitle, showPrice, showMarketPrice);
                        } else if (layout_style === 3) {
                            return this.scroll(item, index, showTitle, showPrice, showMarketPrice);
                        } else if (layout_style === 4) {
                            return this.list(item, index, showTitle, showPrice, showMarketPrice);
                        }
                    }) : <div className={styles.goodsEmpty}>至少选择一件商品</div>
                }
            </div>
        );
    }

    // small(item: goodsItem, index, showTitle, showPrice, showMarketPrice) {
    small(item, index, showTitle, showPrice, showMarketPrice) {
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
                    <p className={`${styles.smallTitle} ${styles[rows]}`}>{showTitle ? item.title : ""}</p>
                    <div className={styles.smallPrice}>
                        {/*<span>{showMarketPrice ? `￥${item.market_price}` : ''}</span>*/}
                        {showPrice ? <GoodsPrice price={item.price} fontSize={14} /> : ""}
                    </div>
                </div>
            </div>
        );
    }

    big(item, index, showTitle, showPrice, showMarketPrice) {
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
                    <p className={`${styles.smallTitle} ${styles[rows]}`}>{showTitle ? item.title : ""}</p>
                    <div className={styles.smallPrice}>
                        {/*<span>{showMarketPrice ? `￥${item.market_price}` : ''}</span>*/}
                        {showPrice ? <GoodsPrice price={item.price} fontSize={14} /> : ""}
                    </div>
                </div>
            </div>
        );
    }

    scroll(item, index, showTitle, showPrice, showMarketPrice) {
        const { options } = this.props;
        const { goods_title_rows } = options;
        const rows = `lineClamp${goods_title_rows}`;
        const imgWidth = (375 - 18 - 2) / 3.5 + "px";
        return (
            <div
                className={`${styles.smallWarp} ${styles.scroll}`}
                key={index}
                style={{ width: imgWidth, marginRight: index % 2 === 0 ? "6px" : 0 }}
            >
                <div className={styles.smallImgWarp}>
                    <Image src={item.img} style={{ width: imgWidth, height: imgWidth }} />
                </div>
                <div className={styles.smallBot}>
                    <p className={`${styles.smallTitle} ${styles[rows]}`}>{showTitle ? item.title : ""}</p>
                    <div className={styles.smallPrice}>
                        {/*<span>{showMarketPrice ? `￥${item.market_price}` : ''}</span>*/}
                        {showPrice ? <GoodsPrice price={item.price} fontSize={14} /> : ""}
                    </div>
                </div>
            </div>
        );
    }

    list(item, index, showTitle, showPrice, showMarketPrice) {
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
                    <p className={`${styles.listTitle} ${styles[rows]}`}>{showTitle ? item.title : ""}</p>
                    <div className={styles.listPrice}>
                        {/*<span>{showMarketPrice ? `￥${item.market_price}` : ''}</span>*/}
                        {showPrice ? <GoodsPrice price={item.price} fontSize={14} /> : ""}
                    </div>
                </div>
            </div>
        );
    }
}
