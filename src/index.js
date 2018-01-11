import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { UserIsAuthenticated } from './util/wrappers.js'


// Initialize web3 and set in Redux.
// import getWeb3 from './util/web3/getWeb3'
// getWeb3
//   .then(() => { console.log('Web3 initialized!') })
//   .catch(() => { console.log('Error in web3 initialization.') })

// Layouts
import App from './App'
import Home from './layouts/home/Home'
import Feed from './layouts/network/NetworkContainer'
import Profile from './layouts/profile/ProfileContainer'
import Page404 from  './layouts/errors/404'

import QuestionCreate from './question/add/Container'
import QuestionList from './question/list/Container'
import QuestionDetail from './question/detail/Container'


// Redux Store
import store from './store'
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Home} />

          <Route path="questions/add" component={QuestionCreate} />
          <Route path="questions/list" component={QuestionList} />
          <Route path="questions/:slug" component={QuestionDetail} />

          <Route path="profile" component={UserIsAuthenticated(Profile)} />

          <Route path='*' exact={true} component={Page404} />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
)
