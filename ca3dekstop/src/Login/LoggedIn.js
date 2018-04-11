import React, {Component} from 'react';
import {
    HashRouter as Router,
    NavLink,
    Switch,
    Route
} from 'react-router-dom';
import facade from "../FetchFacades/LoginFacade";
import competitionfacade from "../FetchFacades/CompetitionFacade";

const NoMatch = ({ location }) => (
    <div>
      <h2>
        No match for {location.pathname}
      </h2>
    </div>
  );

export default class LoggedIn extends Component {
    constructor(props) {
      super(props);
      this.state= {dataFromServer: "Fetching!!"};
    }
  
    componentDidMount(){
      facade.fetchData().then(res=> this.setState({dataFromServer: res}));
    }

    render() {
      return (
        <Router>
        <div>
        <h2 >Data Received from server</h2>
        <h3>{this.state.dataFromServer}</h3>
        <Switch>
        <Route exact path="/" render={() => <Competitions />}/>
        <Route component={NoMatch}/>
        </Switch>
        </div>
        </Router>
      )
    }
  }

class Competitions extends Component {
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
    await this.setState({
      id: "",
      isFalse: true,
      competition: competition
    })
  }
    render () {
      let c = this.state.competition
      return (
        <div>
        {!this.state.isFalse ? (
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
                <tr><th>ID</th><th>Caption</th><th>League</th><th>Year</th><th>NumberOfTeams</th><th>NumberOfGames</th><th>lastUpdated</th></tr>
              </thead>
              <tbody>
              <tr><td>{c.id}</td><td>{c.caption}</td><td>{c.league}</td><td>{c.year}</td><td>{c.numberOfTeams}</td><td>{c.numberOfGames}</td><td>{c.lastUpdated}</td></tr>
              </tbody>
            </table>
            <br/>
            <button onClick={this.getBack}>Back</button>
          </div>)}
        </div>
      )
      }
}