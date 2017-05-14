import React from 'react';
//import ReactDOM from 'react-dom';
import Main from './Main';
import {shallow} from 'enzyme';

it('renders without crashing', () => {
  //const div = document.createElement('div');
  shallow(<Main/>);
});
