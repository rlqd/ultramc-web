import React from 'react';
import nprogress from 'nprogress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro'

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

  async componentDidMount() {
    nprogress.start();
    var res = await fetch('/api.json');
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
      return <Profile user={this.state.user} />;
    }
  }

  renderFooter() {
      return (
        <div className="footer-download">
          <a href="/launcher/ultramc.exe">
            <FontAwesomeIcon icon={regular('circle-down')} bounce /> Лаунчер
          </a>
          <a href="/launcher/ultramc-creator-tools.jar">
          <FontAwesomeIcon icon={regular('circle-down')} bounce /> Конструктор модпаков
          </a>
        </div>
      );
  }

  render() {
    IDFactory.reset();
    return (
      <React.Fragment>
        {this.getPageByState()}
        {this.renderFooter()}
      </React.Fragment>
    );
  }
}
