import { Icon } from '@ant-design/compatible';
import React, { Component } from "react";
import { Divider } from "antd";
import styles from "./index.css";
import Scrollbar from "react-scrollbars-custom";
import LeftView from "./left";
import RightView from "./right";
import SelectBrand from "../tool/selectBrand/index";
import { connect } from "umi";
import Arr from "@/utils/array";

@connect(({ goodsCategory, loading }) => ({
    goodsCategoryList: goodsCategory.list.result,
    goodsCategoryListLoading: loading.effects["goodsCategory/list"]
}))
export default class PageView extends Component {
    static defaultProps = {
        data: [],
        setData: (e) => {
        },
        leftIndex: 0,
        rightIndex: 0
    };


    render() {
        const { onHeaderClick, children, setData, data, leftIndex, rightIndex, setLeftIndex, setRightIndex, dispatch } = this.props;
        return (
            <div className={styles.dragPhoneWarp}>
                <div className={styles.dragPhoneHeader}>
                    <div onClick={onHeaderClick}>
                        <Icon type="edit" /> <a
                        onClick={() => {

                        }}
                    >设置页面信息</a>
                    </div>
                    {children}
                </div>
                <div className={styles.phoneTool}>
                    <a
                        onClick={() => {
                            let _data = [...data];
                            _data.push({
                                title: "请输入",
                                children: []
                            });
                            setData(_data);
                            setLeftIndex(_data.length - 1);
                        }}
                    >添加一组</a>
                    <Divider type="vertical" />
                    <a
                        onClick={() => {
                            this.selectBrand.show();
                        }}
                    >+品牌</a>
                    <Divider type="vertical" />
                    <a
                        onClick={() => {
                            dispatch({
                                type: "goodsCategory/list",
                                payload: {
                                    page: 1,
                                    rows: 10000
                                },
                                callback: (response) => {
                                    if (response.result.list.length > 0) {
                                        let _data = [...data];
                                        let categoryTree = Arr.toTree(response.result.list);
                                        categoryTree.map((item) => {
                                            _data.push({
                                                title: item.name,
                                                children: typeof item["children"] !== "undefined" ? item.children.map((sub) => {
                                                    return {
                                                        type: "icon",
                                                        options: {
                                                            title: sub.name
                                                        },
                                                        data: typeof sub["children"] !== "undefined" ? sub.children.map((titem) => {
                                                            return {
                                                                title: titem.name,
                                                                img: {
                                                                    url: titem.icon
                                                                },
                                                                link: {
                                                                    action: "goods_category",
                                                                    param: {
                                                                        id: titem.id
                                                                    }
                                                                }
                                                            };
                                                        }) : []
                                                    };
                                                }) : []
                                            });
                                        });
                                        setData(_data);
                                        setLeftIndex(_data.length - 1);
                                    }
                                }
                            });

                        }}
                    >
                        +全部分类
                    </a>
                    <SelectBrand
                        ref={(e) => {
                            this.selectBrand = e;
                        }}
                        multiSelect={true}
                        onOk={(state) => {
                            if (state.checkedData.length > 0) {
                                let _data = [...data];
                                _data.push({
                                    title: "所有品牌",
                                    children: [
                                        {
                                            type: "icon",
                                            options: {
                                                title: null
                                            },
                                            data: state.checkedData.map((item) => {
                                                return {
                                                    title: item.title,
                                                    img: {
                                                        url: item.logo
                                                    },
                                                    link: {
                                                        action: "brand",
                                                        param: {
                                                            id: item.id
                                                        }
                                                    }
                                                };
                                            })
                                        }

                                    ]
                                });
                                setData(_data);
                                setLeftIndex(_data.length - 1);
                            }

                        }}
                    />
                </div>
                <Scrollbar style={{ width: "100%", height: "100%", minHeight: 600 }} noScrollX={true}
                           wrapperRenderer={
                               props => {
                                   const { elementRef, ...restProps } = props;
                                   return <div
                                       {...restProps}
                                       className="pageDiyViewScrollWrapper"
                                       ref={elementRef}
                                   />;
                               }
                           }
                >

                    <div className={styles.phoneMain}>
                        <div
                            className={styles.dragPhoneContainLeft}
                        >
                            <LeftView
                                data={data}
                                setData={(e) => setData(e)}
                                index={leftIndex}
                                setIndex={setLeftIndex}

                            />
                        </div>
                        <div
                            className={styles.dragPhoneContainRight}
                        >
                            {typeof data[leftIndex] !== "undefined" && typeof data[leftIndex]["children"] !== "undefined" ?
                                <RightView
                                    data={data.length > 0 ? data[leftIndex].children : []}
                                    setData={(itemData) => {
                                        let _data = [...data];
                                        _data[leftIndex]["children"] = itemData;
                                        setData(_data);
                                    }}
                                    index={rightIndex}
                                    setIndex={setRightIndex}
                                /> : null}
                        </div>
                    </div>
                </Scrollbar>
            </div>
        );
    }
}

