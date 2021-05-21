import React from "react";
import { connect } from "umi";
import { message } from "antd";
import { getPageQuery } from "@/utils";
import AddEditBaseController from "@/pages/shop/categoryPage/components/addEditBaseController";

@connect(({ goods, page, loading }) => ({
    goodsList: goods.list.result,
    goodsListLoading: loading.effects["goods/list"],
    pageSaveLoading: loading.effects["page/edit"],
    pageInfo: page.info.result,
    pageLoading: loading.effects["page/info"]
}))

export default class Edit extends AddEditBaseController {
    static defaultProps = {
        goodsList: { total_number: 0, list: [] },
        goodsListLoading: true,
        pageInfo: { info: {} },
        pageLoading: true,
        pageEditLoading: false
    };


    async componentDidMount() {
        const { dispatch } = this.props;
        const { id } = getPageQuery();
        dispatch({
            type: "categoryPage/info",
            payload: { id },
            callback: (response) => {
                if (response.code === 0) {
                    const { info } = JSON.parse(JSON.stringify(response.result));
                    this.setState({
                        id: info.id,
                        name: info.name,
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
        let { id, body, name } = this.state;
        this.props.dispatch({
            type: "categoryPage/edit",
            payload: {
                id,
                name,
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
