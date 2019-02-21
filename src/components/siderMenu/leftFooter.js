import React, { PureComponent } from "react";
import styles from "./leftFooter.css";
import { Row, Col, Icon, Modal } from "antd";
import router from "umi/router";
import { connect } from "dva";

const confirm = Modal.confirm;
@connect()
export default class LeftFooter extends PureComponent {
    logout = () => {
        confirm({
            title: "确定要退出吗？",
            okText: "确定",
            cancelText: "取消",
            onOk: () => {
                this.props.dispatch({
                    type: "member/logout"
                });
            }
        });
    };

    render() {
        return (
            <div className={styles.leftFooter}>
                <Row type="flex" justify="space-around" align="middle" style={{ height: 60 }}>
                    <Col>
                        <a onClick={this.logout}>
                            <Icon type="poweroff" />
                        </a>
                    </Col>
                    <Col>
                        <a onClick={() => {
                            router.push("/member/self");
                        }}>
                            <Icon type="user" />
                        </a>
                    </Col>
                </Row>
            </div>
        );
    }
}
