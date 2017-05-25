import 'sinon-as-promised';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TransactionList from './';
import sinon from 'sinon';
import { expect } from 'chai';

describe('TransactionList Component', () => {
  const shallow = (component) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(component);
    return renderer.getRenderOutput();
  };

  it('renders properly', () => {
    const comp = shallow(<TransactionList transactions={[]} />);
    expect(comp.props.children.type).to.eql('table');
  });
});
