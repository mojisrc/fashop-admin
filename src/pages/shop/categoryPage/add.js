import React from "react";
import { connect } from "umi";
import { message } from "antd";
import { history as router } from "umi";
import AddEditBaseController from "@/pages/shop/categoryPage/components/addEditBaseController";

@connect(({ goods, loading }) => ({
    goodsList: goods.list.result,
    goodsListLoading: loading.effects["goods/list"],
    pageSaveLoading: loading.effects["page/add"],
}))
export default class Add extends AddEditBaseController {
    static defaultProps = {
        goodList: { total_number: 0, list: [] },
        goodsListLoading: true,
    };

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
        let { body, name } = this.state;
        this.props.dispatch({
            type: "categoryPage/add",
            payload: {
                name,
                body,
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
