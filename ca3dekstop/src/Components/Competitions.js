import React, {Component} from 'react';
import {
    NavLink,
    Route,
    Switch
} from 'react-router-dom';
import competitionfacade from "../FetchFacades/CompetitionFacade";
import Teams from './Teams';
import Fixtures from './Fixtures';
import LeagueTable from './LeagueTable';

export default class Competitions extends Component {
    constructor(){
      super();
      this.state = {
        id: "",
        isFalse: false,
        competition: []
      }
    }
  
    handleChange = (event) => {
      this.setState({
        id: event.target.value
      })
    }
    
    getBack = () => {
      this.setState ({
        isFalse: false
      })
    }
  
    handleSubmit = async (event) => {
      event.preventDefault();
      let cID = this.state.id;
      const competition = await competitionfacade.fetchCompetition(cID)
      this.setState({
        id: "",
        isFalse: true,
        competition: competition
      })
    }
  
      render () {
        let c = this.state.competition
        return (
          <div className="container">
          {!this.state.isFalse ?  (
            <div className="col-sm-4 col-sm-offset-4">
            <form onSubmit={this.handleSubmit}>
            <div className="form-group">
            <br/>
            <label htmlFor="number">Find a football competition</label>
            <input type="text" value={this.state.id} className="form-control" placeholder="Enter a number" onChange={this.handleChange}/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            </div>
          ) : (
            <div>
              <table className="table">
                <thead>
                  <tr><th>ID</th><th>Caption</th><th>League</th><th>Year</th><th>NumberOfTeams</th><th>NumberOfGames</th><th>lastUpdated</th><td>Teams</td><td>Fixtures</td><td>Rankings</td></tr>
                </thead>
                <tbody>
                <tr className="info"><td>{c.id}</td><td>{c.caption}</td><td>{c.league}</td><td>{c.year}</td><td>{c.numberOfTeams}</td><td>{c.numberOfGames}</td><td>{c.lastUpdated}</td><td><NavLink exact to={`${this.props.match.url}teams/${c.id}`}>Show Teams</NavLink></td><td><NavLink exact to={`${this.props.match.url}fixtures/${c.id}`}>Show Fixtures</NavLink></td><td><NavLink exact to={`${this.props.match.url}leaguetable/${c.id}`}>Show rankings</NavLink></td></tr>
                </tbody>
              </table>
              <div className="container text-center">
              <NavLink className="btn btn-primary" onClick={this.getBack} exact to={`${this.props.match.url}`}>Find another Competition</NavLink>
              </div>
              <Switch>
              <Route path="/teams/:id" render={({match}) => <Teams match={match.params.id} />}/>
              <Route path="/fixtures/:id" render={({match}) => <Fixtures match={match.params.id} />}/>
              <Route path="/leaguetable/:id" render={({match}) => <LeagueTable match={match.params.id} />}/>
              </Switch>
            </div>)}
          </div>
        )
        }
  }