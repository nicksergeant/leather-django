import 'sinon-as-promised';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TransactionInList from './';
import sinon from 'sinon';
import { expect } from 'chai';

describe('TransactionInList Component', () => {
  const shallow = (component) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(component);
    return renderer.getRenderOutput();
  };

  it('renders properly', () => {
    const comp = shallow(<TransactionInList transaction={{}} />);
    expect(comp.type).to.eql('li');
  });
});
