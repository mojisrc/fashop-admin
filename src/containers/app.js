import React from "react";
import {
    Route,
    Switch,
} from "react-router-dom";

import { ConnectedRouter } from 'react-router-redux'
import { history } from '../store'
import '../utils/global.css'

import UserLogin from "../pages/member/login";
import BasicLayout from "./basicLayout";
import Containers from "./index";


const App = () => (
    <ConnectedRouter
        history = {history}
    >
        <Containers>
            <Switch>
                <Route path="/member/login" component={UserLogin}/>
                <Route path="/" component={BasicLayout}/>
            </Switch>
        </Containers>
    </ConnectedRouter>
)

export default App
