import React,{ Component } from "react";
import Page from '@/components/public/page/index'
import CategoryEdit from '@/components/goods/category/edit/index'
export default class GoodsCategoryEdit extends Component {
   render() {
       return (
           <Page>
               <CategoryEdit {...this.props}/>
           </Page>
       )
   }
}
