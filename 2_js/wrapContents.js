let wrap, title, createdDate ;



function createtag(TagName, contentsHTML, idName, className) {

    let title = document.createElement(TagName);
    title.innerHTML = contentsHTML
    title.id = idName;
    title.classList.add(className);
    

    document.body.appendChild(title);
}


function wrapContents_init() {
    createtag('div','hi','wrap','wrap');
}

wrapContents_init();