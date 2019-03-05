import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Search from '../components/form/search';
import axios from 'axios';
import { submitForm } from '../actions/index';
import Sort from '../components/form/sort';
import SearchDisplay from '../components/form/searchDisplay'

class RootContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            getData: [],
            sortBy: 'SortByName'
        }
    }


    onshandler = (event) => {
        let formData = event;
        this.props.submitForm(formData);
        axios.get('https://api.github.com/search/users?q=' + formData.name).then((res) => {
            res.data.items = this.getSortedData(res.data);
            this.setState({
                getData: res.data
            });
        }).catch((err) => {
            console.log(err);
        })
    }

    getSortedData = (data) => {
        console.log(data.items)
        var _ = require('lodash')
        switch (this.state.sortBy) {
            case 'SortByName':
                return (
                    _.sortBy(data.items, 'login')
                )
            case 'SortByNameDesc':
                return (
                    _.sortBy(data.items, 'login').reverse()
                )
            case 'ScoreUp':
                return (
                    _.sortBy(data.items, 'score')
                )
            case 'ScoreDown':
                return (
                    _.sortBy(data.items, 'score').reverse()
                )
            default: null
        }
    }

    getsortMethod = (sortBy) => {
        this.setState({
            sortBy: sortBy
        })
    }

    renderComponents() {
        let { formData } = this.props.inputdata
        return (<div>
            <div className="divHeader">
                <Sort getsortMethod={this.getsortMethod.bind(this)}></Sort>
                <Search formData={formData} handleSubmit={this.onshandler.bind(this)} />
            </div>
            {this.state.getData.items ? <SearchDisplay searchData={this.state.getData}></SearchDisplay>
                : null}
        </div>
        )
    }

    render() {
        return this.renderComponents()
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        inputdata: { ...state.inputdata },
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({
        submitForm,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)