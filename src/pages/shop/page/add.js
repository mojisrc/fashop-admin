import React from "react";
import { connect } from "umi";
import { message } from "antd";
import { history as router } from "umi";
import AddEditBaseController from "@/pages/shop/page/components/addEditBaseController";
import { toolListData } from "@/pages/shop/page/components/diy/tool/data";
// TODO edit extends
@connect(({ goods, page, group, loading }) => ({
    goodsList: goods.list.result,
    goodsListLoading: loading.effects["goods/list"],
    pageSaveLoading: loading.effects["page/add"]
}))
export default class Add extends AddEditBaseController {
    static defaultProps = {
        goodList: { total_number: 0, list: [] },
        goodsListLoading: true,
        showViewSaveBtn: true,
        showBaseInfo: true,
        onChange: () => {
        }
    };
    toolListData = [...toolListData];

    async componentDidMount() {
        const { dispatch } = this.props;
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
        let { body, name, description, background_color, share_title, share_img } = this.state;
        this.props.dispatch({
            type: "page/add",
            payload: {
                name,
                description,
                background_color,
                body,
                share_title,
                share_img,
                module: "mobile"
            },
            callback: (response) => {
                if (response.code === 0) {
                    message.success("添加成功");
                    router.goBack();
                } else {
                    message.error(response.msg);
                }
            }
        });
    }

}
