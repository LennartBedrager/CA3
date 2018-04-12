import React, {Component} from 'react';

export default class LogIn extends Component {
    constructor(props) {
      super(props);
      this.state = { username: "", password: "" }
    }
    login = (evt) => {
      evt.preventDefault();
      this.props.login(this.state.username, this.state.password);
    }
    onChange = (evt) => {
      this.setState({[evt.target.id]: evt.target.value})
    }
    render() {
      return (
        <div className="jumbotron vertical-center">
        <div className="container text-center">
          <h2>Login Page</h2>
        </div>
        <br/>
          <form onSubmit={this.login} onChange={this.onChange} >
          <div >
          <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" className="form-control" placeholder="Enter username" id="username" />
          </div>
          <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" placeholder="Enter password" id="password" />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
          </div>
          </form>
        </div>
      )
    }
  }