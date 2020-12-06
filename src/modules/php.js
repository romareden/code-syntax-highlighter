export default function php(code){
	//Equal
	//code = code.replace(/(=)/g, '<span class="-equal">$1</span>'); //It can be in a string, the search string should be more complex
	code = code.replace(/\s(=)\s/g, ' <span class="-equal">$1</span> ')
	//Colon
	code = code.replace(/(;$)/gm, '<span class="-semicolon">$1</span><br>');
	//Parentheses
	code = code.replace(/(\))/gm, '<span class="-parentheses">$1</span>');
	
	//variable //(\$\w+)\s*(=)\s*([\w\s'"\-\.$>(),=]*)(;)
	code = code.replace(/(\$\w+)/g, '<span class="-variable">$1</span>');
	//Variable property (->)(\w*)
	code = code.replace(/(\-&gt;)(\w*)/g, '<span class="-arrow">$1</span><span class="-property">$2</span>');

	//String
	code = code.replace(/(')([\w\s&;=\-\/"]*|W)(')/g, '<span class="-quote">$1</span><span class="-string">$2</span><span class="-quote">$3</span>');
	
	//Function
	code = code.replace(/(\w*)(\()/g, '<span class="-func">$1</span>$2');

	//Parentheses
	code = code.replace(/(\()/gm, '<span class="-parentheses">$1</span>');
	//Comma
	code = code.replace(/(,)/gm, '<span class="-comma">$1</span>');
	//Period
	code = code.replace(/(\.)/gm, '<span class="-period">$1</span>');
	//Curly braces
	code = code.replace(/({)/gm, '<span class="-curly-brace -qb-open">$1</span><br>');
	code = code.replace(/(})/gm, '<span class="-curly-brace -qb-close">$1</span>');

	//Reserved words
	code = code.replace(/\s+(echo|for|foreach|function|return)(\s?[^\w])/g, '<span class="-word">$1</span>$2'); //doesn't work good
	code = code.replace(/\s(as)\s/g, ' <span class="-word">$1</span> ');

	//add indentation
	let phpEl = document.createElement('div');
	phpEl.innerHTML = code;
	let level = 0;
	let spans = phpEl.querySelectorAll('span');
	for (let i = 0; i < spans.length - 1; i++ ) {
		if ( spans[i].classList.contains('-qb-open') ) {
			level++;
			spans[i + 1].classList.add('-level-' + level );
			
		}
		if ( spans[i].classList.contains('-semicolon') ) {
			console.log(spans[i]);
			if ( !spans[i + 1].classList.contains('-qb-close') ) {
				spans[i + 1].classList.add('-level-' + level );
			}
		}
		if ( spans[i].classList.contains('-qb-close') ) {
			level--;
			spans[i].classList.add('-level-' + level );
			spans[i + 1].classList.add('-level-' + level );
		}
		
	}
	code = phpEl.innerHTML;

    
    return code;
}
