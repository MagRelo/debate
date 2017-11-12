
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

  handleInputChange(name) {
    this.setState({name: name })
    this.props.selectUser(name)
  }

  handleSubmit(event, user) {
    event.preventDefault()
    this.props.selectUser(user)
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

            {this.props.userList.map(user => {
              return <fieldset key={user._id}>
                 <button
                  className="pure-button pure-button-primary"
                  onClick={(event) => this.handleSubmit(event, user)}>{user.name}
                </button>
              </fieldset>
            })}

        </form>
      </main>
    )
  }
}

export default SelectForm
