const URL = "http://localhost:8084/jwtbackend/api/competitions/";

function handleHttpErrors(res) {
  if (!res.ok) {
    throw {message:res.statusText,status:res.status};
  }
  return res.json();
}

class CompetitionFacade {

  makeGetFetchOptions = (type) => {
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    return {
      method: type,
      headers
    }
  }
    
    fetchCompetition = (id) => {
        return fetch(URL + id, this.makeGetFetchOptions("GET"))
        .then(handleHttpErrors)
    }

    fetchTeamsFromCompetition = (id) => {
      return fetch(URL + id + "/teams", this.makeGetFetchOptions("GET"))
      .then(handleHttpErrors)
    }

    fetchFixturesFromCompetition = (id) => {
      return fetch(URL + id + "/fixtures", this.makeGetFetchOptions("GET"))
      .then(handleHttpErrors)
    }

    fetchLeagueTablesFromCompetition = (id) => {
      return fetch(URL + id + "/leagueTable", this.makeGetFetchOptions("GET"))
      .then(handleHttpErrors)
    }
}
const competitionfacade = new CompetitionFacade();
export default competitionfacade;