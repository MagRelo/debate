import React, { Component } from 'react'
import { Link } from 'react-router'

class FormComponent extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
    this.state = {
      tokenCount: 10
    }
  }

  handleChange(event) {
    this.setState({tokenCount: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()

    this.props.followUserClick(event, this.props.userId, this.props.targetId, parseInt(this.state.tokenCount, 10))
    // unFollowUserClick(event, userId, targetId, 7)

  }

  render() {
    return(
      <main className="compose-container">
        <div className="pure-g">
          <div className="pure-u-1-1">

            <div className="compose-title-container">
              <span className="title">Purchase Tokens</span>
            </div>

            <div className="compose-editor-container">

            {false ?

              <div>
                <div className="loader"></div>
              </div>

            :

              <form className="pure-form pure-form-stacked" onSubmit={this.handleSubmit.bind(this)}>

                <fieldset>
                  <label>Quantity: <span>{this.state.tokenCount}</span></label>
                  <input
                    id="id"
                    type="range"
                    value={this.state.tokenCount}
                    min="0"
                    max="100"
                    onChange={this.handleChange.bind(this)}
                  ></input>

                </fieldset>


                <button
                  className="pure-button pure-button-primary"
                  type="submit"> Buy
                </button>

              </form>

            }

            </div>

          </div>
        </div>
      </main>
    )
  }
}

export default FormComponent
