import React, { Component } from "react";
import { ScrollView } from "react-web-dom";
import { Card} from "antd";
import Goods from "./goods";
import ImageNav from "./imageNav";
import GoodsList from "./goodsList";
import GoodsSearch from "./goodsSearch";
import Separator from "./separator";
import AuxiliaryBlank from "./auxiliaryBlank";
import ImageAds from "./imageAds";
import ShopWindow from "./shopWindow";
import Video from "./video";
import TopMenu from "./topMenu";
import Title from "./title";
import TextNav from "./textNav";
import GoodsGroup from "./goodsGroup";

// type Props = {
//     options: optionsType,
//     body: PageBodyType,
//     setPage: Function,
//     getValues: Function,
//     goodsListRefreshGoods: Function
// }
// type State = {}

export default class PageControl extends Component {
    render() {
        const { body, options } = this.props
        const itemData = body[options.index]
        let item = ''
        if (itemData) {
            switch (options.type) {
                case 'goods':
                    item = <Goods options={itemData.options} data={itemData.data} getValues={this.props.getValues} />
                    break
                case 'goods_list':
                    item = <GoodsList
                        options={itemData.options}
                        data={itemData.data}
                        getValues={this.props.getValues}
                        refreshGoods={this.props.goodsListRefreshGoods}
                    />
                    break
                case 'goods_search':
                    item = <GoodsSearch options={itemData.options} data={{}} getValues={this.props.getValues} />
                    break
                case 'separator':
                    item = <Separator options={itemData.options} data={{}} getValues={this.props.getValues} />
                    break
                case 'auxiliary_blank':
                    item = <AuxiliaryBlank options={itemData.options} data={{}} getValues={this.props.getValues} />
                    break
                case 'image_ads':
                    item = <ImageAds options={itemData.options} data={itemData.data} getValues={this.props.getValues} />
                    break
                case 'image_nav':
                    item = <ImageNav options={itemData.options} data={itemData.data} getValues={this.props.getValues} />
                    break
                case 'shop_window':
                    item =
                        <ShopWindow options={itemData.options} data={itemData.data} getValues={this.props.getValues} />
                    break
                case 'video':
                    item = <Video options={itemData.options} data={itemData.data} getValues={this.props.getValues} />
                    break
                case 'top_menu':
                    item = <TopMenu options={itemData.options} data={itemData.data} getValues={this.props.getValues} />
                    break
                case 'title':
                    item = <Title options={itemData.options} data={itemData.data} getValues={this.props.getValues} />
                    break
                case 'text_nav':
                    item = <TextNav options={itemData.options} data={itemData.data} getValues={this.props.getValues} />
                    break
                case 'goods_group':
                    item = <GoodsGroup
                        options={itemData.options}
                        data={itemData.data}
                        getValues={this.props.getValues}
                        refreshGoods={this.props.goodsGroupRefreshGoods}
                    />;
                    break
                default:

            }
        }
        return (
            <ScrollView style={{height:'80vh'}} block={true}>
                <Card bordered={false}>{item}</Card>
            </ScrollView>
        )
    }
}
