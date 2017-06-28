import React, {Component} from 'react'

import {ButtonBar, MessageItem} from './'


var messages = [];

export default class CommentBox extends Component {
    constructor(props){
    super(props)

    this.state = {
      sendVisible: false,
      dataText: '',
    }
  }
  render() {

    let title;
    let content;
    let userName;

    title = this.props.mcGetAttribute('text', 'id', 'title');
    content = this.props.mcGetAttribute('text', 'id', 'content');  
    userName = this.props.mcGetAttribute('text', 'id', 'userName'); 

    let newMessage = (
      <MessageItem
        title={title}
        content={content}
        userName={userName}
      />
    )

    return (
    <div className="container">
      <h1>AWESOME COMMENT BOX</h1>
      {messages.length === 0 ? <h5>No comments published yet</h5> : messages}
      <div>
        <h6>{this.state.dataText}</h6>
        {this.state.dataText !== '' && 
        <MessageItem
          title={title}
          content={content}
          userName={userName}
        />
        }
      </div>
      <ButtonBar 
        onCreateClicked={() => 
          this.setState({
            sendVisible: !this.state.sendVisible,
            dataText: 'Comment waiting for publication. Check details and Click on <Publish Comment> button',
          })
        }
        onPublishClicked={() => 
          this.setState({
            sendVisible: !this.state.sendVisible,
            dataText: 'Last sent comment',           
          })
        }
        sendVisible={this.state.sendVisible}
        handleMessagePush={()=>{
          messages.push(newMessage)
        }}
      />
    </div>
    );
  }
}