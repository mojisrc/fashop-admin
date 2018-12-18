import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import Item from "./item";
import Add from "./add";
import styles from "@/components/shop/diy/controller/imageNav/index.css";
import { Card } from "antd";

export default class ClickSort extends PureComponent {
    static propTypes = {
        defaultValue: PropTypes.object.isRequired,
        dataSource: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired
    };
    static defaultProps = {
        defaultValue: {},
        dataSource: [],
        // data = dataSource
        onChange: (dataSource) => {
        }
    };


    render() {
        const { defaultValue, data, onChange } = this.props;
        return <Fragment>
            {
                data.map((listItem, index) => (
                    <Card
                        className={styles.item}
                        key={`card${index}`}
                        type={"inner"}
                        extra={
                            <Sort
                                index={index}
                                data={data}
                                onChange={(data) => {
                                    onChange(data);
                                }}
                            />
                        }
                    >
                        {listItem.map((sub, subIndex) =>
                            <Item
                                img={typeof defaultValue["img"] !== "undefined" ? sub.img : null}
                                title={typeof defaultValue["title"] !== "undefined" ? sub.title : null}
                                link={typeof defaultValue["link"] !== "undefined" ? sub.link : null}
                                backgroundColor={typeof defaultValue["background_color"] !== "undefined" ? sub.background_color : null}
                                fontColor={typeof defaultValue["font_color"] !== "undefined" ? sub.font_color : null}
                                onChange={(response) => {
                                    let _data = data;
                                    _data[index][subIndex] = response;
                                    onChange(_data);
                                }}
                            />)}
                    </Card>
                ))
            }
            <Add
                onClick={() => {
                    let _data = [...data, defaultValue];
                    onChange(_data);
                }}
            />
        </Fragment>;
    }
}
