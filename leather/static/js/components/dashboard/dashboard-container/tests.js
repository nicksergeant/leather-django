import 'sinon-as-promised';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import DashboardContainer from './';
import rootReducer from '../../../reducers/root';
import sinon from 'sinon';
import { createStore } from 'redux';
import { expect } from 'chai';

describe('DashboardContainer Component', () => {
  const store = createStore(rootReducer);
  const shallow = (component) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(component);
    return renderer.getRenderOutput();
  };

  it('renders properly', () => {
    const comp = shallow(<DashboardContainer store={store} />);
    expect(comp.props.children).to.eql();
    expect(comp.props.store).to.exist;
  });
});
