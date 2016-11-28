import 'sinon-as-promised';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TransactionsContainer from '../../containers/transactions-container';
import rootReducer from '../../reducers/root';
import sinon from 'sinon';
import { createStore } from 'redux';
import { expect } from 'chai';

describe('TransactionsContainer Component', () => {
  const store = createStore(rootReducer);
  const shallow = (component) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(component);
    return renderer.getRenderOutput();
  };

  it('renders properly', () => {
    const app = shallow(<TransactionsContainer store={store} />);
    expect(app.props.children).to.eql();
  });
});
