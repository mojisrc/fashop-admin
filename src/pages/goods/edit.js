import { Form } from '@ant-design/compatible';
import React, { Component } from "react";
import { connect } from "umi";
import {
    Button,
    Modal,
    message,
    Card,
    Spin,
    TreeSelect,
    DatePicker,
    InputNumber,
    Tag,
    Input,
    Row,
    Checkbox,
    Select
} from "antd";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import Sku from "@/pages/goods/components/add/sku";
import Editor from "@/pages/goods/components/detail/editor";
import styles from "./edit.css";
import Arr from "@/utils/array";
import Antd from "@/utils/antd";
import { history as router } from "umi";
import moment from "dayjs";
import GoodsFreight from "@/pages/goods/components/add/freight";
import SelectBrand from "@/pages/goods/components/selectBrand";
import SelectVideo from "@/pages/goods/components/selectVideo";
import ImageSpace from "@/components/uploadImage/imageSpace";

const FormItem = Form.Item;
const { Option } = Select;

@Form.create()
@connect(({ goods, goodsCategory, goodsTag, goodsSpec, loading }) => ({
    goodsInfo: goods.info.result,
    goodsCategory: goodsCategory.list.result,
    goodsTag: goodsTag.list.result,
    specList: goodsSpec.list.result,
    goodsListLoading: loading.effects["goods/list"],
    goodsInfoLoading: loading.effects["goods/info"],
    goodsCategoryLoading: loading.effects["goodsCategory/list"],
    specListLoading: loading.effects["goodsSpec/list"],
    goodsEditLoading: loading.effects["goods/edit"]
}))
export default class GoodsEdit extends Component {
    static defaultProps = {
        goodsInfo: { info: {} },
        goodsCategory: { list: [] },
        goodsTag: { list: [] },
        specList: { list: [] },
        goodsListLoading: true,
        goodsInfoLoading: true,
        goodsCategoryLoading: true,
        specListLoading: true
    };
    state = {
        brandInfo: {},
        videoInfo: {},
        photoGalleryVisible: false,
        photoGalleryOnOk: (e) => {
        },
        previewVisible: false,
        previewImage: "",
        previewVideoVisible: false,
        info: {
            body: [], freight_fee: 0, freight_id: 0, sale_time: null, title: "", images: [], category_ids: []
        },
        skus: [
            {
                spec: [
                    {
                        id: 0,
                        name: null,
                        value_id: 0,
                        value_name: null,
                        value_img: null
                    }
                ],
                price: null,
                stock: null,
                code: null,
                weight: null
            }
        ]
    };

    componentDidMount() {
        const { dispatch, location: { query: { id } }, form: { setFieldsValue } } = this.props;
        dispatch({
            type: "goods/info",
            payload: { id },
            callback: (response) => {
                if (response.code === 0) {
                    const { info } = response.result;
                    this.setState({
                        info,
                        skus: info.skus,
                        photoGalleryVisible: false,
                        photoGalleryOnOk: (e) => {
                        },
                        previewVisible: false,
                        previewImage: "",
                        brandInfo: typeof info["brand"] !== "undefined" ? info.brand : {},
                        videoInfo: typeof info["media"] !== "undefined" && typeof info["media"]["url"] !== "undefined" ? info.media : {}
                    });
                    // TODO 把所有都换成setFieldsValue
                    setFieldsValue({
                        brand_id: info.brand_id,
                        media_id: info.media_id,
                        line_price: info.line_price,
                        title: info.title,
                        images: info.images,
                        body: info.body,
                        tag_ids: info.tag_ids ? info.tag_ids : []
                    });
                }
            }
        });
        dispatch({
            type: "goodsCategory/list"
        });
        dispatch({
            type: "goodsTag/list",
            payload: {
                page: 1,
                rows: 1000
            }
        });
        this.refreshSpecList();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                const { dispatch } = this.props;
                const { title, images, category_ids, body, skus, sale_time, freight, brand_id,  media_id, line_price,  tag_ids } = values;
                const { id, is_on_sale } = this.state.info
                let params = {
                    id,
                    title,
                    images,
                    body,
                    category_ids,
                    skus,
                    freight_fee: freight.freight_fee,
                    freight_id: freight.freight_id,
                    sale_time: sale_time.unix(),
                    brand_id,
                    media_id,
                    line_price,
                    tag_ids,
                    is_on_sale
                };
                dispatch({
                    type: "goods/edit",
                    payload: params,
                    callback: (e) => {
                        if (e.code === 0) {
                            message.success("已保存");
                            dispatch({
                                type: "goods/info",
                                payload: { id },
                                callback: (response) => {
                                    if (response.code === 0) {
                                        const { info } = response.result;
                                        this.setState({
                                            info,
                                            skus: info.sku_list
                                        });
                                    }
                                }
                            });
                        } else {
                            message.warn(e.msg);
                        }
                    }
                });
            }
        });
    };

    render() {
        const { previewVisible, previewImage, info, skus, previewVideoVisible, videoInfo } = this.state;
        const { freight_fee, freight_id, sale_time, category_ids } = info;
        const { goodsCategory, form, goodsInfoLoading, goodsTag } = this.props;
        const { getFieldDecorator, getFieldValue, setFieldsValue } = form;
        if (!info.id) {
            return null;
        }
        let tree = Arr.toTree(goodsCategory.list);
        const categoryTree = Antd.treeData(tree);
        // TreeSelect 只接受string
        let _categoryIds = [];
        if (Array.isArray(category_ids) && category_ids.length > 0) {
            _categoryIds = category_ids.map((item) => {
                return item + "";
            });
        }
        const tagList = goodsTag.list;

        return (
            <PageHeaderWrapper hiddenBreadcrumb={true} policy={"goods/edit"}>
                <Card bordered={false}>
                    <Spin size="large" spinning={goodsInfoLoading}>
                        <Form onSubmit={this.handleSubmit} style={{ width: 1000 }}>
                            <div className={styles.item}>
                                <h3>基本信息</h3>
                                <FormItem
                                    {...formItemLayout}
                                    label='商品图'
                                >
                                    {getFieldDecorator("images", {
                                        rules: [{ required: true, message: "请选择商品图" }]
                                    })(
                                        <ImageSpace
                                            multi={true}
                                            batch={false}
                                            url={getFieldValue("images")}
                                            itemStyle={{
                                                marginRight: 10,
                                                marginBottom: 10
                                            }}
                                        />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label='商品名称'
                                >
                                    {getFieldDecorator("title", {
                                        rules: [{ required: true, message: "请输入商品名称" }]
                                    })(
                                        <Input
                                            placeholder="请输入商品名称"
                                        />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    extra="mp4格式，建议时长9-30秒，建议视频宽高比16:9"
                                    label="视频"
                                >
                                    {getFieldDecorator("media_id", {
                                        initialValue: 0
                                    })(
                                        <SelectVideo
                                            ref={(e) => this.selectVideo = e}
                                            getState={(state) => {
                                                this.selectVideo.close();
                                                this.setState({
                                                    videoInfo: state.value
                                                }, () => {
                                                    setFieldsValue({ "media_id": state.value.id });
                                                });
                                            }}
                                        />
                                    )}
                                    {getFieldValue("media_id") > 0 ? <Tag
                                        color="geekblue"
                                        closable
                                        onClose={() => {
                                            setFieldsValue({ media_id: 0 });
                                        }}
                                        onClick={() => {
                                            // 防止点击关闭触发预览
                                            getFieldValue("media_id") > 0 && this.setState({ previewVideoVisible: true });
                                        }}
                                    >
                                        已选，点击预览
                                    </Tag> : <a onClick={() => {
                                        this.selectVideo.show();
                                    }}
                                    >选择视频</a>}
                                </FormItem>

                                <Form.Item
                                    {...formItemLayout}
                                    label="品牌"
                                >
                                    {getFieldDecorator("brand_id")(
                                        <SelectBrand
                                            ref={(e) => {
                                                this.selectBrand = e;
                                            }}
                                            getState={(state) => {
                                                this.selectBrand.close();
                                                this.setState({
                                                    brandInfo: state.value
                                                }, () => {
                                                    setFieldsValue({ "brand_id": state.value.id });
                                                });
                                            }}
                                        />
                                    )}

                                    {getFieldValue("brand_id") > 0 ? <Tag closable onClose={() => {
                                        setFieldsValue({ brand_id: 0 });
                                    }}>
                                        {this.state.brandInfo.title}
                                    </Tag> : <a onClick={() => {
                                        this.selectBrand.show();
                                    }}
                                    >选择品牌</a>}

                                </Form.Item>

                                <FormItem
                                    {...formItemLayout}
                                    label='商品分类'
                                >
                                    {getFieldDecorator("category_ids", {
                                        initialValue: _categoryIds,
                                        rules: [{ required: true, message: "请选择商品分类" }]
                                    })(
                                        <TreeSelect
                                            treeData={categoryTree}
                                            showSearch
                                            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                                            placeholder="请选择商品分类"
                                            allowClear
                                            multiple
                                            treeDefaultExpandAll
                                            onChange={(value) => {
                                                setFieldsValue({
                                                    category_ids: value
                                                });
                                            }}
                                        />
                                    )}
                                    <a
                                        onClick={() => {
                                            router.push("/goods/category/add");
                                        }}
                                    >
                                        新增分类
                                    </a>
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label='自定义标签'
                                >
                                    {getFieldDecorator("tag_ids", {
                                        rules: [{ message: "请选择标签", type: "array" }]
                                    })(
                                        <Select
                                            mode="multiple"
                                            placeholder="请选择自定义标签"
                                        >
                                            {Array.isArray(tagList) && tagList.map((item, index) => {
                                                return <Option key={index} value={`${item.id}`}>{item.title}</Option>;
                                            })}
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label={"划线价"}
                                          extra={<div>如：<span style={{ textDecoration: "line-through" }}>¥500.00</span>
                                          </div>}
                                >
                                    {getFieldDecorator("line_price", {
                                        rules: [{
                                            required: false
                                        }]
                                    })(<InputNumber min={0} precision={2} style={{ width: 150 }} />)} 元
                                </FormItem>
                            </div>
                            <div className={styles.item}>
                                <h3>型号价格</h3>
                                <FormItem {...formItemLayout}>
                                    {getFieldDecorator("skus", {
                                        rules: [{
                                            validator: Sku.validator,
                                            required: true
                                        }],
                                        initialValue: skus.length > 0 ? skus : null
                                    })(<Sku form={form} />)}
                                </FormItem>
                            </div>
                            <div className={styles.item}>
                                <h3>运费其他</h3>
                                <FormItem {...formItemLayout} label={"运费"}>
                                    {getFieldDecorator("freight", {
                                        rules: [{
                                            required: true,
                                            message: "请设置运费"
                                        }],
                                        initialValue: {
                                            freight_id,
                                            freight_fee
                                        }
                                    })(<GoodsFreight />)}
                                </FormItem>
                                <FormItem {...formItemLayout} label={"开售时间"}>
                                    {getFieldDecorator("sale_time", {
                                        rules: [{
                                            required: true,
                                            message: "请选择开售时间"
                                        }],
                                        initialValue: moment(parseInt(sale_time + "000"))
                                    })(
                                        <DatePicker
                                            showTime
                                            format="YYYY-MM-DD HH:mm:ss"
                                            placeholder="选择时间"
                                            style={{ marginRight: 15 }}
                                        />
                                    )}
                                </FormItem>
                                <h3>商品详情</h3>
                            </div>
                            <FormItem {...formItemLayout} label='详情装修'>
                                {getFieldDecorator("body", {
                                    initialValue: [],
                                    rules: [{
                                        required: true,
                                        message: "请装修详情"
                                    }]
                                })(
                                    <Editor />
                                )}
                            </FormItem>
                            <FormItem {...tailFormItemLayout}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{
                                        marginRight: 10
                                    }}
                                >
                                    保存修改
                                </Button>
                            </FormItem>
                        </Form>


                        <Modal visible={previewVisible} footer={null} onCancel={this.previewCancel}>
                            <img style={{ width: "100%" }} src={previewImage} />
                        </Modal>


                        <Modal title="预览视频" visible={previewVideoVisible} footer={null} onCancel={() => {
                            this.setState({ previewVideoVisible: false });
                        }}>
                            <video src={videoInfo.url} controls="controls" style={{ width: "100%" }} />
                        </Modal>
                    </Spin>
                </Card>
            </PageHeaderWrapper>
        );
    }

    refreshSpecList = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "goodsSpec/list"
        });
    };
}

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
    }
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0
        },
        sm: {
            span: 16,
            offset: 4
        }
    }
};

