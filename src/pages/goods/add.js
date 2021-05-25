import { Form } from "@ant-design/compatible";
import React, { Component } from "react";
import { connect } from "umi";
import {

    Button,
    Modal,
    message,
    Card,
    Spin,
    Input,
    TreeSelect,
    DatePicker,
    InputNumber,
    Tag,
    Select
} from "antd";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import Sku from "@/pages/goods/components/add/sku";
import Editor from "@/pages/goods/components/detail/editor";
import styles from "./edit.css";
import Arr from "@/utils/array";
import Antd from "@/utils/antd";
import { history as router } from "umi";
import GoodsFreight from "@/pages/goods/components/add/freight";
import dayjs from "dayjs";
import SelectBrand from "@/pages/goods/components/selectBrand";
import SelectVideo from "@/pages/goods/components/selectVideo";
import ImageSpace from "@/components/uploadImage/imageSpace";

const FormItem = Form.Item;
const { Option } = Select;

@Form.create()
@connect(({ goodsCategory, goodsTag, goodsSpec, loading }) => ({
    goodsCategory: goodsCategory.list.result,
    goodsTag: goodsTag.list.result,
    specList: goodsSpec.list.result,
    goodsListLoading: loading.effects["goods/list"],
    goodsCategoryLoading: loading.effects["goodsCategory/list"],
    specListLoading: loading.effects["goodsSpec/list"],
    goodsAddLoading: loading.effects["goods/add"]
}))

class GoodsEdit extends Component {
    static defaultProps = {
        goodsCategory: { list: [] },
        goodsTag: { list: [] },
        specList: { list: [] },
        goodsListLoading: true,
        goodsCategoryLoading: true,
        specListLoading: true
    };
    state = {
        brandInfo: {},
        supplierInfo: {},
        videoInfo: {},
        photoGalleryVisible: false,
        photoGalleryOnOk: (e) => {
        },
        previewVideoVisible: false,
        previewVisible: false,
        previewImage: "",
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
        ],
        save: true,
        goodsDedailVisible: false,
        pageAddBody: []
    };

    componentDidMount() {
        const { dispatch, form } = this.props;
        const { setFieldsValue } = form;
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
        let cache = JSON.parse(localStorage.getItem("fashop-goods-add")) || {};
        if (typeof cache["formValues"] !== "undefined") {
            setFieldsValue(
              typeof cache.formValues["sale_time"] !== "undefined" ? {
                  ...cache.formValues,
                  sale_time: dayjs(cache.formValues.sale_time)
              } : cache.formValues
            );
        }
        if (typeof cache["state"] !== "undefined" && typeof cache["state"]["brandInfo"] !== "undefined") {
            this.setState({
                brandInfo: cache.state.brandInfo
            });
        }
        if (typeof cache["state"] !== "undefined" && typeof cache["state"]["supplierInfo"] !== "undefined") {
            this.setState({
                supplierInfo: cache.state.supplierInfo
            });
        }
        if (typeof cache["state"] !== "undefined" && typeof cache["state"]["videoInfo"] !== "undefined") {
            this.setState({
                videoInfo: cache.state.videoInfo
            });
        }

        setFieldsValue({
            freight: {
                freight_fee: 0,
                freight_id: 0
            }
        });
    }

    componentWillUnmount() {
        if (this.state.save) {
            localStorage.setItem("fashop-goods-add", JSON.stringify({
                formValues: this.props.form.getFieldsValue(),
                state: {
                    brandInfo: this.state.brandInfo,
                    supplierInfo: this.state.supplierInfo,
                    videoInfo: this.state.videoInfo
                }
            }));
        } else {
            localStorage.removeItem("fashop-goods-add");
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (!err) {
                const { dispatch } = this.props;
                const { title, images, category_ids, body, skus, sale_time, freight, brand_id,  line_price, media_id, tag_ids } = values;
                let params = {
                    title,
                    images,
                    category_ids,
                    body,
                    skus,
                    freight_fee: freight.freight_fee,
                    freight_id: freight.freight_id,
                    sale_time: sale_time.unix(),
                    brand_id,
                    line_price,
                    media_id,
                    tag_ids
                };
                dispatch({
                    type: "goods/add",
                    payload: params,
                    callback: (e) => {
                        if (e.code === 0) {
                            this.setState({
                                save: false
                            }, () => {
                                message.success("添加成功");
                                router.goBack();
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
        const { previewVisible, previewImage, previewVideoVisible, videoInfo } = this.state;
        const { goodsCategory, form, goodsCategoryLoading, goodsAddLoading, goodsTag } = this.props;
        const { getFieldDecorator, getFieldValue, setFieldsValue } = form;

        let tree = Arr.toTree(goodsCategory.list);
        const categoryTree = Antd.treeData(tree);
        const tagList = goodsTag.list;
        return (
          <PageHeaderWrapper hiddenBreadcrumb={true} policy={"goods/add"}>
              <Card bordered={false}>
                  <Spin size="large" spinning={goodsCategoryLoading}>
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
                                          width: 100,
                                          height: 100,
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
                                  <a onClick={() => {
                                      this.selectBrand.show();
                                  }}
                                     style={{ marginRight: 10 }}
                                  >选择品牌</a>
                                  {getFieldValue("brand_id") > 0 ? `已选择：${this.state.brandInfo.title}` : null}
                              </Form.Item>
                              <FormItem
                                {...formItemLayout}
                                label='商品分类'
                              >
                                  {getFieldDecorator("category_ids", {
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
                                      }]
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
                                      }]
                                  })(<GoodsFreight />)}
                              </FormItem>
                              <FormItem {...formItemLayout} label={"开售时间"}>
                                  {getFieldDecorator("sale_time", {
                                      rules: [{
                                          required: true,
                                          message: "请选择开售时间"
                                      }]
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
                                loading={goodsAddLoading}
                                style={{
                                    marginRight: 10
                                }}
                              >
                                  保存添加
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

export default GoodsEdit;
