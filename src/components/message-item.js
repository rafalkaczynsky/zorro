import React, {Component} from 'react'

export default class MessageItem extends Component {
  render(){
    return(
          <div className="messageContainer">
            <h2>Title: {this.props.title}</h2>
            <p>Message:{this.props.content}</p>
            <h5>User Name: {this.props.userName}</h5>
          </div>
    )
  }
}