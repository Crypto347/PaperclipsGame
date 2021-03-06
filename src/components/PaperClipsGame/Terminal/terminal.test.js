/**
* Libraries
*/

import React from 'react';
import { 
    shallow 
} from 'enzyme';

/**
* Components
*/

import { 
    Terminal 
} from './terminal';
import TerminalLeft from './TerminalLeft/terminalLeft';
import TerminalRight from './TerminalRight/terminalRight';

/**
* Tests
*/

describe('<StrategicModeling/>', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Terminal/>);
    });

    it("should render <TerminalLeft/> and <TerminalRight/>", () => {
        // wrapper.setProps({})
       expect(wrapper.find(TerminalLeft)).toHaveLength(1);
       expect(wrapper.find(TerminalRight)).toHaveLength(1);
    })
});
