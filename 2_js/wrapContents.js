const bodyContainer = document.querySelector('#body-container');

let wrap, title, createdDate ;


function createtag(TagName, contentsHTML, idName, className) {

    let title = document.createElement(TagName);
    title.innerHTML = contentsHTML
    title.id = idName;
    title.classList.add(className);
    

    bodyContainer.appendChild(title);
}


function wrapContents_init() {
    createtag('div',
    `
    <p> 여기는 컨텐츠입니다 임시로 할당 받았습니다</p>

    <img src="/4_img/liquor_Trim.gif" width=100% >
    <p> 이미지도 한번 넣어봤습니다</p>
    <p> 템플릿 리터럴은 정말 좋은 것 같습니다.</p>
    <p> 근데 이 문자(\`)의 이름이 뭔가요?</p>
    <p> 그레이브 엑센트라고도 하고</p>
    <p> 백틱이라고도 하던데 어느게 맞는지 모르겠습니다</p>
    <p> 둘 다 맞는 것일까요?</p>

    `
    ,'wrap','wrap');
}

wrapContents_init();