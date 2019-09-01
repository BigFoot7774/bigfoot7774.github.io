//-requestjs객체(리팩토링 필)
const requestjs = {
    ajaxGet: function (params) {
        let xhr;
        // 브라우저 호환성에 따라 생성(IE6이하 호환성이라 지워야 하는 지 고민 중)
        if (window.XMLHttpRequest) { 
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) { 
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onreadystatechange = function () {
            
        };
    }
};

//-loadingjs객체(리팩토링 필)
const loadingjs = {

    insert: function (tagName) {
        const _tagName = document.querySelector(tagName);
        const loadingPackage = ['-','\\','\|','\/']
        let count = 0;
        setInterval(function () {
            if (count === 3) {
                _tagName.innerText = loadingPackage[3];
                count = 0;
//태그의 innertext를 loadingPackage로 교체
//count값이 3일 때만 count초기화
            }else{
                _tagName.innerText = loadingPackage[count];
                count++;
            }
        }, 100);
    },
    plus: function (tagName) {
        const text = document.querySelector(tagName);
        const loadingPackage = ['-','\\','\|','\/']
        let textLength = text.innerText;
        let count = 0;

        setInterval(function () {
//count가 0일때는 바로 삽입
//0이 아닐때는 innerText내용을 복원한 뒤
//맨 뒤 한글자만 substr로 걸러내서 교체
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
    },
};

//-navjs객체(리팩토링 완): 생성, 닫기
const navjs = {

    container : document.querySelector('nav'),
    title : document.querySelector('.nav-title'),
    contents : document.querySelector('.nav-contents'),

    active: function (navTitle, navContents) {
        navjs.container.classList.add('z-index-100');
        navjs.title.innerHTML = navTitle;
        loadingjs.plus('.nav-title');
        navjs.contents.innerHTML = navContents;

// 모달 떠있는 상태에서 실행 시 모달 초기화
        modaljs.close();
    },

    inactive: function () {
        navjs.container.classList.remove('z-index-100');        
        navjs.title.innerHTML = '';
        navjs.contents.innerHTML = '';
        }
};

//-navjs객체(리팩토링 완): 생성, 닫기, 드래그
const modaljs = {
    
    container: document.querySelector("#headerModal"),
    titleContainer: document.querySelector(".header-modal-title"),
    closebtn: document.querySelector(".header-modal-title-close"),
    title: document.querySelector("#modalTitle"),
    contents: document.querySelector("#modalContents"),
    

    create: function (titleText, contentsText) {
        
        modaljs.container.classList.add('flex');
        modaljs.title.innerText = titleText;
        modaljs.contents.innerText = contentsText;
    },

    close: function () {
        modaljs.title.innerText='';
        modaljs.contents.innerText='';
        modaljs.container.classList.remove('flex');
    },

    //w3s 인용
    //출처 : https://www.w3schools.com/howto/howto_js_draggable.asp
    dragElement: function (element) {

        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        if (this.titleContainer) {
            this.titleContainer.onmousedown = dragMouseDown;
        } else {
            element.onmousedown = dragMouseDown;
        }

        function dragMouseDown(event) {
            event = event || window.event;
            event.preventDefault();
            pos3 = event.clientX;
            pos4 = event.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(event) {
            event = event || window.event;
            event.preventDefault();
            pos1 = pos3 - event.clientX;
            pos2 = pos4 - event.clientY;
            pos3 = event.clientX;
            pos4 = event.clientY;
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }

    }
};










function requestInit() {
    modaljs.closebtn.addEventListener('click',modaljs.close);
    modaljs.dragElement(modaljs.container);

//임시
    navjs.active('title','contents');
}

requestInit();

