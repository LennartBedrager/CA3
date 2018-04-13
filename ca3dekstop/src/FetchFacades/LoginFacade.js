const URL = "https://hawkdon.dk/CA3/";

function handleHttpErrors(res) {
  if (!res.ok) {
    throw {message:res.statusText,status:res.status};
  }
  return res.json();
}

class LoginFacade {

  makeFetchOptions = (type, b) => {
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    if(this.loggedIn()){
      headers["x-access-token"] = this.getToken();
    }
    return {
      method: type,
      headers,
      body: JSON.stringify(b)
    }
  }

    setToken = (token) => {
        localStorage.setItem('jwtToken', token)
    }

    getToken = () => {
        return localStorage.getItem('jwtToken')
    }

    loggedIn = () => {
        const loggedIn = this.getToken() != null;
        return loggedIn;
    }

    logout = () => {
        localStorage.removeItem("jwtToken");
    }

    login = (user, pass) => {
        const options = this.makeFetchOptions("POST",{ username: user, password: pass });
        return fetch(URL+"/api/login",options,true)
        .then(handleHttpErrors)
        .then(res=>{this.setToken(res.token)})
    }
    
    fetchData = () =>{
        const options = this.makeFetchOptions("GET");
        let jwt = this.getToken();
        let jwtData = jwt.split('.')[1];
        let decodedjwtJsonData = window.atob(jwtData);
        let decodedjwtData = JSON.parse(decodedjwtJsonData)
        if(decodedjwtData.roles === 'admin') {
            return fetch(URL+"/api/info/admin",options).then(handleHttpErrors);
        } else if (decodedjwtData.roles === 'user'){
            return fetch(URL+"/api/info/user",options).then(handleHttpErrors);
        }
      }
}
const facade = new LoginFacade();
export default facade;