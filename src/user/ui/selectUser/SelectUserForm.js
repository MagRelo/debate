
import React, { Component } from 'react'
import {Typeahead}  from 'react-typeahead';


class SelectForm extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
    this.state = {
      name: ''
    }
  }

  componentDidMount(){
    this.props.getUsers()
  }

  userList(){
    return this.props.userList.map(user => {return user.name})
  }

  handleInputChange(name) {
    this.setState({name: name })
    this.props.selectUser(name)
  }

  handleSubmit(event, name) {
    event.preventDefault()
    this.props.selectUser(name)
  }
  //
  // <Typeahead
  //   name="name"
  //   options={this.userList()}
  //   onOptionSelected={this.handleInputChange.bind(this)}/>
  //
  // <button
  //   type="submit"
  //   className="pure-button pure-button-primary"> Select
  // </button>

  render() {
    return(
      <main className="signup">
        <h2>Select User</h2>
        <form className="pure-form pure-form-stacked " onSubmit={this.handleSubmit.bind(this)}>

          <label>Select User</label>

          <ul>
          {this.userList().map(user => {
            return <li key={user}>
              <button
                className="pure-button pure-button-primary"
                onClick={(event) => this.handleSubmit(event, user)}>{user}</button>
            </li>
          })}
          </ul>

        </form>
      </main>
    )
  }
}

export default SelectForm
