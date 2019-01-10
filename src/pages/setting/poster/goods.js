import React, { Component, Fragment } from "react";
import { Card } from "antd";
import { Alert, Switch, Form, Input, Button, message, Upload, Icon, Spin } from "antd";
import Draggable, { DraggableCore } from "react-draggable";
import styles from "./index.css";
import Resizable from "re-resizable";

@Form.create()
class PosterGoods extends Component {
    state = {
        index: null,
        options: {
            backgroundColor: "#ffffff",
            backgroundImage: null
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
                        y: 20
                    }
                }

            },
            {
                type: "goods_title",
                options: {
                    size: {
                        width: 285,
                        height: 42
                    },
                    fontColor: "#333",
                    fontSize: 14,
                    position: {
                        x: 20,
                        y: 284 + 20 + 10
                    }
                }
            },
            {
                type: "goods_price",
                options: {
                    size: {
                        width: 100,
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
                case "goods_price":
                    return {
                        ...item, ...{
                            resizableProps: { lockAspectRatio: null },
                            children: <div
                                style={{ fontSize: item.options.fontSize, color: item.options.fontColor }}
                            >¥50.00</div>
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
        const { index, body } = this.state;
        return (
            <Fragment>
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
            </Fragment>
        );
    }
}

export default PosterGoods;
