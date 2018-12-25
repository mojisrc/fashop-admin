import React, { PureComponent } from "react";
import Img from "react-image";
import { Icon } from "antd";
import styles from "./index.css";
import { View } from "@/components/flexView";

export default class NetWorkImage extends PureComponent {
    render() {
        const { src, style, className, type, onClick } = this.props;
        // type: samll_img big_img list_img carousel_img
        const default_img_style = type==="list_img" ? {
            width: 30, height: 30
        } : {
            width: 50, height: 50
        }
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
                    <View
                        style={{
                            ...style,
                            justifyContent: 'center',
                            alignItems: 'center',
                            background: '#f4f4f4'
                        }}
                    >
                        <img
                            alt=''
                            src={require("@/assets/images/default_icon.png")}
                            style={default_img_style}
                        />
                    </View>
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
