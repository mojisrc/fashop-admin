//@flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { View } from "react-web-dom";
import { Form, Input, TreeSelect, Upload, Icon, message } from "antd";
import styles from './index.css'
import { imageUpload } from "../../../../utils";

const FormItem = Form.Item;
const TreeNode = TreeSelect.TreeNode;
type Props = {
    openPhotoGallery: Function,
    location: { state: { type: string, record: {} }, search: string },
    history: { push: Function },
    form: {
        getFieldDecorator: Function,
        setFieldsValue: Function,
    },
    formItemLayout: {},
    categoryTree: Array<{}>,
    openPreviewModal: Function
}
type State = {}
@connect()
export default class Basic extends Component<Props, State> {
    state = {
        fileList: []
    };
    componentWillMount () {
        let fileList = [];
        if(this.props.images){
            for(let i = 0; i < this.props.images.length; i++){
                let img = {
                    uid: i,
                    status: 'done',
                    url: this.props.images[i]
                }
                fileList.push(img);
            }
        }
        this.setState({fileList});
    };
    triggerChange = (e: { origin: { path: string } }) => {
        const fileList = this.state.fileList;
        for(let i = 0; i < fileList.length; i++){
            let tmp = fileList[i];
            if(tmp.status == "uploading"){
                fileList.splice(i,1);
            }
        }
        let newImg = {
            uid: fileList.length,
            status: 'done',
            url: e.origin.path,
        }
        fileList.push(newImg);
        this.setState({fileList});
    }
    handleChange = ({ fileList }) => this.setState({ fileList })
    render() {
        const { form, formItemLayout, history, openPhotoGallery, categoryTree, openPreviewModal, title, images, categoryIds } = this.props
        const { getFieldDecorator, setFieldsValue } = form
        const { fileList} = this.state
        const uploadButton = (
            <View className={styles.uploadBtn}>
                <Icon type='plus' />
                <p>Upload</p>
            </View>
        );
        let is_save = 1;
        // TreeSelect 只接受string
        let _categoryIds = []

        if(Array.isArray(categoryIds) && categoryIds.length>0){
            _categoryIds = categoryIds.map((item) => {
                return item + ''
            })
        }
        console.log(fileList)
        return (
            <View className={styles.goodsItem}>
                <h3>基本信息</h3>
                <FormItem
                    {...formItemLayout}
                    label='商品图'
                >
                    {getFieldDecorator('images', {
                        rules: [{ required: true, message: '请选择商品图!' }],
                        valuePropName: 'url',
                        initialValue: images,
                    })(
                        <Upload
                            listType='picture-card'
                            fileList={fileList}
                            beforeUpload={beforeUpload}
                            customRequest={({ file }) => {
                                imageUpload({
                                    file,
                                    onSuccess: this.triggerChange,
                                    is_save,
                                })
                            }}
                            onChange={this.handleChange}
                        >
                            {fileList.length >= 5 ? null : uploadButton}
                        </Upload>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='商品名称'
                >
                    {getFieldDecorator('title', {
                        rules: [{ required: true, message: '请输入商品名称!' }],
                        initialValue: title,
                    })(
                        <Input
                            placeholder="请输入商品名称"
                        />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label='商品分类'
                >
                    {getFieldDecorator('category_ids', {
                        initialValue: _categoryIds,
                        rules: [{ required: true, message: '请选择商品分类!' }],
                    })(
                        <TreeSelect
                            showSearch
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="请选择商品分类"
                            allowClear
                            multiple
                            treeDefaultExpandAll
                            onChange={(value) => {
                                setFieldsValue({
                                    category_ids: value
                                })
                            }}
                        >
                            {
                                categoryTree.map((item) =>
                                    <TreeNode value={`${item.id}`} title={item.name} key={item.id}>
                                        {
                                            item.children && item.children.map((sub) =>
                                                <TreeNode value={`${sub.id}`} title={sub.name} key={sub.id} >
                                                    {
                                                        sub.children && sub.children.map((thr) =>
                                                            <TreeNode value={`${thr.id}`} title={thr.name} key={thr.id} />
                                                        )
                                                    }
                                                </TreeNode>
                                            )
                                        }
                                    </TreeNode>
                                )
                            }
                        </TreeSelect>
                    )}
                    <a
                        onClick={() => {
                            history.push('/goods/category/add')
                        }}
                    >
                        新增分类
                    </a>
                </FormItem>
            </View>
        )
    }
}
function beforeUpload(file) {
    const isImage = file.type.includes('image') !== -1;
    if (!isImage) {
        message.error('你只能上传图片!');
    }
    const isLimit = file.size / 1024 / 1024 < 5;
    if (!isLimit) {
        message.error('图片不能超过5MB!');
    }
    return isImage && isLimit;
}
