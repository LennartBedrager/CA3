import { AsyncStorage } from 'react-native';

const URL = "https://hawkdon.dk/CA3";

function handleHttpErrors(res) {
  if (!res.ok) {
    throw {message:res.statusText,status:res.status};
  }
  return res.json();
}

class LoginFacade {

  makeFetchOptions = async (type, b) => {
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
    if(await this.loggedIn()){
      headers["x-access-token"] = await this.getToken();
    }
    return {
      method: type,
      headers,
      body: JSON.stringify(b)
    }
  }

    setToken = async (token) => {
      await AsyncStorage.setItem('jwtToken', token)
    }

    getToken = async () => {
        return await AsyncStorage.getItem('jwtToken')
    }

    loggedIn = async () => {
        const loggedIn = await this.getToken() != null;
        return loggedIn;
    }

    logout = async () => {
      await AsyncStorage.removeItem("jwtToken");
    }

    login = async (user, pass) => {
      const options = await this.makeFetchOptions("POST",{ username: user, password: pass });
      const fetchData = await fetch(URL+"/api/login",options,true).then(handleHttpErrors).then(res => {await this.setToken(res.token)});
    }
    
    fetchData = async () =>{
        const options = await this.makeFetchOptions("GET");
        /*let jwt = await this.getToken();
        console.log(jwt)
        let jwtData = await jwt.split('.')[1];
        let decodedjwtJsonData = await window.atob(jwtData);
        let decodedjwtData = await JSON.parse(decodedjwtJsonData)
        if(decodedjwtData.roles === 'admin') {
            return await fetch(URL+"/api/info/admin",options).then(handleHttpErrors);
        } else if (decodedjwtData.roles === 'user'){ */
            return await fetch(URL+"/api/info/user",options).then(handleHttpErrors);
        //}
      }
}
const facade = new LoginFacade();
export default facade;