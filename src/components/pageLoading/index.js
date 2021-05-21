import React from 'react';
import { Spin } from 'antd';

export default class extends React.PureComponent {
    render() {
        if (process.env.NODE_ENV === 'development' && this.props.error) {
            console.error(this.props.error.stack);
            return <div>{this.props.error.stack}</div>;
        }
        return <div style={{
            paddingTop: 100,
            textAlign: 'center'
        }}>
            <Spin size="large" />
        </div>;
    }
};
