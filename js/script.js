var request = {

    json: 'application/json',
    form: 'application/x-www-form-urlencoded',
    formFile: 'multipart/form-data',

    setContentsType: function (inputContentsType) {
        var contentsType = 'text/plain';

        if (inputContentsType.toUpperCase() === 'FORM') {
            contentsType = request.form;

        } else if (inputContentsType.toUpperCase() === 'FORMFILE') {
            contentsType = request.formFile;

        } else if (inputContentsType.toUpperCase() === 'JSON') {
            contentsType = request.json;

        }
        return contentsType;
    },

    submit: function (method, url, callback, inputContentsType, sendData) {
        var xhr = new XMLHttpRequest();

        var result = null;
        var contentsType = null;

        xhr.onreadystatechange = function () {
            if (xhr.readyState === xhr.DONE) {
                if (xhr.status === 200 || xhr.status === 201) {
                    result = xhr.response;
                    callback(result);
                }
            }
        };
        if (method.toUpperCase() === 'GET') {
            xhr.open(method, url);
            xhr.send();
        } else if (method.toUpperCase() === 'POST' || method.toUpperCase() === 'PUT' || method.toUpperCase() === 'DELETE' || method.toUpperCase() === 'PATCH') {
            method = method.toUpperCase();
            contentsType = request.setContentsType(inputContentsType);
            xhr.open(method, url, true);
            if (contentsType !== request.formFile)
                xhr.setRequestHeader('Content-Type', contentsType);
            xhr.send(sendData);
        }

    },

    alertModal: function (fileURL) {
        request.submit('GET', fileURL, function (data) {
            var data_ = JSON.parse(data);
            modaljs.create(data_.title, data_.contents);
        });
    },

    forward: function (URL, title, contents, element) {
        navJs.active('loading...', contents);

        setTimeout(function () {
            request.submit('GET', URL, function (data) {
                wrapjs.reset(title + '[Day:' + new Date().getDate() + ', ' + new Date().toLocaleTimeString() + ']', data, element);
                wrapjs.viewPageHistory();
                navJs.inactive();
                aside.removeFocus();
            });
        }, 500);
    },


}

var projectJs = {
    manageProjectHistory: function () {
        window.onpopstate = function (e) {
            if (e.state !== null) {
                document.querySelector('#myblog-main-section').innerHTML = e.state;
            }

        }

    },
    makeBoardList: function (boardInfo) {

        var mainFieldset = document.createElement('fieldset');
        mainFieldset.style.margin = '5px';
        var titleLegend = document.createElement('legend');
        titleLegend.style.fontSize = '50px';
        titleLegend.style.fontWeight = 'bold';
        titleLegend.innerText = boardInfo.title;
        mainFieldset.appendChild(titleLegend);

        var nameFiledSet = document.createElement('fieldset');
        var nameLegend = document.createElement('legend');
        nameLegend.innerText = 'Nick Name';
        var nameValue = document.createElement('p');
        nameValue.innerHTML = boardInfo.mbr_nickname;
        nameFiledSet.appendChild(nameLegend);
        nameFiledSet.appendChild(nameValue);

        var dateFiledSet = document.createElement('fieldset');
        var dateLegend = document.createElement('legend');
        dateLegend.innerText = 'Created Date';
        var dateValue = document.createElement('p');
        dateValue.innerHTML = boardInfo.created_date;
        dateFiledSet.appendChild(dateLegend);
        dateFiledSet.appendChild(dateValue);

        var contentsFieldset = document.createElement('fieldset');
        var contentsLegend = document.createElement('legend');
        contentsLegend.innerText = 'Contents'
        var contentsDiv = document.createElement('div');
        contentsDiv.innerHTML = boardInfo.contents;
        contentsFieldset.appendChild(contentsLegend);
        contentsFieldset.appendChild(contentsDiv);

        var backDiv = document.createElement('div');
        backDiv.style.padding = '20px';
        backDiv.style.textAlign = 'center';
        var backBtn = document.createElement('button');
        backBtn.setAttribute('onclick', 'history.back();');
        backBtn.innerHTML = 'BACK';
        backDiv.appendChild(backBtn);

        mainFieldset.appendChild(nameFiledSet);
        mainFieldset.appendChild(dateFiledSet);
        mainFieldset.appendChild(contentsFieldset);
        mainFieldset.appendChild(backDiv);

        var mainSection = document.querySelector('#myblog-main-section');
        mainSection.innerHTML = '';
        mainSection.appendChild(mainFieldset);
        window.history.pushState(mainSection.innerHTML, null, 'members/8/boards/' + boardInfo.no);

    },

    boardClickEventManagement: function (e, element) {
        e.preventDefault();
        navJs.active('now loading...', element.querySelector('p').innerText);

        request.submit('GET', element.href, function (data) {
            var boardInfo = JSON.parse(data).data.board;

            projectJs.makeBoardList(boardInfo);
            projectJs.manageProjectHistory();
            navJs.inactive();
        });


    }


}


//-loadingjs객체(리팩토링 완): innertext 대체&추가, 정지&로딩바제거,
var loadingjs = {

//interval 주소값 저장 배열
    intervalAddr: [],
//tag HTML값 복원을 위한 오브젝트
    recoveryTagAddr: {},
    loadingPackage: ['-', '\\', '\|', '\/'],

    insert: function (tagName) {
        var tagContents = document.querySelector(tagName);
        var count = 0;

        var localAddr = setInterval(function () {
            try {
                if (count === 3) {
                    tagContents.innerText = loadingjs.loadingPackage[3];
                    count = 0;
                    //태그의 innertext를 loadingPackage로 교체
                    //count값이 3일 때만 count초기화
                } else {
                    tagContents.innerText = loadingjs.loadingPackage[count];
                    count++;
                }
            } catch (error) {
                clearInterval(localAddr);
                var addrIndex = loadingjs.intervalAddr.indexOf(localAddr);
                loadingjs.intervalAddr.splice(addrIndex, 1);
            }
        }, 100);

        loadingjs.recoveryTagAddr[tagName] = tagContents.innerHTML;
        loadingjs.intervalAddr.push(localAddr);
    },
    plus: function (tagName) {
        var tagContents = document.querySelector(tagName);
        var textLength = document.querySelector(tagName).innerHTML;//호출 당시 최초 길이
        var count = 0;

        //count가 0일때는 바로 삽입
        //0이 아닐때는 innerText내용을 복원한 뒤
        //맨 뒤 한글자만 substr로 걸러내서 교체
        var localAddr = setInterval(function () {
            try {

                if (count === 0 && tagContents.innerHTML.length === textLength.length) {
                    tagContents.innerHTML += loadingjs.loadingPackage[count];
                    count++;
                } else if (count === 0 && tagContents.innerHTML.length != textLength.length) {
                    tagContents.innerHTML = textLength.substr(0, textLength.length);
                    tagContents.innerHTML += loadingjs.loadingPackage[count];
                    count++;
                } else if (count === 3) {
                    tagContents.innerHTML = textLength.substr(0, textLength.length);
                    tagContents.innerHTML += loadingjs.loadingPackage[3];
                    count = 0;
                } else {
                    tagContents.innerHTML = textLength.substr(0, textLength.length);
                    tagContents.innerHTML += loadingjs.loadingPackage[count];
                    count++;
                }
            } catch (error) {
                clearInterval(localAddr);
                var addrIndex = loadingjs.intervalAddr.indexOf(localAddr);
                loadingjs.intervalAddr.splice(addrIndex, 1);
            }
        }, 100);
        loadingjs.intervalAddr.push(localAddr);
    },
    stop: function () {
        for (var index = 0; index < loadingjs.intervalAddr.length; index++) {
            clearInterval(loadingjs.intervalAddr[index]);
        }

        loadingjs.intervalAddr = [];

        for (var key in loadingjs.recoveryTagAddr) {
            if (loadingjs.recoveryTagAddr.hasOwnProperty(key)) {

                try {
                    document.querySelector(key).innerHTML = loadingjs.recoveryTagAddr[key];
                } catch (error) {
                    //Interval종료 후 복구될 recoveryTagAddr값이 다를 경우의 예외처리
                }
            }
        }

        loadingjs.recoveryTagAddr = {};
        // document.querySelector(key).innerHTML.slice(0,-1);
    },
};

//-navJs객체(리팩토링 완): 생성, 닫기
var navJs = {

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
        new Textjs.insertText('.nav-contents', contents, 10);

    },
    normalActive: function (title, contents) {
        nav = document.createElement('nav');
        navTitle = document.createElement('div');
        navContents = document.createElement('div');

        nav.className = 'z-index-100';
        navTitle.className = 'nav-title';
        navContents.className = 'nav-contents';
        navContents.style.fontSize = '1rem';

        nav.appendChild(navTitle);
        nav.appendChild(navContents);
        document.body.appendChild(nav);
        navTitle.innerHTML = title;
        navContents.innerHTML = contents;
        // loadingjs 삽입
        loadingjs.plus('.nav-title');

    },
    inactive: function () {
        loadingjs.stop();
        var navs = document.querySelectorAll('nav');
        for (var i = 0; i < navs.length; i++) {
            document.body.removeChild(navs[i]);
        }
        // navs.forEach(function(nav) {
        //     document.body.removeChild(nav);
        // });
    }
};

//-navJs객체(리팩토링 완): 생성, 닫기, 드래그
// new키워드를 통한 새로운 오브젝트 생성의 필요가 없음
var modaljs = {

    create: function (titleText, contentsText) {

        var container = document.createElement('div');
        var header = document.createElement('div');
        var title = document.createElement('div');
        var close = document.createElement('a');
        var contents = document.createElement('div');

        container.className = 'header-modal header-modal-component flex';
        container.appendChild(header);
        container.appendChild(contents);

        header.className = 'header-modal header-modal-title';
        title.className = 'non-flip';
        header.appendChild(title);
        header.appendChild(close);
        close.className = 'header-modal-title-close';
        close.setAttribute('style', 'cursor: pointer;');
        close.innerHTML = '&times';

        contents.className = 'header-modal header-modal-contents';


        title.innerHTML = titleText;
        contents.innerHTML = contentsText;

        document.body.appendChild(container);

        close.addEventListener('click', modaljs.close);
        wrapjs.dragElement(header);
    },

    close: function () {
        try {
            this.parentNode.parentNode.remove();
        } catch (e) {
            console.log(e);
        }
    }
};

//-wrapjs객체(리팩토링 완): 틀만 생성(세부컨텐츠는 별도로 스크립트 구성 필요), wrap 더하기, wrap 초기화
var wrapjs = {

    bodyContainer: document.querySelector('#bodyContainer'),
    wrap: document.querySelector('.wrap'),
    localPageHistory: document.querySelector('#localPageHistory'),

    add: function (titleHTML, contentsHTML) {
        var container = wrapjs.console(titleHTML, contentsHTML);
        wrapjs.wrap.appendChild(container);
    },
    reset: function (titleHTML, contentsHTML, element) {
        var container = wrapjs.console(titleHTML, contentsHTML, element.querySelector('img').src);
        wrapjs.dragElement(container.querySelector('.command-header'));
        wrapjs.wrap.appendChild(container);
    },
    console: function (titleHTML, contentsHTML, imgSrc) {
        var container = document.createElement('div');
        var header = document.createElement('div');
        var title = document.createElement('div');
        var icon = document.createElement('img');
        var iconContainer = document.createElement('span');
        var btn1 = document.createElement('div');
        var btn2 = document.createElement('div');
        var square = document.createElement('span');
        var btn3 = document.createElement('div');
        var mainConsole = document.createElement('div');

        container.className = 'command';
        header.className = 'command-header';
        container.addEventListener('click', function (event) {
            try {
                wrapjs.wrap.insertBefore(wrapjs.wrap.lastChild, this);
            } catch (e) {}
        });

        title.className = 'command-title';
        var imgStartIndex = titleHTML.indexOf('<img');
        var imgEndIndex = titleHTML.indexOf('>');
        if (imgStartIndex === -1 || imgSrc !== undefined) {
            icon.src = imgSrc;
            // icon.setAttribute('onerror', "this.src='img/icon/cmdicon.png'");
            icon.style.padding = '0px 3px';
            icon.style.margin = '0px';
            icon.style.width = '1.2em';
            icon.style.height = 'auto';
            icon.style.verticalAlign = 'middle';
            iconContainer.appendChild(icon);
        } else {
            iconContainer.innerHTML = titleHTML.substring(imgStartIndex, imgEndIndex + 1);
            titleHTML = titleHTML.substring(imgEndIndex + 1, titleHTML.length);
        }

        btn1.className = 'command-btn command-btn-save';
        btn1.innerHTML = '&minus;';
        btn2.className = 'command-btn command-btn-square';
        btn3.className = 'command-btn command-btn-close';
        btn2.appendChild(square);
        btn3.innerHTML = '&times;';
        btn1.setAttribute('onclick', 'wrapjs.consoleSave(this)');
        btn2.setAttribute('onclick', 'wrapjs.consoleMaxWidth(this)');
        btn3.setAttribute('onclick', 'wrapjs.consoleClose(this)');
        mainConsole.classList.add('mainConsole');
        mainConsole.classList.add('console-black');

        title.appendChild(iconContainer);
        title.innerHTML += '<span>' + titleHTML + '</span>';
        header.appendChild(title);
        header.appendChild(btn1);
        header.appendChild(btn2);
        header.appendChild(btn3);
        container.appendChild(header);
        container.appendChild(mainConsole);

        mainConsole.innerHTML = contentsHTML;
        mainConsole.addEventListener('scroll', scrolljs.autoPlayConsoleVideo);
        mainConsole.addEventListener('resize', scrolljs.autoPlayConsoleVideo);

        return container;
    },
    consoleMaxWidth: function (element) {
        var thisContainer = element.parentNode.parentNode;
        thisContainer.classList.toggle('command-max-width');
        thisContainer.querySelector('.mainConsole').classList.toggle('console-black-max-height');

    },
    consoleClose: function (element) {
        try {
            element.parentNode.parentNode.remove();
        } catch (e) {
            console.log(e);
        }
    },
    consoleSave: function (element) {
        var pageHistory = JSON.parse(localStorage.getItem('localPageHistory'));
        var thisContainer = element.parentNode.parentNode;
        var key = thisContainer.querySelector('.command-title>span:first-child').innerHTML
            + thisContainer.querySelector('.command-title>span:last-child').innerText;
        var value = thisContainer.querySelector('.mainConsole').innerHTML;

        if (pageHistory != null) {
            pageHistory[key] = value;
            localStorage.setItem('localPageHistory', JSON.stringify(pageHistory));

        } else {
            var pageList = {};
            pageList[key] = value;
            localStorage.setItem('localPageHistory', JSON.stringify(pageList));

        }
        wrapjs.consoleClose(element);
        wrapjs.viewPageHistory();
        aside.addFocus();
    },
    viewPageHistory: function () {
        wrapjs.localPageHistory.innerHTML = '';
        var pageHistory = JSON.parse(localStorage.getItem('localPageHistory'));
        for (var key in pageHistory) {
            if (pageHistory.hasOwnProperty(key)) {
                var span = document.createElement('li');
                span.className = 'non-flip';
                span.innerHTML = key;
                span.setAttribute('onclick', 'wrapjs.getPageHistory(\'' + key + '\')');
                wrapjs.localPageHistory.appendChild(span);
            }
        }
    },
    getPageHistory: function (key) {
        var pageHistory = JSON.parse(localStorage.getItem('localPageHistory'));
        var container = wrapjs.console(key, pageHistory[key], undefined);
        wrapjs.dragElement(container.querySelector('.command-header'));
        wrapjs.wrap.appendChild(container);
        pageHistory[key] = undefined;

        localStorage.setItem('localPageHistory', JSON.stringify(pageHistory));
        wrapjs.viewPageHistory();
    },
    //w3s 인용
    //출처 : https://www.w3schools.com/howto/howto_js_draggable.asp
    dragElement: function (element) {
        wrapjs.dragMouseElement(element);
        wrapjs.dragTouchElement(element);
    },
    dragMouseElement: function (element) {

        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        try {
            element.onmousedown = dragMouseDown;
        } catch (e) {
            console.log(e);
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
            element.parentNode.style.top = (element.parentNode.offsetTop - pos2) + "px";
            element.parentNode.style.left = (element.parentNode.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }

    },
    dragTouchElement: function (element) {

        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        try {
            element.ontouchmove = dragTouchDown;
        } catch (e) {
            console.log(e);
        }

        function dragTouchDown(event) {
            console.dir(event);
            event.preventDefault();
            pos3 = event.changedTouches[0].clientX;
            pos4 = event.changedTouches[0].clientY;
            document.ontouchend = elementDrag;
        }

        function elementDrag(event) {
            pos1 = pos3 - event.changedTouches[0].clientX;
            pos2 = pos4 - event.changedTouches[0].clientY;
            pos3 = event.changedTouches[0].clientX;
            pos4 = event.changedTouches[0].clientY;
            element.parentNode.style.top = (element.parentNode.offsetTop - pos2) + "px";
            element.parentNode.style.left = (element.parentNode.offsetLeft - pos1) + "px";
            console.log('y:', element.parentNode.offsetTop - pos2, 'x:', (element.parentNode.offsetLeft - pos1))
        }
    }
};


//-Textjs객체 문자열을 character로 변환하여 한 자씩 interval로 반복해가며 삽입
//지금까지 확인된 사항: 
// 1. 단일태그는 문제없이 삽입가능 (예시:<img>태그나 <BR>태그)
// 2. 시작과 끝이 있는 태그는 class, id나 속성은 삽입불가능
//      예시: <div>hi</div> 가능
//              <div class="greet">hi</div> 불가능
//          해결할 수는 있지만 코드가 엄청 난해해지고 복잡해질 수 밖에 없음
//          해결 후 성능적 이슈가 없을 것이라는 장담이 어려움
var Textjs = {

    insertText: function (tagName, insertTextValue, interval, callback) {

        var frontSpan = document.createElement('span');
        var backSpan = document.createElement('span');
        backSpan.className = 'input-character';
        document.querySelector(tagName).appendChild(frontSpan);
        document.querySelector(tagName).appendChild(backSpan);

        var timeCount = true;
        var loopCount = 0;
        var intervalAddr = setInterval(function () {
            try {

                var character = insertTextValue.charAt(loopCount);

                if (insertTextValue.length === loopCount) {
                    throw 'go catch';

// 문자중에 lessthan이 나올 떄 greater than을 찾아 태그로 묶어서 삽입

                } else if (character === '<') {
                    var insertTextsubstr = insertTextValue.substr(loopCount, insertTextValue.length);
                    var tagEnd = insertTextsubstr.indexOf('>');
                    var substrText = insertTextsubstr.substr(0, tagEnd + 1);

                    var closeTag = '</' + substrText.substr(1, substrText.length);
                    var localTagName = substrText.substr(1, substrText.length - 2);

                    if (insertTextsubstr.indexOf(closeTag) !== -1) {
                        var localTag = document.createElement(localTagName);
                        // localTag.id = 'localTag' + intervalAddr;
                        frontSpan.appendChild(localTag);

                        var localInsertText = insertTextsubstr.substr(substrText.length, insertTextsubstr.indexOf(closeTag) - substrText.length);
                        // new Textjs.insertText('#'+localTag.id, localInsertText, 1);
                        localTag.innerHTML = localInsertText;

                        timeCount = true;
                        loopCount += insertTextsubstr.indexOf(closeTag) + closeTag.length;


                    } else {
                        frontSpan.innerHTML += substrText;
                        timeCount = true;
                        loopCount += substrText.length;

                    }

                } else if (timeCount === true) {
                    backSpan.innerHTML = insertTextValue.charAt(loopCount);
                    timeCount = false;

                } else {
                    frontSpan.innerHTML += backSpan.innerHTML;
                    backSpan.innerHTML = '';
                    timeCount = true;
                    loopCount++;

                }

            } catch (error) {
                clearInterval(intervalAddr);
                intervalAddr = null;
                try {
                    callback();
                } catch (error) {
                    console.log('Ended writing Text');
                }
            }
        }, interval);
    }
};

//-headerjs객체 헤더로고 움직임, aside바 닫힘, headercontents 투명 조절
var aside = {
    header: document.querySelector('header'),
    asideTag: document.querySelector('aside'),
    headerLogo: document.querySelector('#headerLogo'),
    localPageHistory: document.querySelector('#localPageHistory'),

    addFocus: function (event) {
        aside.asideTag.classList.add('aside-focus');

    },
    toggleFocus: function (event) {
        aside.asideTag.classList.toggle('aside-focus');

    },
    removeFocus: function (event) {
        aside.asideTag.classList.remove('aside-focus');

    },
    navContents: function (event) {
        var actionY = event.srcElement.scrollingElement.scrollTop;
        aside.removeFocus();
        if (aside.scrollTargetTop - actionY < 0) {
            aside.localPageHistory.classList.add('opacity-0');
        } else {
            aside.localPageHistory.classList.remove('opacity-0');
        }
//객체에 추가, 저장 후에 스크롤링 될때마다 호출저장 반복
        aside.scrollTargetTop = actionY;

    }
};


//기타 스크롤 이벤트에 관련된 보조객체
var scrolljs = {

//브라우저: 페이지 스크롤시 모든 동영상태그는 포커스되면 자동 재생(애드이벤트리스너 콜백구현)
    autoPlayVideo: function (event) {
        var videos = document.querySelectorAll('#bodyContainer video');

        for (var i = 0; i < videos.length; i++) {
            var video = videos[i];
            var x = video.offsetLeft;
            var y = video.offsetTop;
            var w = video.offsetWidth;
            var h = video.offsetHeight;
            var width = x + w;
            var height = y + h;

            var targetX = Math.max(0, Math.min(w, window.pageXOffset + window.innerWidth - x, width - window.pageXOffset));
            var targetY = Math.max(0, Math.min(h, window.pageYOffset + window.innerHeight - y, height - window.pageYOffset));

            if (targetX * targetY / (w * h) > 0.9999) {
                video.play();
            } else {
                video.pause();
            }

        }
    },

//mainConsole태그 컨텐츠: 
//페이지 스크롤시 모든 동영상태그는 포커스되면 자동 재생(애드이벤트리스너 콜백구현)
    autoPlayConsoleVideo: function (event) {
        var videos = this.querySelectorAll('video');

        for (var i = 0; i < videos.length; i++) {
            var video = videos[i].getBoundingClientRect();
            var x = video.x;
            var y = video.y;
            var w = video.width;
            var h = video.height;
            var width = x + w;
            var height = y + h;

            var targetX = Math.max(0, Math.min(w, this.clientWidth + 60 - x, width));
            var targetY = Math.max(0, Math.min(h, this.clientHeight + 125 - y, height));

            if (targetX * targetY / (w * h) > 0.9) {
                videos[i].play();
            } else {
                videos[i].pause();
            }

        }
    }

};

var profileScript = {

    levelLoading: function (level, tagName, description) {
        var count = 0;
        var targetTag = document.querySelector(tagName);
        var levelBar = '';
        var percent;
        var levelPercent;
        var interval = setInterval(function () {
                try {
                    if (count < level) {
                        levelBar += '■';
                    } else if (count < 10) {
                        levelBar += '□';
                    }

                    switch (levelBar) {
                        case '■':
                            percent = '% (하)';
                            break;
                        case '■■■':
                            percent = '% (중하)';
                            break;
                        case '■■■■■':
                            percent = '% (중)';
                            break;
                        case '■■■■■■■':
                            percent = '% (중상)';
                            break;
                        case '■■■■■■■■■':
                            percent = '% (상)';
                            break;
                        case '■■■■■■■■■■':
                            percent = '% (최상)';
                            break;
                    }

                    if (levelBar.indexOf('□') * 10 < 0) {
                        levelPercent = (count + 1) * 10;
                    } else {
                        levelPercent = levelBar.indexOf('□') * 10;
                    }

                    targetTag.innerHTML = 'Level : ' + levelBar + '<BR>' + levelPercent + percent;
                    count++;

                    if (count === 10) {
                        clearInterval(interval);
                        loadingjs.stop();
                    }
                } catch
                    (error) {
                    clearInterval(interval);
                    loadingjs.stop();
                }
            }, 100
        );
        loadingjs.insert(description);
    },

    create: function (language, imgURL, level, description) {
        var skillContainer = document.createElement('div');
        var title = document.createElement('div');
        var titleImg = document.createElement('img');
        var skillSet = document.createElement('div');
        var skillLevel = document.createElement('div');
        var skillDescription = document.createElement('div');

        skillContainer.className = 'profile-skill';
        title.className = 'profile-skill-title flex';
        titleImg.src = imgURL;
        titleImg.setAttribute('onload', 'profileScript.levelLoading(' + level + ',\"#' + language + '\",\"#' + language + 'Description\")');
        skillSet.className = 'profile-skill-set';
        skillLevel.id = language;
        skillDescription.id = language + 'Description';
        skillDescription.className = 'profile-skill-description';
        skillDescription.innerHTML = description;

        skillContainer.appendChild(title);
        skillContainer.appendChild(skillSet);

        title.appendChild(titleImg);
        skillSet.appendChild(skillLevel);
        skillSet.appendChild(skillDescription);

        return skillContainer;
    },

    skillListParse: function (data) {
        var profileDetails = document.querySelector('#profileDetails');
        profileDetails.innerHTML = '';
        var parsedData = JSON.parse(data);

        for (var key in parsedData) {
            if (parsedData.hasOwnProperty(key)) {
                var language = key;
                var img = parsedData[key].imgURL;
                var skillLevel = parsedData[key].level;
                var skillDescription = parsedData[key].description;

                var contents = profileScript.create(language, img, skillLevel, skillDescription);
                profileDetails.appendChild(contents);
            }
        }
    },

    personalInformation: function (data) {
        var profileDetails = document.querySelector('#profileDetails');
        profileDetails.innerHTML = '';
        var HTMLData = '';
        var parsedData = JSON.parse(data);

        for (var key in parsedData) {
            if (parsedData.hasOwnProperty(key)) {
                HTMLData += '<div><fieldset>' +
                    '<legend>' + key + '</legend>' +
                    parsedData[key] + '</fieldset></div>';
            }
        }
        profileDetails.innerHTML = HTMLData;
    },

    introduce: function (data) {
        var profileDetails = document.querySelector('#profileDetails');

        profileDetails.innerHTML = '';

        Textjs.insertText('#profileDetails', data, 1);
        // profileDetails.innerHTML = data;


    },

    titleActive: function (URL, callback, contentsName) {
        var contentsDetails = document.querySelector('#contentsDetails');

        if (contentsName !== undefined) {
            contentsDetails.innerHTML = 'Contents Details: ' + contentsName;

        } else {
            contentsDetails.innerHTML = 'Contents Details';

        }

        request.submit('GET', URL, callback);
    }
}

/*
var scrollJs = {
    scrollToTop: function () {
        window.scrollTo(0, 0);
    },

    viewScrollBtn: function () {


        scrollJs.scrollToTop();
    }
}
*/


function checkBrowser() {
    if (navigator.userAgent.toLowerCase().indexOf("chrome") === -1) {
        request.submit('GET', 'app/browserCheck.json', function (data) {
            var parsedData = JSON.parse(data);
            modaljs.create(parsedData.title, parsedData.contents);
        });
    }
}

function requestInit() {
    aside.headerLogo.addEventListener('click', aside.toggleFocus);
    window.addEventListener('click', function (event) {
        if (event.target.className.indexOf('non-flip') === -1
            && event.target.className.indexOf('header-logo') === -1
            && event.target.className.indexOf('command') === -1) {
            aside.removeFocus();

        }
    });

    window.addEventListener('scroll', aside.navContents);

    // request.asyncGetData('app/appDataList.json', function (data) {
    // defaultScript.asideList(data);
    // });
    wrapjs.viewPageHistory();
}

var primarySetting = {
    getAppList: function () {
        var iconContainer = document.querySelector('#icon-container');
        request.submit('GET', 'app/appDataList.json', function (data) {
            var appList = JSON.parse(data);
            for (var key in appList) {
                var appContainer = document.createElement('div');
                if (appList[key]['url'].indexOf('https') !== -1) {
                    appContainer.setAttribute('onclick',
                        'if(window.confirm("' + key + '(' + appList[key]['url'] + ')\\n해당페이지로 이동하시겠습니까?"))' +
                        ' window.open("' + appList[key]['url'] + '")');
                } else {
                    appContainer.setAttribute('onclick',
                        'request.forward("' + appList[key]['url'] + '", "' + key + '", "Now Loading....", this)');

                }

                appContainer.setAttribute('onerror',
                    "this.src = 'img/icon/Xasquatch.png'");

                var appImage = document.createElement('img');
                appImage.src = appList[key]['icon'];

                var appTitle = document.createElement('p');
                appTitle.innerText = key;

                appContainer.appendChild(appImage);
                appContainer.appendChild(appTitle);
                iconContainer.appendChild(appContainer);
            }
        });
    }
}

checkBrowser();
requestInit();









































