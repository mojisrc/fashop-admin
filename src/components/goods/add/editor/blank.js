import React, { Component } from "react";
import { View } from "@/components/flexView";
import { Row, Col, Button, Modal, Input, message } from "antd";
import styles from "./blank.css";
import { abledata } from "./testData";
import SelectGoods from "@/components/public/selectGoods";

// setGoodsDetailData: Function,
//     closeAddModule: Function,
//     data: Array<{}>,
//     openPhotoGallery: Function,
//     addPosition: number
class Blank extends Component {
    state = {
        goodsAddVisible: false,
        videoVisible: false
    };

    render() {
        const { videoVisible, goodsAddVisible } = this.state;
        const {
            setGoodsDetailData,
            data,
            closeAddModule,
            openPhotoGallery,
            addPosition
        } = this.props;
        return (
            <View className={styles.blankDetail}>
                <Row>
                    <Col span={24}>
                        <p className={styles.blankDetailTitle}> + 添加模块</p>
                    </Col>
                </Row>
                <Row className={styles.itemRow}>
                    {
                        abledata.map((item, index) => {
                            return <Col span={12} key={index} className={styles.buttonCol}>
                                <Button
                                    className={styles.moduleItem}
                                    onClick={() => {
                                        switch (item.type) {
                                            case "goods":
                                                this.setState({
                                                    goodsAddVisible: true
                                                });
                                                break;
                                            case "video":
                                                this.setState({
                                                    videoVisible: true
                                                });
                                                break;
                                            case "image":
                                                openPhotoGallery({
                                                    photoGalleryOnOk: (e) => {
                                                        const newArray = e.map((url) => ({
                                                            type: item.type,
                                                            value: item.getValue(url)
                                                        }));
                                                        const oldArray = [...data];
                                                        newArray.map((item, i) => {
                                                            oldArray.splice(addPosition + i, 0, item);
                                                        });
                                                        setGoodsDetailData(oldArray);
                                                    }
                                                });
                                                closeAddModule();
                                                break;
                                            case "text":
                                                const newItem = {
                                                    type: item.type,
                                                    value: item.getValue()
                                                };
                                                const newArray = [...data];
                                                newArray.splice(addPosition, 0, newItem);
                                                setGoodsDetailData(newArray);
                                                closeAddModule();
                                                break;
                                            case "separator":
                                                const newDataItem = {
                                                    type: item.type
                                                };
                                                const newDataArray = [...data];
                                                newDataArray.splice(addPosition, 0, newDataItem);
                                                setGoodsDetailData(newDataArray);
                                                closeAddModule();
                                                break;
                                        }
                                    }}
                                >
                                    <View className={styles.iconView}>
                                        <img src={item.icon} alt='' />
                                    </View>
                                    <p>{item.title}</p>
                                </Button>
                            </Col>;
                        })
                    }
                </Row>
                <SelectGoods
                    multiSelect={false}
                    visible={goodsAddVisible}
                    close={() => {
                        this.setState({ goodsAddVisible: false });
                    }}
                    onOk={(e) => {
                        const typeItem = abledata.find((e) => {
                            return e.type === "goods";
                        });
                        if (!typeItem) {
                            message.error("类型匹配异常");
                            return false;
                        }
                        const newArray = e.map((item) => ({
                            type: typeItem.type,
                            value: typeItem.getValue({
                                id: item.id,
                                img: item.img,
                                title: item.title,
                                price: item.price
                            })
                        }));
                        const oldArray = [...data];
                        newArray.map((item, i) => {
                            oldArray.splice(addPosition + i, 0, item);
                        });
                        setGoodsDetailData(oldArray);
                        this.setState({ goodsAddVisible: false });
                        closeAddModule();
                    }}
                />
                <Modal
                    title="添加视频"
                    cancelText='取消'
                    okText='确定'
                    visible={videoVisible}
                    onOk={() => {
                        const videoInputValue = this.videoInput.input.value;
                        if (!videoInputValue || !videoInputValue.length) {
                            message.warn("请输入链接");
                            return false;
                        }
                        this.setState({
                            videoVisible: false
                        });
                        const item = abledata.find((e) => {
                            return e.type === "video";
                        });
                        if (!item) {
                            message.error("类型匹配异常");
                            return false;
                        }
                        const newItem = {
                            type: item.type,
                            value: item.getValue({
                                url: "http://mvvideo10.meitudata.com/5aa889b8422991218.mp4?k=9088c7e9ca1d7f03f09bc43158733b6b&t=5aacb8f3",
                                img: "http://mvimg11.meitudata.com/5aa889745415e1642.jpg!thumb480"
                            })
                        };
                        const newArray = [...data];
                        newArray.splice(addPosition, 0, newItem);
                        setGoodsDetailData(newArray);
                        closeAddModule();
                    }}
                    onCancel={() => {
                        this.setState({ videoVisible: false });
                    }}
                >
                    <Input
                        ref={(e) => {
                            this.videoInput = e;
                        }}
                        placeholder='请复制粘贴美拍或腾讯视频链接'
                    />
                </Modal>
            </View>
        );
    }
}
export default Blank
