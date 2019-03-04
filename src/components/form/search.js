import React, { Component } from 'react';

class Search extends Component {

    constructor(props) {
        super(props)
        this.state = {
            formData: {
                name: '',
            },
            type: ['text']
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
        const { formData, type } = this.state
        const keys = Object.keys(formData)
        return (
            <div className="container">
                <form onSubmit={this.onshandler}>
                    {keys.map((key, i) =>
                        <div key={i} className="form_element">
                            <input
                                type={type[i]}
                                name={key}
                                onChange={this.handleChange.bind(this)}
                                value={this.state.formData[key]}
                            ></input>
                            <button type="submit">Submit</button>
                        </div>
                    )}

                </form>
            </div>
        )
    }
}

export default Search;