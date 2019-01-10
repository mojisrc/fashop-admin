import React, { Component, Fragment } from "react";
import { Card } from "antd";
import { Alert, Switch, Form, Input, Button, message, Upload, Icon, Spin, Row, Col, Tabs, Slider } from "antd";
import Draggable, { DraggableCore } from "react-draggable";
import styles from "./index.css";
import Resizable from "re-resizable";
import ColorPicker from "@/components/public/colorPicker";
import UploadImage from "@/components/uploadImage";

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

class PosterGoods extends Component {
    static defaultProps = {
        settingInfoLoading: false
    };
    state = {
        index: 0,
        body: defaultBody
    };
    initFormatBody = (data) => {
        return data.map((item) => {
            switch (item.type) {
                case "background":
                    return {
                        ...item, ...{
                            resizableProps: {
                                lockAspectRatio: "1/1",
                                maxHeight,
                                maxWidth
                            },
                            children: <div style={{
                                backgroundColor: item.options.backgroundColor,
                                backgroundImage: `url("${item.options.backgroundImage}")`
                            }} />
                        }
                    };
                case "goods_img":
                    return {
                        ...item, ...{
                            resizableProps: {
                                lockAspectRatio: "1/1",
                                maxHeight,
                                maxWidth
                            },
                            children: <img
                                src={"https://img14.360buyimg.com/n7/jfs/t1/21043/38/1380/506454/5c1209f7E3e839ba2/9c5ea9fe4add6cf6.jpg"} />
                        }
                    };
                case "goods_title":
                    return {
                        ...item, ...{
                            resizableProps: {
                                lockAspectRatio: null,
                                maxHeight,
                                maxWidth
                            },
                            children: <div
                                style={{ fontSize: item.options.fontSize, color: item.options.fontColor }}
                            >新款风衣文艺范韩版修身款翻领纯棉七分袖百搭短款新款风衣文艺范韩版修</div>
                        }
                    };
                case "goods_price":
                    return {
                        ...item, ...{
                            resizableProps: {
                                lockAspectRatio: null,
                                maxHeight,
                                maxWidth
                            },
                            children: <div
                                style={{ fontSize: item.options.fontSize, color: item.options.fontColor }}
                            >¥50.00</div>
                        }
                    };
                case "mini_qr":
                    return {
                        ...item, ...{
                            resizableProps: {
                                lockAspectRatio: "1/1",
                                maxHeight,
                                maxWidth
                            },
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
        const width = lastSize.width + d.width;
        _body[index].options.size = {
            width,
            height: lastSize.height + d.height
        };
        this.setState({
            body: _body
        });
    };

    getTypeBody(type) {
        return {
            _index: this.state.body.findIndex(value => value.type === type),
            _data: this.state.body.find(value => value.type === type)
        };
    }

    resetDataSource() {
        this.setState({ body: defaultBody });
    }

    getTypeDefaultValue() {

    }

    render() {
        const { settingInfoLoading } = this.props;
        const { index, body } = this.state;
        const backgroundImage = "";
        const backgroundColor = "#ffffff";
        const types = {};
        body.map((item) => {
            types[item.type] = item;
        });

        return (
            <Card bordered={false}>
                <Spin size="large" spinning={settingInfoLoading}>
                    <div className={styles.main}>
                        <div className={styles.left}>
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
                                                    onResizeStop={(e, direction, ref, d) => {
                                                        this.onResize(d, i);
                                                    }}
                                                    data-index={i}
                                                    {...item.resizableProps}
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
                            <div className={styles.btnArea}>
                                <Button type="dashed" onClick={() => {
                                    this.resetDataSource();
                                }}>恢复默认</Button>
                                <Button type="primary">保存</Button>
                            </div>
                        </div>
                        <div className={styles.form}>
                            <Form>
                                <Tabs defaultActiveKey={`${index}`} activeKey={`${index}`} onChange={(activeKey) => {
                                    this.setState({ index: parseInt(activeKey) });
                                }} style={{ minHeight: 500 }}>
                                    <TabPane tab="背景" key="0">
                                        <FormItem {...formItemLayout} label="背景色">
                                            <ColorPicker
                                                color={types["background"].options.backgroundColor}
                                                colorChange={(color) => {
                                                    const { _index } = this.getTypeBody("background");
                                                    let _body = [...body];
                                                    _body[_index].options.backgroundColor = color.hex;
                                                    this.setState({ body: _body });
                                                }}
                                            />
                                        </FormItem>
                                        <FormItem {...formItemLayout} label="背景图">
                                            <UploadImage
                                                onChange={(e) => {
                                                    const { _index } = this.getTypeBody("background");
                                                    let _body = [...body];
                                                    _body[_index].options.backgroundImage = e;
                                                    this.setState({ body: _body });
                                                }}
                                                is_save={0}
                                            >
                                                <div className={styles.uploadBtn}>
                                                    {types["background"].options.backgroundImage.length ?
                                                        <img
                                                            src={types["background"].options.backgroundImage}
                                                            alt=''
                                                            style={{ backgroundColor: types["background"].options.backgroundColor }}
                                                        /> : <Icon type='plus' className={styles.uploadIcon} />}
                                                </div>
                                            </UploadImage>
                                        </FormItem>
                                    </TabPane>
                                    <TabPane tab="图片" key="1">
                                        <FormItem {...formItemLayout} label="尺寸">
                                            <Slider max={326} min={0} value={types["goods_img"].options.size.width}
                                                    style={{ width: 200 }}
                                                    onChange={(value) => {
                                                        const { _index } = this.getTypeBody("goods_img");
                                                        let _body = [...body];
                                                        _body[_index].options.size = { widht: value, height: value };
                                                        this.setState({ body: _body });
                                                    }}
                                            />
                                        </FormItem>
                                    </TabPane>
                                    <TabPane tab="标题" key="2">
                                        <FormItem {...formItemLayout} label="字号">
                                            <Slider max={72} min={10} value={types["goods_title"].options.fontSize}
                                                    style={{ width: 200 }}
                                                    onChange={(value) => {
                                                        const { _index } = this.getTypeBody("goods_title");
                                                        let _body = [...body];
                                                        _body[_index].options.fontSize = value;
                                                        this.setState({ body: _body });
                                                    }}
                                            />
                                        </FormItem>
                                        <FormItem {...formItemLayout} label="颜色">
                                            <ColorPicker
                                                color={types["goods_title"].options.fontColor}
                                                colorChange={(color) => {
                                                    const { _index } = this.getTypeBody("goods_title");
                                                    let _body = [...body];
                                                    _body[_index].options.fontColor = color.hex;
                                                    this.setState({ body: _body });
                                                }}
                                            />
                                        </FormItem>
                                    </TabPane>
                                    <TabPane tab="价格" key="3">
                                        <FormItem {...formItemLayout} label="字号">
                                            <Slider max={72} min={0} value={types["goods_price"].options.fontSize}
                                                    style={{ width: 200 }}
                                                    onChange={(value) => {
                                                        const { _index } = this.getTypeBody("goods_price");
                                                        let _body = [...body];
                                                        _body[_index].options.fontSize = value;
                                                        this.setState({ body: _body });
                                                    }}
                                            />
                                        </FormItem>
                                        <FormItem {...formItemLayout} label="颜色">
                                            <ColorPicker
                                                color={types["goods_price"].options.fontColor}
                                                colorChange={(color) => {
                                                    const { _index } = this.getTypeBody("goods_price");
                                                    let _body = [...body];
                                                    _body[_index].options.fontColor = color.hex;
                                                    this.setState({ body: _body });
                                                }}
                                            />
                                        </FormItem>
                                    </TabPane>
                                    <TabPane tab="二维码" key="4">
                                        <FormItem {...formItemLayout} label="尺寸">
                                            <Slider max={326} min={40} value={types["mini_qr"].options.size.height}
                                                    style={{ width: 326 }}
                                                    onChange={(value) => {
                                                        const { _index } = this.getTypeBody("mini_qr");
                                                        let _body = [...body];
                                                        _body[_index].options.size = { widht: value, height: value };
                                                        this.setState({ body: _body });
                                                    }}
                                            />
                                        </FormItem>
                                    </TabPane>
                                </Tabs>
                            </Form>
                        </div>
                    </div>
                </Spin>
            </Card>
        );
    }
}

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 2 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 }
    }
};
const maxWidth = 324;
const maxHeight = 464;
const defaultBody = [
    {
        type: "background",
        options: {
            size: {
                width: maxWidth,
                height: maxHeight
            },
            position: {
                x: 0,
                y: 0
            },
            backgroundColor: "#ffffff",
            backgroundImage: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1547118722752&di=2e6b80b4d9d2bdd4c5593e86c54c98c0&imgtype=0&src=http%3A%2F%2Fpic35.photophoto.cn%2F20150521%2F0008020222046830_b.jpg"
        }
    },
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
                y: maxHeight - 20 - 20
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
                x: maxWidth - 76 - 20,
                y: maxHeight - 20 - 76
            }
        }

    }
];

export default PosterGoods;
