import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import Item from "./item";
import Add from "./add";
import Sort from "../sort";
import styles from "./index.css";
import { Card } from "antd";

export default class WechatLiveMake extends PureComponent {
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
                dataSource.map((item, index) => (
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
                        <Item
                            img={item.cover_img}
                            title={item.name}
                        />
                    </Card>
                ))
            }
            {addShow && <Add
                data={dataSource}
                onChange={(data) => {
                    onChange(data);
                }}
            />}
        </Fragment>;
    }
}
