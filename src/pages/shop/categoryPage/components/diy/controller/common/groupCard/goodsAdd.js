import PlusOutlined from "@ant-design/icons/PlusOutlined";
import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import styles from "./index.css";

import SeleceGoods from "@/pages/shop/page/components/selectGoods/index";

export default class GroupCardAdd extends PureComponent {
    static propTypes = {
        data: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired
    };
    static defaultProps = {
        onChange: () => {
        }
    };

    render() {
        const { onChange, data } = this.props;
        return <Fragment>
            <div
                className={styles.itemAdd}
                onClick={() => {
                    this.selectGoods.show();
                }}
            >
                <PlusOutlined /> 添加

            </div>
            <SeleceGoods
                ref={(e) => this.selectGoods = e}
                multiSelect={true}
                onOk={(goodsList) => {
                    let _data = [...data];
                    goodsList.map((item) =>
                        _data.push({
                            id: item.id,
                            img: item.img,
                            title: item.title,
                            price: item.price
                        })
                    );
                    onChange(_data);
                }}
            />
        </Fragment>;
    }
}
