import React from 'react';
import {Switch, Route, Link} from 'react-router-dom'

import HomePage from './pages/homePage'

import "./index.css"

class Routes extends React.Component {
    constructor() {
        super();
        this.state = {

        };
    }



    render() {
        return <div>
            <div className="content wrapper">

            </div>
            <div id="pages">
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route path="/home" component={HomePage}/>
                </Switch>
            </div>

            <footer>
                <p>footer</p>
            </footer>
        </div>;
    }
}

export default Routes;

