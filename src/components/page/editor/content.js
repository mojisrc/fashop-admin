import React from "react";
import { connect } from "umi";
import AddEditBaseController from "@/pages/shop/page/components/addEditBaseController";

@connect(({ goods, loading }) => ({
    goodsList: goods.list.result,
    goodsListLoading: loading.effects["goods/list"],
    pageSaveLoading: loading.effects["page/add"]
}))
export default class EditorContent extends AddEditBaseController {
    static defaultProps = {
        goodList: { total_number: 0, list: [] },
        goodsListLoading: true,
        showViewSaveBtn:false,
        toolListData:[]
    };

    constructor(props) {
        super(props);
        this.toolListData = [...props.toolListData];
    }

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

    }

}
