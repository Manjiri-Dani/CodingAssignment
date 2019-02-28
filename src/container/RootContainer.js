import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Search from '../components/form/search';
import axios from 'axios';
import { submitForm } from '../actions/index';

class RootContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            getData: []
        }
    }

    componentDidMount() {
        // console.log(this.props)
    }

    onshandler = (event) => {
        let formData = event;
        this.props.submitForm(formData);

        axios.get('https://api.github.com/search/users?q=' + formData.name).then((res) => {
            // console.log(JSON.stringify(res.data));
            this.setState({
                getData: res.data
            });
            if (this.state.getData)
                this.props.history.push("/dispcontainer/search", this.state.getData)
        }).catch((err) => {
            console.log(err);
        })
    }

    renderComponents() {
        let { formData } = this.props.inputdata
        return <Search formData={formData} handleSubmit={this.onshandler.bind(this)
        } />
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