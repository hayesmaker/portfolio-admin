import React from 'react';
import Articles from '../app/Articles';
import * as Client from '../app/Client';
import sinon from 'sinon';
import {MuiShallow, MuiMount} from './utils/test-utils';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


describe('(Main) ', function() {
  let _component;

  beforeEach(function () {
    sinon.stub(Client, 'getArticles').resolves(['my articles'])
  });

  afterEach(function() {
    Client.getArticles.restore();
  });

  it('Component should render with no error', () => {
    _component = MuiShallow(<Articles />);
  });

   it('getArticles should attempt to retrive articles for the Client', () => {
   _component = MuiMount(<Articles />);
   expect(Client.getArticles.called).toEqual(true);
   });

   it('getArticles when promise resolves should set articles on the child component', () => {
   _component = MuiMount(<Articles />);
   });

});






/**
 * Created by hayesmaker on 11/06/2017.
 */
