import analyse from './modules/analyse.js';
import css from './modules/css.js';
import html from './modules/html.js';
import php from './modules/php.js';

const filters = {css, html, php};

//console.log(analyse(document.querySelector('code')));

const codeTags = document.getElementsByTagName('code');
	
for (let i = 0; i < codeTags.length; i++) {
	let currentCodeTag = codeTags[i].innerHTML;
	//console.log(typeof currentCodeTag);
	let analysisResult = analyse(currentCodeTag);
	let modifiedCodeTag = currentCodeTag;
	
	if (analysisResult.length) {
		analysisResult.forEach(filter => {
			//console.log(filters[filter](modifiedCodeTag));
			modifiedCodeTag = filters[filter](modifiedCodeTag);
		});
	}
	codeTags[i].innerHTML = modifiedCodeTag;
}