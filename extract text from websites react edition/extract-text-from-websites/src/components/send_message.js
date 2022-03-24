/*global chrome*/
function send_message(...message) {
    for (const msg of message) { 
      chrome.runtime.sendMessage(null, msg, (response) => console.log("here from react!"));
  
    }
    
  }
  
  export default send_message;