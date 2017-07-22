import React from 'react';
import './Main.css';
import AppBar from 'material-ui/AppBar';
import Articles from './Articles';

export default class Main extends React.Component {

  render() {
    return (
      <div className="App">
        <AppBar
          title="Hayesmaker Administration"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
        />
        <Articles />
      </div>
    );
  }
}