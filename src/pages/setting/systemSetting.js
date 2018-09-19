import React,{ Component } from "react";
import SystemUpdated from './systemUpdated';
import SystemUpdating from './systemUpdating';

export default class SystemSetting extends Component{
    render(){
       return(
          <div>
              <SystemUpdated/>
              <SystemUpdating/>
          </div>
       )
    }
}
