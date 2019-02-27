import React, { Component } from 'react';

class Search extends Component {

    constructor(props) {
        super(props)
        this.state = {
            formData: {
                name: '',
            },
            label: ['Enter Name you want to search'],
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
        const { formData, label, type } = this.state
        const keys = Object.keys(formData)
        return (
            <div className="container">
                <form onSubmit={this.onshandler}>
                    {keys.map((key, i) =>
                        <div key={i} className="form_element">
                            <label>
                                {label[i]}
                            </label>
                            <input
                                type={type[i]}
                                name={key}
                                onChange={this.handleChange.bind(this)}
                                value={this.state.formData[key]}
                            ></input>
                        </div>
                    )}
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default Search;