export default function css(code){
	
		//currentCodeTag = currentCodeTag.replace(/(\.|\#)(\w*)({)/gi, '$1<span class="-selector">$2</span>$3');
		//Select everything starting with ^ or { and ending } or \s
		code = code.replace(/(^|}|\n*)([\w\s\.#]*)({)/gi, function (match, p1, p2, p3, offset, string) {
			return p1 + '<br><span class="-selector">' + p2.replace(/^\s*/g, '').replace(/\s*$/g, '') + '</span>' + p3;
		});
		//CSS Properties. Select everything starting width { or ; or \s and ending with :
			//code = code.replace(/({|;|\s)([\w\-]*)(:)/gi, '$1<span class="-property">$2</span>$3');
		//CSS Values.
			//code = code.replace(/(:|\s)([\w\s,()#-]*)(;|})/gi, '$1<span class="-value">$2</span>$3<br>');
		// Rule
		code = code.replace(/({|;|\s)([\w\-]*)(:|\s)([\w\s,()#-]*)(;|\n)/gi, '<span class="-rule"><span class="-property">$2</span><span class="-colon">$3</span><span class="-value">$4</span><span class="-semicolon">$5</span></span>');

		//
		code = code.replace(/({)/gi, '<span class="-curly-bracket -opened">$1</span>');
		code = code.replace(/(})/gi, '<span class="-curly-bracket -closed">$1</span>');
		
		return code;
}
