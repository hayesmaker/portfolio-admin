import React from 'react';
import './Main.css';
import AppBar from 'material-ui/AppBar';
import Articles from './Articles';
import Client from './Client';

export default class Main extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      mount: true,
      props: this.props.props,
      context: this.props.context
    };
  }

  getArticles() {
    Client.getArticles('', (response) => {
      console.log('Main :: getArticles', response);
      this.refs.articlesTable.setState({articles: response});
    });
  }

  componentWillMount() {
    this.getArticles();
  }

  render() {
    return (
      <div className="App">
        <AppBar
          title="Hayesmaker Administration"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <Articles ref="articlesTable" getArticles={this.getArticles.bind(this)}/>
      </div>
    );
  }
}