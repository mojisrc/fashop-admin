import React, { PureComponent } from "react";
import styles from "./leftFooter.css";
import { Row, Col, Modal } from "antd";
import { history as router } from "umi";
import { connect } from "umi";
import PoweroffOutlined from "@ant-design/icons/PoweroffOutlined";
import UserOutlined from "@ant-design/icons/UserOutlined"

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
                          <PoweroffOutlined />
                      </a>
                  </Col>
                  <Col>
                      <a onClick={() => {
                          router.push("/member/self");
                      }}>
                          <UserOutlined />
                      </a>
                  </Col>
              </Row>
          </div>
        );
    }
}
