export default function analyse(code) {
	let result = [];
	//code = code.innerHTML;

	if ( code.match(/(&lt;)\?\s*php/g) ) { // if contains '<?php'
		result.push('php');
	}
	if ( code.match(/(&lt;)\s*\w*\s*(&gt;)/g) ) { // if contains '<something>'
		result.push('html');
	}
	if ( code.match(/(&lt;)\s*style\s*(&gt;)/g) ) { // if contains '<style>'
		result.push('css');
	}
	
	return result;
	
}