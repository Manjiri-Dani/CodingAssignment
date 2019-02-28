import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Display from './container/RootDisplay';
import Home from './components/form/home';
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
                path: '/dispcontainer/search',
                component: Display,
                exact: true
            },
            {
                path: '/root/search',
                component: RootContainer,
                exact: false
            },
            {
                path: '/',
                component: Home,
                exact: true
            }
        ]
    }

    render() {
        return (
            <div>
                <header>
                    <Link to="/root/search">Search Record</Link>
                </header>
                <Switch>
                    {this.routes.map((route, i) => <Route path={route.path} exact={route.exact} component={route.component} />)}
                </Switch>
            </div>
        )
    }
}