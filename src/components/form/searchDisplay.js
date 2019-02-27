import React, { Component } from 'react';

class SearchDisplay extends Component {

    displayData = (data) => {
        console.log(data.searchData.items[0])
        return (
            <div>
                {data.searchData.items.map(i =>
                    <div>
                        <img src={i.avatar_url} />
                        <div>
                            {i.login}
                        </div>
                        <div>
                            {i.events_url}
                        </div>
                    </div>
                )}
            </div>
        );
    }


    render() {
        console.log(this.props);
        return (
            <div>
                Your Search Result :
                <div>
                    {this.displayData(this.props)}
                </div>
            </div>

        )

    }
}

export default SearchDisplay;  