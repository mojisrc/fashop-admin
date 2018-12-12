
import React, { Component } from "react";
import { View } from "react-web-dom";
import {
    Modal,
    Tabs,
    Button,
    Row,
    Col,
    Checkbox,
    Pagination,
    Spin
} from "antd";
import styles from "./index.css";
import { connect } from "react-redux";
import { getPhotoGalleryList } from "../../../models/photoGallery";
import UploadImage from "../../../components/uploadImage";
import Image from "../../image";

const TabPane = Tabs.TabPane;
const CheckboxGroup = Checkbox.Group;

type Props = {
    visible: boolean,
    onCancel: Function,
    onOk: Function,
    imageList: {}
};

type State = {
    url: string,
    checkedValues: Array<string>
};

@connect(({ app: { app: { imageList } } }) => ({
    imageList
}))
export default class PhotoGallery extends Component {
    static defaultProps = {
        imageList: {
            page: 1,
            rows: 20,
            total_number: 0,
            list: [],
            loading: true
        }
    };
    state = {
        url: "",
        checkedValues: []
    };
    componentDidMount() {
        this.getPhotoGalleryList()
    }
    getPhotoGalleryList = ()=>{
        const { dispatch, imageList } = this.props;
        const { rows } = imageList;
        dispatch(getPhotoGalleryList({ params: { page: 1, rows } }))
    }
    clearCheckedValues = ()=>{
        this.setState({
            checkedValues: []
        })
    }
    render() {
        const {
            visible,
            onCancel,
            onOk,
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
                    this.clearCheckedValues()
                }}
                onOk={() => {
                    onOk(this.state.checkedValues);
                    this.clearCheckedValues()
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
        const { imageList, dispatch } = this.props;
        const { page, rows, total_number, list, loading } = imageList;
        return (
            <View className={styles.imgList}>
                <View className={styles.imgListTop}>
                    <UploadImage
                        onChange={(e)=>{
                            this.getPhotoGalleryList()
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
                            <Row gutter={30} type={'flex'}>
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
                                                    style={{minHeight:101.33}}
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
                        current={page}
                        pageSize={rows}
                        total={total_number}
                        onChange={(page, rows) => {
                            dispatch(getPhotoGalleryList({ params: { page,rows}}))
                        }}
                        pageSizeOptions={['18']}
                    />
                </View>
            </View>
        );
    }
}
