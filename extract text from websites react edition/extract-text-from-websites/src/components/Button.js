
/*global chrome*/
import './Button.css';

import send_message from './send_message.js'
import React, {Component} from 'react';
/*
function send_message(...message) {
  for (const msg of message) { 
    chrome.runtime.sendMessage(null, msg, (response) => console.log("here from react!"));

  }
  
}*/

async function hell(){
  const readLocalStorage = async (key) => {
    return new Promise((resolve, reject) => {
      chrome.storage.local.get("key", function (result) {
        resolve(result ?? false);  
      });
    });
  };
  let key1 = await readLocalStorage('key');


  return key1.key
}

const text_map = {
  true:'iFrame on',
  false:'iFrame off'
}
class Button extends React.Component {
  constructor(props) {

    
    send_message("51")
    super(props);
    this.state = {isToggleOn:  null}
    this.handleClick = this.handleClick.bind(this);
    



  }

  async componentDidMount() {
    this.setState({isToggleOn: await hell()}, function(){
      send_message("set value"+this.state.isToggleOn)
    })
  }
  
  


  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }), function() {
      chrome.storage.local.set({'key': this.state.isToggleOn}, 
      send_message("state has been set to "+this.state.isToggleOn))

    });
  }

  render() {
    return (
      <button className = "hello" onClick={this.handleClick}>
        {text_map[this.state.isToggleOn]}
      </button>
    );
  }
}




export default Button;