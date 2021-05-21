import React, { Component } from "react";
import { Button, Card } from "antd";
import styles from "./index.css";
import { View } from "@/components/flexView";

export default class PageTool extends Component {
    static defaultProps = {
        toolListData:[]
    }
    render() {
        const { onToolItemClick, toolListData } = this.props;
        const gridStyle = {
            width: "33.3%",
            textAlign: "center",
            padding: 0,
            border: 0,
            boxShadow: "none"
        };
        return (
            <View className={styles.warp}>
                {
                    toolListData.map((module, i) => {
                        return <Card title={module.name} type={"inner"} bordered={false} key={i}>
                            {
                                module.list.length > 0 ? module.list.map((item, index) => {
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
                                    </Card.Grid>;
                                }) : ""
                            }
                        </Card>;
                    })
                }
            </View>
        );
    }

}
