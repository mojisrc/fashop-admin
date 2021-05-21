import React, { Component } from "react";
import styles from "./index.css";

export default class Icon extends Component {
    render() {
        const { data,options } = this.props
        return (
            <div
                className={styles.imgNavPhoneWarp}
            >
                <div className={styles.iconCategoryTitle}>
                    <p>{options.title}</p>
                </div>
                {
                    Array.isArray(data) && data.length > 0 ? data.map((item, index) => {
                        return <div
                            key={index}
                            className={styles.imgNavPhonItem}
                        >
                            <img alt='' src={item.img.url} />
                            <p>{item.title}</p>
                        </div>
                    })  : <div className={styles.goodsEmpty}>请添加内容</div>}
            </div>
        )
    }
}
