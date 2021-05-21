import { Form } from '@ant-design/compatible';
import React, { Component } from "react";
import { message, Modal } from "antd";
import { connect } from "umi";
import {  Input, Button, TreeSelect } from "antd";
import Arr from "@/utils/array";
import _ from "lodash";

const FormItem = Form.Item;

@Form.create()
@connect(({ image, loading }) => ({
    imageFolder: image.folderList.result,
    imageFolderLoading: loading.effects["image/folderList"],
    submitLoading: loading.effects["image/folderAdd"]
}), null, null, {
    forwardRef: true
})
export default class FolderAdd extends Component {
    static defaultProps = {
        imageFolderLoading: true,
        imageFolder: {
            list: []
        },
        onSubmit: () => {
        }
    };
    state = {
        visible: false,
        folderTree: []
    };

    show(e) {
        this.setState({
            visible: true
        }, () => {
            this.init();
            if (e && typeof e['pid'] !== "undefined") {
                const { form: { setFieldsValue } } = this.props;
                setFieldsValue({
                    pid: e['pid']
                });
            }
        });
    }

    close() {
        this.setState({
            visible: false
        });
    }

    init = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "image/folderList",
            callback: (response) => {
                const folderTree = Arr.toTree(response.result.list);
                const loop = data =>
                    data.map(item => {
                        let _item = {
                            title: item.title,
                            value: `${item.id}`,
                            key: `${item.id}`
                        };
                        if (typeof item["children"] !== "undefined" && !_.isEmpty(item.children)) {
                            _item["children"] = loop(item.children);
                        }
                        return _item;
                    });
                this.setState({
                    folderTree: loop(folderTree)
                });

            }
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const { dispatch } = this.props;
            if (!err) {
                dispatch({
                    type: "image/folderAdd",
                    payload: values,
                    callback: (response) => {
                        if (response.code === 0) {
                            this.props.onSubmit();
                        } else {
                            message.error(response.msg);
                        }
                    }
                });
            } else {
                message.error(err);
            }
        });
    };


    render() {
        const { visible, folderTree } = this.state;
        const { submitLoading } = this.props;
        const { getFieldDecorator } = this.props.form;
        return <Modal
            title="新建文件夹"
            visible={visible}
            width={756}
            footer={false}
            onCancel={() => {
                this.setState({
                    visible: false
                });
            }}
        >

            <Form onSubmit={this.handleSubmit} style={{ maxWidth: 600 }}>
                <FormItem
                    label="上级文件夹"
                    help="如不选择，则默认为根目录文件夹"
                    {...formItemLayout}
                >
                    {getFieldDecorator("pid")(
                        <TreeSelect
                            treeData={folderTree}
                            showSearch
                            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                            placeholder="请输入文件夹名称"
                            allowClear
                            treeDefaultExpandAll
                        />
                    )}
                </FormItem>
                <FormItem
                    label="分组名称"
                    {...formItemLayout}
                >
                    {getFieldDecorator("title", {
                        rules: [{
                            required: true,
                            message: "请输入分组名称"
                        }]
                    })(
                        <Input
                            placeholder='请输入分组名称，长度不超过10个字'
                            style={{ width: "100%" }}
                        />
                    )}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" loading={submitLoading}>保存</Button>
                </FormItem>
            </Form>
        </Modal>;
    }
}
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
    }
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0
        },
        sm: {
            span: 16,
            offset: 4
        }
    }
};

