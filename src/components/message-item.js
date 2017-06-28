import React, {Component} from 'react'

import {Button} from 'react-bootstrap'

export default class MessageItem extends Component {
  render(){
    return(
          <div className="messageContainer">
            <div className="topLane">
                <div className="imageContainer">
                    <img src="http://bootdey.com/img/Content/user_1.jpg" alt="avatar {this.props.title}" width="100%"/>
                </div>
                <div className="detailsContainer">
                    <div className="userName">
                        <span className="black"><strong>{this.props.userName}</strong></span><i> post this</i>
                    </div>
                    <div className="time">
                        <strong> 1 minute</strong><i> ago.</i> 
                    </div>
                </div>
            </div>

            {/*<h2>Title: {this.props.title}</h2>*/}
            <div className="message">
                <p>{this.props.content}</p>
            </div>
            <Button>Like</Button> <Button>Dislike</Button>
          </div>
    )
  }
}