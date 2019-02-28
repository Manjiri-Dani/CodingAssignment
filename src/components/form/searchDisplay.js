import React, { Component } from 'react';
import Styles from '../css/style.css';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import axios from 'axios';
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const theme = createMuiTheme();
class SearchDisplay extends Component {

    constructor(props) {
        super(props)
        this.state = {
            getRepo: {},
            startIndex: 0,
            offset: 5,
        }
    }

    handleClick(offset, startIndex) {
        this.setState({
            offset: offset + 3,
            startIndex: startIndex + 3,
        });
    }

    getRepository = (name) => {
        // let getRepo = event;
        axios.get('https://api.github.com/users/' + name + '/repos').then((res) => {
            console.log((res.data));
            let obj = this.state.getRepo
            obj[name] = res.data
            this.setState({
                getRepo: obj,
                activeCollapse: -1
            });
        }).catch((err) => {
            console.log(err);
        })
    }

    // async getRepo(name) {
    //     try {
    //         const repositories = await axios.get('https://api.github.com/users/' + name + '/repos')
    //         return repositories.map((data, i) => (
    //             <div key={i}>
    //                 <div>{data.name}:{data.language}</div>
    //             </div>
    //         ))
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    renderResults() {
        let data = this.props.searchData.items;
        let results = [];
        const { getRepo } = this.state;
        const { startIndex, offset } = this.state;
        for (let index = startIndex; index < offset; index++) {
            const i = data[index];
            if (i) {
                results.push(
                    <div className="divOuter">
                        <img src={i['avatar_url']} class="imgClass" alt="Image1" />
                        <div className="leftDiv">
                            {i.login}

                            <div className="rightDiv">
                                {i.events_url}
                            </div>
                            <ExpansionPanel>
                                <ExpansionPanelSummary>
                                    <button onClick={(e) => {
                                        this.getRepository(i.login);
                                    }}>Details</button>
                                </ExpansionPanelSummary>

                                <ExpansionPanelDetails>
                                    <div>
                                        {getRepo[i.login] ? getRepo[i.login].map((data, i) => (
                                            <div key={i}>
                                                <div>{data.name}:{data.language}</div>
                                            </div>
                                        )) : ''}
                                    </div>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </div>
                    </div>
                )
            }
        }
        return results;
    }

    handlePaginationClick(page) {
        let startIndex, offset;
        offset = page * 5;
        startIndex = offset - 5;
        this.setState({
            startIndex: startIndex,
            offset: offset
        })
    }

    renderPagination() {
        let data = this.props.searchData.items;
        let paginationUnits = data.length / 5;
        let paginationButtons = []
        for (let index = 0; index < paginationUnits; index++) {
            paginationButtons.push(<button onClick={(e) => this.handlePaginationClick(index + 1)}> {index + 1} </button>);
        }
        return paginationButtons;
    }

    render() {
        console.log(this.props);
        return (
            <div>
                Your Search Result :
                <div>
                    {this.renderResults()}
                    {/* <MuiThemeProvider theme={theme} >
                        <CssBaseline />
                        <Pagination
                            className="pagin"
                            limit={5}
                            offset={this.state.offset}
                            startIndex={this.state.startIndex}
                            total={30}
                            onClick={(e) => console.log(e)}
                        />
                    </MuiThemeProvider> */}
                    <div>
                        {this.renderPagination()}
                    </div>
                </div>
            </div>

        )

    }
}

export default withStyles(Styles)(SearchDisplay);  