import React, { Component } from 'react';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import I from 'immutable';
import Microcastle from 'microcastle';
import thunk from 'redux-thunk';

import './index.css'
import { Panel } from 'react-bootstrap';

var messages = [];

const reducer = combineReducers({
  microcastle: Microcastle.MicrocastleStore.reducer,
});

const handleNew = (type) => {
  return Promise.resolve({'id': type});
}


const handleEdit = (value, info) => {
  console.log('handled edit', value, info);
  return Promise.resolve(value);
};

const schemas = {
  text: { //schema 
    attributes: { //list of fields
      title: { type: 'text', },
      content: { type: 'markdown'},
      userName: { type: 'text'},
    },
    onNew: handleNew,
    onEdit: handleEdit,
  },
};

const store = createStore(reducer, {
  microcastle: I.fromJS({
    data: { // Put defualt data here
      text: { // Schema
        default: { // Entry
          title: 'Default Title', // Attribute with value
          content: 'Default message text....',
          userName: 'Anonim',
        }
      },
    },
    editor: {},
  }),
}, compose(  
  applyMiddleware(thunk)
));

class MessageItem extends Component {
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

class ButtonBar extends Component {
  render(){
    return(
      <div className="buttonsBar">
        <div 
            className="buttonItem"
            onClick={this.props.onCreateClicked}
          >
          <Microcastle.Button.Create 
          visible={!this.props.sendVisible}
          schema='text'
          text="New Message"
          />
        </div>
        <div  
          className="buttonItem"
          onClick={this.props.onPublishClicked}>
          <Microcastle.Button.Base
            text="Publish Comment"
            visible={this.props.sendVisible}	
            onClick={()=>{
              messages.push(this.props.newMessage)
            }}
          />
        </div> 
        <div
          className="buttonItem"
        >       
          <Microcastle.Button.EditEntry
            text="Edit Comment"
            visible={this.props.sendVisible}
            schema="text"
            entry="id"
          />
        </div>
      </div>
    )
  }
}

class CommentBox extends Component {
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
            dataText: 'Comment waiting for publication. Check details and Click on <Send Message> button',
          })
        }
        onPublishClicked={() => 
          this.setState({
            sendVisible: !this.state.sendVisible,
            dataText: 'Last sent comment',           
          })
        }
        newMessage={newMessage}
        sendVisible={this.state.sendVisible}
      />
    </div>
    );
  }
}

const Container = Microcastle.MicrocastleConnect(["text"])(CommentBox);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Microcastle.MicrocastleEditor schemas={schemas} />
          <Container />
        </div>
      </Provider>
    );
  }
}

export default App;
