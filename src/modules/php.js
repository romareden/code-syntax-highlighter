export default function php(code){
	
    code = code.replace(/(&lt;\?php)/gi, '<span class="-php-tag -opened">$1</span><br>');
	code = code.replace(/(\?&gt;)/gi, '<span class="-php-tag -closed">$1</span><br>');
	//variable
	code = code.replace(/(\$\w+)/gi, '<span class="-php-variable">$1</span>');
	//String
	//currentCodeTag = currentCodeTag.replace(/("\w*"|'\w*')/gi, '<span class="-php-string">$1</span>');
    
    return code;
}
