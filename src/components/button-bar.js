import React, {Component} from 'react'
import Microcastle from 'microcastle';

export default class ButtonBar extends Component {
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
            onClick={this.props.handleMessagePush}
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