//-requestjs객체(리팩토링 필)
const requestjs = {

    ajax: function (method, URL, callback, async) {
        let xhr = new XMLHttpRequest();

        if (method.toUpperCase() === 'GET') {
            method = 'GET';
            xhr.open(method, URL, async);
            xhr.send();
        }else if (method.toUpperCase() === 'POST') {
            method = 'POST';
            parsingURL = URL.split('?');
            xhr.open(method, parsingURL[0], async);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(parsingURL[1]);
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    callback(xhr.response);
                    return xhr.status;
                } else {
                    document.write('<div align="center">\
                    \<h1>Sorry</h1><BR>\
                    <h3>요청하신 페이지를 찾을 수 없습니다.<BR>\
                    잠시 후 다시 시도해 주세요\
                    </h3>\
                    <h3>Please try again later.<BR>\
                    The requested page was not found\
                    </h3>\
                    </div>');
                    return xhr.status;
                }
            }else{
                return xhr.readyState;
            }
        };
    },
    // 보류
    // pushstate: function (data, title, uri) {
    //     const bodyContainer = document.querySelector(data).innerHTML;
    //     window.history.pushState(bodyContainer, title, uri);
    // },
    // popstate: function (params) {
    //     window.addEventListener('popstate',function () {
    //         console.log('뒤로가기?');
            
    //      });
    // }
};

//-loadingjs객체(리팩토링 완): innertext 대체&추가, 정지&로딩바제거, 
const loadingjs = {

//interval 주소값 저장 배열
    intervalAddr: [],
//tag HTML값 복원을 위한 오브젝트
    recoveryTagAddr: {},
    loadingPackage: ['-','\\','\|','\/'],

    insert: function (tagName) {
        let tagContents = document.querySelector(tagName);
        let count = 0;

        loadingjs.recoveryTagAddr[tagName] = tagContents.innerHTML;
        loadingjs.intervalAddr.push(setInterval(function() {
            if (count === 3) {
                tagContents.innerText = loadingjs.loadingPackage[3];
                count = 0;
//태그의 innertext를 loadingPackage로 교체
//count값이 3일 때만 count초기화
            }else{
                tagContents.innerText = loadingjs.loadingPackage[count];
                count++;
            }
        }, 100));
    },
    plus: function (tagName) {
        let tagContents = document.querySelector(tagName);
        let textLength = document.querySelector(tagName).innerHTML;//호출 당시 최초 길이
        let count = 0;
        
        loadingjs.recoveryTagAddr[tagName] = tagContents.innerHTML;
        loadingjs.intervalAddr.push(setInterval(function() {
//count가 0일때는 바로 삽입
//0이 아닐때는 innerText내용을 복원한 뒤
//맨 뒤 한글자만 substr로 걸러내서 교체
            if (count === 0 && tagContents.innerHTML.length === textLength.length) {
                tagContents.innerHTML += loadingjs.loadingPackage[count];
                count++;
            }else if(count === 0 && tagContents.innerHTML.length != textLength.length){
                tagContents.innerHTML = textLength.substr(0, textLength.length);
                tagContents.innerHTML += loadingjs.loadingPackage[count];
                count++;
            }else if(count === 3){
                tagContents.innerHTML = textLength.substr(0, textLength.length);
                tagContents.innerHTML += loadingjs.loadingPackage[3];
                count = 0;
            }else{
                tagContents.innerHTML = textLength.substr(0, textLength.length);
                tagContents.innerHTML += loadingjs.loadingPackage[count];
                count++;
            }
        }, 100));
    },
    stop: function () {
        for (let index = 0; index < loadingjs.intervalAddr.length; index++) {
            clearInterval(loadingjs.intervalAddr[index]);
        }
        loadingjs.intervalAddr = [];

        for (const key in loadingjs.recoveryTagAddr) {
            if (loadingjs.recoveryTagAddr.hasOwnProperty(key)) {
                document.querySelector(key).innerHTML = loadingjs.recoveryTagAddr[key];
            }
        }
        loadingjs.recoveryTagAddr = {};
        // document.querySelector(key).innerHTML.slice(0,-1);
    },
};

//-navjs객체(리팩토링 완): 생성, 닫기
const navjs = {

    active: function (title, contents) {
        nav = document.createElement('nav');
        navTitle = document.createElement('div');
        navContents = document.createElement('div');
        
        nav.className = 'z-index-100';
        navTitle.className = 'nav-title';
        navContents.className = 'nav-contents';

        nav.appendChild(navTitle);
        nav.appendChild(navContents);
        document.body.appendChild(nav);
        
        navTitle.innerHTML = title;
        // loadingjs 삽입
        loadingjs.plus('.nav-title');
        navContents.innerHTML = contents;
        
    },
    loadBase: function () {
        nav = document.createElement('nav');
        navTitle = document.createElement('div');
        navContents = document.createElement('div');
        
        nav.className = 'z-index-100';
        navTitle.className = 'nav-title';
        navContents.className = 'nav-contents';

        nav.appendChild(navTitle);
        nav.appendChild(navContents);
        document.body.appendChild(nav);

        navTitle.innerHTML = 'loading...';
        // loadingjs 삽입
        loadingjs.plus('.nav-title');

    },
    inactive: function () {
        loadingjs.stop();
        document.body.removeChild(document.querySelector('nav'));
    }
};

//-navjs객체(리팩토링 완): 생성, 닫기, 드래그
// new키워드를 통한 새로운 오브젝트 생성의 필요가 없음
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
            close.setAttribute('href','javascript:;');
            close.innerHTML = '&times';

        contents.className = 'header-modal header-modal-contents';


        title.innerHTML = titleText;
        contents.innerHTML = contentsText;
        
        document.body.appendChild(container);

        close.addEventListener('click',modaljs.close);
        modaljs.dragElement(container);
    },
    
    close: function () {
        if (this.parentNode.parentNode != null) {
            document.body.removeChild(this.parentNode.parentNode);
                // document.querySelector('.header-modal'));
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
    },
    createElements: function () {
        
    }
};

const activeScript = {
    asideList: function (acceptedData) {
        let jsonData;
        if (typeof data === 'object') {
            jsonData = acceptedData;
        }else {
            jsonData = JSON.parse(acceptedData);
        }
        const asideList = document.querySelector('#asideList');
        let tagHTML = '';
        for (const key in jsonData) {
            if (jsonData.hasOwnProperty(key)) {
                tagHTML += `<li><a href="${jsonData[key]}">
                            ${key}
                            </a></li>`;
            }
        }
        asideList.innerHTML = tagHTML;
    },
    alertModal : function(fileURL) {
            requestjs.ajax('GET', fileURL, function (data) {
            const data_ = JSON.parse(data);
            modaljs.create(data_.title, data_.contents);
        }, true);
    },
    foward: function (URL, contents) {
        navjs.active('loading...',contents);

// 보류
//     let secondvalue;
//     let resultValue = requestjs.ajax('GET', URL, wrapjs.reset, false);
//     if (resultValue === 202 || 404) {
//         secondvalue = 1000;
//     }else {
//         secondvalue = 10000;
//     }
//     setTimeout(function() {
//         navjs.inactive();
//     }, secondvalue);

        setTimeout(function() {
            requestjs.ajax('GET',URL,function(data) {
                wrapjs.reset(data);
                navjs.inactive();
            }, true);
        }, 1000);
    }
};

function testInit() {
    
    const dateObj = new Date(2019, 8-1, 9);
    const pastDays = Math.floor((new Date().getTime() - dateObj.getTime())/1000/60/60/24);
    document.querySelector('.header-contents').innerText = pastDays+'일 지났다, 긴장하자';
}
//정신차리자
testInit();



function defaultInit() {
    requestjs.ajax('GET','/1_app/appDataList.json', activeScript.asideList, true);



    
    
    
}

function requestInit() {
    
}

defaultInit();
requestInit();

