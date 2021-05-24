import PlusOutlined from "@ant-design/icons/PlusOutlined";
import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import styles from "./index.css";

import SelectSeckillGoods from "@/pages/shop/page/components/selectSeckillGoods/index";

export default class GroupCouponCardAdd extends PureComponent {
    static propTypes = {
        data: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired
    };
    static defaultProps = {
        onChange: () => {
        }
    };

    state = {
        addVisible: false
    };

    render() {
        const { onChange,data } = this.props;
        const { addVisible } = this.state;
        return <Fragment>
            <div
                className={styles.itemAdd}
                onClick={() => {
                    this.setState({ addVisible: true });
                }}
            >
                <PlusOutlined /> 添加
            </div>
            <SelectSeckillGoods
                visible={addVisible}
                close={() => {
                    this.setState({ addVisible: false });
                }}
                multiSelect={true}
                onOk={(goodsList) => {
                    let _data = [...data];
                    goodsList.map((item) =>
                        _data.push(item)
                    );
                    this.setState({
                        addVisible: false
                    }, () => {
                        onChange(_data);
                    });
                }}
            />
        </Fragment>;
    }
}
