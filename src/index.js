import analyse from './modules/analyse.js';
import css from './modules/css.js';
import html from './modules/html.js';
import php from './modules/php.js';

const filters = {css, html, php};

//console.log(analyse(document.querySelector('code')));

const codeTags = document.getElementsByTagName('code');
	
for (let i = 0; i < codeTags.length; i++) {
	//let currentCodeTag = codeTags[i].innerHTML;
	let analysisResult = analyse(codeTags[i]);
	codeTags[i].innerHTML = analysisResult[1];
	let codeText = codeTags[i].querySelector('span.-text');
	console.log(codeTags[i].querySelector('span.-text').innerHTML);
	
	if (analysisResult[0].length) {
		analysisResult[0].forEach(filter => {
			
			
			let newElement = document.createElement('span')
			newElement.classList.add('-inner');
			newElement.innerHTML = filters[filter](codeText.innerHTML.trim());;
			codeText.replaceWith(newElement);
			/*
			for (let j = 0; j < codeTagChilds.length; j++ ) {
				if ( codeTagChilds[j].nodeType === Node.TEXT_NODE ) {
					
					if ( codeTagChilds[j].nodeValue.trim() == '' ) { continue }
					let newElement = document.createElement('span')
					newElement.classList.add('-inner');
					
					newElement.innerHTML = filters[filter](codeTagChilds[j].nodeValue.trim());;
					//replace old text with new element;
					codeTagChilds[j].replaceWith(newElement);
				}
			}*/
			//console.log(filters[filter](modifiedCodeTag));
			
		});
	}
	
	
	
}