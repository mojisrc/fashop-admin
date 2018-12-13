import React, { Component } from "react";
import {
    // Layout,
    Menu,
    // Breadcrumb,
    Icon,
    // Row,
    // Col,
    Table,
    Dropdown,
    Button
} from "antd";
import styles from "./index.css";
// import { withRouter, Link } from "react-router-dom";
// import { View } from "react-web-dom";
import { data } from "./testData";

const handleMenuClick = (record, e) => {
    // if (e.key === 1) {
    //   onEditItem(record)
    // } else if (e.key === 2) {
    //   confirm({
    //     title: 'Are you sure delete this record?',
    //     onOk () {
    //       onDeleteItem(record.id)
    //     },
    //   })
    // }
};


const DropOption = ({
    onMenuClick,
    menuOptions = [],
    buttonStyle,
    dropdownProps
}) => {
    const menu = menuOptions.map(item => (
        <Menu.Item key={item.key}>{item.name}</Menu.Item>
    ));
    return (
        <Dropdown
            overlay={<Menu onClick={onMenuClick}>{menu}</Menu>}
            {...dropdownProps}
        >
            <Button style={{ border: "none", ...buttonStyle }}>
                <Icon style={{ marginRight: 2 }} type="bars" />
                <Icon type="down" />
            </Button>
        </Dropdown>
    );
};

const columns = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
        className: styles.column
    },
    {
        title: "key",
        dataIndex: "key",
        key: "key",
        className: styles.column
    },
    {
        title: "标题",
        dataIndex: "title",
        key: "title",
        className: styles.column
    },
    {
        title: "分组",
        dataIndex: "group",
        key: "group",
        className: styles.column
    },
    {
        title: "数据类型",
        dataIndex: "type",
        key: "type",
        className: styles.column
    },
    {
        title: "操作",
        key: "operation",
        width: 100,
        render: (text, record) => {
            return (
                <DropOption
                    onMenuClick={e => handleMenuClick(record, e)}
                    menuOptions={[
                        { key: "1", name: "编辑" },
                        { key: "2", name: "删除" }
                    ]}
                />
            );
        },
        className: styles.column
    }
];

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(
            `selectedRowKeys: ${selectedRowKeys}`,
            "selectedRows: ",
            selectedRows
        );
    },
    getCheckboxProps: record => ({
        disabled: record.name === "Disabled User" // Column configuration not to be checked
    })
};

export default class ManageConfigTable extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Table
                bordered
                scroll={{ x: 1250 }}
                columns={columns}
                simple
                rowKey={record => record.id}
                dataSource={data}
                pagination={{
                    showQuickJumper: true,
                    showSizeChanger: true
                }}
                rowSelection={rowSelection}
            />
        );
    }
}
