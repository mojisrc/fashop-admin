import React, { Component } from "react";
import { Button, Card, Spin, message } from "antd";
import Draggable, { DraggableCore } from "react-draggable";
import Resizable from "re-resizable";
import styles from "@/pages/setting/poster/groupGoods.css";

class BaseController extends Component {
    state = {
        index: 0,
        body: this.getDefaultBody()
    };
    key = null;
    static defaultProps = {
        settingInfoLoading: false
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: "setting/info",
            payload: {
                key: this.key
            },
            callback: (response) => {
                if (response.code === 0) {
                    if (response.result.info.config) {
                        this.setState({
                            body: response.result.info.config.body
                        });
                    }
                } else {
                    message.warning(response.msg);
                }
            }
        });
    }

    onSumit() {
        const { body } = this.state;
        const { dispatch } = this.props;
        dispatch({
            type: "setting/edit",
            payload: {
                key: this.key,
                config: {
                    body
                },
                status: 1
            },
            callback: (response) => {
                if (response.code === 0) {
                    message.success("修改成功");
                } else {
                    message.warn(response.msg);
                }
            }
        });
    }

    styles = {};
    setStyles = (styles) => {
        this.styles = styles;
    };
    onReposition = (x, y, index) => {
        let _body = [...this.state.body];
        _body[index].options.position = {
            x,
            y
        };
        this.setState({
            body: _body
        });
    };
    onResize = (d, index) => {
        let _body = [...this.state.body];
        let lastSize = _body[index].options.size;
        const width = lastSize.width + d.width;
        _body[index].options.size = {
            width,
            height: lastSize.height + d.height
        };
        this.setState({
            body: _body
        });
    };

    getTypeBody(type) {
        return {
            _index: this.state.body.findIndex(value => value.type === type),
            _data: this.state.body.find(value => value.type === type)
        };
    }

    // 外部实现
    getDefaultBody() {
    }

    // 外部实现
    initFormatBody() {
    }

    resetDataSource() {
        this.setState({ body: this.getDefaultBody() });
    }

    getIndexTabKey() {
        return this.state.body[this.state.index].type;
    }

    getButtonArea() {
        const styles = this.styles;
        return <div className={styles.btnArea}>
            <Button type="dashed" onClick={() => {
                this.resetDataSource();
            }}>恢复默认</Button>
            <Button type="primary" onClick={() => {
                this.onSumit();
            }}>保存</Button>
        </div>;
    }

    getDraggableItem(item, i) {
        const { index } = this.state;
        const styles = this.styles;
        return <Draggable
            key={`k${i}`}
            bounds="parent"
            axis="both"
            handle='.handle'
            position={item.options.position}
            grid={[1, 1]}
            onStart={() => {
                this.setState({
                    index: i
                });
            }}
            onStop={(e, data) => {
                this.setState({
                    index: i
                }, () => {
                    this.onReposition(data.lastX, data.lastY, i);
                });
            }}>
            {typeof item["resizableProps"] !== "undefined" ? <Resizable
                bounds={"parent"}
                className={`${styles.item}  ${index === i ? styles.active : ""} `}
                size={item.options.size}
                onResizeStop={(e, direction, ref, d) => {
                    this.onResize(d, i);
                }}
                data-index={i}
                {...item.resizableProps}
                handleComponent={{
                    bottomRight: () => (
                        <div className={styles.handleComponentBottomRight} />)
                }}
            >
                <div className={`${styles[item.type]} handle`}>
                    {item.children}
                </div>
            </Resizable> : <div
                className={`${styles.item}  ${index === i ? styles.active : ""} `}
                style={item.options.size}
                data-index={i}
            >
                <div className={`${styles[item.type]} handle`}>
                    {item.children}
                </div>
            </div>}
        </Draggable>;
    }

    // 外部实现
    getFormController() {
    }

    render() {
        const { settingInfoLoading } = this.props;
        const { body } = this.state;
        const types = {};
        body.map((item) => {
            types[item.type] = item;
        });
        return (
            <Card bordered={false}>
                <Spin size="large" spinning={settingInfoLoading}>
                    <div className={styles.main}>
                        <div className={styles.left}>
                            <div className={styles.view}>
                                <div className={styles.container}>
                                    {
                                        this.initFormatBody(body).map((item, i) => this.getDraggableItem(item, i))
                                    }
                                </div>
                            </div>
                            {this.getButtonArea()}
                        </div>
                        <div className={styles.form}>
                            {this.getFormController()}
                        </div>
                    </div>
                </Spin>
            </Card>
        );
    }
}

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 3 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 }
    }
};
const maxWidth = 324;
const maxHeight = 464;
export {
    BaseController,
    formItemLayout,
    maxWidth,
    maxHeight
};
