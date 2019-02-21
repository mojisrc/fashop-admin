import React, { Component } from "react";
import {
    Row,
    Col,
    Button,
    Modal,
    Input,
    Icon,
    Checkbox,
    Upload,
    Popover,
    Layout,
    Menu,
    Card,
    message,
} from "antd";
import { View } from "@/components/flexView"
import styles from "./index.css";

const { Content, Sider } = Layout;

export default class ImagesModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectImgMenu:[
                {
                    id:1,
                    title:'全部图片',
                    img:[
                        {
                            id:1,
                            checked:false,
                            name:'家用电器.jpg',
                            url:'http://img.alicdn.com/tfs/TB1vRn1SFXXXXblXXXXXXXXXXXX-350-350.jpg_240x240xz.jpg_.webp'
                        },{
                            id:2,
                            checked:false,
                            name:'家用电器.jpg',
                            url:'http://img.alicdn.com/tfs/TB18THISFXXXXXSXFXXXXXXXXXX-350-350.jpg_240x240xz.jpg_.webp'
                        }
                    ]
                },{
                    id:2,
                    title:'未分组',
                    img:[
                        {
                            id:1,
                            checked:false,
                            name:'家用电器.jpg',
                            url:'http://img.alicdn.com/tfs/TB1vRn1SFXXXXblXXXXXXXXXXXX-350-350.jpg_240x240xz.jpg_.webp'
                        }
                    ]
                },{
                    id:'3',
                    title:'文章配图',
                    img:[
                        {
                            id:2,
                            checked:false,
                            name:'家用电器.jpg',
                            url:'http://img.alicdn.com/tfs/TB18THISFXXXXXSXFXXXXXXXXXX-350-350.jpg_240x240xz.jpg_.webp'
                        }
                    ]
                }
            ],
            imgGroupSelectedKeys:[1],
            contentImgList:[],
        }
    }
    componentDidMount(){
        this.setState({
            contentImgList:this.state.selectImgMenu[0].img
        })
    }
    menuClick = ({item, key, keyPath}) => {
        // console.log('item',item);
        // console.log('key',key);
        // console.log('keyPath',keyPath);
        this.state.selectImgMenu.map((item,index)=>{
            if(item.id===key){
                this.setState({contentImgList:item.img})
            }
        })
        this.setState({imgGroupSelectedKeys:keyPath})
    }
    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    beforeUpload = (file) => {
        // const isJPG = file.type === 'image/jpeg';
        // if (!isJPG) {
        //     message.error('You can only upload JPG file!');
        // }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        // return isJPG && isLt2M;
        return isLt2M;
    }
    handleChange = (info) => {
        if (info.file.status === 'done') {
            this.getBase64(info.file.originFileObj, imageUrl => {
                console.log('imageUrl',imageUrl)
            });
        }else {
            message.error('上传失败')
        }
    }
    render() {
        const content = (
            <View className={styles.createGroup}>
                <Input
                    onChange={(e)=>{
                        console.log(e.target.value);
                        this.setState({imgGroupNameInput:e.target.value})
                    }}
                />
                <View className={styles.createGroupBtn}>
                    <Button
                        type='primary'
                        onClick={()=>{
                            console.log('后台添加分组');
                            console.log('imgGroupNameInput',this.state.imgGroupNameInput);
                            this.setState({createGroupVisible:false})
                        }}
                    >
                        确定
                    </Button>
                    <Button
                        onClick={()=>{
                            this.setState({createGroupVisible:false})
                        }}
                    >
                        取消
                    </Button>
                </View>
            </View>
        )
        const {
            imgModalShow,
            okModal,
            closeModal,
        } = this.props
        const { selectImgMenu } = this.state
        // console.log('selectImgMenu',selectImgMenu);
        return(
            <Modal
                title="选择图片"
                zIndex={1031}
                wrapClassName='selectImg'
                visible={imgModalShow}
                onOk={()=>{
                    let imgParamsList = []
                    selectImgMenu[0].img.map((item,index)=>{
                        if(item.checked){
                            imgParamsList.push(item)
                        }
                    })
                    if(imgParamsList.length){
                        okModal(imgParamsList)
                        closeModal()
                    }else {
                        message.warning('请选择图片',2);
                    }
                }}
                onCancel={()=>{
                    closeModal()
                }}
                okText="确认"
                cancelText="取消"
            >
                <Layout style={{ padding: '24px 0', background: '#fff' }}>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            selectedKeys={this.state.imgGroupSelectedKeys}
                            style={{ height: '100%' }}
                            onClick={this.menuClick}
                        >
                            {
                                selectImgMenu.map((selectImgMenuItem,index)=>(
                                    <Menu.Item key={selectImgMenuItem.id}>
                                        <span>
                                            {selectImgMenuItem.title}
                                            （{selectImgMenuItem.img.length}）
                                        </span>
                                    </Menu.Item>
                                ))
                            }
                        </Menu>
                        <Popover
                            visible={this.state.createGroupVisible}
                            onVisibleChange={(createGroupVisible)=>{
                                this.setState({createGroupVisible})
                            }}
                            content={content}
                            title="创建分组"
                            trigger="click"
                            placement="bottom"
                        >
                            <span
                                style={{paddingLeft: '24px'}}
                                onClick={()=>{
                                    this.setState({createGroupVisible:true})
                                }}
                            >
                                <Icon type="plus" style={{fontWeight: '900'}}/>
                                <span className="nav-text">
                                    新建分组
                                </span>
                            </span>
                        </Popover>
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 280 }}>
                        <Upload
                            showUploadList={false}
                            beforeUpload={this.beforeUpload}
                            onChange={this.handleChange}
                        >
                            <Button
                                 style={{ marginBottom: '10px' }}
                                 icon='upload'
                            >
                                本地上传
                            </Button>
                        </Upload>
                        <Row>
                            {
                                this.state.contentImgList.map((contentImgListItem,index)=>(
                                    <Col span="8"  key={index}>
                                        <Card
                                            style={{
                                                border: '1px solid #e9e9e9',
                                                width:'90%'
                                            }}
                                            bodyStyle={{ padding: 0 }}
                                            bordered={true}
                                            onClick={()=>{
                                                contentImgListItem.checked=!contentImgListItem.checked
                                                this.setState({})
                                            }}
                                        >
                                            <View>
                                                <img
                                                    style={{width:'100%'}}
                                                    src={contentImgListItem.url}
                                                    alt='contentImgListItem'
                                                />
                                            </View>
                                            <View className={styles.contentImgListBot}>
                                                <p>{contentImgListItem.name}</p>
                                                <Checkbox
                                                    checked={contentImgListItem.checked}
                                                    onChange={(e)=>{
                                                        selectImgMenu.map((item,i)=>{
                                                            item.img.map((itemImg,j)=>{
                                                                if(itemImg.id===contentImgListItem.id){
                                                                    itemImg.checked=e.target.checked
                                                                }
                                                            })
                                                        })
                                                        this.setState({})
                                                    }}
                                                />
                                            </View>
                                        </Card>
                                    </Col>
                                ))
                            }
                        </Row>
                    </Content>
                </Layout>
            </Modal>
        )
    }
}
