import React, {Component} from 'react';
import CompetitionFacade from '../FetchFacades/CompetitionFacade';
import {NavLink} from 'react-router-dom';

export default class LeagueTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leaguetable: [],
            isTrue: false
        }
    }

    async componentDidMount() {
        CompetitionFacade.fetchLeagueTablesFromCompetition(this.props.match)
        .then(res => this.setState({
            leaguetable: res.standing.map(team => <tr key={team.position} className="active"><td><img src={team.crestURI} alt="..." className="img-thumbnail" width="100" height="100"/></td><td>{team.position}</td><td>{team.teamName}</td><td>{team.points}</td><td>{team.playedGames}</td><td>{team.wins}</td><td>{team.draws}</td><td>{team.losses}</td></tr>)
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
                <h4>Rankings</h4>
                <NavLink activeClassName="active" onClick={this.changeToggle} exact to = "/" >Close</NavLink>
                </div>
                <table className="table">
                <thead>
                    <tr><th>Crest</th><th>Position</th><th>Team Name</th><th>Points</th><th>Played Games</th><th>Wins</th><th>Draws</th><th>Loses</th></tr>
                </thead>
                <tbody>
                    {this.state.leaguetable}
                </tbody>
                </table>
            </div>
          ) : ( <div></div>)}
            </div>
        )
    }
}