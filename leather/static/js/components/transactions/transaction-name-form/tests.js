import 'sinon-as-promised';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import TransactionNameForm from './';
import sinon from 'sinon';
import { expect } from 'chai';

describe('TransactionNameForm Component', () => {
  const shallow = (component) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(component);
    return renderer.getRenderOutput();
  };

  it('renders properly', () => {
    const comp = shallow(<TransactionNameForm transaction={{}} />);
    expect(comp.type).to.eql('form');
  });
});
