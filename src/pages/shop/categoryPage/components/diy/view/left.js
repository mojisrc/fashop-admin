import React, { Component } from "react";
import { Modal, message } from "antd";
import { SortableContainer, SortableElement, arrayMove } from "react-sortable-hoc";
import styles from "./index.css";

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

export default class LeftView extends Component {
    static defaultProps = {
        data: [],
        index: 0,
        setData: (data)=>{},
        setIndex: (index)=>{},
    };
    state = {
        hoverShow: -2,
        items: [],
        actioning: false
    };
    // param: SortEndType, event: EventType
    onSortEnd = (param, event) => {
        // 防止两次执行
        if (this.state.actioning === false) {
            const { data, setData ,setIndex} = this.props;
            setData(arrayMove([...data], param.oldIndex, param.newIndex));
            setIndex(param.newIndex)
        }
    };
    onSortStart = (param, event) => {
        const text = event.target.innerHTML;
        if (text === "X" || text === "上移" || text === "下移") {
            this.setState({
                actioning: true
            }, () => {
                switch (text) {
                    case "X":
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
        setIndex(index)
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
                    setData([])
                }
                setIndex(0)
                message.success("已删除", 1);
            }
        });
    };
    up = (event) => {
        const { data, setData ,setIndex} = this.props;
        const index = parseInt(event.target.dataset.index);
        let _data = arrayMove(data, index, index - 1);
        setData(_data);
        setIndex(index)
    };
    down = (event) => {
        const { data, setData,setIndex } = this.props;
        const index = parseInt(event.target.dataset.index);
        let _data = arrayMove(data, index, index + 1);
        setData(_data)
        setIndex(index);
    };

    render() {
        const { hoverShow } = this.state;
        const { data, index  } = this.props;

        const leftItems = data.length > 0 ? data.map((item, i) => (
            <div
                key={i}
                className={`${styles.phoneItem} ${styles.leftItem} ${index === i ? styles.phoneItemActive : ""}`}
                onMouseEnter={() => {
                    if (i !== index) {
                        this.setState({ hoverShow: i });
                    }
                }}
                onMouseLeave={() => {
                    this.setState({ hoverShow: -2 });
                }}
            >
                <div>
                    {item.title}
                </div>
                {
                    (index === i) || (hoverShow === i && hoverShow !== index) ?
                        <div
                            className={styles.operation}
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        >
                            <a data-index={i} style={{width:'auto',padding:"0 5px"}}>X</a>
                        </div>
                        : null
                }
            </div>
        )) : [];

        return <SortableList items={leftItems} onSortEnd={this.onSortEnd} onSortStart={this.onSortStart} />
    }

}
