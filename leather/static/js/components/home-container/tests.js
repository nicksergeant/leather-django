import 'sinon-as-promised';
import HomeContainer from './';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import rootReducer from '../../reducers/root';
import sinon from 'sinon';
import { createStore } from 'redux';
import { expect } from 'chai';

describe('HomeContainer Component', () => {
  const store = createStore(rootReducer);
  const shallow = component => {
    const renderer = TestUtils.createRenderer();
    renderer.render(component);
    return renderer.getRenderOutput();
  };

  xit('renders properly', () => {
    const comp = shallow(<HomeContainer store={store} />);
    expect(comp.props.children).to.not.exist;
    expect(comp.props.store).to.exist;
  });
});
