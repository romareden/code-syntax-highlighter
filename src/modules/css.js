export default function css(code){
		
		code = code.replace(/(^|}|\n*)([\w\s\.#]*)({)/g, function (match, p1, p2, p3, offset, string) {
			return p1 + '<br><span class="-selector">' + p2.trim() + '</span>' + p3;
		});
		
		code = code.replace(/({|;|\s)([\w\-]*)(:|\s)([\w\s,()#-]*)(;|\n)/g, '<span class="-rule"><span class="-property">$2</span><span class="-colon">$3</span><span class="-value">$4</span><span class="-semicolon">$5</span></span>');

		//
		code = code.replace(/({)/g, '<span class="-curly-bracket -opened">$1</span>');
		code = code.replace(/(})/g, '<span class="-curly-bracket -closed">$1</span>');
		
		return code;
}
