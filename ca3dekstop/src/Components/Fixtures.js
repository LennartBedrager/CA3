import React, {Component} from 'react';
import CompetitionFacade from '../FetchFacades/CompetitionFacade';
import {NavLink} from 'react-router-dom';

export default class Fixtures extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fixtures: [],
            isTrue: false
        }
    }

    componentDidMount() {
        var data = 1;
        CompetitionFacade.fetchFixturesFromCompetition(this.props.match)
        .then(res => this.setState({
            fixtures: res.fixtures.map(fixture => <tr key={data++} className="active"><td>{fixture.matchday}</td><td>{fixture.homeTeamName}</td><td>{fixture.awayTeamName}</td><td>{fixture.result.goalsHomeTeam} - {fixture.result.goalsAwayTeam}</td></tr>)
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
                <h2>Fixtures in this league</h2>
                </div>
                <NavLink className="btn btn-primary" onClick={this.changeToggle} exact to = "/" >Close Table</NavLink>
                </div>
                <br/>
                <table className="table">
                <thead>
                    <tr><th>MatchDay</th><th>Home Team</th><th>Away Team</th><th>Match Result</th></tr>
                </thead>
                <tbody>
                    {this.state.fixtures}
                </tbody>
                </table>
            </div>
          ) : ( <div></div>)}
            </div>
        )
    }
}