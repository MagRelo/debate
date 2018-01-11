import React, { Component } from 'react'
import { Link } from 'react-router'
import Editor from 'react-medium-editor';


class AddComment extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props

    this.state = {}
  }

  handleChange(text) {
    this.setState({text: text})
  }

  handleSubmit(event){
    event.preventDefault()
    this.props.submitFunction(this.state.text)
  }

  render() {
    return(
      <div>

        {this.state.commentOpen ?

          <div>

            <form className="pure-form" onSubmit={this.handleSubmit.bind(this)}>

              <fieldset>
                <label>(Hightlight text to format)</label>
                <Editor
                  className="editor-input"
                  text=""
                  onChange={this.handleChange.bind(this)}/>
              </fieldset>

              <button type="submit" className="pure-button pure-button-primary">Submit</button>
              <button
                type="button"
                className="pure-button"
                onClick={()=> {this.setState({commentOpen: false})}}> Cancel </button>
            </form>
          </div>

        :

          <button
            className="pure-button pure-button-primary"
            onClick={()=> {this.setState({commentOpen: true})}}> + Add Comment</button>

        }

      </div>

    )
  }
}

export default AddComment
