import React from 'react';
import axios from 'axios';
import nprogress from 'nprogress';

import './App.scss';
import IDFactory from './lib/IDFactory';

import Fatal from './pages/Fatal';
import Login from './pages/Login';
import Profile from './pages/Profile';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = null;
  }

  authenticate = function(user) {
    this.setState({
      loggedIn: true,
      user: user,
    });
  }.bind(this);

  logout = async function() {
    nprogress.start();
    try {
      axios.post('/api/web/logout.php');
      this.setState({
        loggedIn: false,
        user: null,
      });
    } catch(e) {
      alert(String(e));
    }
    nprogress.done();
  }.bind(this);

  async componentDidMount() {
    nprogress.start();
    var res = await fetch('/api/web/status.php');
    nprogress.done();

    if (res.ok) {
      var data = await res.json();
      this.setState(data);
    } else {
      this.setState({
        error: res.statusText,
      });
    }
  }

  getPageByState() {
    if (this.state === null) {
      // State is still loading
      return null;
    }

    if (this.state.error) {
      return <Fatal error={this.state.error} />;
    } else if (!this.state.loggedIn) {
      return <Login onAuth={this.authenticate} />;
    } else {
      return <Profile user={this.state.user} onLogout={this.logout} />;
    }
  }

  render() {
    IDFactory.reset();
    return (
      <React.Fragment>
        {this.getPageByState()}
      </React.Fragment>
    );
  }
}
