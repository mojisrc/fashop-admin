import React, { Component } from "react";
import PropTypes from "prop-types";

export default class GoodsPrice extends Component {
    static propTypes = {
        style: PropTypes.object,
        price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        fontSize: PropTypes.number,
        fontColor: PropTypes.string
    };
    static defaultProps = {
        style: {},
        price: 0,
        fontSize: 14,
        fontColor: "#EE3B40"
    };

    render() {
        const { price, fontSize, fontColor, style } = this.props;
        const _price = `${price}`.split(".");
        if (_price.length === 1) {
            _price.push("00");
        }
        return <div
            style={{ ...{ display:'inline' }, ...style }}>
            <span style={{
                color: fontColor,
                fontSize: `${fontSize - 4}px`,
                marginRight: 2,
                fontWeight: "500",
                lineHeight: `${fontSize - 4}px`,
                paddingBottom: 1
            }}>¥</span>
            <span style={{
                color: fontColor,
                fontSize: fontSize,
                fontWeight: "500",
                lineHeight: `${fontSize}px`
            }}>{_price[0]}</span>
            <span style={{
                color: fontColor,
                fontSize: `${fontSize - 2}px`,
                fontWeight: "500",
                lineHeight: `${fontSize - 2}px`
            }}>.{_price[1]}</span>
        </div>;
    }
}
