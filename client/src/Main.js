import React from 'react';
import './Main.css';
import AppBar from 'material-ui/AppBar';
import Articles from './Articles';
import Client from './Client';

let Main = React.createClass({
  getInitialState() {
    return null;
  },

  getArticles() {
    Client.getArticles('', (response)=>{
      this.refs.articlesTable.setState({articles: response});
    });
  },

  componentWillMount() {
    this.getArticles();
  },

  render() {
    return (
      <div className="App">
        <AppBar
          title="Hayesmaker Administration"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <Articles ref="articlesTable" getArticles={this.getArticles} />
      </div>
    );
  }
});

export default Main;
