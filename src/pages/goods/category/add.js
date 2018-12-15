import React,{ Component } from "react";
import Page from '@/components/public/page/index'
import CategoryAdd from '@/components/goods/categoryAdd/index'
export default class GoodsCategoryAdd extends Component {
   render() {
       return (
           <Page>
               <CategoryAdd {...this.props}/>
           </Page>
       )
   }
}
