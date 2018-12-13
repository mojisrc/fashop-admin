import React,{ Component } from "react";
import Page from '@/components/public/page'
import CategoryAdd from '@/components/goods/categoryAdd'
export default class GoodsCategoryAdd extends Component {
   render() {
       return (
           <Page>
               <CategoryAdd {...this.props}/>
           </Page>
       )
   }
}
