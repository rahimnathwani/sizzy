import React from 'react';
import {Route} from 'mobx-router';

//views
import Home from 'views/Home';
import FaqView from 'views/FaqView';

const views = {
  home: new Route({
    id: 'home',
    path: '/',
    component: <Home />
  }),
  faq: new Route({
    id: 'faq',
    path: '/faq/:questionId?',
    component: <FaqView />
  })
};

export default views;
