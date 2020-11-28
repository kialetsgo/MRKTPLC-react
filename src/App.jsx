import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import GuestRoute from './components/GuestRoute'
import './App.scss';
import Home from './components/pages/Home'
import UserProfile from './components/pages/UserProfile'
import Login from './components/pages/Login'
import Register from './components/pages/Register'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>

            <GuestRoute path="/users/login" component={Login} />

            <GuestRoute path="/users/register" component={Register} />

            <ProtectedRoute path="/users/profile" component={UserProfile} />
            
            <Route path="/">
              <Home />
            </Route>

          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
