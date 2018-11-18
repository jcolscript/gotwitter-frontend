import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Login from './pages/Login';
import Timeline from './pages/Timeline';
import Register from './pages/Register';

class App extends Component {
  render() {
    document.title = 'GoTwitter';
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login}></Route>
          <Route path="/timeline" component={Timeline}></Route>
          <Route path="/user/register" component={Register}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;