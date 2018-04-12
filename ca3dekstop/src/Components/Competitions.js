import React, {Component} from 'react';
import {
    NavLink,
    Switch,
    Route
} from 'react-router-dom';
import competitionfacade from "../FetchFacades/CompetitionFacade";
import Teams from './Teams';

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
        isFalse: false,
        teamsToggle: false,
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
            
          <div>
          {!this.state.isFalse ?  (
            <form onSubmit={this.handleSubmit}>
            <h4>Find a football competition</h4>
            <br/><br/>
            <input type="text" value={this.state.id} onChange={this.handleChange}/>
            <br/><br/>
            <input type="submit" value="Find Competition"/>
            </form>
          ) : (
            <div>
              <table>
                <thead>
                  <tr><th>ID</th><th>Caption</th><th>League</th><th>Year</th><th>NumberOfTeams</th><th>NumberOfGames</th><th>lastUpdated</th><td>Teams</td></tr>
                </thead>
                <tbody>
                <tr><td>{c.id}</td><td>{c.caption}</td><td>{c.league}</td><td>{c.year}</td><td>{c.numberOfTeams}</td><td>{c.numberOfGames}</td><td>{c.lastUpdated}</td><td><NavLink exact to={`/teams/${c.id}`}>Show Teams</NavLink></td></tr>
                </tbody>
              </table>
                <Route path="/teams/:id" render={({match}) => <Teams match={match.params.id} />}/>
              <br/>
              <NavLink onClick={this.getBack} exact to={"/"}>Find another Competition</NavLink>
              <br/>
            </div>)}
          </div>
        )
        }
  }