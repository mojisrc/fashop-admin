import * as React from "react";
import { View } from "@/components/flexView";
import styles from "./index.css";
import update from "immutability-helper";
import { SortableContainer, SortableElement, arrayMove } from "react-sortable-hoc";
import NetWorkImage from "@/components/image";
import DeleteOutlined from "@ant-design/icons/DeleteOutlined";
import EyeOutlined from "@ant-design/icons/EyeOutlined";

const { Component } = React;
const SortableItem = SortableElement(({ value }) =>
  <li className={styles.sortableListLi}>{value}</li>
);

const SortableList = SortableContainer(({ items, pressDelay, children }) => {
    return (
      <ul className={styles.sortableList}>
          {items.length > 0 ? items.map((value, index) => (
            <SortableItem key={`item-${index}`} index={index} value={value} disabled={items.length === 1} />
          )) : null}
          <li>{children}</li>
      </ul>
    );
});

export default class ImageGroup extends Component {
    static defaultProps = {
        onChange: (any) => {
        },
        // update: (string, object) => {
        // },
        onPreview: () => {

        },
        addButton: <View />,
        itemStyle: {}
    };
    onSortEnd = (param, event) => {
        const { url, onChange } = this.props;
        let _url = [...url];
        _url = arrayMove(_url, param.oldIndex, param.newIndex);
        onChange(update(url, { $set: _url }));
    };
    onSortStart = (param, event) => {
    };

    removeCard = (index) => {
        const { url, onChange } = this.props;
        onChange(update(url, {
            $splice: [[index, 1]]
        }));
    };

    render() {
        const { url, addButton, onPreview, itemStyle } = this.props;
        const items = url.length > 0 ? url.map((_url, index) => (
          <View
            key={index}
          >
              <div style={itemStyle}>
                  <View className={styles.view2}>
                      <View className={styles.view3}>
                            <span className={styles.span1}>
                                <span>
                                    <a
                                      style={{ marginRight: 10 }}
                                      className={styles.icon1}
                                      onClick={(e) => {
                                          onPreview(_url);
                                      }}
                                    >
                                    <EyeOutlined />
                                </a>
                                <a
                                  className={styles.icon1}
                                  onClick={() => {
                                      this.removeCard(index);
                                  }}
                                >
                                    <DeleteOutlined />
                                </a>
                                </span>
                            </span>
                          <NetWorkImage
                            style={{
                                height: 86,
                                width: 86
                            }}
                            src={_url}
                          />
                      </View>
                  </View>
              </div>
          </View>
        )) : [];
        return (
          <View className={styles.view4}>
              <SortableList items={items} onSortEnd={this.onSortEnd} onSortStart={this.onSortStart} axis={"xy"}>
                  {addButton}
              </SortableList>
          </View>
        );
    }
}

