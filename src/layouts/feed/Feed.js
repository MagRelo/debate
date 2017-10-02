import React, { Component } from 'react'
import { Link } from 'react-router'

import FeedItem from './FeedItem'

const dummyFeed = [
  {key: 1, user: {image: {contentUrl: 'https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg'}, name: 'Bill'}, item: {title: 'hi!', content: ' consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"'}},
  {key: 2, user: {image: {contentUrl: 'https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg'}, name: 'Nick'}, item: {title: 'Wheres the beef?', content: 'beef-related message'}},
  {key: 3, user: {image: {contentUrl: 'https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg'}, name: 'Jim'},  item: {title: 'Pasta Party', content: 'Canadiens cant say Pasta right'}}
]

const FeedList = dummyFeed.map((feedItem) =>
  <FeedItem key={feedItem.key} itemObject={feedItem}/>
)


class Feed extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">

            <h1>Feed</h1>

            {FeedList}

          </div>
        </div>
      </main>
    )
  }
}

export default Feed
