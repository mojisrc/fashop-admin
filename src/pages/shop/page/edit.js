import React from "react";
import { connect } from "umi";
import { message } from "antd";
import { getPageQuery } from "@/utils";
import AddEditBaseController from "@/pages/shop/page/components/addEditBaseController";
import { toolListData } from "@/pages/shop/page/components/diy/tool/data";

@connect(({ goods, loading }) => ({
    goodsList: goods.list.result,
    goodsListLoading: loading.effects["goods/list"],
    pageSaveLoading: loading.effects["page/edit"],
    pageLoading: loading.effects["page/info"]
}))

export default class Edit extends AddEditBaseController {
    static defaultProps = {
        goodsList: { total_number: 0, list: [] },
        goodsListLoading: true,
        pageLoading: true,
        pageEditLoading: false,
        showViewSaveBtn: true,
        showBaseInfo: true,
        onChange: () => {
        }
    };

    toolListData = [...toolListData];


    async componentDidMount() {
        const { dispatch } = this.props;
        const { id } = getPageQuery();
        dispatch({
            type: "page/info",
            payload: { id },
            callback: (response) => {
                if (response.code === 0) {
                    const { info } = JSON.parse(JSON.stringify(response.result));
                    this.setState({
                        id: info.id,
                        name: info.name,
                        description: info.description,
                        background_color: info.background_color,
                        share_title: info.share_title,
                        share_img: info.share_img,
                        body: info.body
                    });
                }
            }
        });
        dispatch({
            type: "goods/list",
            payload: {
                page: 1,
                rows: 6,
                order_type: 8
            }
        });
    }

    onSave() {
        let { id, body, name, description, background_color, share_title, share_img } = this.state;
        this.props.dispatch({
            type: "page/edit",
            payload: {
                id,
                name,
                description,
                background_color,
                share_title,
                share_img,
                body,
                module: "mobile"
            },
            callback: (response) => {
                if (response.code === 0) {
                    message.success("已保存");
                } else {
                    message.error(response.msg);
                }
            }
        });
    }

}
