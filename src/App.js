import React from 'react'
import './App.css';
import 'bootstrap/scss/bootstrap.scss'
import CreateListing from './components/pages/CreateListing'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <CreateListing />
      </div>
    )
  }
}

export default App;