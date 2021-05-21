import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import Item from "./item";
import Add from "./add";
import Sort from "./sort";
import styles from "./index.css";
import { Card } from "antd";

export default class GroupCardMake extends PureComponent {
    static propTypes = {
        defaultValue: PropTypes.object.isRequired,
        addShow: PropTypes.bool,
        sortShow: PropTypes.bool,
        dataSource: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired,
        getExtraData: PropTypes.func.isRequired,
    };
    static defaultProps = {
        defaultValue: {},
        dataSource: [],
        addShow:true,
        sortShow:true,
        // data = dataSource
        onChange: (dataSource) => {
        },
        // 获得一些不确定的  比如获得了分类还想铺分类的图标和标题
        getExtraData: (dataSource) => {
        }
    };


    render() {
        const { defaultValue, dataSource, onChange,addShow ,sortShow,getExtraData} = this.props;
        return <Fragment>
            {
                dataSource.map((listItem, index) => (
                    <Card
                        className={styles.item}
                        key={`card${index}`}
                        type={"inner"}
                        extra={
                            sortShow ? <Sort
                                index={index}
                                data={dataSource}
                                onChange={(data) => {
                                    onChange(data);
                                }}
                            /> : null
                        }
                    >
                            <Item
                                key={`item${index}`}
                                img={typeof defaultValue["img"] !== "undefined" ? listItem.img : null}
                                title={typeof defaultValue["title"] !== "undefined" ? listItem.title : null}
                                link={typeof defaultValue["link"] !== "undefined" ? listItem.link : null}
                                backgroundColor={typeof defaultValue["background_color"] !== "undefined" ? listItem.background_color : null}
                                fontColor={typeof defaultValue["font_color"] !== "undefined" ? listItem.font_color : null}
                                onChange={(response,extra) => {
                                    let _data = [...dataSource];
                                    _data[index] = response
                                    onChange(_data,index,extra);
                                }}
                                getExtraData={(data)=>{
                                    getExtraData(data)
                                }}
                            />
                    </Card>
                ))
            }
            {addShow ? <Add
                onClick={() => {
                    let _data = [...dataSource];
                    _data.push(defaultValue)
                    onChange(_data,_data.length-1,null);
                }}
            /> : null}
        </Fragment>;
    }
}
