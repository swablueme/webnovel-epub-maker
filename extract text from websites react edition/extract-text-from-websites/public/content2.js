function download2(filename, text) {
  //enables download facility for text
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function getAllFrames(frame, allFrameArray) {
  //collects all frames on a page and puts them into an array 
  allFrameArray.push(frame.frames);
  for (var i = 0; i < frame.frames.length; i++) {
    getAllFrames(frame.frames[i], allFrameArray);
  }
  return allFrameArray;
}


var docText="";
var foundFrames=getAllFrames(window.frames,[]);

//add all text from each frame into one text file and download it
foundFrames.forEach(function(item,index) {
	console.log("Current: " + item.document.body.innerText);
	docText+=item.document.body.innerText;
});	

//download(document.title+ ".txt", docText);

if (docText == ""){
  alert("there was nothing detected on the page!")
}
download2("download2.txt", docText);
