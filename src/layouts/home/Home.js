import React, {Component} from 'react'
import { Link } from 'react-router'


// <Link to="hives/new" className="pure-button">Add new Hive</Link>

class Home extends Component {
  render() {
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">

            <h1>Servésa</h1>
            <h2>Network of Trust</h2>

            <hr></hr>

          </div>
        </div>
      </main>
    )
  }
}

export default Home
