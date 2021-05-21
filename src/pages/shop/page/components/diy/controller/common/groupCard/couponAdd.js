import { Icon } from '@ant-design/compatible';
import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import styles from "./index.css";

import SelectCoupon from "@/pages/shop/page/components/selectCoupon/index";

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
        const { onChange, data } = this.props;
        return <Fragment>
            <div
                className={styles.itemAdd}
                onClick={() => {
                    this.selectCoupon.show();
                }}
            >
                <Icon type='plus' /> 添加
            </div>
            <SelectCoupon
                ref={(e) => this.selectCoupon = e}
                getState={(state) => {
                    let _data = [...data];
                    _data.push(state.value);
                    onChange(_data);
                    this.selectCoupon.close();
                }}
            />
        </Fragment>;
    }
}
