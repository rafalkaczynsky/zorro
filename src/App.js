import React, { Component } from 'react';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import I from 'immutable';
import Microcastle from 'microcastle';
import thunk from 'redux-thunk';

import './styles/index.css'
import {CommentBox} from './components'

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
