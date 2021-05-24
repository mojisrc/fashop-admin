import React, { Component } from "react";
import { Tree, Input } from "antd";
import styles from "./folder.less";

const { TreeNode } = Tree;
const Search = Input.Search;
const getParentId = (id, tree) => {
    let parentId;
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i];
        if (node.children) {
            if (node.children.some(item => String(item.id) === String(id))) {
                parentId = `${node.id}`;
            } else if (getParentId(id, node.children)) {
                parentId = getParentId(id, node.children);
            }
        }
    }
    return parentId;
};
export default class Folder extends Component {
    static defaultProps = {
        folderTree: [],
        onSelect: () => {
        },
        treeHeight: 0
    };
    state = {
        expandedKeys: [],
        beforeSearchExpandedKeys: [],
        searchValue: "",
        autoExpandParent: true,
        lastExpandedKey: ""
    };

    componentDidMount() {
        const { folderTree } = this.props;
        this.setState({
            expandedKeys: folderTree.map((item) => `${item.id}`)
        });
    }

    // for set
    expandedKey = (id) => {
        const { expandedKeys } = this.state;
        const { folderTree } = this.props;
        let dataList = [];
        const loop = data =>
          data.map(item => {
              dataList.push({
                  title: item.title,
                  id: `${item.id}`
              });
              if (typeof item["children"] !== "undefined" && !isEmpty(item.children)) {
                  loop(item.children);
              }
          });

        loop(folderTree);

        let _expandedKeys = dataList.map(item => {
            if (`${item.id}` === `${id}`) {
                return getParentId(item.id, folderTree);
            }
            return null;
        }).filter((item, i, self) => item && self.indexOf(item) === i);
        _expandedKeys = [..._expandedKeys, ...expandedKeys];
        this.setState({
            expandedKeys: _expandedKeys,
            autoExpandParent: true,
            lastExpandedKey: id
        });
    };
    onExpand = expandedKeys => {
        this.setState({
            expandedKeys,
            autoExpandParent: false
        });
    };

    onSearch = e => {
        const value = e.target.value;
        const { folderTree } = this.props;
        let dataList = [];
        const loop = data =>
          data.map(item => {
              dataList.push({
                  title: item.title,
                  id: `${item.id}`
              });
              if (typeof item["children"] !== "undefined" && !isEmpty(item.children)) {
                  loop(item.children);
              }
          });

        loop(folderTree);

        let _expandedKeys = dataList.map(item => {
            if (!isEmpty(value) && item.title.indexOf(value) > -1) {
                return getParentId(item.id, folderTree);
            }
            return null;
        });

        _expandedKeys = _expandedKeys.filter((item, i, self) => item && self.indexOf(item) === i);

        this.setState({
            expandedKeys: _expandedKeys,
            searchValue: value,
            autoExpandParent: !isEmpty(value)
        });
    };

    render() {
        const { searchValue, expandedKeys, autoExpandParent, beforeSearchExpandedKeys, lastExpandedKey } = this.state;
        const { folderTree, onSelect, treeHeight } = this.props;
        const loop = data =>
          data.map(item => {
              const index = item.title.indexOf(searchValue);
              const beforeStr = item.title.substr(0, index);
              const afterStr = item.title.substr(index + searchValue.length);
              const title =
                index > -1 ? (
                  <span>
              {beforeStr}
                      <span style={{ color: "#f50" }}>{searchValue}</span>
                      {afterStr}
            </span>
                ) : (
                  <span>{item.title}</span>
                );
              if (item.children) {
                  return (
                    <TreeNode key={item.id} title={title} icon={<span />}>
                        {loop(item.children)}
                    </TreeNode>
                  );
              }
              return <TreeNode key={item.id} title={title} />;
          });
        return (
          <div className={styles.main}>
              <Search
                style={{ marginBottom: 8 }} placeholder="搜索文件夹" onChange={this.onSearch}
                onBlur={() => {
                    if (isEmpty(searchValue)) {
                        this.setState({
                            beforeSearchExpandedKeys: [],
                            expandedKeys: beforeSearchExpandedKeys
                        });
                    }
                }}
                onFocus={() => {
                    this.setState({
                        beforeSearchExpandedKeys: beforeSearchExpandedKeys.length > 0 ? beforeSearchExpandedKeys : expandedKeys
                    });
                }}
              />
              {folderTree && <Tree
                className="hide-file-icon"
                showLine
                onExpand={this.onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                onSelect={(e) => {
                    this.setState({
                        lastExpandedKey: ""
                    });
                    onSelect(e);
                }}
                filterTreeNode={(node) => {
                    return node.props.eventKey === `${lastExpandedKey}`;
                }}
                height={treeHeight}
              >
                  {loop(folderTree)}
              </Tree>}
          </div>
        );
    }

}
