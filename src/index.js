import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware,compose } from 'redux';
import promiseMiddleware from 'redux-promise';
import rootReducer from './reducer';
import './components/css/style.css';
//import { composeWithDevTools } from 'redux-devtools-extension';

//const store = createStore(rootReducer, composeWithDevTools(
 //   applyMiddleware(promiseMiddleware) ));
 const enhancers = []
 if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
    }
    } 
    const composedEnhancers = compose(
        applyMiddleware(promiseMiddleware),
        ...enhancers
        )

        const store = createStore(
            rootReducer,
            {},
            composedEnhancers
            )

const App = () => {
    return (
        <Provider store={store}>
            <Routes />
        </Provider>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));

