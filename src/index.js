	
	let start = Date.now();

	const codeTags = document.getElementsByTagName('code');
	
	for (let i = 0; i < codeTags.length; i++) {
		let currentCodeTag = codeTags[i].innerHTML;
		currentCodeTag = currentCodeTag.replace(/[ \n\r\t]/g, '');
		currentCodeTag = currentCodeTag.replace(/(\.)([a-z-0-9]*)({)/gi, '$1<span class="-selector">$2</span>$3');
		currentCodeTag = currentCodeTag.replace(/({|;)([a-z-]*)(:)/gi, '$1<span class="-property">$2</span>$3');
		currentCodeTag = currentCodeTag.replace(/(:)([a-z,()0-9#]*)(;|})/gi, '$1<span class="-value">$2</span>$3<br>');
		currentCodeTag = currentCodeTag.replace(/({|})/gi, '<span class="-curly-brackets">$1</span><br>');

		codeTags[i].innerHTML = currentCodeTag;
		console.log(currentCodeTag);
	}

	let end = Date.now();
	console.log(end-start);
	
	


