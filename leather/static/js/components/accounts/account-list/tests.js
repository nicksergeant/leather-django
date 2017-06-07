import 'sinon-as-promised';
import AccountList from './';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import sinon from 'sinon';
import { expect } from 'chai';

describe('AccountList Component', () => {
  const shallow = component => {
    const renderer = TestUtils.createRenderer();
    renderer.render(component);
    return renderer.getRenderOutput();
  };

  it('renders properly', () => {
    const comp = shallow(<AccountList />);
    expect(comp.props.children.type).to.eql();
  });
});
