import React, { Component } from "react";
import { Button, Input, InputNumber } from "antd";
import styles from "../index.css";
import { View } from "@/components/flexView";
import { handle } from "@/models/refund";
import { connect } from "dva";

const TextArea = Input.TextArea;
const { Fragment } = React;

@connect()
export default class OrderDetailOperateInfo extends Component {
    static defaultProps = {
        dispatch: () => {
        }
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.id !== this.state.id) {
            this.setState({
                handle_message: nextProps.handle_message
            });
        }
    }

    constructor(props) {
        super();
        this.state = {
            handle_message: props.handle_message
        };
    }

    render() {
        const { id, refund_amount, handle_state, dispatch } = this.props;
        const { handle_message } = this.state;
        return (
            <Fragment>
                <View className={styles.infoWarp}>
                    <p className={styles.infoTitle}>退款金额</p>
                    <View className={styles.btnWarp}>
                        <InputNumber
                            style={{ width: 100 }}
                            defaultValue={refund_amount}
                            max={parseFloat(refund_amount)}
                            min={0}
                            precision={2}
                            disabled
                        /> &nbsp;&nbsp;元
                    </View>
                </View>
                <View className={styles.infoWarp}>
                    <p className={styles.infoTitle}>备注</p>
                    <View className={styles.btnWarp}>
                    <TextArea
                        placeholder="请输入备注"
                        autosize={{ minRows: 4, maxRows: 8 }}
                        value={handle_message}
                        disabled={handle_state !== 0}
                        onChange={(e) => {
                            this.setState({
                                handle_message: e.currentTarget.value
                            });
                        }}
                    />
                    </View>
                </View>
                {/*卖家处理状态 默认0处理中(未处理) 10拒绝(驳回) 20同意 30成功(已完成) 50取消(用户主动撤销) 51取消(用户主动收货)*/}
                {handle_state === 0 ? <View className={styles.infoWarp}>
                    <p className={styles.infoTitle}>可执行操作</p>
                    <View className={styles.btnWarp}>
                        <Button
                            type='primary'
                            onClick={() => {
                                dispatch({
                                    type: "refund/handle",
                                    payload: { id, handle_state: 20, handle_message },
                                    callback: () => {
                                        dispatch({
                                            type: "refund/detail",
                                            payload: { id }
                                        });
                                    }
                                });
                            }}
                        >
                            同意申请
                        </Button>

                        <Button
                            onClick={() => {
                                dispatch({
                                    type: "refund/handle",
                                    payload: { id, handle_state: 10, handle_message },
                                    callback: () => {
                                        dispatch({
                                            type: "refund/detail",
                                            payload: { id }
                                        });
                                    }
                                });
                            }}
                        >
                            拒绝退款
                        </Button>
                    </View>
                </View> : null}
            </Fragment>
        );
    }
}
