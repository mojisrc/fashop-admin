import React, { Component } from "react";
import { ScrollView } from "@/components/flexView";
import { Card } from "antd";
import Goods from "./goods";
import ImageNav from "./imageNav";
import GoodsList from "./goodsList";
import GoodsSearch from "./goodsSearch";
import Separator from "./separator";
import AuxiliaryBlank from "./auxiliaryBlank";
import ImageAds from "./imageAds";
import ImageGallery from "./imageGallery";
import ShopWindow from "./shopWindow";
import Video from "./video";
import TopMenu from "./topMenu";
import Title from "./title";
import TextNav from "./textNav";
import Coupon from "./coupon/index";
import RichText from "./richText";
import GoodsRelation from "./goodsRelation";
import GoodsGuessLike from "./goodsGuessLike";

export default class PageControl extends Component {
    static defaultProps = {
        goodsGuessLikeRefresh:()=>{}
    }
    // TODO 定义出来所有必须要定义的方法
    render() {
        const { body, options } = this.props;
        const itemData = body[options.index];
        let item = "";
        if (itemData) {
            switch (options.type) {
                case "goods":
                    item = <Goods options={itemData.options} data={itemData.data} getValues={this.props.getValues} />;
                    break;
                case "goods_list":
                    item = <GoodsList
                        options={itemData.options}
                        data={itemData.data}
                        getValues={this.props.getValues}
                        refreshGoods={this.props.goodsListRefreshGoods}
                    />;
                    break;
                case "goods_search":
                    item = <GoodsSearch options={itemData.options} data={{}} getValues={this.props.getValues} />;
                    break;
                case "separator":
                    item = <Separator options={itemData.options} data={{}} getValues={this.props.getValues} />;
                    break;
                case "auxiliary_blank":
                    item = <AuxiliaryBlank options={itemData.options} data={{}} getValues={this.props.getValues} />;
                    break;
                case "image_gallery":
                    item =
                        <ImageGallery
                            options={itemData.options}
                            data={itemData.data}
                                      getValues={this.props.getValues}
                        />;
                    break;
                case "image_ads":
                    item =
                        <ImageAds options={itemData.options} data={itemData.data} getValues={this.props.getValues} />;
                    break;
                case "image_nav":
                    item =
                        <ImageNav options={itemData.options} data={itemData.data} getValues={this.props.getValues} />;
                    break;
                case "shop_window":
                    item =
                        <ShopWindow options={itemData.options} data={itemData.data} getValues={this.props.getValues} />;
                    break;
                case "video":
                    item = <Video options={itemData.options} data={itemData.data} getValues={this.props.getValues} />;
                    break;
                case "top_menu":
                    item = <TopMenu options={itemData.options} data={itemData.data} getValues={this.props.getValues} />;
                    break;
                case "title":
                    item = <Title options={itemData.options} data={itemData.data} getValues={this.props.getValues} />;
                    break;
                case "text_nav":
                    item = <TextNav options={itemData.options} data={itemData.data} getValues={this.props.getValues} />;
                    break;
                case "coupon":
                    item = <Coupon
                        options={itemData.options}
                        data={itemData.data}
                        getValues={this.props.getValues}
                        refreshCoupon={this.props.couponListRefresh}
                    />;
                    break;
                case "rich_text":
                    item = <RichText
                        options={itemData.options}
                        data={itemData.data}
                        getValues={this.props.getValues}
                    />;
                    break;
                case "goods_relation":
                    item = <GoodsRelation
                        options={itemData.options}
                        data={itemData.data}
                        getValues={this.props.getValues}
                    />;
                    break;
                case "goods_guess_like":
                    item = <GoodsGuessLike
                        options={itemData.options}
                        data={itemData.data}
                        getValues={this.props.getValues}
                        refreshGoods={this.props.goodsGuessLikeRefresh}
                    />;
                    break;
                default:
            }
        }
        return (
            <ScrollView style={{ height: "80vh" }} block={true}>
                <Card bordered={false} key={options.index}>{item}</Card>
            </ScrollView>
        );
    }
}
