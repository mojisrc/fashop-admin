import React, { Component } from "react";
import { View } from "@/components/flexView";
import { Button, Row, Col, Modal, message } from "antd";
import styles from "./index.css";
import { abledata } from "./testData";
import TextDetail from "./text";
import Img from "./img";
import Video from "./video";
import Goods from "./goods";
import Line from "./line";
import Blank from "./blank";

export default class Editor extends Component {
    static defaultProps = {
        openPhotoGallery: () => {
        },
        title: "",
        image: [],
    };

    constructor(props) {
        super(props);
        const value = props.value || [];
        this.state = {
            value,
            hoverShow: -1,
            addModuleShow: false,
            addPosition: 0,
            images: []
        };
    }

    render() {
        const { hoverShow, addModuleShow, addPosition, value } = this.state;
        const { openPhotoGallery } = this.props;
        return (
            <View className={styles.goodsItem}>
                <View className={styles.bodyWarp}>
                    <View className={styles.bodyTop}>
                        <p>根据商品图片和标题</p>
                        <Button
                            onClick={() => {
                                Modal.confirm({
                                    title: "确定自动生成商品详情？",
                                    content: "该操作会清空当前的商品详情，并用最新的商品图标和标题生成新的商品详情。",
                                    onOk: () => {
                                        this.autoSetGoodsDetailData();
                                    },
                                    onCancel() {
                                    }
                                });
                            }}
                        >
                            自动生成商品详情
                        </Button>
                    </View>
                    <Row gutter={24}>
                        <Col span={10} style={{ marginTop: 20 }}>
                            <View className={styles.bodyContentWarp}>
                                {/*<img*/}
                                    {/*className={styles.phoneTop}*/}
                                    {/*src={require("@/assets/images/shop/diyPhone.png")}*/}
                                    {/*alt='diyPhone'*/}
                                {/*/>*/}
                                <View className={styles.bodyContent}>
                                    <View className={styles.bodyContentScroll}>
                                        {
                                            value.map((item, index) => {
                                                return (
                                                    <View
                                                        key={index}
                                                        className={styles.bodyItem}
                                                        onMouseEnter={() => {
                                                            this.setState({ hoverShow: index });
                                                        }}
                                                        onMouseLeave={() => {
                                                            this.setState({ hoverShow: -1 });
                                                        }}
                                                    >
                                                        {
                                                            this.returnContain(item, index)
                                                        }
                                                        {
                                                            hoverShow === index ?
                                                                this.returnOperation(index, item) : null
                                                        }
                                                    </View>
                                                );
                                            })
                                        }
                                    </View>
                                </View>
                                <Button
                                    className={styles.addModuleBtn}
                                    onClick={() => {
                                        this.setState({
                                            addModuleShow: true,
                                            addPosition: value.length
                                        });
                                    }}
                                    disabled={addModuleShow}
                                >
                                    + 添加模块
                                </Button>
                            </View>
                        </Col>
                        <Col span={8} style={{ marginTop: 20 }}>
                            {
                                addModuleShow ?
                                    <Blank
                                        setGoodsDetailData={this.setGoodsDetailData}
                                        data={this.state.value}
                                        addPosition={addPosition}
                                        closeAddModule={() => {
                                            this.setState({ addModuleShow: false });
                                        }}
                                        openPhotoGallery={openPhotoGallery}
                                    /> : false
                            }
                        </Col>
                    </Row>
                </View>
            </View>
        );
    }

    setGoodsDetailData = (e) => {
        this.setState({ value: e }, () => {
            const { onChange } = this.props;
            if (onChange) {
                onChange(e);
            }
        });
    };

    autoSetGoodsDetailData() {
        const { title, images } = this.props;
        let newArray = [];
        if (title && title.length) {
            const find = abledata.find((e) => {
                return e.type === "text";
            });
            if (find) {
                newArray.push({
                    type: "text",
                    value: find.getValue(title)
                });
            } else {
                message.error("text类型匹配异常");
            }
        }
        if (Array.isArray(images) && images.length > 0) {
            const find = abledata.find((e) => {
                return e.type === "image";
            });
            if (find) {
                images.map((e) => {
                    newArray.push({
                        type: "image",
                        value: find.getValue(e)
                    });
                });
            } else {
                message.error("image类型匹配异常");
            }
        }
        this.setGoodsDetailData(newArray);
    }

    returnOperation(index) {
        const { value } = this.state;
        return (
            <View
                className={styles.operation}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <a
                    onClick={() => {
                        this.setState({
                            addModuleShow: true,
                            addPosition: index + 1
                        });
                    }}
                >
                    添加
                </a>
                {
                    index > 0 ?
                        <a
                            onClick={() => {
                                let newdata = value.concat();
                                let add = [newdata[index], newdata[index - 1]];
                                newdata.splice(index - 1, 2, ...add);
                                this.setGoodsDetailData(newdata);
                            }}
                        >
                            上移
                        </a> : null
                }
                {
                    index < value.length - 1 ?
                        <a
                            onClick={() => {
                                let newdata = value.concat();
                                let add = [newdata[index + 1], newdata[index]];
                                newdata.splice(index, 2, ...add);
                                this.setGoodsDetailData(newdata);
                            }}
                        >
                            下移
                        </a> : null
                }
                <a
                    onClick={() => {
                        Modal.confirm({
                            title: "确认删除？",
                            okText: "确认",
                            okType: "danger",
                            cancelText: "取消",
                            onOk: () => {
                                let _array = value.concat();
                                _array.splice(index, 1);
                                this.setGoodsDetailData(_array);
                            }

                        });
                    }}
                >
                    删除
                </a>
            </View>
        );
    }

    returnContain(item, index) {
        const props = {
            data: this.state.value,
            setGoodsDetailData: this.setGoodsDetailData,
            index,
            item
        };
        switch (item.type) {
            case "text":
                return <TextDetail {...props} />;
            case "image":
                return <Img {...props} />;
            case "video":
                return <Video {...props} />;
            case "goods":
                return <Goods {...props} />;
            case "separator":
                return <Line {...props} />;
            default:
        }
    }
}
