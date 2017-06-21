import React from 'react';
import Articles from '../app/Articles';
import * as Client from '../app/Client';
import sinon from 'sinon';
import {MuiShallow, MuiMount} from './utils/test-utils';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


describe('(Articles Test) ', function () {
  let _component;

  beforeEach(function () {
    sinon.stub(Client, 'getArticles').resolves([{
      _id: '1234',
      title: 'moo',
      date: '01/01/2001',
      company: 'foo',
      desc: 'poo',
      link: 'http://fug.pug'
    }]);
  });

  afterEach(function () {
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
    return Client.getArticles().then(articles => {
      expect(articles.length).toBe(1);
      expect(articles[0]._id).toBe('1234');
      expect(articles[0].desc).toBe('poo');
    });
  });

  /*
  handleRowSelection(rows) {
    let index = rows[0];
    if (index >= 0) {
      let mongoId = this.state.articles[index]._id;
      this.setState({
        shouldShowDelete: true,
        currentRecordId: mongoId
      }, () => {
        this.tableBody.setState({ selectedRows: rows });
      });
    } else {
      this.setState({
        shouldShowDelete: false,
        currentRecordId: 0
      }, () => {
        this.tableBody.setState({ selectedRows: rows });
      });
    }
  }
   */

  it('handleRowSelection should find mongoId by selected rowIndex and set it to state.currentRecord', () => {
    _component = MuiMount(<Articles/>);
    _component.instance().setState({
      articles: [
        {
          _id: '1234',
          title: 'moo',
          date: '01/01/2001',
          company: 'foo',
          desc: 'poo',
          link: 'http://fug.pug'
        }
      ],
      shouldShowDelete: false,
      currentRecordId: 0
    });
    let selectedRows = [0];
    _component.instance().handleRowSelection(selectedRows);
    expect(_component.instance().state.shouldShowDelete).toEqual(true);
    expect(_component.instance().state.currentRecordId).toEqual('1234');
  });

  it('handleRowSelection should cancel any selected row by setting currentRecordId to 0', () => {
    _component = MuiMount(<Articles/>);
    _component.instance().setState({
      articles: [
        {
          _id: '1234',
          title: 'moo',
          date: '01/01/2001',
          company: 'foo',
          desc: 'poo',
          link: 'http://fug.pug'
        }
      ],
      shouldShowDelete: false,
      currentRecordId: 0
    });
    let selectedRows = [0];
    _component.instance().handleRowSelection(selectedRows);
    expect(_component.instance().state.shouldShowDelete).toEqual(true);
    expect(_component.instance().state.currentRecordId).toEqual('1234');
    _component.instance().handleRowSelection([-1]);
    expect(_component.instance().state.shouldShowDelete).toEqual(false);
    expect(_component.instance().state.currentRecordId).toEqual(0);
  });

});
