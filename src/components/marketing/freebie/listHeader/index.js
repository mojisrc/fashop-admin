import React, { Component } from "react";
import { Button, Input, Select, Form } from "antd";
import Query from "@/utils/query";
import { getQueryPath } from "@/utils/index";

const Option = Select.Option;
const FormItem = Form.Item;
const status_list = [
    {
        id: "all",
        title: "全部"
    }, {
        id: "1",
        title: "未开始"
    }, {
        id: "2",
        title: "进行中"
    }, {
        id: "3",
        title: "已结束"
    }
];

@Form.create()
export default class FreebieListHeader extends Component {
    state = {
        queryParams: {
            title: "all",
        }
    };
    componentDidMount() {
        const params = Query.getQuery();
        this.setState({
            queryParams: {
                title: params["title"] !== undefined ? params["title"] : "",
            }
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            const path = getQueryPath("/goods/list", {
                page: 1,
                rows: 10,
                title: values.title,
            });
            router.push(path);
        });
    };

    render() {
        const { form, loading } = this.props;
        const { getFieldDecorator } = form;
        const { title } = this.state.queryParams;
        return (
            <Form
                layout="inline"
                style={{
                    paddingBottom: "24px",
                    marginBottom: "24px",
                    borderBottom: "1px dashed #ededed"
                }}
                onSubmit={this.handleSubmit}
            >
                <FormItem label="赠品名称">
                    {getFieldDecorator("title", { initialValue: title })(
                        <Input
                            placeholder='请输入赠品名称'
                        />
                    )}
                </FormItem>
                <FormItem>
                    <Button
                        type="primary"
                        style={{ marginRight: 15 }}
                        htmlType="submit"
                        loading={loading}
                    >
                        筛选
                    </Button>
                </FormItem>
            </Form>
        );
    }
}
