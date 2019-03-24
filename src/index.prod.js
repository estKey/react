import React from 'react';
import { render } from 'react-dom';
import 'babel-polyfill';
import './app/App'

const renderDom = Component => {
    render(
          <Component />,
        document.getElementById('app')
    );
};
renderDom(App);


