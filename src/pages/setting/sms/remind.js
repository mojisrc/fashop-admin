import React,{ Component } from "react";
import {Link} from 'react-router-dom';
import { connect } from 'dva';
import {Switch,Input,Button,Form, Row, Col, Layout, Table,Card} from 'antd';
import delivePublic from '@/styles/setting/delivePublic.css'
import PropTypes from 'prop-types'
const {  Footer} = Layout;
const FormItem = Form.Item;
let checkSwitchs = true;
@Form.create()
@connect(
    ({
        app:{setting:{sceneList}}
    }) => ({sceneList}),
    {settingSmspro,sendSmscene}
)
export default class Remind extends Component{
    static propTypes = {
        settingSmspro: PropTypes.func.isRequired,
    }
    static defaultProps = {
        settingSmspro: ()=>{},
    }
    componentDidMount(){
        this.props.sendSmscene()
    }
    handleSelectChange = (value) => {
        this.props.form.setFieldsValue({
          note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
        });
      }
      onChange1(checked) {
        checkSwitchs=checked
      }
      handleSubmit = (e) => {
        e.preventDefault();
        const {settingSmspro} = this.props;
        this.props.form.validateFields((err, values) => {
          if (!err) {
            settingSmspro({params:{type:'aliyun',config:[values.KeyID,values.KeySecret],status:checkSwitchs}})
          }
        });
      }
  render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 14 },
        };
        const data=[];
        const {sceneList} = this.props;
        for(let i of sceneList){
            data.push({
                key:i.id,
                id:i.id,
                name:i.name,
                sign:i.sign,
                signature:i.signature,
                provider_template_id:i.provider_template_id
            })
        }
        const columns = [{
            title: '模版名称',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '模版ID',
            dataIndex: 'id',
            key: 'id',
        }, {
            title: '签名',
            dataIndex: 'signature',
            key: 'signature',
        }, {
            title: '操作',
            key: 'action',
            render: (text,datas) => {
            let path={
                pathname:'/setting/smsEdit',
                state:datas,
            }
            return(
            <span>
                <Link to={path}>
                        编辑
                </Link>
            </span>
            )}
        }];
    return(
        <div className={delivePublic.tabPane}>
            <Row className={delivePublic.tabTop}>
                <Col span={18}  className={delivePublic.tabLeftForm}>
                    <Form  onSubmit={this.handleSubmit}>
                        <FormItem
                        {...formItemLayout}
                        label="阿里云短信"
                        >
                            <span className="ant-form-text"><a href="https://help.aliyun.com/document_detail/55327.html?from=fashop">立即申请</a></span>
                        </FormItem>
                        <FormItem
                        label="Access KeyID"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 12 }}
                        >
                        {getFieldDecorator('KeyID', {
                            rules: [{ required: true, message: '请输入内容' }],
                        })(
                            <Input placeholder="请输入"  />
                        )}
                        </FormItem>
                        <FormItem
                        label="Access KeySecret"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 12 }}
                        >
                        {getFieldDecorator('KeySecret', {
                            rules: [{ required: true, message: '请输入内容' }],
                        })(
                            <Input placeholder="请输入"  />
                        )}
                        </FormItem>
                        <FormItem
                        wrapperCol={{ span: 12, offset: 3 }}
                        >
                            <Button type="primary" htmlType="submit">
                                保存
                            </Button>
                        </FormItem>
                    </Form>
                </Col>
                <Col span={2} offset={4}>
                    <Switch style={{float: 'right',}} defaultChecked onChange={this.onChange1.bind(this)} />
                </Col>
            </Row>
            <Row type="flex" justify="space-between"  align="middle" className={delivePublic.tabCenter}>
                <Col span={4}>
                    示例其他短信 <a href="javascript:;">立即申请</a>
                </Col>
                <Col span={2}>
                    <Switch style={{float: 'right',}} defaultChecked onChange={this.onChange} />
                </Col>
            </Row>
            <Footer className={delivePublic.tabFooter}>
                <h3>使用场景</h3>
                <Table
                    columns={columns}
                    dataSource={data}
                />
            </Footer>
        </div>
    )
  }
}
