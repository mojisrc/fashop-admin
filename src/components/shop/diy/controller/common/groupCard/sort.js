import React, { PureComponent, Fragment } from "react";
import { Divider, Popover} from "antd";
import PropTypes from "prop-types";

export default class GroupCardSort extends PureComponent {
    static propTypes = {
        index: PropTypes.number.isRequired,
        data: PropTypes.array.isRequired,
        onChange: PropTypes.func.isRequired,
        deleteModalContent: PropTypes.node.isRequired
    };
    static defaultProps = {
        index: 0,
        data: [],
        onChange: (data) => {

        },
        onDelete: (data) => {

        },
        deleteModalContent: <Fragment />

    };
    state = {
        visible: false
    };

    hide = () => {
        this.setState({
            visible: false
        });
    };

    handleVisibleChange = (visible) => {
        this.setState({ visible });
    };

    render() {
        const { index, data, onChange } = this.props;
        return <Fragment>
            {
                index > 0 ?
                    <Fragment><a
                        onClick={() => {
                            let _data = data;
                            let add = [_data[index], _data[index - 1]];
                            _data.splice(index - 1, 2, ...add);
                            onChange(_data);
                        }}
                    >
                        上移
                    </a><Divider type="vertical" /></Fragment> : null
            }
            {
                index < data.length - 1 ?
                    <Fragment><a
                        onClick={() => {
                            let _data = data;
                            let add = [_data[index + 1], _data[index]];
                            _data.splice(index, 2, ...add);
                            onChange(_data);
                        }}
                    >
                        下移
                    </a><Divider type="vertical" /></Fragment> : null
            }
            <Popover
                placement="bottom"
                content={
                    <a onClick={() => {
                        let _data = data;
                        _data.splice(index, 1);
                        onChange(_data);
                    }}>确定删除</a>}
                trigger="click"
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
            >
                <a href={"javascript:void(0)"}>
                    删除
                </a>
            </Popover>
        </Fragment>;
    }
}
