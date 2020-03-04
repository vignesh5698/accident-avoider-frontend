import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: null,
      password: null,
      showError: false
    }
  }

  onSignIn = () => {
    const { userName, password } = this.state;
    if(userName === 'admin@admin.com' && password === 'admin') {
      this.props.onLogin();
    } else {
      this.setState({
        showError: true
      })
    }
  }

  renderLoginError = () => {
    return(
      <div className="alert alert-danger custom-center" role="alert">
        User credentials invalid!
      </div>
    )
  }

  onChangeInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  renderLoginForm = () => {
    return(
      <div>
        <h5 className='custom-center'>
          <b>
            Sign in
          </b>
        </h5>
        <form>
          <div className="form-group">
            <label>Email address</label>
            <input type="email" className="form-control" name="userName" onChange={(e) => this.onChangeInput(e)} aria-describedby="emailHelp" placeholder="Enter email" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" name="password" onChange={(e) => this.onChangeInput(e)} placeholder="Password" />
          </div>
          <div className="custom-center">
            <button type="button" className="btn btn-outline-info" onClick={this.onSignIn}>Submit</button>
          </div>
        </form>
      </div>
    )
  }

  render() {
    const { showError } = this.state;
    return (
      <div className="login-page">
        <div className="card custom-card">
          <h3 className="card-header custom-title">
            ACCIDENT AVOIDER
          </h3>
          <div className="card-body">
            {this.renderLoginForm()}
          </div>
          {showError ? this.renderLoginError() : ''}
        </div>
      </div>
    );
  }
}
 
export default Login;
