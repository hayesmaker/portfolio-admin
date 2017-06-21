import React from 'react';
import AddArticleModal from '../app/AddArticleModal';
import {shallow} from 'enzyme';

it('renders without crashing', () => {
  shallow(<AddArticleModal />);
});

