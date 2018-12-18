import React,{ Component } from 'react'
import { Form, Input, Button, Upload, Tooltip, Popover, Icon, Checkbox, message, Spin } from 'antd';
import { View } from '@/components/flexView'

const FormItem = Form.Item;
const { TextArea } = Input
//
// type Props = {
//     hideModal:Function
// }
// type State = {
//     fileList:Array<{}>,
//     file:{}
// }

@Form.create()
export default class AddVideoForm extends Component {
    state = {
        fileList:[],
        file:{},
        loading:false
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { form, hideModal } = this.props
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.setState({
                    loading:true
                })
                const { file } = this.state
                let formData = new FormData()
                formData.append('media',file)
                formData.append('title',values.title)
                formData.append('description',values.description)
                let url = `${env.domain}/admin/wechat/materialUploadVideo`
                Fetch.formData(url,formData)
                .then((e)=>{
                    console.log('handleChange',e);
                    if(e.code===0){
                        message.success('上传成功！')
                        this.setState({
                            loading:false
                        })
                        hideModal(e.result,file)
                    }
                })
            }
        })
    }
    normFile = (e:{file:{status:string},fileList:Array<{}>}) => {
        console.log('Upload event:', e);
        if(e.file.status==='removed'){
            this.setState({fileList:[]})
        }else {
            e.fileList=[e.file]
            this.setState({fileList:e.fileList})
        }
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }
    render() {
        const { form, hideModal } = this.props
        const { getFieldDecorator } = form
        const { fileList, loading } = this.state;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        }
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 20,
                    offset: 4,
                },
            },
        }
        const formatContent = (
            <div>
                <p>常见在线流媒体格式：mp4、flv、f4v、webm</p>
                <p>移动设备格式：m4v、mov、3gp、3g2</p>
                <p>RealPlayer ：rm、rmvb</p>
                <p>微软格式 ：wmv、avi、asf</p>
                <p>MPEG 视频 ：mpg、mpeg、mpe、ts</p>
                <p>DV格式 ：div、dv、divx</p>
                <p>其他格式 ：vob、dat、mkv、swf、lavf、cpk、dirac、ram、qt、fli、flc、mod</p>
                <p>主流音频格式：mp3、aac、ac3、wav、m4a、ogg</p>
            </div>
        );
        const flowContent = (
            <div>
                <p>1.上传：将视频上传至服务器，需视频和文案资料完成才能完成上传。</p>
                <p>2.转码：上传成功后服务器将视频转码成播放器可识别的格式。</p>
                <p>3.审核：转码完成后视频进入内容审核阶段。</p>
                <p>4.可用：只有审核通过的视频素材才可以被使用。</p>
            </div>
        );
        return (
            <Spin tip="Loading..." spinning={loading}>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="上传视频"
                        extra={[
                            <p key='0'>
                                视频不能超过10M，支持mp4格式
                                <Popover
                                    content={formatContent}
                                    title="视频格式"
                                >
                                    <a>视频格式</a>
                                </Popover>
                            </p>
                        ]}
                    >
                        {getFieldDecorator('upload', {
                            valuePropName: 'fileList',
                            getValueFromEvent: this.normFile,
                            rules: [{ required: true, message: '请上传语音!'}],
                        })(
                            <Upload
                                showUploadList={false}
                                beforeUpload={beforeUpload}
                                customRequest={({file})=>{
                                    this.setState({
                                        file
                                    })
                                }}
                            >
                                <Button>
                                    <Icon type="upload" /> {fileList.length ? '重新上传' : '上传'}
                                </Button>
                            </Upload>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='标题'
                        extra='长度必须在1到21位之间'
                        hasFeedback
                    >
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: '请输入视频标题!'}],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label='封面'
                    >
                        <span>
                            视频转码完成后可以设置封面图&nbsp;
                            <Tooltip title="视频转码完成后，进入编辑页面可以选择视频内的画面作为视频封面。如果不作选择，默认封面为视频的第一帧。">
                                <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    </FormItem>
                    {/* <FormItem
                        {...formItemLayout}
                        label='分类'
                    >
                        {getFieldDecorator('sort', {
                            initialValue:'lucy',
                            rules: [{ required: true, message: '请输入视频标题!', whitespace: true, pattern: /^S{1,21}$/ }],
                        })(
                            <Select
                                style={{ width: 200 }}
                                // onChange={handleChange}
                            >
                                <OptGroup label="Manager">
                                    <Option value="jack">Jack</Option>
                                    <Option value="lucy">Lucy</Option>
                                </OptGroup>
                                <OptGroup label="Engineer">
                                    <Option value="Yiminghe">yiminghe</Option>
                                </OptGroup>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label={(
                            <span>
                                标签&nbsp;
                                <Tooltip title="标签用回车分开，填写与视频内容相关的标签，你的视频会被合理的分类整理">
                                    <Icon type="question-circle-o" />
                                </Tooltip>
                            </span>
                        )}
                        hasFeedback
                    >
                        {getFieldDecorator('tags', {
                            rules: [{ required: true, message: '请输入街道地址!', whitespace: true }],
                        })(
                            <Select
                                mode="tags"
                                style={{ width: '100%' }}
                                onChange={(value)=>{
                                    console.log(`selected ${value}`)
                                }}
                                tokenSeparators={[',']}
                            />
                        )}
                    </FormItem> */}
                    <FormItem
                        {...formItemLayout}
                        label='介绍语'
                        hasFeedback
                    >
                        {getFieldDecorator('description', {
                            rules: [{ required: true, message: '请输入街道地址!' }],
                        })(
                            <TextArea
                                // style={{ width: 240 }}
                                type="textarea"
                                autosize={{ minRows: 3, maxRows: 6 }}
                            />
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout} style={{ marginTop: 28 }}>
                        不得上传未经授权的他人作品，以及色情、反动等违法视频。查看
                        <Popover
                            content={flowContent}
                            title="视频处理流程"
                        >
                            <a>视频处理流程</a>
                        </Popover>
                    </FormItem>
                    <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
                        {getFieldDecorator('agreement', {
                            valuePropName: 'checked',
                        })(
                            <Checkbox> 我已阅读并同意 <a target="_blank" href="http://v.qq.com/help/help_agreement.html">《腾讯视频上传服务规则》</a></Checkbox>
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button
                            onClick={()=>{
                                this.props.hideModal()
                            }}
                        >
                            取消
                        </Button>
                        <Button
                            style={{marginLeft:'20px'}}
                            type="primary"
                            htmlType="submit"
                        >
                            添加
                        </Button>
                    </FormItem>
                </Form>
            </Spin>
       )
   }
}

function beforeUpload(file) {
  const isvideo = file.type === 'video/mp4';
  if (!isvideo) {
    message.error('只能上传音频文件!');
  }
  const isLt10M = file.size / 1024 / 1024 < 10;
  if (!isLt10M) {
    message.error('视频不能超过10M!');
  }
  return isvideo && isLt10M;
}
