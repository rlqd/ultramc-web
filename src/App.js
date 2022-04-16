import React from 'react';
import nprogress from 'nprogress';
import IDFactory from './lib/IDFactory';
import UserFacade from './lib/UserFacade';

import './App.scss';

import Fatal from './pages/Fatal';
import Login from './pages/Login';
import Profile from './pages/Profile';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = null;
  }

  userFacade() {
    return new UserFacade(this, this.state?.user, {
      start: nprogress.start,
      done: nprogress.done,
    });
  }

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
      return <Login user={this.userFacade()} />;
    } else {
      return <Profile user={this.userFacade()} />;
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
