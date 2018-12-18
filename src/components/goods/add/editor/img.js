import React, { Component } from "react";
import { connect } from "dva";
import { View } from "@/components/flexView";
import styles from "./img.css";

@connect()
class Img extends Component {
    render() {
        const { item } = this.props;
        return (
            <View className={styles.imgDetail}>
                <img
                    alt=''
                    src={item.value.url}
                />
            </View>
        );
    }
}

export default Img;
