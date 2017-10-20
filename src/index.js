import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated } from './util/wrappers.js'

// Layouts
import App from './App'

import Home from './layouts/home/Home'
import Feed from './layouts/network/NetworkContainer'
import User from './layouts/user/UserContainer'
import Profile from './layouts/profile/ProfileContainer'
import Transactions from './layouts/transactions/TransactionList'

import Page404 from  './layouts/errors/404'

// Redux Store
import store from './store'

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />

          <Route path="feed" component={UserIsAuthenticated(Feed)} />
          <Route path="messages" component={UserIsAuthenticated(User)} />
          <Route path="profile" component={UserIsAuthenticated(Profile)} />
          <Route path="transactions" component={Transactions} />

          <Route path='*' exact={true} component={Page404} />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
)
