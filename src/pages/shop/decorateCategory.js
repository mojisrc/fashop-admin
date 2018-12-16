import React,{ Component } from "react";
import { Row, Col,Button } from 'antd';
import { View } from "react-web-dom";
import styles from '@/styles/shop/shopSort.css'
import Page from '@/components/public/page'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { connect } from "dva";
@connect(({ shop, loading }) => ({
    shopInfo: shop.info.result,
    shopInfoLoading: loading.effects["shop/info"]
}))
export default class DecorateCategory extends Component {
    state = {
        availableList : [
            {
                link:'http://www.domain.cn/mobile',
                img:require('../../assets/images/shop/fen_chaoshi.jpg'),
                title:'超市1',
            }, {
                link:'http://www.domain.cn/mobile',
                img:require('../../assets/images/shop/fen_dianzi.jpg'),
                title:'电子1',
            }, {
                link:'http://www.domain.cn/mobile',
                img:require('../../assets/images/shop/fen_meizhuang.jpg'),
                title:'美妆1',
            }
        ],
    }
    componentDidMount() {
        this.props.info()
    }
    render() {
        const { availableList } = this.state
        const { shopInfo, editGoodsCategoryStyle } = this.props
        let currentShow = shopInfo.info ? availableList.filter((filterItem,index)=>{
            return shopInfo.info.goods_category_style===index
        })[0] : {}
        return (
            <Page>
                <Row gutter={16}>
                    {/*<Col span={8}>*/}
                        {/*<View className={styles.leftimgWarp}>*/}
                            {/*<img*/}
                                {/*src={currentShow.img}*/}
                                {/*alt=''*/}
                            {/*/>*/}
                        {/*</View>*/}
                    {/*</Col>*/}
                    <Col span={16}>
                        {/*
                        <View className={styles.currentModuleWarp}>
                            <h3>页面信息</h3>
                            <Row gutter={16}>
                                <Col span={24}>
                                    <View className={styles.currentRight}>
                                        <View className={styles.top}>
                                            <View className={styles.qrcodeWarp}>
                                                <QRCode
                                                    value={currentShow.link}
                                                    // logo={require('../../images/logo-black.png')}
                                                    // logoWidth={68}
                                                    // logoHeight={20}
                                                />
                                            </View>
                                            <View className={styles.currentInfo}>
                                                <p className={styles.hint}>手机扫描此二维码，可直接在手机上访问店铺</p>
                                                <p>
                                                    <span className={styles.hintLeft}>店铺网址：</span>
                                                    <span
                                                        style={{
                                                            marginRight:'10px'
                                                        }}
                                                    >
                                                        {currentShow.link}
                                                    </span>
                                                    <CopyToClipboard
                                                        text={currentShow.link}
                                                        onCopy={() => message.success('复制成功！',1)}
                                                    >
                                                        <a>复制</a>
                                                    </CopyToClipboard>
                                                </p>
                                                <View className={styles.currentBtnWarp}>
                                                    <Button type='primary'>预览</Button>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </Col>
                            </Row>
                        </View>
                        */}
                        <View>
                            {/*<h3>页面风格</h3>*/}
                            <Row gutter={16}>
                                {
                                    availableList.map((availableListItem,index) =>
                                        <Col xl={8} lg={8} key={index}>
                                            <View className={styles.availableListItemWarp}>
                                                <View
                                                    className={styles.imgWarp}
                                                    style={
                                                        shopInfo.info&&shopInfo.info.goods_category_style===index ? {
                                                            borderColor:'#188fff'
                                                        } : {}
                                                    }
                                                >
                                                    <img
                                                        src={availableListItem.img}
                                                        alt=''
                                                    />
                                                    <View
                                                        className={
                                                            shopInfo.info&&shopInfo.info.goods_category_style!==index ?
                                                            styles.hoverShow : styles.hoverHide
                                                        }
                                                    >
                                                        <Button
                                                            type='primary'
                                                            onClick={()=>{
                                                                editGoodsCategoryStyle({
                                                                    params:{
                                                                        goods_category_style:index
                                                                    }
                                                                })
                                                            }}
                                                        >
                                                            启用
                                                        </Button>
                                                    </View>
                                                </View>
                                                <p
                                                    style={
                                                        shopInfo.info&&shopInfo.info.goods_category_style===index ? {
                                                            color:'#188fff'
                                                        } : {}
                                                    }
                                                >
                                                    {shopInfo.info&&shopInfo.info.goods_category_style === index ? '当前使用：' : ''}{availableListItem.title}
                                                </p>
                                            </View>
                                        </Col>
                                    )
                                }
                            </Row>
                        </View>
                    </Col>
                </Row>
            </Page>
        )
    }
}
