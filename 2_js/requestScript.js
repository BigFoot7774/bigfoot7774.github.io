//-requestjs객체(리팩토링 필)
const requestjs = {

    ajax: function (method, URL, callback) {
        let xhr = new XMLHttpRequest();
        let conResult;

        if (method.toUpperCase() === 'GET') {
            method = 'GET';
            xhr.open(method, URL, true);
            xhr.send();
//POST 작동 확인 못함
        }else if (method.toUpperCase() === 'POST') {
            method = 'POST';
            parsingURL = URL.split('?');
            xhr.open(method, parsingURL[0], true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(parsingURL[1]);
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    navjs.inactive();
                    callback(xhr.response);
                } else {
                    navjs.inactive();
                }
            } else {
                navjs.inactive();
                navjs.active();
            }
        };
    },
    
};

//-loadingjs객체(리팩토링 완): innertext 대체&추가, 정지&로딩바제거, 
const loadingjs = {

    loadingPackage: ['-','\\','\|','\/'],

    insert: function (tagName) {
        let count = 0;
        insert = setInterval(function() {
            if (count === 3) {
                tagName.innerText = loadingjs.loadingPackage[3];
                count = 0;
//태그의 innertext를 loadingPackage로 교체
//count값이 3일 때만 count초기화
            }else{
                tagName.innerText = loadingjs.loadingPackage[count];
                count++;
            }
        }, 100);
    },
    plus: function (tagName) {
        let textLength = tagName.innerText;//호출 당시 최초 길이
        let count = 0;
        plus = setInterval(function() {
//count가 0일때는 바로 삽입
//0이 아닐때는 innerText내용을 복원한 뒤
//맨 뒤 한글자만 substr로 걸러내서 교체
            if (count === 0 && tagName.innerText.length === textLength.length) {
                tagName.innerText += loadingjs.loadingPackage[count];
                count++;
            }else if(count === 0 && tagName.innerText.length != textLength.length){
                tagName.innerText = textLength.substr(0, textLength.length);
                tagName.innerText += loadingjs.loadingPackage[count];
                count++;
            }else if(count === 3){
                tagName.innerText = textLength.substr(0, textLength.length);
                tagName.innerText += loadingjs.loadingPackage[3];
                count = 0;
            }else{
                tagName.innerText = textLength.substr(0, textLength.length);
                tagName.innerText += loadingjs.loadingPackage[count];
                count++;
            }
        }, 100);
    },
    stop: function (query) {
        try {
            clearInterval(plus);
            clearInterval(insert);
        } catch (error) {} finally {
            query.innerText = query.innerText.substring(0,query.innerText.length-1);
        }
    }
};

//-navjs객체(리팩토링 완): 생성, 닫기
const navjs = {

    container : document.querySelector('nav'),
    title : document.querySelector('.nav-title'),
    contents : document.querySelector('.nav-contents'),

    active: function (navTitle, navContents) {
        navjs.container.classList.add('z-index-100');
        navjs.title.innerHTML = navTitle;
        // loadingjs 삽입
        loadingjs.plus(navjs.title);
        navjs.contents.innerHTML = navContents;
        
        // 모달 떠있는 상태에서 실행 시 모달 초기화
        modaljs.close();
    },
    active: function () {
        navjs.container.classList.add('z-index-100');
        navjs.title.innerHTML = 'loading...';
        // loadingjs 삽입
        loadingjs.plus(navjs.title);
        
        // 모달 떠있는 상태에서 실행 시 모달 초기화
        modaljs.close();
    },
    inactive: function () {
        loadingjs.stop(navjs.title);
        navjs.container.classList.remove('z-index-100');        
        navjs.title.innerHTML = '';
        navjs.contents.innerHTML = '';
    }
};

//-navjs객체(리팩토링 완): 생성, 닫기, 드래그
const modaljs = {
    
    create: function (titleText, contentsText) {
        
        let container = document.createElement('div');
        let header = document.createElement('div');
        let title = document.createElement('div');
        let close = document.createElement('a');
        let contents = document.createElement('div');

        container.className = 'header-modal header-modal-component flex';
            container.appendChild(header);
            container.appendChild(contents);
        
        header.className = 'header-modal header-modal-title';
            header.appendChild(title);
            header.appendChild(close);
            close.className = 'header-modal-title-close';
            close.setAttribute('href','javascript:');
            close.innerHTML = '&times';

        contents.className = 'header-modal header-modal-contents';


        title.innerHTML = titleText;
        contents.innerHTML = contentsText;
        
        document.body.appendChild(container);

        close.addEventListener('click',modaljs.close);
        modaljs.dragElement(container);
    },
    
    close: function () {
        if (document.querySelector('.header-modal') != null) {
            document.body.removeChild(document.querySelector('.header-modal'));
        }
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

//-wrapjs객체(리팩토링 완): 틀만 생성(세부컨텐츠는 별도로 스크립트 구성 필요), wrap 더하기, wrap 초기화
const wrapjs = {
    
    bodyContainer : document.querySelector('#bodyContainer'),
    
    add: function (contentsHTML) {
        const wrap = document.createElement('div');
        wrap.className = 'wrap';
        wrap.innerHTML = contentsHTML;
        wrapjs.bodyContainer.appendChild(wrap);
    },
    reset: function (contentsHTML) {
        wrapjs.bodyContainer.innerText='';

        const wrap = document.createElement('div');
        wrap.className = 'wrap';
        wrap.innerHTML = contentsHTML;
        wrapjs.bodyContainer.appendChild(wrap);
    }
};

function testInit() {
    wrapjs.reset(`
        <img src="/4_img/Tesla_Sarony.jpg">
        <p> 미래가 진실을 말하도록 두라.</p>
        <p> 내 업적과 성과는 하나하나 미래에서 평가받을 것이다.</p>
        <p> 현재는 그들의 것일지 모른다.</p>
        <p> 허나, 미래는, 내가 진정으로 일함으로써 얻은 미래만큼은 다른 누구도 아닌 나의 것이다.</p>
        <p> -Nikola Tesla Memorial Center- </p>`
    );
    
    modaljs.create('hello modal',
        `My dear Tesla, Many thanks for your letter.<BR>
        I hope you are progressing and will give us something that will beat Roentgen.<BR>
        친애하는 테슬라여, 당신의 편지는 잘 받았네.<BR>
        나는 자네의 발명이 잘 진행되어 우리에게 뢴트겐의 업적을 이길만한 것을 주었으면 하네.`
    );

    
    new requestjs.ajax('GET','/1_app/contactMe.html', wrapjs.add);
}

function defaultInit() {
}

function requestInit() {
    
}

testInit();
defaultInit();
requestInit();

