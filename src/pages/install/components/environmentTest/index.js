import React, { Component } from "react";
import { View } from "@/components/flexView";
import { Button, Table, notification, message } from "antd";
import styles from "./index.css";
import InstallApi from "@/services/install";

export default class EnvironmentTest extends Component {
    timeFunc;
    state = {
        result: {},
        nextButtonDisabled: true
    };

    componentDidMount() {
        this.timeFunc = setInterval(async () => {
            const e = await InstallApi.envStatus();
            if (e.code === 0) {
                const { result } = e;
                let conditionOne = result.env.data.findIndex((item) => item.status !== true);
                let conditionTwo = result.dir.data.findIndex((item) => item.status !== true);
                this.setState({ result });
                if (conditionOne === -1 && conditionTwo === -1) {
                    this.setState({
                        nextButtonDisabled: false
                    });
                }
            } else {
                if (e.msg === "TypeError:Failed to fetch") {
                    message.error("服务器无法链接");
                } else {
                    message.error(e.msg);
                }
            }
        }, 2000);
    }

    componentWillUnmount() {
        clearInterval(this.timeFunc);
    }

    render() {
        const { result, nextButtonDisabled } = this.state;
        const { changeState } = this.props;
        const columnsList = [
            [
                {
                    title: "检测项",
                    dataIndex: "name",
                    key: "name"
                },
                {
                    title: "要求",
                    dataIndex: "require",
                    key: "require"
                },
                {
                    title: "状态",
                    dataIndex: "status",
                    key: "status",
                    className: styles.columns,
                    render: text => text ?
                        <span className={styles.correct}>√</span> :
                        <span className={styles.wrong}>×</span>
                },
                {
                    title: "说明及帮助",
                    dataIndex: "url",
                    key: "url",
                    render: (text, record) => <a
                        target="help_href"
                        className={styles.helpHref}
                        href={text}
                    >
                        {`#${record.name}`}
                    </a>
                }
            ], [
                {
                    title: "目录",
                    dataIndex: "name",
                    key: "name"
                }, {
                    title: "要求",
                    dataIndex: "require",
                    key: "require"
                }, {
                    title: "状态",
                    dataIndex: "status",
                    key: "status",
                    className: styles.columns,
                    render: text => text ?
                        <span className={styles.correct}>√</span> :
                        <span className={styles.wrong}>×</span>
                }, {
                    title: "说明及帮助",
                    dataIndex: "help",
                    key: "help"
                }
            ]
        ];
        return (
            <View className={`${styles.environmentTestWarp} environmentTest`}>
                <h3>运行环境检测</h3>
                <View>
                    {
                        result.env ? <View>
                                {
                                    this.publicView({ item: result.env, columns: columnsList[0] })
                                }
                                {
                                    this.publicView({ item: result.dir, columns: columnsList[1] })
                                }
                            </View> :
                            <View className={styles.itemView}>
                                <Table
                                    bordered
                                    columns={columnsList[0]}
                                    pagination={false}
                                    loading={true}
                                />
                            </View>
                    }
                </View>
                <View className={styles.environmentTestFooter}>
                    <Button
                        type='primary'
                        onClick={() => {
                            if (result && result.env && Array.isArray(result.env.data)) {
                                let conditionOne = result.env.data.findIndex((item) => item.status === false);
                                let conditionTwo = result.dir.data.findIndex((item) => item.status === false);
                                if (conditionOne === -1 && conditionTwo === -1) {
                                    changeState(2);
                                } else {
                                    notification["warning"]({
                                        message: "环境检测",
                                        description: "环境检测完成后，方可进行下一步配置。"
                                    });
                                }
                            }
                        }}
                        disabled={nextButtonDisabled}
                        size='large'
                    >
                        下一步
                    </Button>
                </View>
            </View>
        );
    }

    publicView({ item, columns }) {
        return (
            <View className={styles.itemView}>
                <View className={styles.titleWarp}>
                    <p>•</p>
                    <View>
                        <h4>{item.title}</h4>
                        <p>{item.desc}</p>
                    </View>
                </View>
                <Table
                    bordered
                    rowKey={record => record.name}
                    columns={columns}
                    dataSource={item.data}
                    pagination={false}
                    rowClassName={(record, index) => {
                        if ((index + 1) % 2 === 0) {
                            return styles.grayBg;
                        }
                    }}
                />
            </View>
        );
    }
}
