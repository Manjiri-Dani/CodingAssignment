import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RootContainer from './container/RootContainer';

class Routes extends React.Component {

    render() {
        return (
            <BrowserRouter>
                <Routing {...this.props} />
            </BrowserRouter>
        )
    }
};

export default Routes;

class Routing extends React.Component {
    constructor(props) {
        super(props)
        this.routes = [
            {
                path: '/',
                component: RootContainer,
                exact: true
            }
        ]
    }

    render() {
        return (
            <div>
                <Switch>
                    {this.routes.map((route, i) => <Route key={i} path={route.path} exact={route.exact} component={route.component} />)}
                </Switch>
            </div>
        )
    }
}