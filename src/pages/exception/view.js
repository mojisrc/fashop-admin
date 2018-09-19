import React from 'react';
import Bundle from '../bundle';

//403
const Exception403 = (props) => {
    return (
        <Bundle load={() => import('./403')}>
            {(View) => {
                return <View {...props}/>
            }}
        </Bundle>
    );
}


//404
const Exception404 = (props) => {
    return (
        <Bundle load={() => import('./404')}>
            {(View) => {
                return <View {...props}/>
            }}
        </Bundle>
    );
}


//500
const Exception500 = (props) => {
    return (
        <Bundle load={() => import('./500')}>
            {(View) => {
                return <View {...props}/>
            }}
        </Bundle>
    );
}





export {
   Exception403,
   Exception404,
   Exception500,
}
