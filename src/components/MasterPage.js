import React, { Component } from 'react';
import Login from './Login';
import DrowsinessViewer from './DrowsinessListViewer';


class MasterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: !false
    }
  }

  onLogin = () => {
    this.setState({
      isLogged: true
    })
  }

  onLogout = () => {
    this.setState({
      isLogged: false
    })
  }

  render() {
    const { isLogged } = this.state;
    return (
      <div>
        {isLogged ? 
          <DrowsinessViewer /> :
          <Login onLogin={this.onLogin} />
        }
      </div>
    );
  }
}
 
export default MasterPage;
