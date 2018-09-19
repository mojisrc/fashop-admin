import React from 'react';
import Bundle from '../bundle';

const PublicAccounts = (props) => {
    return (
        <Bundle load={() => import('./publicAccounts')}>
            {(View) => {
                return <View {...props}/>
            }}
        </Bundle>
    );
};

const BindPublicAccounts = (props) => {
    return (
        <Bundle load={() => import('./bindPublicAccounts')}>
            {(View) => {
                return <View {...props}/>
            }}
        </Bundle>
    );
};

export {
    PublicAccounts,
    BindPublicAccounts,
}
