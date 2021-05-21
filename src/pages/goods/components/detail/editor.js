import React, { Component } from "react";
import PageView from "@/pages/shop/page/components/diy/view";
import { windowWidth } from "@/utils/style";
import EditorContent from "@/pages/goods/components/detail/editorContent";
import { Drawer } from "antd";
import styles from "./editor.css";
import { toolListData } from "./toolListData";

export default class GoodsDetailEditor extends Component {

    state = {
        visible: false
    };
    static defaultProps = {
        // for form
        onChange() {
        }
    };
    body = [];
    show = () => {
        this.setState({
            visible: true
        });
    };

    close = () => {
        this.setState({
            visible: false
        }, () => {
            this.props.onChange(this.body);
        });
    };

    render() {
        return <div className={styles.editor}>
            <PageView
                toolListData={toolListData}
                style={{ margin: 0, border: "1px solid #f8f8f8" }}
                disabled={true}
                showViewSaveBtn={false}
                body={this.props.value}
                backgroundColor={"#f8f8f8"}
                onViewItemClick={() => {
                    this.show();
                }}
                empty={<div className={styles.bodyViewEmpty} onClick={() => {
                    this.show();
                }}>点击我装修</div>}
            >
            </PageView>
            <Drawer
                bodyStyle={{ padding: 0, backgroundColor: "#F0F2F5" }}
                title="商品详情"
                placement={"right"}
                closable={false}
                onClose={() => {
                    this.close();
                }}
                visible={this.state.visible}
                width={windowWidth - 300}
            >
                <EditorContent
                    onChange={(e) => {
                        this.body = e.body;
                    }}
                    body={this.props.value}
                />
            </Drawer>
        </div>;
    }
}
