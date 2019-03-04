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
            getData: []
        }
    }

    onshandler = (event) => {
        let formData = event;
        this.props.submitForm(formData);

        axios.get('https://api.github.com/search/users?q=' + formData.name).then((res) => {
            this.setState({
                getData: res.data
            });
        }).catch((err) => {
            console.log(err);
        })
    }

    renderComponents() {
        let { formData } = this.props.inputdata
        return (<div>
            <div className="divHeader">
                <Sort></Sort>
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