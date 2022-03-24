function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}


let found = document.body.querySelectorAll('script[type="text/javascript"]')

let text_content = ""

for (let f of found){
	let extracted = f.innerHTML
	const regex = /DOCS_modelChunk \= \[(\{.*?}).*?/
	var arr = extracted.match(regex)
	if (arr !== null) {
		let j_value = JSON.parse(arr[1])
		text_content+=j_value.s
}}



/*
if (document.body.innerText == ""){
  alert("there was nothing detected on the page!")
}*/


download(document.title+ ".txt", text_content);