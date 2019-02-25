import * as React from 'react';
import { shallow } from 'enzyme';
import GlobalFooter from '../index';

describe('GlobalFooter component', () => {
  it('container', () => {
    const globalFooter = shallow(<GlobalFooter />);
    expect(globalFooter.html()).toEqual(`<div class="globalFooter"></div>`);
  });

  it('copyright', () => {
    const globalFooter = shallow(<GlobalFooter copyright="copyright" />);
    expect(globalFooter.html()).toBe(
      `<div class="globalFooter"><div class="copyright">copyright</div></div>`
    );
  });
});
