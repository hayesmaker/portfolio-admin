import React from 'react';
import Main from '../app/Main';
import {MuiShallow} from './utils/test-utils';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


describe('(Main) ', function() {
  let _component;

  it('Component should render with no error', () => {
    _component = MuiShallow(<Main />);
  });
});






