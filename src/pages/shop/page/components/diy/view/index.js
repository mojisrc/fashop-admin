import React, { Component } from "react";
import { Modal, message } from "antd";
import { SortableContainer, SortableElement, arrayMove } from "react-sortable-hoc";
import Goods from "./goods/index";
import GoodsList from "./goodsList/index";
import GoodsSearch from "./goodsSearch/index";
import Separator from "./separator/index";
import ImageAds from "./imageAds/index";
import ImageGallery from "./imageGallery/index";
import ImageNav from "./imageNav/index";
import ShopWindow from "./shopWindow/index";
import Video from "./video/index";
import TopMenu from "./topMenu/index";
import Title from "./title/index";
import TextNav from "./textNav/index";
import AuxiliaryBlank from "./auxiliaryBlank/index";
import Coupon from "./coupon/index";
import styles from "./index.css";
import Scrollbar from "react-scrollbars-custom";
import GoodsRelation from "./goodsRelation";
import GoodsGuessLike from "./goodsGuessLike";
import EditOutlined from "@ant-design/icons/EditOutlined";

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

    static defaultProps = {
        // 关闭编辑
        disabled: false,
        showViewSaveBtn: true,
        options: {},
        body: [],
        backgroundColor: "#f8f8f8",
        onViewItemClick: () => {
        },
        onHeaderClick: () => {
        },
        setPage: () => {
        },
        style: {},
        empty: <div />,
        toolListData: []
    };

    state = {
        hoverShow: -2,
        items: [],
        actioning: false
    };

    componentDidMount() {

    }

    // param: SortEndType, event: EventType
    onSortEnd = (param, event) => {
        if (this.props.disabled) return;
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
        if (this.props.disabled) return;
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
        const { body, setPage, toolListData } = this.props;
        const index = parseInt(event.target.dataset.index);
        const type = body[index].type;
        let _toolNameList = {};
        toolListData.map((module) => {
            module.list.map((item) => {
                _toolNameList[item.type] = item.title;
            });

        });
        Modal.confirm({
            title: "确认删除？",
            content: `当前删除为：${_toolNameList[type]}`,
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
        const { body, options, onHeaderClick, backgroundColor, children, showViewSaveBtn, style, empty } = this.props;

        const items = Array.isArray(body) && body.length > 0 ? body.map((item, index) => (
          <div
            key={index}
            className={`${styles.phoneItem} ${options.index === index ? styles.phoneItemActive : ""} ${this.props.disabled ? "disabled" : ""}`}
            onMouseEnter={() => {
                if (this.props.disabled) return;
                if (index !== options.index) {
                    this.setState({ hoverShow: index });
                }
            }}
            onMouseLeave={() => {
                if (this.props.disabled) return;
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
          <div className={styles.dragPhoneWarp} style={style}>
              {showViewSaveBtn && <div className={styles.dragPhoneHeader}>
                  <div onClick={onHeaderClick}>
                      <EditOutlined /><a style={{ marginLeft: 15 }}>编辑页面基本信息</a>
                  </div>
                  {children}
              </div>}
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
                      {!Array.isArray(body) || body.length === 0 ? empty :
                        <SortableList items={items} onSortEnd={this.onSortEnd} onSortStart={this.onSortStart} />}
                  </div>

              </Scrollbar>
          </div>
        );
    }

    returnContain(item, index) {
        // TODO 单独一个文件引入 类似router的懒加载 不要手动写这些
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
            case "image_gallery":
                return <ImageGallery options={options} data={data} />;
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
            case "coupon":
                return <Coupon options={options} data={data} />;
            case "goods_relation":
                return <GoodsRelation options={options} data={data} />;
            case "goods_guess_like":
                return <GoodsGuessLike options={options} data={data} />;
            default:
        }
    }
}
