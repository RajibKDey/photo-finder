/* eslint-disable no-extend-native */
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import 'jest-canvas-mock';
import React from 'react';
React.useLayoutEffect = React.useEffect;

Enzyme.configure({
  adapter: new EnzymeAdapter(),
  disableLifecycleMethods: true,
});
