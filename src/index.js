import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated } from './util/wrappers.js'

// Layouts
import App from './App'
import Home from './layouts/home/Home'

import Profile from './user/layouts/profile/ProfileContainer'

import Inbox from './layouts/messages/inbox/InboxLayout'
import ComposeMessage from './layouts/messages/compose/ComposeContainer'

// import Message from './layouts/messages/inbox/Message'
// <Route path="messages/:id" component={Message} />

import Feed from './layouts/feed/FeedPage'

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
          <Route path="profile" component={UserIsAuthenticated(Profile)} />

          <Route path="feed" component={UserIsAuthenticated(Feed)} />

          <Route path="transactions" component={Transactions} />

          <Route path="messages/new" component={UserIsAuthenticated(ComposeMessage)} />
          <Route path="messages" component={UserIsAuthenticated(Inbox)} />

          <Route path='*' exact={true} component={Page404} />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
)
