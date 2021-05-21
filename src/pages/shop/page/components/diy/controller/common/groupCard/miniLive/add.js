import { Icon } from '@ant-design/compatible';
import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import styles from "./index.css";

import SelectMiniLive from "@/pages/shop/page/components/selectMiniLive/index";

export default class WechatLiveCardAdd extends PureComponent {
    static propTypes = {
        data: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired
    };
    static defaultProps = {
        onChange: () => {
        }
    };


    render() {
        const { onChange, data } = this.props;
        return <Fragment>
            <div
                className={styles.itemAdd}
                onClick={() => {
                    this.select.show();
                }}
            >
                <Icon type='plus' /> 添加
            </div>
            <SelectMiniLive
                ref={(e) => this.select = e}
                multiSelect={true}
                onOk={(list) => {
                    let _data = [...data];
                    list.map((item) =>
                        _data.push(item)
                    );
                    onChange(_data);
                    this.select.close();
                }}
            />
        </Fragment>;
    }
}
