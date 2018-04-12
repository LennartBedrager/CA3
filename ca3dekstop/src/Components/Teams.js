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
            teams: res.teams.map(team => <tr key={team.name}><td>{team.name}</td><td>{team.shortName}</td><td>{team.squadMarketValue}</td><td>{team.crestUrl}</td></tr>)
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
                <table>
                <thead>
                    <tr><th>Team Name</th><th>Short Name</th><th>squadMarketValue</th><th>crestUrl</th></tr>
                </thead>
                <tbody>
                    {this.state.teams}
                </tbody>
                </table>
                <NavLink onClick={this.changeToggle} exact to = "/" >Close</NavLink>
            </div>
          ) : ( <div></div>)}
            </div>
        )
    }
}