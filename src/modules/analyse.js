export default function analyse(element) {
	let filters = [];
	let code = element.innerHTML;

	if ( code.match(/(&lt;)\?\s*php/g) ) { // if contains '<?php'
		code = code.replace(/(&lt;\?php)/g, '<span class="-php"><span class="-php-tag -opened">$1</span><span class="-text">');
		code = code.replace(/(\?&gt;)/g, '</span><span class="-php-tag -closed">$1</span></span>');

		filters.push('php');
	}
	if ( code.match(/(&lt;)\s*style\s*(&gt;)/g) ) { // if contains '<style>'
		code = code.replace(/(&lt;)(style)(&gt;)/g, '<span class="-css"><span class="-tag -opened"><span class="-lt">&lt;</span><span class="-name">$2</span><span class="-gt">&gt;</span></span><span class="-text">');
		code = code.replace(/(&lt;)(\/style)(&gt;)/g, '</span><span class="-tag -closed"><span class="-lt">&lt;</span><span class="-name">$2</span><span class="-gt">&gt;</span></span></span>');
		
		filters.push('css');
	}
	if ( code.match(/(&lt;)\s*\w*\s*(&gt;)/g) ) { // if contains '<something>'
		code = code.replace(/(&lt;!DOCTYPE html&gt;|&lt;\w+&gt;)([\w\s&;#"-=\/\.]*)(&lt;\/\w+&gt;[^'])/g, '<span class="-html"><span class="-text">$1$2$3</span></span>'); //String starting &lt;!DOCTYPE html&gt; or	&lt;html&gt; contains w\s&;#"-=\/\. and ends &lt;\/\w+&gt; but doesn't have " at the end

		filters.push('html');
	}
	
	return [filters, code];
}