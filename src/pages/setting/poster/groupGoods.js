import { Form, Icon, Tabs, Slider, Input } from "antd";
import styles from "./groupGoods.css";
import ColorPicker from "@/components/public/colorPicker";
import UploadImage from "@/components/uploadImage";
import { BaseController, formItemLayout, maxWidth, maxHeight } from "./baseController";
import { connect } from "dva";

const TabPane = Tabs.TabPane;
const FormItem = Form.Item;

@connect(({ setting, loading }) => ({
    settingInfoLoading: loading.effects["setting/info"],
    settingEditLoading: loading.effects["setting/edit"]
}))
class PosterGroupGoods extends BaseController {
    constructor(props) {
        super(props);
        this.setStyles(styles);
    }

    key = "poster_group_goods";

    getFormController() {
        const { body } = this.state;
        const types = {};
        body.map((item) => {
            types[item.type] = item;
        });
        return <Form>
            <Tabs tabPosition={"top"}
                  defaultActiveKey={`background`}
                  activeKey={`${this.getIndexTabKey()}`}
                  onChange={(activeKey) => {
                      this.setState({ index: parseInt(this.getTypeBody(activeKey)._index) });
                  }} style={{ minHeight: 500, width: 700 }}>
                <TabPane tab="背景" key="background">
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
                <TabPane tab="头像" key="avatar">
                    <FormItem {...formItemLayout} label="尺寸">
                        <Slider max={326} min={0} value={types["avatar"].options.size.width}
                                style={{ width: 200 }}
                                onChange={(value) => {
                                    const { _index } = this.getTypeBody("avatar");
                                    let _body = [...body];
                                    _body[_index].options.size = {
                                        width: value,
                                        height: value
                                    };
                                    this.setState({ body: _body });
                                }}
                        />
                    </FormItem>
                    <FormItem {...formItemLayout} label="圆角">
                        <Slider max={326} min={0} value={types["avatar"].options.borderRadius}
                                style={{ width: 200 }}
                                onChange={(value) => {
                                    const { _index } = this.getTypeBody("avatar");
                                    let _body = [...body];
                                    _body[_index].options.borderRadius = value;
                                    this.setState({ body: _body });
                                }}
                        />
                    </FormItem>
                </TabPane>
                <TabPane tab="昵称" key="nickname">
                    <FormItem {...formItemLayout} label="字号">
                        <Slider max={72} min={10} value={types["nickname"].options.fontSize}
                                style={{ width: 200 }}
                                onChange={(value) => {
                                    const { _index } = this.getTypeBody("nickname");
                                    let _body = [...body];
                                    _body[_index].options.fontSize = value;
                                    this.setState({ body: _body });
                                }}
                        />
                    </FormItem>
                    <FormItem {...formItemLayout} label="颜色">
                        <ColorPicker
                            color={types["nickname"].options.fontColor}
                            colorChange={(color) => {
                                const { _index } = this.getTypeBody("nickname");
                                let _body = [...body];
                                _body[_index].options.fontColor = color.hex;
                                this.setState({ body: _body });
                            }}
                        />
                    </FormItem>
                </TabPane>
                <TabPane tab="口号" key="slogan">
                    <FormItem {...formItemLayout} label="文本">
                        <Input placeholder="Basic usage" value={types["slogan"].options.fontContent}
                               style={{ width: 200 }}
                               onChange={({ target: { value } }) => {
                                   const { _index } = this.getTypeBody("slogan");
                                   let _body = [...body];
                                   _body[_index].options.fontContent = value;
                                   this.setState({ body: _body });
                               }}
                        />
                    </FormItem>
                    <FormItem {...formItemLayout} label="尺寸">
                        <Slider max={72} min={10} value={types["slogan"].options.fontSize}
                                style={{ width: 200 }}
                                onChange={(value) => {
                                    const { _index } = this.getTypeBody("slogan");
                                    let _body = [...body];
                                    _body[_index].options.fontSize = value;
                                    this.setState({ body: _body });
                                }}
                        />
                    </FormItem>
                    <FormItem {...formItemLayout} label="颜色">
                        <ColorPicker
                            color={types["slogan"].options.fontColor}
                            colorChange={(color) => {
                                const { _index } = this.getTypeBody("slogan");
                                let _body = [...body];
                                _body[_index].options.fontColor = color.hex;
                                this.setState({ body: _body });
                            }}
                        />
                    </FormItem>
                </TabPane>
                <TabPane tab="拼团数" key="group_number">
                    <FormItem {...formItemLayout} label="字号">
                        <Slider max={72} min={10} value={types["group_number"].options.fontSize}
                                style={{ width: 200 }}
                                onChange={(value) => {
                                    const { _index } = this.getTypeBody("group_number");
                                    let _body = [...body];
                                    _body[_index].options.fontSize = value;
                                    this.setState({ body: _body });
                                }}
                        />
                    </FormItem>
                    <FormItem {...formItemLayout} label="颜色">
                        <ColorPicker
                            color={types["group_number"].options.fontColor}
                            colorChange={(color) => {
                                const { _index } = this.getTypeBody("group_number");
                                let _body = [...body];
                                _body[_index].options.fontColor = color.hex;
                                this.setState({ body: _body });
                            }}
                        />
                    </FormItem>
                    <FormItem {...formItemLayout} label="背景色">
                        <ColorPicker
                            color={types["group_number"].options.fontColor}
                            colorChange={(color) => {
                                const { _index } = this.getTypeBody("group_number");
                                let _body = [...body];
                                _body[_index].options.fontBackgroundColor = color.hex;
                                this.setState({ body: _body });
                            }}
                        />
                    </FormItem>
                </TabPane>
                <TabPane tab="图片" key="goods_img">
                    <FormItem {...formItemLayout} label="尺寸">
                        <Slider max={326} min={0} value={types["goods_img"].options.size.width}
                                style={{ width: 200 }}
                                onChange={(value) => {
                                    const { _index } = this.getTypeBody("goods_img");
                                    let _body = [...body];
                                    _body[_index].options.size = {
                                        width: value,
                                        height: value
                                    };
                                    this.setState({ body: _body });
                                }}
                        />
                    </FormItem>
                </TabPane>
                <TabPane tab="标题" key="goods_title">
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
                <TabPane tab="价格" key="goods_group_price">
                    <FormItem {...formItemLayout} label="字号">
                        <Slider max={72} min={0} value={types["goods_group_price"].options.fontSize}
                                style={{ width: 200 }}
                                onChange={(value) => {
                                    const { _index } = this.getTypeBody("goods_group_price");
                                    let _body = [...body];
                                    _body[_index].options.fontSize = value;
                                    this.setState({ body: _body });
                                }}
                        />
                    </FormItem>
                    <FormItem {...formItemLayout} label="颜色">
                        <ColorPicker
                            color={types["goods_group_price"].options.fontColor}
                            colorChange={(color) => {
                                const { _index } = this.getTypeBody("goods_group_price");
                                let _body = [...body];
                                _body[_index].options.fontColor = color.hex;
                                this.setState({ body: _body });
                            }}
                        />
                    </FormItem>
                </TabPane>
                <TabPane tab="原价" key="goods_price">
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
                <TabPane tab="二维码" key="mini_qr">
                    <FormItem {...formItemLayout} label="尺寸">
                        <Slider max={326} min={40} value={types["mini_qr"].options.size.height}
                                style={{ width: 200 }}
                                onChange={(value) => {
                                    const { _index } = this.getTypeBody("mini_qr");
                                    let _body = [...body];
                                    _body[_index].options.size = {
                                        width: value,
                                        height: value
                                    };
                                    this.setState({ body: _body });
                                }}
                        />
                    </FormItem>
                </TabPane>
            </Tabs>
        </Form>;
    }

    initFormatBody(data) {
        return data.map((item) => {
            switch (item.type) {
                case "background":
                    return {
                        ...item, ...{
                            children: <div style={{
                                backgroundColor: item.options.backgroundColor,
                                backgroundImage: `url("${item.options.backgroundImage}")`
                            }}
                            />,
                            tabPane: {
                                title: "背景"
                            }
                        }
                    };
                case "avatar":
                    return {
                        ...item, ...{
                            resizableProps: {
                                lockAspectRatio: "1/1"
                            },
                            children: <img
                                style={{
                                    borderRadius: item.options.borderRadius
                                }}
                                src={"https://tvax2.sinaimg.cn/crop.0.0.850.850.180/684ff39bly8fi57d6kk3oj20nm0nm75h.jpg"} />,
                            tabPane: {
                                title: "头像"
                            }
                        }
                    };
                case "nickname":
                    return {
                        ...item, ...{
                            resizableProps: { lockAspectRatio: null },
                            children: <div
                                style={{ fontSize: item.options.fontSize, color: item.options.fontColor }}
                            >用户昵称</div>,
                            tabPane: {
                                title: "昵称"
                            }
                        }
                    };
                case "slogan":
                    return {
                        ...item, ...{
                            resizableProps: { lockAspectRatio: null },
                            children: <div
                                style={{ fontSize: item.options.fontSize, color: item.options.fontColor }}
                            >{item.options.fontContent}</div>,
                            tabPane: {
                                title: "口号"
                            }
                        }
                    };
                case "group_number":
                    return {
                        ...item, ...{
                            resizableProps: { lockAspectRatio: null },
                            children: <div
                                style={{
                                    fontSize: item.options.fontSize,
                                    color: item.options.fontColor,
                                    backgroundColor: item.options.fontBackgroundColor
                                }}
                            >2人团</div>,
                            tabPane: {
                                title: "拼团数"
                            }
                        }
                    };
                case "goods_img":
                    return {
                        ...item, ...{
                            resizableProps: {
                                lockAspectRatio: "1/1"
                            },
                            children: <img
                                src={"https://img14.360buyimg.com/n7/jfs/t1/21043/38/1380/506454/5c1209f7E3e839ba2/9c5ea9fe4add6cf6.jpg"} />,
                            tabPane: {
                                title: "图片"
                            }
                        }
                    };
                case "goods_title":
                    return {
                        ...item, ...{
                            resizableProps: { lockAspectRatio: null },
                            children: <div
                                style={{ fontSize: item.options.fontSize, color: item.options.fontColor }}
                            >新款风衣文艺范韩版修身款翻领纯棉七分袖百搭短款新款风</div>,
                            tabPane: {
                                title: "标题"
                            }
                        }
                    };
                case "goods_group_price":
                    return {
                        ...item, ...{
                            resizableProps: { lockAspectRatio: null },
                            children: <div
                                style={{ fontSize: item.options.fontSize, color: item.options.fontColor }}
                            >¥50.00</div>,
                            tabPane: {
                                title: "价格"
                            }
                        }
                    };
                case "goods_price":
                    return {
                        ...item, ...{
                            resizableProps: { lockAspectRatio: null },
                            children: <div
                                style={{ fontSize: item.options.fontSize, color: item.options.fontColor }}
                            >¥99.00</div>,
                            tabPane: {
                                title: "原价"
                            }
                        }
                    };
                case "mini_qr":
                    return {
                        ...item, ...{
                            resizableProps: { lockAspectRatio: "1/1" },
                            children: <img
                                src={"https://tvax2.sinaimg.cn/crop.0.0.850.850.180/684ff39bly8fi57d6kk3oj20nm0nm75h.jpg"} />,
                            tabPane: {
                                title: "二维码"
                            }
                        }
                    };
            }
        });
    };

    getDefaultBody() {
        return [
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
                    backgroundImage: ""
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
                        y: 20 + 30 + 20
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
                    borderRadius: 60
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
                        y: 20 + 3
                    },
                    fontSize: 14,
                    fontColor: "#1890FF"
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
                        y: 20 + 3
                    },
                    fontContent: "正在拼团 赶快加入",
                    fontSize: 14,
                    fontColor: "#999999"
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
                        x: 20 + 5,
                        y: 20 + 30 + 20 + 5
                    },
                    fontSize: 12,
                    fontColor: "#ffffff",
                    fontBackgroundColor: "#FF5127"
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
                        x: 20 + 5 + 80,
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
        ];
    }
}


export default PosterGroupGoods;
