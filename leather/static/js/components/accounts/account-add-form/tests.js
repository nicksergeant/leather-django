import 'sinon-as-promised';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import AccountAddForm from './';
import sinon from 'sinon';
import { expect } from 'chai';

describe('AccountAddForm Component', () => {
  const shallow = (component) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(component);
    return renderer.getRenderOutput();
  };

  it('renders properly', () => {
    const comp = shallow(<AccountAddForm />);
    expect(comp.props.children.type).to.eql('form');
  });
});
