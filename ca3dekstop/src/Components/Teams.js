import React, {Component} from 'react';
import CompetitionFacade from '../FetchFacades/CompetitionFacade';
import {NavLink} from 'react-router-dom';

export default class Teams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: [],
            isTrue: false
        }
    }

    componentDidMount() {
        CompetitionFacade.fetchTeamsFromCompetition(this.props.match)
        .then(res => this.setState({
            teams: res.teams.map(team => <tr key={team.name} className="active"><td><img src={team.crestUrl} alt="..." className="img-thumbnail" width="100" height="100"/></td><td>{team.name}</td><td>{team.shortName}</td></tr>)
        }))
    }

    changeToggle = () => {
        this.setState(prevState => ({
            isTrue: !prevState.isTrue
        }))
    }

    render () {
        return (
            <div>
            {!this.state.isTrue ?  (
            <div>
                <div className="container text-center">
                <div className="page-header">
                <h2>Teams in this league</h2>
                </div>
                <NavLink className="btn btn-primary" onClick={this.changeToggle} exact to = "/" >Close Table</NavLink>
                </div>
                <br/>
                <table className="table">
                <thead>
                    <tr><th>Crest</th><th>Team Name</th><th>Short Name</th></tr>
                </thead>
                <tbody>
                    {this.state.teams}
                </tbody>
                </table>
            </div>
          ) : ( <div></div>)}
            </div>
        )
    }
}