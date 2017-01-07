import 'sinon-as-promised';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import AccountNameForm from './';
import sinon from 'sinon';
import { expect } from 'chai';

describe('AccountNameForm Component', () => {
  const shallow = (component) => {
    const renderer = TestUtils.createRenderer();
    renderer.render(component);
    return renderer.getRenderOutput();
  };

  it('renders properly', () => {
    const comp = shallow(<AccountNameForm account={{}} />);
    expect(comp.props.children.type).to.eql('form');
  });
});
