import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import GoodsItem from "./goodsItem";
import GoodsAdd from "./goodsAdd";
import Sort from "./sort";
import styles from "./index.css";
import { Card } from "antd";

export default class GroupCardMake extends PureComponent {
    static propTypes = {
        addShow: PropTypes.bool,
        sortShow: PropTypes.bool,
        dataSource: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired
    };
    static defaultProps = {
        dataSource: [],
        addShow: true,
        sortShow: true,
        onChange: (dataSource) => {
        }
    };


    render() {
        const { dataSource, onChange, addShow, sortShow } = this.props;
        return <Fragment>
            {
                dataSource.map((listItem, index) => (
                    <Card
                        className={styles.item}
                        key={`card${index}`}
                        type={"inner"}
                        extra={
                            sortShow ? <Sort
                                index={index}
                                data={dataSource}
                                onChange={(data) => {
                                    onChange(data);
                                }}
                            /> : null
                        }
                    >
                        <GoodsItem
                            img={listItem.img}
                            title={listItem.title}
                            price={listItem.price}
                        />
                    </Card>
                ))
            }
            {addShow ? <GoodsAdd
                data={dataSource}
                onChange={(data) => {
                    onChange(data);
                }}
            /> : null}
        </Fragment>;
    }
}
