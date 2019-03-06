import React, { Component } from 'react';
import MaterialIcon from '@material/react-material-icon';
//import TextField from '@material-ui/core/TextField';

class Search extends Component {

    constructor(props) {
        super(props)
        this.state = {
            formData: {
                name: '',
            },
        }
    }

    handleChange = (event) => {
        let { formData } = this.state
        let object = {}
        const { name, value } = event.target
        object[name] = value
        this.setState({
            formData: { ...formData, ...object }
        })
    }

    onshandler = (event) => {
        event.preventDefault();
        // console.log(this.props);
        const { formData } = { ...this.state };
        this.props.handleSubmit({ ...formData });
    }

    render() {
        // const { formData } = this.state
        // const keys = Object.keys(formData)
        return (
            <div className="container">
                <form onSubmit={this.onshandler} className="form_element">

                    <div className="searchDiv">
                        <input
                            className="searchBox"
                            type="text"
                            name="name"
                            onChange={this.handleChange.bind(this)}
                            value={this.state.formData.name}
                        />
                        <button className="btnClass" type="submit">
                            <MaterialIcon icon='search' className="IconClass" />
                        </button>
                        {/* <button className="btnClass" type="submit"><i class="material-icons">
                            search</i></button> */}
                    </div>

                </form>
            </div>
        )
    }
}

export default Search;