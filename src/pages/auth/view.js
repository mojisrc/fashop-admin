import React from 'react';
import Bundle from '../bundle';

const AuthRole = (props) => {
    return (
        <Bundle load={() => import('./role')}>
            {(View) => {
                return <View {...props}/>
            }}
        </Bundle>
    );
};

const AuthMember = (props) => {
    return (
        <Bundle load={() => import('./member')}>
            {(View) => {
                return <View {...props}/>
            }}
        </Bundle>
    );
};

export {
    AuthRole,
    AuthMember,
}
