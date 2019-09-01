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
    // <img src="/4_img/liquor_Trim.gif" width=90% >
    `
    <img src="/4_img/Tesla_Sarony.jpg">
    <p> 미래가 진실을 말하도록 두라.</p>
    <p> 내 업적과 성과는 하나하나 미래에서 평가받을 것이다.</p>
    <p> 현재는 그들의 것일지 모른다.</p>
    <p> 허나, 미래는, 내가 진정으로 일함으로써 얻은 미래만큼은 다른 누구도 아닌 나의 것이다.</p>
    <p> -Nikola Tesla Memorial Center- </p>
    <p><BR></p><p><BR></p><p><BR></p><p><BR></p><p><BR></p><p><BR></p><p><BR></p><p><BR></p><p><BR></p><p><BR></p><p><BR></p><p><BR></p>
    `
    ,'wrap','wrap');
}

wrapContents_init();