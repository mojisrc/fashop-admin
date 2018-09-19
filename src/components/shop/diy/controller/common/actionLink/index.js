//@flow
import React, { Component } from "react";
import styles from "./index.css";
import { View } from "react-web-dom";
import { Popover, Tag, Input, Modal } from 'antd';
import SelectGoods from "../../../../../public/selectGoods/index";
import SelectPage from "../../../../../public/selectPage/index";

const { TextArea } = Input;

export type LinkActionType = 'portal' | 'goods' | 'page' | 'url'
type Props = {
    getValues: Function,
    type: LinkActionType,
    value: any
}
type State = {
    urlValue: {
        url: string
    },
    selectGoodsVisible: boolean,
    selectPageVisible: boolean,
    inputUrlVisible: boolean,
}
export const linkInfo = {
    portal: {
        type: 'portal',
        name: '首页链接',
        alias: '首页'
    },
    goods: {
        type: 'goods',
        name: '商品链接',
        alias: '商品'
    },
    page: {
        type: 'page',
        name: '自定义页面',
        alias: '自定义页面'
    },
    url: {
        type: 'url',
        name: '自定义链接',
        alias: '链接地址'
    }
}

export default class Index extends Component<Props, State> {
    state = {
        urlValue: {
            url: ''
        },
        selectGoodsVisible: false,
        selectPageVisible: false,
        inputUrlVisible: false
    }
    onClick = (linkAction: LinkActionType) => {
        const props = { ...this.props }
        switch (linkAction) {
            case 'portal':
                props.getValues({
                    ...props, ...{ type: linkAction }
                })
                break;
            case 'goods':
                this.setState({
                    selectGoodsVisible: true
                })
                break;
            case 'page':
                this.setState({
                    selectPageVisible: true
                })
                break;
            // TODO
            case 'url':
                this.setState({
                    inputUrlVisible: true
                })
                break;
        }
    }


    render() {
        const props = { ...this.props }
        const { type, getValues } = props
        const { selectGoodsVisible, selectPageVisible, inputUrlVisible, urlValue } = this.state
        return (
            <View>
                <View>
                    <Popover
                        placement="bottom"
                        content={
                            <View className={`${styles.actionLinkPopoverContent}`}>
                                <a onClick={() => {
                                    this.onClick('portal')
                                }}>{linkInfo.portal.name}</a>
                                <a onClick={() => {
                                    this.onClick('goods')
                                }}>{linkInfo.goods.name}</a>
                                <a onClick={() => {
                                    this.onClick('page')
                                }}>{linkInfo.page.name}</a>
                                <a onClick={() => {
                                    this.onClick('url')
                                }}>{linkInfo.url.name}</a>
                            </View>
                        }
                    >
                        <Tag color="#108ee9">{linkInfo[type].alias}</Tag>
                        <a type="primary">修改</a>
                    </Popover>
                </View>
                <SelectGoods
                    visible={selectGoodsVisible}
                    multiSelect={false}
                    close={() => {
                        this.setState({
                            selectGoodsVisible: false
                        })
                    }}
                    onOk={(state) => {
                        this.setState({
                            selectGoodsVisible: false
                        }, () => {
                            getValues({
                                ...props, ...{
                                    type: 'goods',
                                    value: {
                                        id: state.checkedData[0].id
                                    }
                                }
                            })
                        })
                    }}
                />
                <SelectPage
                    visible={selectPageVisible}
                    close={() => {
                        this.setState({
                            selectPageVisible: false
                        })
                    }}
                    getState={(state) => {
                        this.setState({
                            selectPageVisible: false
                        }, () => {
                            getValues({
                                ...props, ...{
                                    type: 'page',
                                    value: {
                                        id: state.value.id
                                    },
                                }
                            })
                        })
                    }}
                />
                <Modal
                    title="自定义链接"
                    visible={inputUrlVisible}
                    onCancel={() => {
                        this.setState({
                            inputUrlVisible: false
                        })
                    }}
                    onOk={(e) => {
                        this.setState({
                            inputUrlVisible: false
                        }, () => {
                            getValues({
                                ...props, ...{
                                    type: 'url',
                                    value: urlValue
                                }
                            })
                        })
                    }}
                    style={{ top: 20 }}
                    width={756}
                >
                    <TextArea
                        placeholder="请输入自定义链接"
                        autosize={{ minRows: 2, maxRows: 6 }}
                        value={urlValue && typeof(urlValue['url']) !== "undefined" ? urlValue.url : ''}
                        onChange={(e) => {
                            this.setState({
                                urlValue: {
                                    url: e.target.value
                                }
                            })
                        }} />
                </Modal>
            </View>
        )
    }
}
