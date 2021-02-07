var myAjax = {

    json: 'application/json',
    form: 'application/x-www-form-urlencoded',
    formFile: 'multipart/form-data',

    setContentsType: function (inputContentsType) {
        var contentsType = 'text/plain';

        if (inputContentsType.toUpperCase() === 'FORM') {
            contentsType = myAjax.form;

        } else if (inputContentsType.toUpperCase() === 'FORMFILE') {
            contentsType = myAjax.formFile;

        } else if (inputContentsType.toUpperCase() === 'JSON') {
            contentsType = myAjax.json;

        }
        return contentsType;
    },


    submit: function (method, url, callback, inputContentsType, sendData) {
        var xhr = new XMLHttpRequest();

        var result = null;
        var contentsType = null;

        xhr.onreadystatechange = function () {
            if (xhr.readyState === xhr.DONE) {
                try {
                    footerEffect.loadingToggle();
                } catch (e) {
                    console.log('my blog by xasquatch에서 정보를 불러옵니다.')
                }
                if (xhr.status === 200 || xhr.status === 201) {
                    result = xhr.response;
                    callback(result);
                } else {
                    result = xhr.response;
                    alert('잘못 된 접근 입니다 다시 시도해주세요');
                }
            } else {
                try {
                    footerEffect.addLoadingState();
                } catch (e) {
                    console.log('my blog by xasquatch에서 정보를 불러옵니다.')
                }
            }
        };

        if (method.toUpperCase() === 'GET') {
            xhr.open(method, url);
            xhr.send();
        } else if (method.toUpperCase() === 'POST' || method.toUpperCase() === 'PUT' || method.toUpperCase() === 'DELETE' || method.toUpperCase() === 'PATCH') {
            method = method.toUpperCase();
            contentsType = myAjax.setContentsType(inputContentsType);
            xhr.open(method, url, true);
            if (contentsType !== myAjax.formFile)
                xhr.setRequestHeader('Content-Type', contentsType);
            xhr.send(sendData);
        }

    }

}
var url = {
    parsing: function (target) {
        return window.location.href.slice(window.location.origin.length);

    },
    isContainWord: function (url, word) {
        return url.indexOf(word) > 0;
    },
    isContainWordCurrentPath: function (word) {
        return window.location.href.slice(window.location.origin.length).indexOf(word) > 0;
    },
    getUniform(startUrl, endUrl) {
        var i = url.parsing();
        return i.slice(i.indexOf(startUrl) + startUrl.length, i.indexOf(endUrl));
    }
}
var uri = {
    isContainWord: function (url, word) {
        return url.indexOf(word) > 0;
    },
    getUniform(target, startUrl, endUrl) {
        return target.slice(target.indexOf(startUrl) + startUrl.length, target.indexOf(endUrl));
    }
}


var myBoard = {

    getBoardData: function (memberNo, boardNo) {
        var mainSection = document.querySelector('#myblog-main-section');
        myAjax.submit('GET', 'https://myblog.xasquatch.net/api/members/' + memberNo + '/boards/' + boardNo, function (data) {
            mainSection.innerHTML = '';

            var boardMap = JSON.parse(data).data.board;
            var container = document.createElement('section');

            var boardDetailTable = document.createElement('table');
            boardDetailTable.style.margin = '0';

            boardDetailTable.innerHTML += '<tr><td style="width: 100px">no</td><td>' + boardMap.no + '</td></tr>';
            boardDetailTable.innerHTML += '<tr><td style="width: 100px">thumbnail</td><td>' + boardMap.thumbnail + '</td></tr>';
            boardDetailTable.innerHTML += '<tr><td style="width: 100px">title</td><td>' + boardMap.title + '</td></tr>';
            boardDetailTable.innerHTML += '<tr><td style="width: 100px">keyword</td><td>' + boardMap.keyword + '</td></tr>';
            boardDetailTable.innerHTML += '<tr><td style="width: 100px">name</td><td>' + boardMap.name + '</td></tr>';
            boardDetailTable.innerHTML += '<tr><td style="width: 100px">created_date</td><td>' + boardMap.created_date + '</td></tr>';
            boardDetailTable.innerHTML += '<tr><td style="width: 100px">created_ip</td><td>' + boardMap.created_ip + '</td></tr>';

            container.appendChild(boardDetailTable);
            container.innerHTML += '<section id="board-view-contents" style="padding: 10px 20px; margin-bottom: 50px;">'
                + boardMap.contents + '</section>';
            mainSection.appendChild(container);


            mainSection.innerHTML += '<section style="text-align: center; padding: 20px;">' +
                '        <button class="btn btn-link-red dot-key" onclick="window.history.back();">뒤로 가기</button>' +
                '    </section>';

            try {
                myHistory.pushState({
                    "data": mainSection.innerHTML,
                    "memberNo": memberNo,
                    "url": '/api/members/' + memberNo + '/boards/' + boardNo
                }, 'https://myblog.xasquatch.net/api/members/' + memberNo + '/boards/' + boardNo);

            } catch (e) {
                myHistory.pushState({
                    "data": mainSection.innerHTML,
                    "memberNo": memberNo,
                    "url": '/api/members/' + memberNo + '/boards/' + boardNo
                }, '/api/members/' + memberNo + '/boards/' + boardNo);
            }


        });

    },

    pageBlockClickEventSetting: function (memberNo) {
        var pageBlockList = document.querySelectorAll('.myblog-page-block');
        for (var pageBlock of pageBlockList) {
            pageBlock.addEventListener('click', function (e) {
                e.preventDefault();
                var href = this.href.substr(this.href.indexOf('/api/members/'), this.href.length);
                if (href !== null) {
                    myBoard.recursiveGetBoardList(memberNo, 'https://myblog.xasquatch.net' + href);
                }
            });
        }
    },

    recursiveGetBoardList: function (memberNo, url) {
        myAjax.submit('GET', url, function (data) {
            myBoard.addSettingBoardListUnit(memberNo, url);
            myBoard.boardListDecoration(data, '#myblog-board-list-contents');
            myBoard.pageBlockDecoration(data, '#myblog-board-list-toolbar');
            myBoard.pageBlockClickEventSetting(memberNo);
            myHistory.pushState({
                    "data": document.querySelector('#myblog-main-section').innerHTML,
                    "memberNo": memberNo,
                    "url": url
                },
                window.location.href);
        });
    },

    pageBlockDecoration: function (data, pageBlockContainerQuery) {
        var pageBlockList = JSON.parse(data).data.pageBlockList;

        var pageBlockContainer = document.querySelector(pageBlockContainerQuery);
        pageBlockContainer.innerHTML = '';
        pageBlockContainer.style.textAlign = 'center';

        for (var pageBlock of pageBlockList) {
            pageBlockContainer.innerHTML += pageBlock;

        }
    },

    addSettingBoardListUnit: function (memberNo, url) {

        var mainSection = document.querySelector('#myblog-main-section');
        mainSection.innerHTML = '';
        mainSection.innerHTML = '<article style="width: 100%;">' +
            '        <div style="min-width: 150px">' +
            '            <h1>글 목록</h1>' +
            '        </div>' +
            '        <div style="display: flex; align-items: flex-start; flex-wrap: nowrap; justify-content: flex-end;">' +
            '            <select id="myblog-search-target" style="width: 70px;">' +
            '                <option>keyword</option>' +
            '                <option>title</option>' +
            '                <option>contents</option>' +
            '                <option>title-or-contents</option>' +
            '            </select>' +
            '            <input type="text" id="myblog-search-value" style="width: 70px;" placeholder="search!">' +
            '            <button id="myblog-search-btn" style="width: 70px;">Search</button>' +
            '            <select id="myblog-board-page-limit">' +
            '                <option>10</option>' +
            '                <option>20</option>' +
            '                <option>50</option>' +
            '                <option>100</option>' +
            '            </select>' +
            '        </div>' +
            '    </article>' +
            '    <article>' +
            '        <article id="myblog-board-list-contents">' +
            '' +
            '        </article>' +
            '        <article id="myblog-board-list-toolbar">' +
            '' +
            '        </article>' +
            '    </article>';

        var subStrUrl = url.substring(url.indexOf('?') + 1);
        var queryArray = subStrUrl.split('&');
        for (var key of queryArray) {
            if (key.includes('page-limit') && !(key.substr(11, key.length) === ''))
                document.querySelector('#myblog-board-page-limit').value = key.substr(11, key.length);

            var searchTarget = document.querySelector('#myblog-search-target');
            var searchValue = document.querySelector('#myblog-search-value');

            if (key.includes('keyword') && !(key.substr(8, key.length) === '')) {
                searchTarget.value = 'keyword';
                searchValue.value = key.substr(8, key.length);
            }
            if (key.includes('title') && !(key.substr(6, key.length) === '')) {
                searchTarget.value = 'title';
                searchValue.value = key.substr(6, key.length);
            }
            if (key.includes('contents') && !(key.substr(9, key.length) === '')) {
                searchTarget.value = 'contents';
                searchValue.value = key.substr(9, key.length);
            }
            if (key.includes('title-or-contents') && !(key.substr(18, key.length) === '')) {
                searchTarget.value = 'title-or-contents';
                searchValue.value = key.substr(18, key.length);
            }

        }

        mainSection.querySelector('#myblog-search-btn').setAttribute('onclick', 'myBoard.changeViewListSetting(' + memberNo + ');')
        mainSection.querySelector('#myblog-board-page-limit').setAttribute('onchange', 'myBoard.changeViewListSetting(' + memberNo + ');')

    },

    changeViewListSetting: function (memberNo) {
        var searchTarget = document.querySelector('#myblog-search-target');
        var searchValue = document.querySelector('#myblog-search-value');
        var pageLimit = document.querySelector('#myblog-board-page-limit');
        var currentPageBlock = document.querySelector('#myblog-board-list-toolbar>.current-page');


        myBoard.recursiveGetBoardList(memberNo,
            'https://myblog.xasquatch.net/api/members/' + memberNo + '/boards?' +
            'page-limit=' + pageLimit.value + '&' +
            'current-page-block=' + currentPageBlock.innerText + '&' +
            searchTarget.value + '=' + searchValue.value + '&'
        );

    },

    boardListDecoration: function (data, boardListContainerQuery) {
        var boardList = JSON.parse(data).data.boardList;
        var boardListContainer = document.querySelector(boardListContainerQuery);
        boardListContainer.style.display = 'flex';
        boardListContainer.style.flexDirection = 'row';
        boardListContainer.style.flexWrap = 'wrap';
        boardListContainer.style.justifyContent = 'space-evenly';
        boardListContainer.style.margin = '20px 0';
        for (var board of boardList) {
            var boardContainer = document.createElement('a');
            boardContainer.style.width = '150px';
            boardContainer.style.height = 'auto';
            boardContainer.style.margin = '5px';
            boardContainer.style.padding = '5px';
            boardContainer.style.outlineStyle = 'auto';
            boardContainer.href = 'javascript:myBoard.getBoardData(' + board.mbr_no + ',' + board.no + ')';

            boardContainer.innerHTML += '<div style="display: none;">' + board.no + '</div>';
            boardContainer.innerHTML += board.thumbnail;
            boardContainer.innerHTML += '<p style="word-break: break-all; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">' +
                '<span>' + board.row_number + '.&nbsp;</span><span>' + board.title + '</span></p>';
            boardContainer.innerHTML += '<div style="display: none;">' + board.no + '</div>';
            boardListContainer.appendChild(boardContainer);
        }


    }


}
myHistory = {
    autoSetting: function () {
        window.onpopstate = function (e) {
            if (e.state !== null) {
                document.querySelector('#myblog-main-section').innerHTML = e.state.data;
                myBoard.pageBlockClickEventSetting(e.state.memberNo);
            }
            console.dir(e.state);

        }
    },
    pushState: function (data, url) {
        myHistory.autoSetting();
        window.history.pushState(data, 'My Blog By Xasquatch', url);
    },
    replaceState: function (data) {
        myHistory.autoSetting();
        window.history.replaceState(data, 'My Blog By Xasquatch', window.location.href);
    }

}