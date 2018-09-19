//@flow
import React,{ Component } from "react";
import Page from '../../components/public/page'
import CategoryEdit from '../../components/goods/categoryEdit'

export default class GoodsCategoryEdit extends Component<{},{}> {
   render() {
       return (
           <Page>
               <CategoryEdit {...this.props}/>
           </Page>
       )
   }
}
