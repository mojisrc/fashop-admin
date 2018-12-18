import React, { Component } from "react";
import { View } from "@/components/flexView";
import { Modal, Tabs, Button, Row, Col, Checkbox, Pagination, Spin } from "antd";
import styles from "./index.css";
import { connect } from "dva";
import { initList } from "@/models/photoGallery";
import UploadImage from "@/components/uploadImage";
import Image from "@/components/image";
import Query from "@/utils/query";

const TabPane = Tabs.TabPane;
const CheckboxGroup = Checkbox.Group;

// type Props = {
//     visible: boolean,
//     onCancel: Function,
//     onOk: Function,
//     imageList: {}
// };
//
// type State = {
//     url: string,
//     checkedValues: Array<string>
// };

@connect(({ image, loading }) => ({
    imageList: image.list.result,
    imageListLoading: loading.effects["image/list"]
}))
export default class PhotoGallery extends Component {
    static defaultProps = {
        imageList: {
            total_number: 0,
            list: []
        }
    };
    state = {
        page: 1,
        rows: 18,
        url: "",
        checkedValues: []
    };

    componentDidMount() {
        this.initList();
    }

    initList() {
        const { dispatch } = this.props;
        dispatch({
            type: "image/list",
            payload: {
                page: this.state.page,
                rows: this.state.rows
            }
        });
    }

    clearCheckedValues = () => {
        this.setState({
            checkedValues: []
        });
    };

    render() {
        const {
            visible,
            onCancel,
            onOk
        } = this.props;
        return (
            <Modal
                title="我的图库"
                cancelText="取消"
                okText="确定"
                visible={visible}
                bodyStyle={{
                    padding: "0"
                }}
                style={{ top: 20 }}
                width={800}
                onCancel={() => {
                    onCancel();
                    this.clearCheckedValues();
                }}
                onOk={() => {
                    onOk(this.state.checkedValues);
                    this.clearCheckedValues();
                }}
            >
                <Tabs>
                    <TabPane tab={"图片库"} key={"图片库"}>
                        {this.returnImgList()}
                    </TabPane>
                </Tabs>
            </Modal>
        );
    }

    returnImgList() {
        const { checkedValues } = this.state;
        const { imageList } = this.props;
        const { list } = imageList;
        return (
            <View className={styles.imgList}>
                <View className={styles.imgListTop}>
                    <UploadImage
                        onChange={(e) => {
                            this.initList();
                        }}
                        is_save={1}
                    >
                        <Button type="primary">上传图片</Button>
                    </UploadImage>
                </View>
                <Spin spinning={loading}>
                    <CheckboxGroup
                        value={checkedValues}
                        onChange={checkedValues => {
                            this.setState({ checkedValues });
                        }}
                        style={{ display: "block" }}
                    >
                        <View className={styles.imgContent}>
                            <Row gutter={30} type={"flex"}>
                                {list.map((item, index) => (
                                    <Col
                                        span={4}
                                        key={index}
                                        style={{ marginTop: 15 }}
                                    >
                                        <Checkbox
                                            value={item.url}
                                            className={styles.checkbox}
                                        >
                                            <View
                                                className={styles.imgItem}
                                                style={
                                                    checkedValues.indexOf(
                                                        item.id
                                                    ) > -1
                                                        ? {
                                                            borderColor:
                                                                "#188fff"
                                                        }
                                                        : {}
                                                }
                                            >
                                                <p>{item.title}</p>
                                                <div>
                                                    <Image
                                                        src={item.url}
                                                        style={{ minHeight: 101.33 }}
                                                    />
                                                </div>
                                            </View>
                                        </Checkbox>
                                    </Col>
                                ))}
                            </Row>
                        </View>
                    </CheckboxGroup>
                </Spin>
                <View className={styles.paginationView}>
                    <Pagination
                        size="small"
                        showSizeChanger={false}
                        showQuickJumper={false}
                        current={this.state.page}
                        pageSize={this.state.rows}
                        total={imageList.total_number}
                        onChange={(page, rows) => {
                            this.setState({
                                page,
                                rows
                            }, () => {
                                this.initList();
                            });
                        }}
                        pageSizeOptions={[`${this.state.rows}`]}
                    />
                </View>
            </View>
        );
    }
}
