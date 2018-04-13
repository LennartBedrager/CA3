import LoginFacade from './LoginFacade';
const URL = "https://hawkdon.dk/CA3/api/competitions/";

function handleHttpErrors(res) {
  if (!res.ok) {
    throw {message:res.statusText,status:res.status};
  }
  return res.json();
}

class CompetitionFacade {

  makeFetchOptions = (type) => {
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    if(LoginFacade.loggedIn()){
      headers["x-access-token"] = LoginFacade.getToken();
    }
    return {
      method: type,
      headers
    }
  }
    
    fetchCompetition = (id) => {
        return fetch(URL + id, this.makeFetchOptions("GET", true))
        .then(handleHttpErrors)
    }

    fetchTeamsFromCompetition = (id) => {
      return fetch(URL + id + "/teams", this.makeFetchOptions("GET", true))
      .then(handleHttpErrors)
    }

    fetchFixturesFromCompetition = (id) => {
      return fetch(URL + id + "/fixtures", this.makeFetchOptions("GET", true))
      .then(handleHttpErrors)
    }

    fetchLeagueTablesFromCompetition = (id) => {
      return fetch(URL + id + "/leagueTable", this.makeFetchOptions("GET", true))
      .then(handleHttpErrors)
    }
}
const competitionfacade = new CompetitionFacade();
export default competitionfacade;