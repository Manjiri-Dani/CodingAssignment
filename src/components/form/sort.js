import React, { Component } from 'react';

class Sort extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    dropdownClick = (e) => {
        console.log(e)
    }

    render() {
        return (
            <div>
                <select name="Sort" onClick={(e) => this.dropdownClick(e)} placeholder="Sort By" className="sortBox">
                    <option value="SortByName">Sort[A-Z]</option>
                    <option value="SortByName">Sort[Z-A]</option>
                    <option value="RankUp">Rank up</option>
                    <option value="RankDown">Rank Down</option>
                </select>
            </div>
        )
    }
}

export default Sort;