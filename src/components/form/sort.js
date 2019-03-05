import React, { Component } from 'react';

class Sort extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    dropdownClick = (e) => {
        //  console.log(e.target.value)
        this.props.getsortMethod(e.target.value)
    }

    render() {
        return (
            <form>
                <select name="Sort" onClick={(e) => this.dropdownClick(e)} placeholder="Sort By" className="sortBox">
                    <option value="SortByName">Sort[A-Z]</option>
                    <option value="SortByNameDesc">Sort[Z-A]</option>
                    <option value="ScoreUp">Sort by Score Ascending</option>
                    <option value="ScoreDown">Sort by Score Descending</option>
                </select>
            </form>
        )
    }
}

export default Sort;