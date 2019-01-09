import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import styles from "./index.css";
import { Icon } from "antd";
import SeleceGoods from "@/components/public/selectGoods";

export default class GroupCardAdd extends PureComponent {
    static propTypes = {
        data: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired
    };
    static defaultProps = {
        onChange: () => {
        }
    };

    state = {
        addGoodsVisible: false
    };

    render() {
        const { onChange, data } = this.props;
        const { addGoodsVisible } = this.state;
        return <Fragment>
            <div
                className={styles.itemAdd}
                onClick={() => {
                    this.setState({ addGoodsVisible: true });
                }}
            >
                <Icon type='plus' /> 添加

            </div>
            <SeleceGoods
                visible={addGoodsVisible}
                close={() => {
                    this.setState({ addGoodsVisible: false });
                }}
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
                    this.setState({
                        addGoodsVisible: false
                    }, () => {
                        onChange(_data);
                    });
                }}
            />
        </Fragment>;
    }
}
