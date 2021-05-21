import React, { Component } from "react";
import { Modal, message } from "antd";
import { SortableContainer, SortableElement, arrayMove } from "react-sortable-hoc";
import styles from "./index.css";

import Banner from "./banner/index";
import Icon from "./icon/index";

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
        data: [],
        index: 0,
        setData: (e) => {
        },
        setIndex: (index) => {
        }
    };
    state = {
        hoverShow: -2,
        items: [],
        actioning: false
    };
    // param: SortEndType, event: EventType
    onSortEnd = (param, event) => {
        const { data, setData, setIndex } = this.props;
        // 防止两次执行
        if (this.state.actioning === false) {
            setData(arrayMove([...data], param.oldIndex, param.newIndex));
            setIndex(param.newIndex);
        }
    };
    onSortStart = (param, event) => {
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
        const { data, setData,setIndex } = this.props;
        const index = parseInt(event.target.dataset.index);
        Modal.confirm({
            title: "确认删除？",
            okText: "确认",
            okType: "danger",
            cancelText: "取消",
            onOk() {
                let _data = data.concat();
                _data.splice(index, 1);
                if (Array.isArray(_data) && _data.length > 0) {
                    setData(_data);
                } else {
                    setData([]);
                }
                setIndex(0)
                message.success("已删除", 1);
            }
        });
    };
    up = (event) => {
        const { data, setData, setIndex } = this.props;
        const index = parseInt(event.target.dataset.index);
        let _data = arrayMove(data, index, index - 1);
        setData(_data);
        setIndex(index - 1);
    };
    down = (event) => {
        const { data, setData, setIndex } = this.props;
        const index = parseInt(event.target.dataset.index);
        let _data = arrayMove(data, index, index + 1);
        setData(_data);
        setIndex(index + 1);
    };

    render() {
        const { hoverShow } = this.state;
        const { data, index } = this.props;
        const rightItems = data.length > 0 ? data.map((item, i) => (
            <div
                key={i}
                className={`${styles.phoneItem} ${index === i ? styles.phoneItemActive : ""}`}
                onMouseEnter={() => {
                    if (i !== index) {
                        this.setState({ hoverShow: i });
                    }
                }}
                onMouseLeave={() => {
                    this.setState({ hoverShow: -2 });
                }}
            >
                {
                    this.returnContain(item, i)
                }
                {
                    (index === i) || (hoverShow === i && hoverShow !== index) ?
                        <div
                            className={styles.operation}
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        >
                            {
                                i > 0 ? <a data-index={i}>上移</a> : null
                            }
                            {
                                i < data.length - 1 ? <a data-index={i}>下移</a> : null
                            }
                            <a data-index={i}>编辑</a>
                            <a data-index={i}>删除</a>
                        </div>
                        : null
                }
            </div>
        )) : [];
        return <SortableList items={rightItems} onSortEnd={this.onSortEnd} onSortStart={this.onSortStart} />;
    }

    returnContain(data, index) {
        const { setData } = this.props;
        switch (data.type) {
            case "banner":
                return <Banner options={data.options} data={data.data} getValues={setData} />;
            case "icon":
                return <Icon options={data.options} data={data.data} getValues={setData} />;
        }
    }
}
