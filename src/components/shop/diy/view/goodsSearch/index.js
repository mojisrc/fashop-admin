import React, { Component } from "react";
import { Input } from 'antd';
import styles from "./index.css";

const Search = Input.Search;
//
// type Props = {
//     options: {
//         background_color: string
//     },
//     data: {}
// }
// type State = {}

export default class Index extends Component {
    render() {
        const { background_color } = this.props.options
        return (
            <div className={styles.goodsSearchPhoneWarp}
                  style={{ backgroundColor: background_color }}>
                <Search
                    placeholder="商品搜索：请输入商品关键词"
                />
            </div>
        )
    }
}
