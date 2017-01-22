import React from 'react';
import './App.css';
import Articles from './Articles';
import Client from './Client';

let App = React.createClass({
  getInitialState() {
    return {articles: []}
  },

  componentWillMount() {
    Client.getArticles('', (response)=>{
      this.setState({articles: response});
    });
  },

  getArticles() {
    return fetch('/articles/', {
      accept: 'application/json',
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({articles: responseJson});
      })
      .catch((error) => {
        console.error(error);
      });
  },

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Hayesmaker Portfolio Admin</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Articles articles={this.state.articles}/>
      </div>
    );
  }
});

export default App;
