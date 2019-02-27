import React, { Component } from 'react';
import SearchDisplay from '../components/form/searchDisplay';
import { connect } from 'react-redux';
import { submitForm } from '../actions/index';
import { bindActionCreators } from 'redux';


class getData extends Component {

    renderComp() {
        return <SearchDisplay searchData={this.props.location.state} />
    }

    render() {
        return this.renderComp()
    }
}

function mapStateToProps(state) {
    return {
        inputdata: { ...state.inputdata }
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ submitForm }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(getData)