import React from 'react';
import Bundle from '../bundle';

//管理配置
const ManageConfig = (props) => {
    return (
        <Bundle load={() => import('./manageConfig')}>
            {(View) => {
                return <View {...props}/>
            }}
        </Bundle>
    );
}


//添加配置
const AddConfig = (props) => {
    return (
        <Bundle load={() => import('./addConfig')}>
            {(View) => {
                return <View {...props}/>
            }}
        </Bundle>
    );
}


//配置
const Config = (props) => {
    return (
        <Bundle load={() => import('./config')}>
            {(View) => {
                return <View {...props}/>
            }}
        </Bundle>
    );
}


//配置分组
const ConfigGroup = (props) => {
    return (
        <Bundle load={() => import('./configGroup')}>
            {(View) => {
                return <View {...props}/>
            }}
        </Bundle>
    );
}



export {
   ManageConfig,
   AddConfig,
   Config,
   ConfigGroup,
}
