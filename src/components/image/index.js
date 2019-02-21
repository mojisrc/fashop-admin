import React, { PureComponent } from "react";
import Img from "react-image";
import { Icon } from "antd";
import styles from "./index.css";
import { View } from "@/components/flexView";

export default class NetWorkImage extends PureComponent {
    render() {
        const { src, style, className, type, onClick } = this.props;
        let unloaderSrc = type && type === "avatar" ?
            require("@/assets/images/default_avatar.png") : type && type === "goods" ?
                require("@/assets/images/default_goods_img.png") : require("@/assets/images/networkImageError.png");
        return (
            <Img
                src={src}
                style={style}
                className={className}
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
        );
    }
}
