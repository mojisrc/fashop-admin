import React, { Component } from "react";
import { Modal, message, Icon } from "antd";
import { SortableContainer, SortableElement, arrayMove } from "react-sortable-hoc";
import Goods from "./goods";
import GoodsList from "./goodsList";
import GoodsSearch from "./goodsSearch";
import Separator from "./separator";
import ImageAds from "./imageAds";
import ImageNav from "./imageNav";
import ShopWindow from "./shopWindow";
import Video from "./video";
import TopMenu from "./topMenu";
import Title from "./title";
import TextNav from "./textNav";
import AuxiliaryBlank from "./auxiliaryBlank";
import GoodsGroup from "./goodsGroup";
import styles from "./index.css";
import Scrollbar from "react-scrollbars-custom";

const SortableItem = SortableElement(({ value }) =>
    <li className={styles.sortableListLi}>{value}</li>
);
const SortableList = SortableContainer(({ items, pressDelay }) => {
    return (
        <ul className={styles.sortableList}>
            {items.length > 0 ? items.map((value, index) => (
                <SortableItem key={`item-${index}`} index={index} value={value} />
            )) : null}
        </ul>
    );
});

export default class PageView extends Component {
    state = {
        hoverShow: -2,
        items: [],
        actioning: false
    };
    // param: SortEndType, event: EventType
    onSortEnd = (param, event) => {
        // 防止两次执行
        if (this.state.actioning === false) {
            const { body, setPage } = this.props;
            let _body = [...body];
            _body = arrayMove(_body, param.oldIndex, param.newIndex);
            let type = body[param.oldIndex].type;
            setPage({
                options: {
                    type: type,
                    index: param.newIndex
                },
                body: _body
            });
        }
    };
    onSortStart = (param, event) => {
        this.props.onViewItemClick();
        const text = event.target.innerHTML;
        if (text === "删除" || text === "上移" || text === "下移") {
            this.setState({
                actioning: true
            }, () => {
                switch (text) {
                    case "删除":
                        this.delete(event);
                        break;
                    case "上移":
                        this.up(event);
                        break;
                    case "下移":
                        this.down(event);
                        break;
                    default:
                        break;
                }
            });
        } else {
            this.setState({
                actioning: false
            });
        }
    };
    delete = (event) => {
        const { body, setPage } = this.props;
        const index = parseInt(event.target.dataset.index);
        const type = body[index].type;
        let title = "";
        switch (type) {
            case "goods":
                title = "商品";
                break;
            case "goods_list":
                title = "商品列表";
                break;
            case "goods_search":
                title = "商品搜索";
                break;
            case "separator":
                title = "分割线";
                break;
            case "auxiliary_blank":
                title = "辅助空白";
                break;
            case "image_ads":
                title = "图片广告";
                break;
            case "image_nav":
                title = "图片导航";
                break;
            case "shop_window":
                title = "橱窗";
                break;
            case "video":
                title = "视频";
                break;
            case "top_menu":
                title = "顶部菜单";
                break;
            case "title":
                title = "标题";
                break;
            case "text_nav":
                title = "文本导航";
                break;
            case "goods_group":
                title = "拼团";
                break;
        }
        Modal.confirm({
            title: "确认删除？",
            content: `当前删除为：${title}`,
            okText: "确认",
            okType: "danger",
            cancelText: "取消",
            onOk() {
                let _body = body.concat();
                _body.splice(index, 1);
                if (Array.isArray(_body) && _body.length > 0) {
                    setPage({
                        options: {
                            type: _body[0]["type"] ? _body[0]["type"] : null,
                            index: 0
                        },
                        body: _body
                    });
                } else {
                    setPage({
                        options: {
                            type: null,
                            index: 0
                        },
                        body: []
                    });
                }
                message.success("已删除", 1);
            }
        });
    };
    up = (event) => {
        const { body, setPage } = this.props;
        const index = parseInt(event.target.dataset.index);
        const item = body[index];
        let _body = arrayMove(body, index, index - 1);
        setPage({
            options: {
                type: item.type,
                index: index - 1
            },
            body: _body
        });
    };
    down = (event) => {
        const { body, setPage } = this.props;
        const index = parseInt(event.target.dataset.index);
        const item = body[index];
        let _body = arrayMove(body, index, index + 1);
        setPage({
            options: {
                type: item.type,
                index: index + 1
            },
            body: _body
        });
    };

    render() {
        const { hoverShow } = this.state;
        const { body, options, onHeaderClick, backgroundColor, children } = this.props;

        const items = body.length > 0 ? body.map((item, index) => (
            <div
                key={index}
                className={`${styles.phoneItem} ${options.index === index ? styles.phoneItemActive : ''}`}
                onMouseEnter={() => {
                    if (index !== options.index) {
                        this.setState({ hoverShow: index });
                    }
                }}
                onMouseLeave={() => {
                    this.setState({ hoverShow: -2 });
                }}
            >
                {
                    this.returnContain({ type: item.type, title: item.title }, index)
                }
                {
                    (options.index === index) || (hoverShow === index && hoverShow !== options.index) ?
                        <div
                            className={styles.operation}
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        >
                            {
                                index > 0 ? <a data-index={index}>上移</a> : null
                            }
                            {
                                index < body.length - 1 ? <a data-index={index}>下移</a> : null
                            }
                            <a data-index={index}>编辑</a>
                            <a data-index={index}>删除</a>
                        </div>
                        : null
                }
            </div>
        )) : [];
        return (
            <div className={styles.dragPhoneWarp}>
                <div className={styles.dragPhoneHeader}>
                    <div onClick={onHeaderClick}>
                        <Icon type="edit" /><a href="javascript:void(0)" style={{ marginLeft: 15 }}>编辑页面基本信息</a>
                    </div>
                    {children}
                </div>
                <Scrollbar style={{ width: "100%", height: "100%", minHeight: 600 }} noScrollX={true}
                           wrapperRenderer={
                               props => {
                                   const { elementRef, ...restProps } = props;
                                   return <div {...restProps}
                                                className="pageDiyViewScrollWrapper"
                                                ref={elementRef} />;
                               }
                           }
                >
                    <div
                        className={styles.dragPhoneContain}
                        style={backgroundColor ? { backgroundColor } : { backgroundColor: "#FFFFFF" }}
                    >
                        <SortableList items={items} onSortEnd={this.onSortEnd} onSortStart={this.onSortStart} />
                    </div>
                </Scrollbar>
            </div>
        );
    }

// : { typ, title }
    returnContain(item, index) {
        const { body } = this.props;
        const { options, data } = body[index];
        switch (item.type) {
            case "goods":
                return <Goods options={options} data={data} />;
            case "goods_list":
                return <GoodsList options={options} data={data} />;
            case "goods_search":
                return <GoodsSearch options={options} data={data} />;
            case "separator":
                return <Separator options={options} data={data} />;
            case "auxiliary_blank":
                return <AuxiliaryBlank options={options} data={data} />;
            case "image_ads":
                return <ImageAds options={options} data={data} />;
            case "image_nav":
                return <ImageNav options={options} data={data} />;
            case "shop_window":
                return <ShopWindow options={options} data={data} />;
            case "video":
                return <Video options={options} data={data} />;
            case "top_menu":
                return <TopMenu options={options} data={data} />;
            case "title":
                return <Title options={options} data={data} />;
            case "text_nav":
                return <TextNav options={options} data={data} />;
            case "goods_group":
                return <GoodsGroup options={options} data={data} />;
            default:

        }
    }
}
