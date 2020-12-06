export default function html(code){
	//Wrap simple text
	code = code.replace(/(&gt;)([\w#\.\-\s\n\r\t]+)(&lt;)/g,  function (match, p1, p2, p3) {
		if ( p2.match(/^[\s\n\r\t]+$/gi)) { //If theare are only spaces then remove them
			return p1 + p3;
		}
		return p1 + '<span class="-text">' + p2 + '</span>' + p3;
	});	
	
	code = code.replace(/(<span class="-tag -text">)([\s\n\r\t]*)(<\/span>)/g, '');
	
	//Tags
	code = code.replace(/(&lt;\s*\/?)(\w*)/g, '<span class="-tag"><span class="-lt">$1</span><span class="-name">$2</span>'); //old. it works but selects tags in "" which should be strings
	//code = code.replace(/([^"]\s)(&lt;\s*\/?)(\w*[^(?php)])/gi, '<span class="-tag"><span class="-lt">$2</span><span class="-name">$3</span>');
	code = code.replace(/(\/?&gt;)/g, '<span class="-gt">$1</span></span>');

	//Remove multiple whitespaces
	code = code.replace(/\s+/g, ' ');

	if ( code.indexOf('class="-tag"') ) {
		let htmlEl = document.createElement('div');
		htmlEl.innerHTML = code;
		let indent = 0;
		let tags = htmlEl.querySelectorAll('.-tag');
		let all = htmlEl.querySelectorAll('.-tag, .-text');
		
		for (let i = 1; i < tags.length; i++) {

			let tagChilds = tags[i].childNodes;

			for (let j = 0; j < tagChilds.length; j++ ) {
				if ( tagChilds[j].nodeType === Node.TEXT_NODE ) {
					//create element
					let newElement = document.createElement('span')
					newElement.classList.add('-attributes');
					//asign new string
					newElement.innerHTML = tagChilds[j].nodeValue.trim().replace(/(\w+)=("[\w-#\/\.]*")/g, '<span class="-attr"><span class="-name">$1</span><span class="-equal">=</span><span class="-value">$2</span></span>');
					//replace old text with new element;
					tagChilds[j].replaceWith(newElement);
				}
			}

			let lt = tags[i].querySelector('.-lt');
			let gt = tags[i].querySelector('.-gt');
			
			let lt_1 = tags[i-1].querySelector('.-lt');
			let gt_1 = tags[i-1].querySelector('.-gt');
			
			if (lt && lt.textContent.indexOf('/') == -1) {
				indent++;
			}
			if ( 
				(i != 0) &&
				(gt_1 && gt_1.textContent.indexOf('/') != -1) ||
				(lt_1 && lt_1.textContent.indexOf('/') != -1) ) {
				indent--;
			}
			if ( (lt && lt.textContent.indexOf('/') != -1 ) && 
				( lt_1 && lt_1.textContent.indexOf('/') == -1) && 
				( gt_1 && gt_1.textContent.indexOf('/') == -1) ) {
				tags[i-1].classList.add('-inline');
				tags[i].classList.add('-inline');
				tags[i].classList.add('-closing');
			}
			tags[i].classList.add('-level-' + indent);
		}
		for (let i = 0; i < all.length; i++) {
			if ( all[i].classList.contains('-text') ) {
				all[i-1].classList.add('-inline');
				all[i+1].classList.add('-inline');
			}
		}

		code = htmlEl.innerHTML;
	}

	return code;
}
