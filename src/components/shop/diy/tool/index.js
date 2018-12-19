import React, { Component } from "react";
import { Col, Button, Card } from "antd";
import styles from "./index.css";
import { View } from "@/components/flexView";
import { defaultData } from "./defaultData";
//
// type Props = {
//     onToolItemClick: Function
// }
// type State = {
// }

export default class PageTool extends Component {
    render() {
        const { onToolItemClick } = this.props;
        const gridStyle = {
            width: '33.3%',
            textAlign: 'center',
            padding:0,
            border:0,
            boxShadow:'none'
        };
        return (
            <Card title={"基础模块"} type={'inner'} bordered={false}>
                {
                    defaultData.length > 0 ? defaultData.map((item, index) => {
                        return <Card.Grid style={gridStyle} key={index}>
                            <Button
                                className={styles.moduleItem}
                                onClick={() => {
                                    onToolItemClick({ ...item }, index);
                                }}
                            >
                                <View className={styles.iconView}>
                                    <img src={item.icon} alt='' />
                                </View>
                                <p>{item.title}</p>
                            </Button>
                        </Card.Grid>
                    }) : ""
                }
            </Card>
        );
    }

}
