// @flow
import React,{ Component } from "react";
import { connect } from "react-redux";
import { View } from "react-web-dom";
import styles from "../../styles/index/index.css";
import { Row, Col } from "antd";

import DataDisplay from '../../components/pageIndex/dataDisplay'
import Charts from '../../components/pageIndex/charts'
import SystemInfo from '../../components/pageIndex/systemInfo'

// import LoginInfo from '../../components/pageIndex/loginInfo'
// import VersionInfo from '../../components/pageIndex/versionInfo'
// import SystemNote from '../../components/pageIndex/systemNote'

class Index extends Component {
    render() {
        return (
            <View className={styles.indexWarp}>
                <Row gutter={24}>
                    <Col span={17+7} >
                        <DataDisplay {...this.props} />
                        <Charts {...this.props} />
                        <SystemInfo {...this.props} />
                    </Col>
                    {/*<Col span={7}>*/}
                        {/*<LoginInfo {...this.props} />*/}
                        {/*<VersionInfo {...this.props} />*/}
                        {/*<SystemNote {...this.props} />*/}
                    {/*</Col>*/}
                </Row>
            </View>
        )
    }
}

const portal = store => {
    return {
        login: store.app.member.login
    }
}

export default connect(portal)(Index)
