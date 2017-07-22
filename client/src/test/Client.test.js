import {deleteArticle, getArticles, postNewArticle} from '../app/Client';
import sinon from 'sinon';

describe('(Client) ', function() {

  /**
   * @todo imporve these tests for better calledWith params test debugging
   */
  it('getArticles should fetch articles from correct endpoint', () => {
    sinon.stub(window, 'fetch').resolves({});
    getArticles('');
    expect(window.fetch.calledWith('/articles/')).toEqual(true);
  });

  it('postNewAritcle should post payload to correct endpoint', () => {
    sinon.stub(window, 'postNewArticle').resolves({});
    postNewArticle({payload: 'payload'});
    expect(window.fetch.calledWith('/articles/add')).toEqual(true);
  });

  it('deleteArticle should call DELETE endpoint with mongoId', () => {
    sinon.stub(window, 'deleteArticle').resolves({});
    deleteArticle('1234');
    expect(window.fetch.calledWith('/articles/delete/1234')).toEqual(true);
  });
});