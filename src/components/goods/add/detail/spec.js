import React, { Component } from "react";
import { connect } from "dva";
import { View } from "@/components/flexView";
import styles from "./spec.css";
import { Modal, Input, Select, Button, Icon, Tag, Popover, Checkbox, message } from "antd";
import { ThemeStyle } from "@/utils/style";
import Sku from "./sku";
import GoodsApi from "@/services/goods";

const confirm = Modal.confirm;
const Option = Select.Option;
@connect(({ goodsSpec, loading }) => ({
    specList: goodsSpec.result.list,
    specListLoading: loading.effects["goodsSpec/list"]
}))
export default class GoodsSpec extends Component {
    state = {
        loaded: false,
        customSpecSortShow: false,
        loading: false,
        addSpecComVisible: false,
        specRowRightCloseBtnHoverIndex: -1,
        specValueIds: [],
        tagChecked: false,
        specs: [],
        lastSpecValuesPopoverClick: { index: 0, visible: false }
    };
    static defaultProps = {
        onChange: (e) => {
        }
    };

    componentWillReceiveProps(nextProps) {
        if (this.state.loaded === false && nextProps.skus !== this.props.skus) {
            this.setState({
                loaded: true
            }, () => {
                // 通过skus重组specs，必须存在spec 否则第一条无法被添加
                if (nextProps.skus.length > 0 && nextProps.skus[0].spec.length > 0 && nextProps.skus[0].spec[0]["id"] > 0) {
                    const specs = [];
                    nextProps.skus.map((e) => {
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
                    this.setState({ specs });
                }
            });
        }
    }

    initGoodsSpecList() {
        dispatch({
            type: "goodsSpec/list"
        });
    }

    render() {
        const { skus, specList, reset, onChange, onMultiSpecChange } = this.props;
        const { specRowRightCloseBtnHoverIndex, specs, lastSpecValuesPopoverClick } = this.state;
        // 过滤掉空的sku 存在空的是为了照顾不存在规格的数据结构
        let _skus = skus.filter((sku) => {
            return sku.spec.length > 0 && sku.spec[0]["id"] !== "undefined" && sku.spec[0].id > 0;
        });
        return (
            specs.length === 0 ?
                <Button
                    type="dashed"
                    onClick={() => {
                        this.props.onMultiSpecChange({ multi: true });
                        this.setState({
                            specs: [
                                {
                                    id: 0,
                                    name: "",
                                    values: []
                                }
                            ]
                        });
                    }}
                    style={{ width: "150px" }}
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
                                            {specList.map((item) => (
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
                                                                const data = this.mergeSkus(_specs);
                                                                this.setState({
                                                                    specs: _specs
                                                                }, () => {
                                                                    onChange(data);
                                                                    if (_specs.length === 0) {
                                                                        onMultiSpecChange({ multi: false });
                                                                    }
                                                                    if (data.length === 0) {
                                                                        reset();
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
                                                        onChange(this.mergeSkus(_specs));
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
                        skus.length > 0 ?
                            <View className={styles.buttonWarp}>
                                {this.addSpecItemButtom()}
                            </View> : this.addSpecItemButtom()
                    }
                    {skus.length > 0 && <Sku skus={_skus} specs={specs} onChange={onChange} />}
                    {this.customSpecModal()}
                </View>
        );
    }

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
                this.setState({ specs: _specs });
                onChange(data);
            }
        } else {
            message.warning("商品型号不能重复");
        }
    }

    AddSpecInput: { input: { value: null } };
    AddSpecValueInput: { input: { value: null } };

    renderSpecValuePopoverContent(activeItem: { id: number }, index) {
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
                                    style={{ width: "50%" }}
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
                            this.setState({ specValueIds: [] }, () => {
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
                        this.props.onMultiSpecChange({ multi: true });
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
        })
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

}
