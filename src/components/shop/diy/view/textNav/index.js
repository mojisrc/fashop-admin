
import React, { Component } from "react";
import { Icon } from "antd";
import styles from "./index.css";
import { View } from "react-web-dom";
import type { LinkActionType } from "../../controller/common/actionLink"

type Props = {
        options: any,
        data: Array<{
            title: string,
            link: {
                action: LinkActionType,
                param: {}
            },
            background_color: string,
            font_color: string
        }>
}
type State = {}

export default class Index extends Component {
    render() {
        const { data } = this.props
        return (
            <View className={styles.textNavPhoneWarp}>
                {
                    data.map((listItem, index) => {
                        return <View
                            className={styles.textNavPhoneItem}
                            key={index}
                        >
                            <p>{listItem.title}</p>
                            <Icon type='right' />
                        </View>
                    })
                }
            </View>
        )
    }
}
