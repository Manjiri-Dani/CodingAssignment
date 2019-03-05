import React, { Component } from 'react';
import Styles from '../css/style.css';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

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
        axios.get('https://api.github.com/users/' + name + '/repos').then((res) => {
            let obj = this.state.getRepo;
            obj[name] = res.data
            // console.log(obj[name].length)
            if (obj[name].length > 0) {
                this.setState({
                    getRepo: obj,
                    // activeCollapse: -1
                });
            }
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
        console.log(this.state.getRepo)
        const { getRepo } = this.state;
        const { startIndex, offset } = this.state;
        for (let index = startIndex; index < offset; index++) {
            const i = data[index];
            if (i) {
                results.push(
                    <Paper className="paperstyle">
                        <div className="divOuter">
                            <img src={i['avatar_url']} class="imgClass" alt="Image1" />

                            <Grid container className="leftDiv">
                                <Grid item lg={9} ><h2>{i.login}</h2></Grid>
                                <Grid item lg={3} className="ScoreDiv"><h4>Score:{i.score}</h4></Grid>
                                <Grid item lg={12} >
                                    <a href={i.html_url} target="_blank">{i.html_url}</a>
                                </Grid>
                                <div className="ExpansionDiv">
                                    <ExpansionPanel>
                                        <ExpansionPanelSummary className="expansionSummary">
                                            <button onClick={(e) => {
                                                this.getRepository(i.login);
                                            }}>List of Repositories</button>
                                        </ExpansionPanelSummary>

                                        <ExpansionPanelDetails className="expansionDetails">
                                            {getRepo[i.login] ?
                                                <div>
                                                    {getRepo[i.login].map((data, i) => (
                                                        <div key={i}>
                                                            <div className="row">{data.name}:
                                                            {data.language ? data.language : 'Not Provided'}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                                :
                                                <div> No Repositories Found </div>
                                            }
                                        </ExpansionPanelDetails>

                                    </ExpansionPanel>
                                </div>
                            </Grid>
                        </div>
                    </Paper>
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
            paginationButtons.push(<button key={index} onClick={(e) => this.handlePaginationClick(index + 1)}> {index + 1} </button>);
        }
        return paginationButtons;
    }

    render() {
        console.log(this.props)
        return (
            <div className="MostOuter">
                <div className="titleDiv">
                    Total Results : {this.props.searchData.total_count}
                </div>
                <div>
                    {this.renderResults()}
                    <div className="pagin">
                        {this.renderPagination()}
                    </div>
                </div>
            </div>

        )

    }
}

export default withStyles(Styles)(SearchDisplay);  