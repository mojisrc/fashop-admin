import React, { Component, Fragment } from "react";
import { Button, Card, message, Modal, Checkbox, Empty, Skeleton } from "antd";
import styles from "./index.less";
import PageHeaderWrapper from "@/components/pageHeaderWrapper";
import { connect } from "umi";
import Arr from "@/utils/array";
import Folder from "./components/folder";
import UploadDragger from "./components/upload";
import FolderAdd from "./components/add";
import FolderItem from "./components/folder/item";
import FolderImage from "./components/folder/image";
import FolderChange from "./components/change";
import { isEmpty } from "@/utils";

const ButtonGroup = Button.Group;

@connect(({ image, loading }) => ({
    imageList: image.list.result,
    imageListLoading: loading.effects["image/list"],
    folderList: image.folderList.result,
    folderListLoading: loading.effects["image/folderList"],
    folderInfo: image.folderInfo.result.info,
    folderInfoLoading: loading.effects["image/folderInfo"]
}), null, null, {
    forwardRef: true
})
export default class ImageSpacePage extends Component {
    static defaultProps = {
        imageList: {
            list: [],
            total_number: 0
        },
        folderInfo: {
            image: [],
            folder: []
        },
        // --------------- 外部参数 ---------
        // 是否显示子文件夹
        showSubFolder: true,
        // 批量操作
        batch: true,
        // 是否多选
        multi: true,
        height: "auto",
        inModal: false
    };
    state = {
        page: 1,
        rows: 20,
        current_folder_id: 0,
        current_folder: {},
        imagesCheckedIds: [],
        folderCheckedIds: []
    };

    componentDidMount() {
        const { folderList } = this.props;
        const { list } = folderList;
        const folderTree = Arr.toTree(folderList.list);
        this.setState({ folderTree });
        if (list.length === 0) {
            this.init();
        }
    }

    init = () => {
        const { dispatch } = this.props;
        const { current_folder_id } = this.state;
        dispatch({
            type: "image/folderList",
            callback: (response) => {
                const folderTree = Arr.toTree(response.result.list);
                this.setState({
                    folderTree
                }, () => {
                    if (!isEmpty(folderTree)) {
                        const _current_folder_id = folderTree[0].id;
                        this.initFolderInfo(current_folder_id === 0 ? _current_folder_id : current_folder_id);
                    }
                });
            }
        });
    };
    initFolderInfo = (id) => {
        const { dispatch } = this.props;
        const { current_folder_id, imagesCheckedIds, folderCheckedIds } = this.state;
        dispatch({
            type: "image/folderInfo",
            payload: { id },
            callback: (e) => {
                if (e.code === 0) {
                    let _state = {
                        current_folder_id: id,
                        current_folder: {
                            id: e.result.info.id,
                            title: e.result.info.title,
                            pid: e.result.info.pid
                        }
                    };
                    if (id !== current_folder_id) {
                        _state["imagesCheckedIds"] = [];
                        _state["folderCheckedIds"] = [];
                    } else {
                        // 剔除已经更新的 ImagesCheckedIds
                        let folderIds = e.result.info.folder.map((item) => item.id);
                        let imageIds = e.result.info.image.map((item) => item.id);
                        let _imagesCheckedIds = [];
                        let _folderCheckedIds = [];
                        imagesCheckedIds.map((id) => {
                            if (Arr.inArray(id, imageIds)) {
                                _imagesCheckedIds.push(id);
                            }
                        });
                        folderCheckedIds.map((id) => {
                            if (Arr.inArray(id, folderIds)) {
                                _folderCheckedIds.push(id);
                            }
                        });
                        _state["imagesCheckedIds"] = _imagesCheckedIds;
                        _state["folderCheckedIds"] = _folderCheckedIds;
                    }
                    this.setState(_state);
                }
            }
        });
    };
    clearChecked = () => {
        this.setState({
            imagesCheckedIds: [],
            folderCheckedIds: []
        });
    };
    toggleImagesCheckedIds = (id) => {
        const { multi } = this.props;
        if (multi === true) {
            // 多选
            const { imagesCheckedIds } = this.state;
            let _imagesCheckedIds = [...imagesCheckedIds];
            if (Arr.inArray(id, imagesCheckedIds)) {
                _imagesCheckedIds = Arr.toggle(id, imagesCheckedIds);
            } else {
                _imagesCheckedIds.push(id);
            }
            this.setState({
                imagesCheckedIds: _imagesCheckedIds
            });
        } else {
            // 单选
            const { imagesCheckedIds } = this.state;
            let _imagesCheckedIds = [...imagesCheckedIds];
            if (Arr.inArray(id, imagesCheckedIds)) {
                _imagesCheckedIds = [];
            } else {
                _imagesCheckedIds = [id];
            }
            this.setState({
                imagesCheckedIds: _imagesCheckedIds
            });
        }

    };
    toggleFolderCheckedIds = (id) => {
        const { folderCheckedIds } = this.state;
        let _folderCheckedIds = [...folderCheckedIds];
        if (Arr.inArray(id, folderCheckedIds)) {
            _folderCheckedIds = Arr.toggle(id, folderCheckedIds);
        } else {
            _folderCheckedIds.push(id);
        }
        this.setState({
            folderCheckedIds: _folderCheckedIds
        });
    };

    toggleCheckAll = (e) => {
        const { folderInfo } = this.props;
        if (e.target.checked) {
            this.setState({
                imagesCheckedIds: folderInfo.image.map((item) => item.id),
                folderCheckedIds: folderInfo.folder.map((item) => item.id)
            });
        } else {
            this.setState({
                imagesCheckedIds: [],
                folderCheckedIds: []
            });
        }
    };

    onMutiDel = () => {
        const { imagesCheckedIds, folderCheckedIds, current_folder_id } = this.state;
        const { dispatch } = this.props;
        Modal.confirm({
            title: "确定删除该吗文件夹/文件吗？",
            okText: "确认",
            okType: "danger",
            cancelText: "取消",
            onOk: () => {
                if (imagesCheckedIds.length > 0) {
                    dispatch({
                        type: "image/del",
                        payload: {
                            ids: imagesCheckedIds
                        },
                        callback: () => {
                            this.initFolderInfo(current_folder_id);
                        }
                    });
                }
                if (folderCheckedIds.length > 0) {
                    dispatch({
                        type: "image/folderDel",
                        payload: {
                            ids: folderCheckedIds
                        },
                        callback: () => {
                            this.initFolderInfo();
                        }
                    });
                }
            }
        });
    };
    onMutiMove = () => {
        const { imagesCheckedIds, folderCheckedIds, current_folder_id } = this.state;
        this.folderChange.show({
            pid: current_folder_id,
            imageIds: imagesCheckedIds,
            folderIds: folderCheckedIds
        });
    };

    onFolderChangeClose = () => {
        this.init();
        this.folderChange.close();
    };


    getImagesCheckedList = () => {
        const { folderInfo } = this.props;
        const { imagesCheckedIds } = this.state;
        let checkedList = [];
        folderInfo.image.map((item) => {
            if (Arr.inArray(item.id, imagesCheckedIds)) {
                checkedList.push(item);
            }
        });
        return checkedList;
    };

    render() {
        const { folderTree, current_folder_id, imagesCheckedIds, folderCheckedIds } = this.state;
        const { folderInfo, dispatch, showSubFolder, batch, multi, inModal, height } = this.props;
        const { image } = folderInfo || {};
        const imageLength = Array.isArray(image) ? image.length : 0;
        const warpHeight = 48 + 40 + 15;
        return (
          <PageHeaderWrapper hiddenBreadcrumb={true} policy={"imagefolder/add"}>
              <Card bordered={false} className={inModal ? styles.inModal : styles.card}>
                  <div className={styles.main}>
                      <div className={styles.left}>
                          {folderTree ? <Folder
                            ref={e => this.folder = e}
                            folderTree={folderTree}
                            onSelect={(e) => {
                                if (e.length > 0 && parseInt(e[0]) !== current_folder_id) {
                                    this.initFolderInfo(parseInt(e[0]));
                                }
                            }}
                            treeHeight={height > 0 ? height - 40 : window.innerHeight - warpHeight}
                          /> : <div style={{ padding: 15 }}>
                              <Skeleton active title={false} />
                              <Skeleton active title={false} />
                              <Skeleton active title={false} />
                              <Skeleton active title={false} />
                              <Skeleton active title={false} />
                              <Skeleton active title={false} />
                              <Skeleton active title={false} />
                              <Skeleton active title={false} />
                              <Skeleton active title={false} />
                              <Skeleton active title={false} />
                              <Skeleton active title={false} />
                          </div>
                          }
                      </div>
                      <div className={styles.right}>
                          {this.getBreadCrumbs()}
                          <div style={{ marginBottom: 15 }}>
                              <Button
                                onClick={() => {
                                    this.UploadDragger.show();
                                }}
                                style={{ marginRight: 10 }}
                              >上传</Button>
                              <Button
                                onClick={() => {
                                    this.folderAdd.show({ pid: current_folder_id });
                                }}
                              >新建文件夹</Button>
                          </div>
                          {batch && multi && <div style={{ marginBottom: 15 }}>
                              <Checkbox
                                onChange={(e) => {
                                    this.toggleCheckAll(e);
                                }}
                              >全选</Checkbox>
                              {!isEmpty(folderCheckedIds) || !isEmpty(imagesCheckedIds) ? <ButtonGroup>
                                  <Button size={"small"}
                                          onClick={() => {
                                              this.onMutiDel();
                                          }}
                                  >删除</Button>
                                  <Button size={"small"}
                                          onClick={() => {
                                              this.onMutiMove();
                                          }}
                                  >移动到</Button>
                              </ButtonGroup> : null}
                          </div>}
                          <UploadDragger
                            folder_id={current_folder_id}
                            ref={e => this.UploadDragger = e}
                            onClose={(fileList) => {
                                if (fileList.length > 0) {
                                    this.initFolderInfo(current_folder_id);
                                }
                            }}
                          />
                          <div
                            className={styles.folderImageWarp}
                            style={height > 0 ? {
                                height: height - 85
                            } : { height: window.innerHeight - warpHeight - 85 }}>
                              {showSubFolder && <div className={styles.imageList}>
                                  {folderInfo.folder && folderInfo.folder.map((item, index) => {
                                      return <FolderItem
                                        checked={Arr.inArray(item.id, folderCheckedIds)}
                                        key={index}
                                        name={item.title}
                                        onChecked={() => {
                                            this.toggleFolderCheckedIds(item.id);
                                        }}
                                        onNameInputBlur={(value) => {
                                            if (value && value !== item.title) {
                                                dispatch({
                                                    type: "image/folderEdit",
                                                    payload: {
                                                        id: item.id,
                                                        title: value
                                                    },
                                                    callback: (e) => {
                                                        if (e.code === 0) {
                                                            this.initFolderInfo(current_folder_id);
                                                        } else {
                                                            message.error(e.msg);
                                                        }
                                                    }
                                                });
                                            }
                                        }}
                                        onImageDoubleClick={() => {
                                            this.folder.expandedKey(item.id);
                                            if (item.id !== current_folder_id) {
                                                this.initFolderInfo(item.id);
                                            }
                                        }}
                                      />;
                                  })}
                              </div>}
                              <div className={styles.imageList}>
                                  {imageLength > 0 && folderInfo.image.map((item, index) => {
                                      return <FolderImage
                                        checked={Arr.inArray(item.id, imagesCheckedIds)}
                                        key={index}
                                        url={item.url}
                                        name={item.name}
                                        onChecked={() => {
                                            this.toggleImagesCheckedIds(item.id);
                                        }}
                                        onDel={() => {
                                            Modal.confirm({
                                                title: "确定删除该图片吗？",
                                                okText: "确认",
                                                okType: "danger",
                                                cancelText: "取消",
                                                onOk: () => {
                                                    dispatch({
                                                        type: "image/del",
                                                        payload: {
                                                            ids: [item.id]
                                                        },
                                                        callback: (e) => {
                                                            if (e.code === 0) {
                                                                this.initFolderInfo(current_folder_id);
                                                            } else {
                                                                message.error(e.msg);
                                                            }
                                                        }
                                                    });
                                                }
                                            });
                                        }}
                                        onNameInputBlur={(value) => {
                                            if (value && value !== item.name) {
                                                dispatch({
                                                    type: "image/edit",
                                                    payload: {
                                                        id: item.id,
                                                        name: value
                                                    },
                                                    callback: (e) => {
                                                        if (e.code === 0) {
                                                            this.initFolderInfo(current_folder_id);
                                                        } else {
                                                            message.error(e.msg);
                                                        }
                                                    }
                                                });
                                            }
                                        }}
                                      />;
                                  })}
                              </div>
                          </div>
                          {showSubFolder && folderInfo && folderInfo.folder && folderInfo.folder.length === 0 && imageLength === 0 &&
                          <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            style={{
                                margin: "150px 0"
                            }}
                            imageStyle={{
                                height: 60
                            }}
                          />}
                      </div>
                  </div>
              </Card>
              <FolderAdd
                wrappedComponentRef={(form) => this.folderAdd = form}
                onSubmit={() => {
                    this.folderAdd.close();
                    this.init();
                }}
              />
              <FolderChange
                wrappedComponentRef={(form) => this.folderChange = form}
                onSubmit={() => {
                    this.onFolderChangeClose();
                }}
              />
          </PageHeaderWrapper>
        );
    }

    getBreadCrumbs = () => {
        const { current_folder_id, folderTree, current_folder } = this.state;
        let breadCrumbs = [];
        let dataList = [];
        const loop = data =>
          data.map(item => {
              dataList.push({
                  id: item.id,
                  title: item.title,
                  pid: item.pid
              });
              if (typeof item["children"] !== "undefined" && !isEmpty(item.children)) {
                  loop(item.children);
              }
          });

        !isEmpty(folderTree) && loop(folderTree);

        const getParent = (current) => {
            breadCrumbs.unshift({
                id: current.id,
                title: current.title,
                pid: current.pid
            });
            dataList.map(item => {
                if (item.id === current.pid) {
                    getParent(item);
                }
            });
        };

        current_folder_id > 0 && getParent(current_folder);

        return <div style={{ marginBottom: 15 }}>
            {breadCrumbs.map((item, index) => {
                if (index + 1 === breadCrumbs.length) {
                    return <span key={index}>{item.title}</span>;
                } else {
                    return <Fragment key={index}><a key={index} onClick={() => {
                        this.initFolderInfo(item.id);
                    }}>{item.title}</a><span>  /  </span></Fragment>;
                }

            })}
        </div>;
    };
}
