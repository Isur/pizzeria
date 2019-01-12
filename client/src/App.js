import React from 'react';
import Router from './Components/Config/Router'
import Header from './Components/Header';
import './styles/index.scss';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Router />
      </div>
    );
  }
}

export default App;
