import { Form } from '@ant-design/compatible';
import React, { Component } from "react";
import { Row, Col, Button, Spin,  Input } from "antd";
import PageView from "@/pages/shop/categoryPage/components/diy/view/index";
import styles from "./addEdit.css";
import Scrollbar from "react-scrollbars-custom";
import PageControl from "./diy/controller/index";
import PageTool from "./diy/tool/index";

const FormItem = Form.Item;

export default class AddEditBaseController extends Component {
    state = {
        id: 0,
        body: [],
        leftIndex: 0,
        rightIndex: 0,
        showPageInfo: true,
        name: null
    };

    setData = (body) => {
        this.setState({
            body
        });
    };
    showPageInfo = () => {
        this.setState({ showPageInfo: true });
    };

    render() {
        let { body, leftIndex, rightIndex, showPageInfo, name } = this.state;
        return (
            <Spin size="large" className="globalSpin" spinning={false}>
                <Row type="flex" justify="start" style={{ minHeight: "100vh", overflow: "hidden" }}>
                    <Col span={10}>
                        <PageView
                            toolListData={this.toolListData}
                            leftIndex={leftIndex}
                            rightIndex={rightIndex}
                            data={body}
                            setData={this.setData}
                            setLeftIndex={(index) => {
                                this.setState({
                                    leftIndex: index,
                                    rightRight: 0,
                                    showPageInfo: false
                                });
                            }}
                            setRightIndex={(index) => {
                                this.setState({
                                    rightIndex: index,
                                    showPageInfo: false
                                });
                            }}
                            onHeaderClick={() => {
                                this.showPageInfo();
                            }}
                        >
                            <Button
                                type='primary'
                                onClick={() => {
                                    this.onSave();
                                }}
                            >
                                保存
                            </Button>
                        </PageView>
                    </Col>
                    <Col span={6} className={styles.container}>
                        <Scrollbar style={{ width: "100%", height: "100%", minHeight: 300 }}>
                            {showPageInfo ? <div className={styles.setPageInfo}>
                                <FormItem
                                    label='页面名称'
                                >
                                    <Input
                                        value={name}
                                        placeholder="请输入页面名称"
                                        onChange={(e) => {
                                            this.setState({ name: e.target.value });
                                        }}
                                    />
                                </FormItem>
                            </div> : <PageTool
                                leftIndex={leftIndex}
                                rightIndex={rightIndex}
                                data={body}
                                setData={this.setData}
                            />}
                        </Scrollbar>
                    </Col>

                    <Col span={8} className={styles.container}>
                        <Scrollbar style={{ width: "100%", height: "100%", minHeight: 300 }}>
                            <PageControl
                                leftIndex={leftIndex}
                                rightIndex={rightIndex}
                                data={body}
                                setData={this.setData}
                            />
                        </Scrollbar>
                    </Col>
                </Row>
            </Spin>
        );
    }
}
const dataSource = [
    {
        title: "推荐分类",
        children: [
            {
                type: "banner",
                options: {},
                data: [
                    {
                        img: {
                            url: "http://m.360buyimg.com/mobilecms/s750x366_jfs/t1/34201/12/1973/139935/5cb6a6cfEcf0c8584/03e3f85e9f0ba35f.jpg!cr_1125x549_0_72!q70.jpg.dpg"
                        },
                        link: {
                            action: "goods",
                            param: {}
                        }
                    },
                    {
                        img: {
                            url: "http://m.360buyimg.com/mobilecms/s750x366_jfs/t1/33406/9/4525/52329/5cb7f239E26d8cb5c/8cef5d545f3f795f.jpg!cr_1125x549_0_72!q70.jpg.dpg"
                        },
                        link: {
                            action: "goods",
                            param: {}
                        }
                    }
                ]
            },
            {
                type: "icon",
                options: {
                    title: "常用分类"
                },
                data: [
                    {
                        img: {
                            url: "http://img11.360buyimg.com/focus/s140x140_jfs/t1/26217/19/7605/22816/5c6d03a3E4f263c9d/d6fc27b51078358c.png"
                        },
                        title: "车载充电器",
                        link: {
                            action: "goods",
                            param: {}
                        }
                    },
                    {
                        img: {
                            url: "http://img11.360buyimg.com/focus/s140x140_jfs/t1/26217/19/7605/22816/5c6d03a3E4f263c9d/d6fc27b51078358c.png"
                        },
                        title: "休闲零食",
                        link: {
                            action: "goods",
                            param: {}
                        }
                    },
                    {
                        img: {
                            url: "http://img14.360buyimg.com/focus/s140x140_jfs/t27136/183/1628977274/31007/a6f7ed55/5be6ebd8Nb07ef492.png"
                        },
                        title: "手机",
                        link: {
                            action: "goods",
                            param: {}
                        }
                    },
                    {
                        img: {
                            url: "http://img30.360buyimg.com/focus/s140x140_jfs/t1/18974/35/9836/31220/5c82223eE5dcc61b8/4e93c1fbb777bfca.png"
                        },
                        title: "手机",
                        link: {
                            action: "goods",
                            param: {}
                        }
                    },
                    {
                        img: {
                            url: "http://img11.360buyimg.com/focus/s140x140_jfs/t1/30718/32/2643/9923/5c6d03ecEabd2d664/aaee556800519e1f.png"
                        },
                        title: "手机",
                        link: {
                            action: "goods",
                            param: {}
                        }
                    },
                    {
                        img: {
                            url: "http://img13.360buyimg.com/focus/s140x140_jfs/t1/23312/39/9884/7280/5c822292E65f3929b/78ba741d321954b0.png"
                        },
                        title: "电磁炉",
                        link: {
                            action: "goods",
                            param: {}
                        }
                    },
                    {
                        img: {
                            url: "http://img30.360buyimg.com/focus/s140x140_jfs/t1/19730/14/9859/10199/5c8225eeE5e925911/054ccd7992f86199.png"
                        },
                        title: "口红",
                        link: {
                            action: "goods",
                            param: {}
                        }
                    }


                ]


            },
            {
                type: "banner",
                options: {},
                data: [
                    {
                        img: {
                            url: "http://m.360buyimg.com/mobilecms/s750x366_jfs/t1/34201/12/1973/139935/5cb6a6cfEcf0c8584/03e3f85e9f0ba35f.jpg!cr_1125x549_0_72!q70.jpg.dpg"
                        },
                        link: {
                            action: "goods",
                            param: {}
                        }
                    },
                    {
                        img: {
                            url: "http://m.360buyimg.com/mobilecms/s750x366_jfs/t1/33406/9/4525/52329/5cb7f239E26d8cb5c/8cef5d545f3f795f.jpg!cr_1125x549_0_72!q70.jpg.dpg"
                        },
                        link: {
                            action: "goods",
                            param: {}
                        }
                    }
                ]
            },
            {
                type: "icon",
                options: {
                    title: "常用分类"
                },
                data: [
                    {
                        img: {
                            url: "http://img11.360buyimg.com/focus/s140x140_jfs/t1/26217/19/7605/22816/5c6d03a3E4f263c9d/d6fc27b51078358c.png"
                        },
                        title: "车载充电器",
                        link: {
                            action: "goods",
                            param: {}
                        }
                    },
                    {
                        img: {
                            url: "http://img11.360buyimg.com/focus/s140x140_jfs/t1/26217/19/7605/22816/5c6d03a3E4f263c9d/d6fc27b51078358c.png"
                        },
                        title: "休闲零食",
                        link: {
                            action: "goods",
                            param: {}
                        }
                    },
                    {
                        img: {
                            url: "http://img14.360buyimg.com/focus/s140x140_jfs/t27136/183/1628977274/31007/a6f7ed55/5be6ebd8Nb07ef492.png"
                        },
                        title: "手机",
                        link: {
                            action: "goods",
                            param: {}
                        }
                    },
                    {
                        img: {
                            url: "http://img30.360buyimg.com/focus/s140x140_jfs/t1/18974/35/9836/31220/5c82223eE5dcc61b8/4e93c1fbb777bfca.png"
                        },
                        title: "手机",
                        link: {
                            action: "goods",
                            param: {}
                        }
                    },
                    {
                        img: {
                            url: "http://img11.360buyimg.com/focus/s140x140_jfs/t1/30718/32/2643/9923/5c6d03ecEabd2d664/aaee556800519e1f.png"
                        },
                        title: "手机",
                        link: {
                            action: "goods",
                            param: {}
                        }
                    },
                    {
                        img: {
                            url: "http://img13.360buyimg.com/focus/s140x140_jfs/t1/23312/39/9884/7280/5c822292E65f3929b/78ba741d321954b0.png"
                        },
                        title: "电磁炉",
                        link: {
                            action: "goods",
                            param: {}
                        }
                    },
                    {
                        img: {
                            url: "http://img30.360buyimg.com/focus/s140x140_jfs/t1/19730/14/9859/10199/5c8225eeE5e925911/054ccd7992f86199.png"
                        },
                        title: "口红",
                        link: {
                            action: "goods",
                            param: {}
                        }
                    }


                ]


            },
            {
                type: "icon",
                options: {
                    title: "常用分类"
                },
                data: [
                    {
                        img: {
                            url: "http://img11.360buyimg.com/focus/s140x140_jfs/t1/26217/19/7605/22816/5c6d03a3E4f263c9d/d6fc27b51078358c.png"
                        },
                        title: "车载充电器",
                        link: {
                            action: "goods",
                            param: {}
                        }
                    },
                    {
                        img: {
                            url: "http://img11.360buyimg.com/focus/s140x140_jfs/t1/26217/19/7605/22816/5c6d03a3E4f263c9d/d6fc27b51078358c.png"
                        },
                        title: "休闲零食",
                        link: {
                            action: "goods",
                            param: {}
                        }
                    },
                    {
                        img: {
                            url: "http://img14.360buyimg.com/focus/s140x140_jfs/t27136/183/1628977274/31007/a6f7ed55/5be6ebd8Nb07ef492.png"
                        },
                        title: "手机",
                        link: {
                            action: "goods",
                            param: {}
                        }
                    },
                    {
                        img: {
                            url: "http://img30.360buyimg.com/focus/s140x140_jfs/t1/18974/35/9836/31220/5c82223eE5dcc61b8/4e93c1fbb777bfca.png"
                        },
                        title: "手机",
                        link: {
                            action: "goods",
                            param: {}
                        }
                    },
                    {
                        img: {
                            url: "http://img11.360buyimg.com/focus/s140x140_jfs/t1/30718/32/2643/9923/5c6d03ecEabd2d664/aaee556800519e1f.png"
                        },
                        title: "手机",
                        link: {
                            action: "goods",
                            param: {}
                        }
                    },
                    {
                        img: {
                            url: "http://img13.360buyimg.com/focus/s140x140_jfs/t1/23312/39/9884/7280/5c822292E65f3929b/78ba741d321954b0.png"
                        },
                        title: "电磁炉",
                        link: {
                            action: "goods",
                            param: {}
                        }
                    },
                    {
                        img: {
                            url: "http://img30.360buyimg.com/focus/s140x140_jfs/t1/19730/14/9859/10199/5c8225eeE5e925911/054ccd7992f86199.png"
                        },
                        title: "口红",
                        link: {
                            action: "goods",
                            param: {}
                        }
                    }


                ]


            }
        ]
    },
    {
        title: "推荐品牌",
        children: [
            {
                type: "banner",
                options: {},
                data: [
                    {
                        img: {
                            url: "http://m.360buyimg.com/mobilecms/s750x366_jfs/t1/31928/10/13009/95518/5cb8a39dE66cbdc85/179e94fbe6c49c97.jpg!cr_1125x549_0_72!q70.jpg.dpg"
                        },
                        link: {
                            action: "goods",
                            param: {}
                        }
                    },
                    {
                        img: {
                            url: "http://m.360buyimg.com/mobilecms/s750x366_jfs/t1/23112/33/6431/99212/5c540d7fEf8000223/fddb6b047c02ba3d.jpg!cr_1125x549_0_72!q70.jpg.dpg"
                        },
                        link: {
                            action: "goods",
                            param: {}
                        }
                    }
                ]
            },
            {
                type: "icon",
                options: {
                    title: "常用分类"
                },
                data: [
                    {
                        img: {
                            url: "http://img11.360buyimg.com/focus/s140x140_jfs/t1/26217/19/7605/22816/5c6d03a3E4f263c9d/d6fc27b51078358c.png"
                        },
                        title: "车载充电器",
                        link: {
                            action: "goods",
                            param: {}
                        }
                    },
                    {
                        img: {
                            url: "http://img11.360buyimg.com/focus/s140x140_jfs/t1/26217/19/7605/22816/5c6d03a3E4f263c9d/d6fc27b51078358c.png"
                        },
                        title: "休闲零食",
                        link: {
                            action: "goods",
                            param: {}
                        }
                    },
                    {
                        img: {
                            url: "http://img14.360buyimg.com/focus/s140x140_jfs/t27136/183/1628977274/31007/a6f7ed55/5be6ebd8Nb07ef492.png"
                        },
                        title: "手机",
                        link: {
                            action: "goods",
                            param: {}
                        }
                    },
                    {
                        img: {
                            url: "http://img30.360buyimg.com/focus/s140x140_jfs/t1/18974/35/9836/31220/5c82223eE5dcc61b8/4e93c1fbb777bfca.png"
                        },
                        title: "手机",
                        link: {
                            action: "goods",
                            param: {}
                        }
                    },
                    {
                        img: {
                            url: "http://img11.360buyimg.com/focus/s140x140_jfs/t1/30718/32/2643/9923/5c6d03ecEabd2d664/aaee556800519e1f.png"
                        },
                        title: "手机",
                        link: {
                            action: "goods",
                            param: {}
                        }
                    },
                    {
                        img: {
                            url: "http://img13.360buyimg.com/focus/s140x140_jfs/t1/23312/39/9884/7280/5c822292E65f3929b/78ba741d321954b0.png"
                        },
                        title: "电磁炉",
                        link: {
                            action: "goods",
                            param: {}
                        }
                    },
                    {
                        img: {
                            url: "http://img30.360buyimg.com/focus/s140x140_jfs/t1/19730/14/9859/10199/5c8225eeE5e925911/054ccd7992f86199.png"
                        },
                        title: "口红",
                        link: {
                            action: "goods",
                            param: {}
                        }
                    }


                ]


            },
            {
                type: "icon",
                options: {
                    title: "常用分类"
                },
                data: [
                    {
                        img: {
                            url: "http://img11.360buyimg.com/focus/s140x140_jfs/t1/26217/19/7605/22816/5c6d03a3E4f263c9d/d6fc27b51078358c.png"
                        },
                        title: "车载充电器",
                        link: {
                            action: "goods",
                            param: {}
                        }
                    },
                    {
                        img: {
                            url: "http://img11.360buyimg.com/focus/s140x140_jfs/t1/26217/19/7605/22816/5c6d03a3E4f263c9d/d6fc27b51078358c.png"
                        },
                        title: "休闲零食",
                        link: {
                            action: "goods",
                            param: {}
                        }
                    },
                    {
                        img: {
                            url: "http://img14.360buyimg.com/focus/s140x140_jfs/t27136/183/1628977274/31007/a6f7ed55/5be6ebd8Nb07ef492.png"
                        },
                        title: "手机",
                        link: {
                            action: "goods",
                            param: {}
                        }
                    },
                    {
                        img: {
                            url: "http://img30.360buyimg.com/focus/s140x140_jfs/t1/18974/35/9836/31220/5c82223eE5dcc61b8/4e93c1fbb777bfca.png"
                        },
                        title: "手机",
                        link: {
                            action: "goods",
                            param: {}
                        }
                    },
                    {
                        img: {
                            url: "http://img11.360buyimg.com/focus/s140x140_jfs/t1/30718/32/2643/9923/5c6d03ecEabd2d664/aaee556800519e1f.png"
                        },
                        title: "手机",
                        link: {
                            action: "goods",
                            param: {}
                        }
                    },
                    {
                        img: {
                            url: "http://img13.360buyimg.com/focus/s140x140_jfs/t1/23312/39/9884/7280/5c822292E65f3929b/78ba741d321954b0.png"
                        },
                        title: "电磁炉",
                        link: {
                            action: "goods",
                            param: {}
                        }
                    },
                    {
                        img: {
                            url: "http://img30.360buyimg.com/focus/s140x140_jfs/t1/19730/14/9859/10199/5c8225eeE5e925911/054ccd7992f86199.png"
                        },
                        title: "口红",
                        link: {
                            action: "goods",
                            param: {}
                        }
                    }


                ]


            }
        ]
    },
    {
        title: "推荐分类",
        children: []
    }
];
