//request 요청시에 사용할 예정

//태그의 innertext를 loadingPackage로 교체
//count값이 3일 때만 count초기화
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


//count가 0일때는 바로 삽입
//0이 아닐때는 innerText내용을 복원한 뒤
//맨 뒤 한글자만 substr로 걸러내서 교체
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