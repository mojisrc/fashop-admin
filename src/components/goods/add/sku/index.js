import React, { Component, Fragment } from "react";
import { connect } from "dva";
import { View } from "@/components/flexView/index";
import styles from "./index.css";
import { Modal, Input, Select, Button, Icon, Tag, Popover, Checkbox, message, Form, InputNumber } from "antd";
import { ThemeStyle } from "@/utils/style";
import SkuTable from "./skuTable";
import GoodsApi from "@/services/goods";

const confirm = Modal.confirm;
const Option = Select.Option;
const FormItem = Form.Item;
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
@connect(({ goodsSpec, loading }) => ({
    specList: goodsSpec.list.result.list,
    specListLoading: loading.effects["goodsSpec/list"]
}))
export default class Sku extends Component {
    static defaultProps = {
        specList: [],
        specListLoading: false,
        onChange: (e) => {
        }
    };
    defaultValue = [
        {
            spec: [
                {
                    id: 0,
                    value_id: 0,
                    name: null,
                    value_name: null,
                    value_img: null
                }
            ],
            price: null,
            stock: null,
            code: null,
            weight: 0
        }
    ];

    constructor(props) {
        super(props);
        const skus = props.value || this.defaultValue;
        let specs = [];
        let multiSkus = false;
        if (skus.length > 1) {
            // 通过skus重组specs，必须存在spec 否则第一条无法被添加
            if (skus.length > 0 && skus[0].spec.length > 0 && skus[0].spec[0]["id"] > 0) {
                multiSkus = true;
                skus.map((e) => {
                    e.spec.map((skuSpec) => {
                        const findInSpecsIndex = specs.findIndex((spec) => spec.id === skuSpec.id);
                        // 预置spec
                        if (findInSpecsIndex === -1) {
                            // 如果state里没有 添加外部传入的specs
                            specs.push({
                                id: skuSpec.id,
                                name: skuSpec.name,
                                values: []
                            });
                        }
                        // 设置value
                        const specIndex = specs.findIndex((spec) => spec.id === skuSpec.id);
                        const specValueIndex = specs[specIndex].values.findIndex((value) => value.id === skuSpec.value_id);
                        if (specValueIndex === -1) {
                            specs[specIndex].values.push({
                                id: skuSpec.value_id,
                                name: skuSpec.value_name
                            });
                        }
                    });
                });
            }
        }

        this.state = {
            id: props.id,
            value: skus,
            customSpecSortShow: false,
            loading: false,
            multiSkus,
            addSpecComVisible: false,
            specRowRightCloseBtnHoverIndex: -1,
            specValueIds: [],
            tagChecked: false,
            specs,
            lastSpecValuesPopoverClick: { index: 0, visible: false },
            refresh: true
        };
    }

    setSkus = (value) => {
        this.setState({ value }, () => {
            const { onChange } = this.props;
            if (onChange) {
                onChange(value);
            }
        });
    };

    initGoodsSpecList() {
        const { dispatch } = this.props;
        dispatch({
            type: "goodsSpec/list"
        });
    }

    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps", nextProps);
        if (this.state.refresh){
            const skus = nextProps.value || this.defaultValue;
            let specs = [];
            let multiSkus = false;
            if (skus.length > 1) {
                // 通过skus重组specs，必须存在spec 否则第一条无法被添加
                if (skus.length > 0 && skus[0].spec) {
                    multiSkus = true;
                    skus.map((e) => {
                        e.spec.map((skuSpec) => {
                            const findInSpecsIndex = specs.findIndex((spec) => spec.id === skuSpec.id);
                            // 预置spec
                            if (findInSpecsIndex === -1) {
                                // 如果state里没有 添加外部传入的specs
                                specs.push({
                                    id: skuSpec.id,
                                    name: skuSpec.name,
                                    values: []
                                });
                            }
                            // 设置value
                            const specIndex = specs.findIndex((spec) => spec.id === skuSpec.id);
                            const specValueIndex = specs[specIndex].values.findIndex((value) => value.id === skuSpec.value_id);
                            if (specValueIndex === -1) {
                                specs[specIndex].values.push({
                                    id: skuSpec.value_id,
                                    name: skuSpec.value_name
                                });
                            }
                        });
                    });
                }
            }
            this.setState({
                value: skus,
                multiSkus,
                specs,
                refresh: false
            })
        }
    }

    render() {
        const { specList, onChange } = this.props;
        const { specRowRightCloseBtnHoverIndex, specs, lastSpecValuesPopoverClick, multiSkus } = this.state;
        const skus = this.state.value;
        return (
            <Fragment>
                {multiSkus === false && this.renderSingleSku()}
                <FormItem
                    {...formItemLayout}
                    label='商品型号'
                >
                    {multiSkus === false ?
                        <Button
                            type="dashed"
                            onClick={() => {
                                this.setState({
                                    specs: [
                                        {
                                            id: 0,
                                            name: "",
                                            values: []
                                        }
                                    ],
                                    multiSkus: true
                                });
                            }}
                            style={{ width: 150 }}
                        >
                            <Icon type="plus" /> 添加型号分类
                        </Button>
                        : <View className={styles.spec}>
                            <View className={styles.itemWarp}>
                                {
                                    specs.length > 0 && specs.map((spec, index) => (
                                        <View
                                            key={spec.id}
                                            className={styles.item}
                                            onMouseEnter={() => {
                                                this.setState({ specRowRightCloseBtnHoverIndex: index });
                                            }}
                                            onMouseLeave={() => {
                                                this.setState({ specRowRightCloseBtnHoverIndex: -1 });
                                            }}
                                        >
                                            <View className={styles.itemTop}>
                                                <Select
                                                    placeholder="请选择型号分类"
                                                    value={spec.id > 0 ? `${spec.id}` : []}
                                                    style={{ width: "30%", top: "0" }}
                                                    onChange={(specId) => {
                                                        if (specId === "customSpecShow") {
                                                            this.customSpecShow();
                                                        } else {
                                                            this.onSpecSelectChange(specId, index);
                                                        }
                                                    }}
                                                >
                                                    {Array.isArray(specList) && specList.length > 0 && specList.map((item) => (
                                                        <Option key={item.id} disabled={!!specs.find((spec) => {
                                                            return item.id === spec.id;
                                                        })}>{item.name}</Option>))}
                                                    <Option key={"customSpecShow"}>自定义</Option>
                                                </Select>
                                                {
                                                    specRowRightCloseBtnHoverIndex === index ?
                                                        <View
                                                            onClick={() => {
                                                                confirm({
                                                                    title: "确定要删除吗？",
                                                                    okText: "删除",
                                                                    okType: "danger",
                                                                    cancelText: "取消",
                                                                    onOk: () => {
                                                                        let _specs = [...specs];
                                                                        _specs.splice(index, 1);
                                                                        const data = _specs.length === 0 ? this.defaultValue : this.mergeSkus(_specs);
                                                                        this.setState({
                                                                            specs: _specs,
                                                                            multiSkus: data[0]["spec"][0]["id"] !== 0,
                                                                            value: data
                                                                        }, () => {
                                                                            let fieldsValue = {};
                                                                            fieldsValue[this.state.id] = data;
                                                                            this.props.form.setFieldsValue(fieldsValue);
                                                                            if (data.length === 0) {
                                                                                this.initGoodsSpecList();
                                                                            }
                                                                        });
                                                                    }
                                                                });
                                                            }}
                                                        >
                                                            <Icon
                                                                type="close-circle"
                                                                style={{
                                                                    fontSize: "16px"
                                                                }}
                                                            />
                                                        </View> : null
                                                }
                                            </View>
                                            <View className={styles.tagsWarp}>
                                                {
                                                    spec.values.map((value) => (
                                                        <Tag
                                                            key={`spec_${spec.id}_value_${value.id}`}
                                                            closable
                                                            onClose={() => {
                                                                const _specs = [...specs];
                                                                _specs[index].values = _specs[index].values.filter((filterItem) => {
                                                                    return filterItem.id !== value.id;
                                                                });
                                                                const skuValue = this.mergeSkus(_specs);
                                                                onChange(this.mergeSkus(skuValue));
                                                                this.setState({
                                                                    value: skuValue
                                                                });
                                                            }}
                                                        >
                                                            {value.name}
                                                        </Tag>
                                                    ))
                                                }
                                                {
                                                    spec.id > 0 ?
                                                        <Popover
                                                            content={this.renderSpecValuePopoverContent(spec, index)}
                                                            trigger="click"
                                                            placement="bottomLeft"
                                                            visible={index === lastSpecValuesPopoverClick.index ? lastSpecValuesPopoverClick.visible : false}
                                                        >
                                                            <a style={{ color: ThemeStyle.themeColor }} onClick={() => {
                                                                this.setState({
                                                                    lastSpecValuesPopoverClick: {
                                                                        index,
                                                                        visible: true
                                                                    }
                                                                });
                                                            }}> + 添加型号 </a>
                                                        </Popover> : null
                                                }
                                            </View>
                                        </View>
                                    ))
                                }
                            </View>
                            {
                                multiSkus === true ? <View
                                    className={styles.buttonWarp}>{this.addSpecItemButtom()}</View> : this.addSpecItemButtom()
                            }
                            {multiSkus === true && <SkuTable skus={skus} specs={specs} onChange={(e) => {
                                this.setState({
                                    value: e
                                }, () => {
                                    onChange(e);
                                });
                            }} />}
                            {this.customSpecModal()}
                        </View>}
                </FormItem>
            </Fragment>
        );
    }

    renderSingleSku = () => {
        const skus = this.state.value;

        return <Fragment>
            <FormItem
                {...formItemLayout}
                label='商品价格'
                required={true}
            >
                <InputNumber
                    style={{
                        width: 150
                    }}
                    precision={2}
                    formatter={value => `${value}`}
                    min={0}
                    value={skus[0].price}
                    onChange={(e) => {
                        this.setSkus([{
                            ...skus[0],
                            price: e
                        }]);
                    }}
                /> 元
            </FormItem>
            <FormItem
                {...formItemLayout}
                label='库存'
                required={true}
            >
                <InputNumber
                    style={{ width: 150 }}
                    precision={0}
                    formatter={value => `${value}`}
                    min={0}
                    value={skus[0].stock}
                    onChange={(e) => {
                        this.setSkus([{
                            ...skus[0],
                            stock: e
                        }]);
                    }}
                /> 件
            </FormItem>
            <FormItem
                {...formItemLayout}
                label='商品编码'
            >
                <Input
                    style={{ width: 440 }}
                    placeholder="选填，用于商家系统对接"
                    value={skus[0].code}
                    onChange={(e) => {
                        this.setSkus([{
                            ...skus[0],
                            code: e.target.value
                        }]);
                    }}
                />
            </FormItem>
        </Fragment>;
    };

    customSpecShow() {
        this.setState({ customSpecSortShow: true });
    }

    onSpecSelectChange(specId, index) {
        const { specList, onChange } = this.props;
        const { specs } = this.state;

        const findExistItem = specs.find((spec) => {
            return spec.id === Number(specId);
        });
        // 判断是否有重复，没重复添加
        if (findExistItem === undefined) {
            const spec = specList.find((spec) => {
                return spec.id === Number(specId);
            });
            if (!spec) {
                message.warning("商品型号不能重复");
            } else {
                const _specs = [...specs];
                _specs[index] = {
                    id: spec.id,
                    name: spec.name,
                    values: []
                };
                const data = this.mergeSkus(_specs);
                this.setState({ specs: _specs, value: data });
                onChange(data);
            }
        } else {
            message.warning("商品型号不能重复");
        }
    }

    // : { input: { value: null } }
    AddSpecInput;
    // : { input: { value: null } }
    AddSpecValueInput;

    // : { id: number }
    renderSpecValuePopoverContent(activeItem, index) {
        const { specList, onChange } = this.props;
        const { specValueIds, specs, addSpecComVisible } = this.state;
        const useModelData = specList.find((value) => {
            return Number(value.id) === Number(activeItem.id);
        });
        if (!useModelData) {
            return null;
        }
        if (!specs) {
            return null;
        }
        let cv = [];
        specs.map((item) => {
            item.values.map((e) => {
                cv.push(e.id);
            });
        });
        const useModelDataValue = useModelData.values.filter((e) => !cv.includes(e.id));
        return (

            <View className={styles.valuesPopoverWarp}>
                {useModelDataValue.length > 0 ? <View className={styles.valuesPopoverTop}>
                    {
                        useModelDataValue.map((tagsItem) => (
                            <View
                                key={tagsItem.id}
                                className={styles.valuesPopoverTopItem}
                            >
                                <Checkbox
                                    checked={specValueIds.includes(tagsItem.id)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            this.setState({ specValueIds: [...specValueIds, tagsItem.id] });
                                        } else {
                                            const _specValueIds = [...specValueIds];
                                            const _index = _specValueIds.findIndex((id) => id === tagsItem.id);
                                            _specValueIds.splice(_index, 1);
                                            this.setState({ specValueIds: _specValueIds });
                                        }
                                    }}
                                >
                                    <Tag
                                        closable
                                        onClose={(e) => {
                                            e.preventDefault();
                                            confirm({
                                                title: "确定要删除吗",
                                                okText: "删除",
                                                okType: "danger",
                                                cancelText: "取消",
                                                onOk: () => {
                                                    this.delSpecValue({ id: tagsItem.id });
                                                }
                                            });
                                        }}
                                    >
                                        {tagsItem.name}
                                    </Tag>
                                </Checkbox>
                            </View>
                        ))
                    }
                </View> : null}
                <View className={styles.valuesPopoverMid}>
                    {
                        addSpecComVisible ?
                            <View className={styles.valuesPopoverMid} style={{ padding: "0" }}>
                                <Input
                                    size={"small"}
                                    placeholder='输入型号'
                                    ref={(e) => {
                                        if (e) {
                                            this.AddSpecInput = e;
                                        }
                                    }}
                                />
                                <Button
                                    type="primary"
                                    size={"small"}
                                    onClick={() => {
                                        const value = this.AddSpecInput.input.value;
                                        if (value) {
                                            this.addSpecValue({
                                                id: activeItem.id,
                                                name: value
                                            });
                                        } else {
                                            message.warn("请输入型号!");
                                        }
                                    }}
                                >添加</Button>
                                <Button
                                    size={"small"}
                                    onClick={() => {
                                        this.setState({ addSpecComVisible: false });
                                    }}
                                >取消</Button>
                            </View> :
                            <a style={{ color: ThemeStyle.themeColor }}
                               onClick={() => this.setState({ addSpecComVisible: true })}>添加型号</a>
                    }
                </View>
                <View className={styles.valuesPopoverBot}>
                    <Button
                        onClick={() => {
                            this.setState({ lastSpecValuesPopoverClick: { index, visible: false } });
                        }}
                    >
                        取消
                    </Button>
                    <Button
                        type='primary'
                        onClick={() => {
                            this.setState({ lastSpecValuesPopoverClick: { index, visible: false } });
                            const _specs = [...specs];
                            const specIndex = specList.findIndex((spec) => spec.id === activeItem.id);
                            let specVaues = [];
                            for (let i = 0; i < specValueIds.length; i++) {
                                let findSpecValue = specList[specIndex].values.find((value) => value.id === specValueIds[i]);
                                if (findSpecValue) {
                                    specVaues.push({
                                        id: findSpecValue.id,
                                        name: findSpecValue.name
                                    });
                                }
                            }
                            _specs[index].values = [...specVaues, ..._specs[index].values];
                            const data = this.mergeSkus(_specs);
                            this.setState({ specValueIds: [], value: data }, () => {
                                onChange(data);
                            });
                        }}
                    >
                        确定
                    </Button>
                </View>
            </View>
        );
    }

    addSpecItemButtom() {
        const { specs } = this.state;
        return (
            <Button
                type="dashed"
                disabled={specs[specs.length - 1].id <= 0}
                onClick={() => {
                    if (specs.length === 3) {
                        message.warning("最多添加3个型号");
                    } else {
                        this.setState({
                            specs: [
                                ...specs,
                                {
                                    id: 0,
                                    name: "",
                                    values: []
                                }
                            ]
                        });
                    }
                }}
                style={{ width: "150px", marginTop: "15px" }}
            >
                <Icon type="plus" /> 添加型号分类
            </Button>
        );


    }

    customSpecModalOk = async () => {
        this.setState({ loading: true });
        const e = await GoodsApi.spec.add({
            name: this.AddSpecValueInput.input.value
        });
        if (e.code === 0) {
            message.success("添加成功");
            this.setState({ loading: false, customSpecSortShow: false });
            this.initGoodsSpecList();

        } else {
            message.error(e.msg);
            this.setState({ loading: false });
        }
    };

    customSpecModalCancel = () => {
        this.setState({ customSpecSortShow: false });
    };

    customSpecModal() {
        return (
            <Modal
                style={{ top: "40%" }}
                visible={this.state.customSpecSortShow}
                title="自定义型号分类"
                onOk={this.customSpecModalOk}
                onCancel={this.customSpecModalCancel}
                footer={[
                    <Button
                        key="back"
                        size="large"
                        onClick={this.customSpecModalCancel}
                    >
                        取消
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        size="large"
                        loading={this.state.loading}
                        onClick={this.customSpecModalOk}
                    >
                        确定
                    </Button>
                ]}
            >
                <p>请输入型号分类名称：</p>
                <Input
                    ref={(e) => {
                        if (e) {
                            this.AddSpecValueInput = e;
                        }
                    }}
                />
            </Modal>
        );
    }

    mergeSkus = (spec) => {
        const _spec = spec.filter((e) => {
            return e.values.length !== 0;
        });
        let skus = [];
        (function _recursive(arr1, arr2, length) {
            if (length === 0) {
                return skus.push({
                    price: null,
                    stock: null,
                    code: null,
                    spec: arr1,
                    weight: null
                });
            } else {
                for (var i = 0; i < arr2[length - 1].values.length; i++) {
                    const spec = arr2[length - 1];
                    const specValue = spec.values[i];
                    const item = {
                        id: spec.id,
                        name: spec.name,
                        value_id: specValue.id,
                        value_name: specValue.name
                    };
                    _recursive([item, ...arr1], arr2, length - 1);
                }
            }
        })([], _spec, _spec.length);
        return skus;
    };

    addSpecValue = async ({ id, name }) => {
        const e = await GoodsApi.specValue.add({
            spec_id: id,
            name
        });
        if (e.code === 0) {
            message.success("添加成功");
            this.initGoodsSpecList();
            this.setState({ addSpecComVisible: false });
        } else {
            message.warn(e.msg);
        }
    };
    delSpecValue = async ({ id }) => {
        const e = await GoodsApi.specValue.del({ id });
        if (e.code === 0) {
            message.success("已删除");
            this.initGoodsSpecList();
        } else {
            message.warn(e.msg);
        }
    };

    static validator = (rule, skus, callback) => {
        // 单产品验证
        if (Array.isArray(skus) && skus.length === 1 && skus[0]["spec"] !== "undefined" && skus[0].spec.length === 1 && skus[0].spec[0].id === 0) {
            if (!skus[0].price) {
                callback("请输入商品价格");
            } else if (!skus[0].stock) {
                callback("请输入商品库存");
            } else {
                callback();
            }
        } else {
            // 多产品验证
            if (Array.isArray(skus)) {
                const index = skus.findIndex((e) => {
                    return !e.price || !e.stock;
                });
                if (index === -1) {
                    callback();
                } else {
                    callback("请完善商品型号价格信息");
                }
            } else {
                callback("请完善商品型号价格信息");
            }

        }
    };

}
