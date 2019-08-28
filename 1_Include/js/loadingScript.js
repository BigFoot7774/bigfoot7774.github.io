function insertLoadbar(tagName) {
    const _tagName = document.querySelector(tagName);
    const loadingPackage = ['-','\\','\|','\/']
    let count = 0;
    setInterval(() => {
        if (count === 3) {
            _tagName.innerText = loadingPackage[3];
            count = 0;
        }else{
            _tagName.innerText = loadingPackage[count];
            count++;
        }
    }, 100);
}

function plusLoadbar(tagName) {
    const text = document.querySelector(tagName);
    let textLength = text.innerText;
    const loadingPackage = ['-','\\','\|','\/']
    let count = 0;
    setInterval(() => {
        if (count === 0 && text.innerText.length === textLength.length) {
            text.innerText += loadingPackage[count];
            count++;
        }else if(count === 0 && text.innerText.length != textLength.length){
            text.innerText = textLength.substr(0, textLength.length);
            text.innerText += loadingPackage[count];
            count++;
        }else if(count === 3){
            text.innerText = textLength.substr(0, textLength.length);
            text.innerText += loadingPackage[3];
            count = 0;
        }else{
            text.innerText = textLength.substr(0, textLength.length);
            text.innerText += loadingPackage[count];
            count++;
        }
    }, 100);
}