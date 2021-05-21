import { Icon } from '@ant-design/compatible';
import React, { PureComponent } from "react";
import Img from "react-image";

import styles from "./index.css";
import { View } from "@/components/flexView";

export default class NetWorkImage extends PureComponent {
    static defaultProps = {
        src: "",
        style: {},
        className: null,
        type: null,
        onClick: () => {
        }
    };

    state = {
        imgSizeStyle: {}
    };

    render() {
        const { src, style, className, type, onClick } = this.props;
        const { imgSizeStyle } = this.state;
        let unloaderSrc = type && type === "avatar" ?
            require("@/assets/images/default_avatar.png") : type && type === "goods" ?
                require("@/assets/images/default_goods_img.png") : require("@/assets/images/networkImageError.png");
        return (
            <div
                style={{
                     ...{
                        overflow: "hidden",
                        textAlign: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                        backgroundColor: "#f3f3f3"
                    },...style,
                }}
                className={className}
            ><Img
                src={src}
                style={imgSizeStyle}
                onLoad={e => {
                    if (e.target.height > e.target.width) {
                        this.setState({
                            imgSizeStyle: { height: "100%" }
                        });
                    } else {
                        this.setState({
                            imgSizeStyle: { width: "100%" }
                        });
                    }
                }}
                loader={
                    <View
                        style={style}
                        className={`${className} ${styles.loader}`}
                    >
                        <Icon
                            type="loading"
                            style={style}
                            className={className}
                        />
                    </View>
                }
                unloader={
                    <img
                        alt=''
                        src={unloaderSrc}
                        style={style}
                        className={className}
                    />
                }
                onClick={(e) => {
                    if (typeof onClick !== "undefined") {
                        onClick(e);
                    }
                }}
            />
            </div>
        );
    }
}
