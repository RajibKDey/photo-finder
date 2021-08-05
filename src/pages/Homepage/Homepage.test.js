import React from 'react';
import { shallow } from 'enzyme';

import Homepage from './Homepage';

describe('Testing the Homepage Component', () => {
    let wrapper;
    beforeAll(() => {
        wrapper = shallow(<Homepage />);
    })

    afterEach(() => jest.clearAllMocks());

    it('should render the component without crashing', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should allow search', () => {
        wrapper.find('.search').hostNodes().simulate('change', {target: { value: 'search'}});
        expect(wrapper.state('search')).toEqual('search');
    });
});