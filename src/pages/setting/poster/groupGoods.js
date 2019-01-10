import React, { Component, Fragment } from "react";
import { Card } from "antd";
import { Alert, Switch, Form, Input, Button, message, Upload, Icon, Spin } from "antd";
import Draggable, { DraggableCore } from "react-draggable";
import styles from "./groupGoods.css";
import Resizable from "re-resizable";

@Form.create()
class PosterGroupGoods extends Component {
    static defaultProps = {
        settingInfoLoading:false
    }
    state = {
        index: null,
        options: {
            backgroundColor: "#ffffff",
            backgroundImage: null,
        },
        body: [
            {
                type: "goods_img",
                options: {
                    size: {
                        width: 284,
                        height: 284
                    },
                    position: {
                        x: 20,
                        y: 20+30+20
                    }
                }

            },
            {
                type: "avatar",
                options: {
                    size: {
                        width: 30,
                        height: 30
                    },
                    position: {
                        x: 20,
                        y: 20
                    },
                    borderRadius:60
                }

            },
            {
                type: "nickname",
                options: {
                    size: {
                        width: 56,
                        height: 20
                    },
                    position: {
                        x: 20 + 30 + 10,
                        y: 20+3
                    },
                    fontSize:14,
                    fontColor:'#1890FF'
                }

            },
            {
                type: "slogan",
                options: {
                    size: {
                        width: 116,
                        height: 20
                    },
                    position: {
                        x: 20 + 30 + 10 + 56 + 10,
                        y: 20+3
                    },
                    fontContent:'正在拼团 赶快加入',
                    fontSize:14,
                    fontColor:'#999999'
                }

            },
            {
                type: "group_number",
                options: {
                    size: {
                        width: 48,
                        height: 20
                    },
                    position: {
                        x: 20+5,
                        y: 20+30+20+5
                    },
                    fontSize:12,
                    fontColor:'#ffffff',
                    fontBackgroundColor:'#FF5127'
                }

            },
            {
                type: "goods_title",
                options: {
                    size: {
                        width: 196,
                        height: 42
                    },
                    fontColor: "#333",
                    fontSize: 14,
                    position: {
                        x: 20,
                        y: 464 - 20 - 76
                    }
                }
            },
            {
                type: "goods_group_price",
                options: {
                    size: {
                        width: 80,
                        height: 20
                    },
                    fontColor: "#FF5127",
                    fontSize: 20,
                    position: {
                        x: 20,
                        y: 464 - 20 - 20
                    }
                }
            },
            {
                type: "goods_price",
                options: {
                    size: {
                        width: 80,
                        height: 20
                    },
                    fontColor: "#999999",
                    fontSize: 14,
                    position: {
                        x: 20+5+80,
                        y: 464 - 20 - 20
                    }
                }
            },
            {
                type: "mini_qr",
                options: {
                    size: {
                        width: 76,
                        height: 76
                    },
                    position: {
                        x: 324 - 76 - 20,
                        y: 464 - 20 - 76
                    }
                }

            }
        ]
    };
    initFormatBody = (data) => {
        return data.map((item) => {
            switch (item.type) {
                case "avatar":
                    return {
                        ...item, ...{
                            resizableProps: {
                                lockAspectRatio: "1/1"
                            },
                            children: <img
                                style={{
                                    borderRadius:item.options.borderRadius
                                }}
                                src={"https://tvax2.sinaimg.cn/crop.0.0.850.850.180/684ff39bly8fi57d6kk3oj20nm0nm75h.jpg"} />
                        }
                    };
                case "nickname":
                    return {
                        ...item, ...{
                            resizableProps: { lockAspectRatio: null },
                            children: <div
                                style={{ fontSize: item.options.fontSize, color: item.options.fontColor }}
                            >用户昵称</div>
                        }
                    };
                case "slogan":
                    return {
                        ...item, ...{
                            resizableProps: { lockAspectRatio: null },
                            children: <div
                                style={{ fontSize: item.options.fontSize, color: item.options.fontColor }}
                            >{item.options.fontContent}</div>
                        }
                    };
                case "group_number":
                    return {
                        ...item, ...{
                            resizableProps: { lockAspectRatio: null },
                            children: <div
                                style={{ fontSize: item.options.fontSize, color: item.options.fontColor,backgroundColor:item.options.fontBackgroundColor }}
                            >2人团</div>
                        }
                    };
                case "goods_img":
                    return {
                        ...item, ...{
                            resizableProps: {
                                lockAspectRatio: "1/1"
                            },
                            children: <img
                                src={"https://img14.360buyimg.com/n7/jfs/t1/21043/38/1380/506454/5c1209f7E3e839ba2/9c5ea9fe4add6cf6.jpg"} />
                        }
                    };
                case "goods_title":
                    return {
                        ...item, ...{
                            resizableProps: { lockAspectRatio: null },
                            children: <div
                                style={{ fontSize: item.options.fontSize, color: item.options.fontColor }}
                            >新款风衣文艺范韩版修身款翻领纯棉七分袖百搭短款新款风衣文艺范韩版修</div>
                        }
                    };
                case "goods_group_price":
                    return {
                        ...item, ...{
                            resizableProps: { lockAspectRatio: null },
                            children: <div
                                style={{ fontSize: item.options.fontSize, color: item.options.fontColor }}
                            >¥50.00</div>
                        }
                    };
                case "goods_price":
                    return {
                        ...item, ...{
                            resizableProps: { lockAspectRatio: null },
                            children: <div
                                style={{ fontSize: item.options.fontSize, color: item.options.fontColor }}
                            >¥99.00</div>
                        }
                    };
                case "mini_qr":
                    return {
                        ...item, ...{
                            resizableProps: { lockAspectRatio: "1/1" },
                            children: <img
                                src={"https://tvax2.sinaimg.cn/crop.0.0.850.850.180/684ff39bly8fi57d6kk3oj20nm0nm75h.jpg"} />
                        }
                    };
            }
        });
    };

    onReposition = (x, y, index) => {
        let _body = [...this.state.body];
        _body[index].options.position = {
            x,
            y
        };
        this.setState({
            body: _body
        });
    };
    onResize = (d, index) => {
        let _body = [...this.state.body];
        let lastSize = _body[index].options.size;
        _body[index].options.size = {
            width: lastSize.width + d.width,
            height: lastSize.height + d.height
        };
        this.setState({
            body: _body
        });
    };

    render() {
        const {settingInfoLoading} = this.props
        const { index, body } = this.state;
        return (
            <Card bordered={false}>
                <Spin size="large" spinning={settingInfoLoading}>
                <div className={styles.view}>
                    <div className={styles.container}>
                        {
                            this.initFormatBody(body).map((item, i) => {
                                return <Draggable
                                    key={`k${i}`}
                                    bounds="parent"
                                    axis="both"
                                    handle='.handle'
                                    defaultPosition={item.options.position}
                                    grid={[1, 1]}
                                    onStop={(e, data) => {
                                        this.setState({
                                            index: i
                                        }, () => {
                                            this.onReposition(data.lastX, data.lastY, i);
                                        });
                                    }}>
                                    <Resizable
                                        className={`${styles.item}  ${index === i ? styles.active : ""} `}
                                        size={item.options.size}
                                        lockAspectRatio={item.resizableProps.lockAspectRatio}
                                        onResizeStop={(e, direction, ref, d) => {
                                            this.onResize(d, i);
                                        }}
                                        data-index={i}
                                    >
                                        <div className={`${styles[item.type]} handle`}>
                                            {item.children}
                                        </div>
                                    </Resizable>
                                </Draggable>;
                            })
                        }
                    </div>
                </div>
                </Spin>
            </Card>
        );
    }
}

export default PosterGroupGoods;
