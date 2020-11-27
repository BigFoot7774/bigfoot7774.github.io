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
                xhr.setRequestHeader('Content-type', contentsType);
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
        myAjax.submit('GET', 'https://myblog.xasquatch.net/api/members/' + memberNo + '/boards/' + boardNo, function (data) {
            var mainSection = document.querySelector('#myblog-main-section');
            mainSection.innerHTML = '';

            var boardMap = JSON.parse(data).data.board;
            var container = document.createElement('section');

            var boardDetailTable = document.createElement('table');
            boardDetailTable.className = 'table table-hover table-responsive';
            boardDetailTable.style.margin = '0';

            boardDetailTable.innerHTML += '<tr><td class="dot-key" style="width: 100px">no</td><td><kbd>' + boardMap.no + '</kbd></td></tr>';
            boardDetailTable.innerHTML += '<tr><td class="dot-key" style="width: 100px">thumbnail</td><td>' + boardMap.thumbnail + '</td></tr>';
            boardDetailTable.innerHTML += '<tr><td class="dot-key" style="width: 100px">title</td><td><kbd>' + boardMap.title + '</kbd></td></tr>';
            boardDetailTable.innerHTML += '<tr><td class="dot-key" style="width: 100px">keyword</td><td><kbd>' + boardMap.keyword + '</kbd></td></tr>';
            boardDetailTable.innerHTML += '<tr><td class="dot-key" style="width: 100px">name</td><td><kbd>' + boardMap.name + '</kbd></td></tr>';
            boardDetailTable.innerHTML += '<tr><td class="dot-key" style="width: 100px">created_date</td><td><kbd>' + boardMap.created_date + '</kbd></td></tr>';
            boardDetailTable.innerHTML += '<tr><td class="dot-key" style="width: 100px">created_ip</td><td><kbd>' + boardMap.created_ip + '</kbd></td></tr>';

            container.appendChild(boardDetailTable);
            container.innerHTML += '<section id="board-view-contents">' + boardMap.contents + '</section>';
            mainSection.appendChild(container);


            mainSection.innerHTML += '<section style="text-align: center; padding: 20px;">' +
                '        <button class="btn btn-link-red dot-key" onclick="window.history.back();">뒤로 가기</button>' +
                '    </section>';


            myHistory.pushState(mainSection.innerHTML, '/api/members/' + memberNo + '/boards/' + boardNo);
        });

    },

    recursiveGetBoardList: function (memberNo, url) {
        myAjax.submit('GET', url, function (data) {
            myBoard.addSettingBoardListUnit(memberNo);

            myBoard.boardListDecoration(data, '#myblog-board-list-contents');
            myBoard.pageBlockDecoration(data, '#myblog-board-list-toolbar');
            var pageBlockList = document.querySelectorAll('.myblog-page-block');
            for (var pageBlock of pageBlockList) {
                pageBlock.addEventListener('click', function (e) {
                    e.preventDefault();
                    var href = this.getAttribute('href');
                    if (href !== null) {
                        memberNo = uri.getUniform(href, '/members/', '/boards');
                        myBoard.boardListDecoration(data, '#myblog-board-list-contents');
                        myBoard.pageBlockDecoration(data, '#myblog-board-list-toolbar');
                        myBoard.recursiveGetBoardList(memberNo, 'https://myblog.xasquatch.net' + href);

                    }
                });
            }

            myHistory.replaceState(document.querySelector('#myblog-main-section').innerHTML, '/api/members/' + memberNo + '/boards/');
        }, url);

    },

    pageBlockDecoration: function (data, pageBlockContainerQuery) {
        var pageBlockList = JSON.parse(data).data.pageBlockList;

        document.querySelector(pageBlockContainerQuery).innerHTML = '';

        for (var pageBlock of pageBlockList) {
            document.querySelector(pageBlockContainerQuery).innerHTML += pageBlock;

        }
        var blockList = document.querySelectorAll(pageBlockContainerQuery + '>a');
        for (var block of blockList) {
            block.classList.add('btn');
            block.classList.add('btn-link-red');
        }
    },

    addSettingBoardListUnit: function (memberNo) {
        var mainSection = document.querySelector('#myblog-main-section');
        mainSection.innerHTML = '';
        mainSection.innerHTML = '<article class="board-list-title">' +
            '        <div style="min-width: 150px">' +
            '            <h1 class="dot-key">글 목록</h1>' +
            '        </div>' +
            '        <div style="display: flex;">' +
            '            <select class="dot-key" id="myblog-search-target">' +
            '                <option>keyword</option>' +
            '                <option>title</option>' +
            '                <option>contents</option>' +
            '                <option>title-or-contents</option>' +
            '            </select>' +
            '            <input type="text" class="dot-key" id="myblog-search-value" placeholder="search!">' +
            '            <button class="btn btn-link-red dot-key" id="myblog-search-btn">' +
            '                Search' +
            '            </button>' +
            '            <select class="dot-key" id="myblog-board-page-limit">' +
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
        var searchTarget = mainSection.querySelector('#myblog-search-target');
        var searchValue = mainSection.querySelector('#myblog-search-value');
        var pageLimit = mainSection.querySelector('#myblog-board-page-limit');


        mainSection.querySelector('#myblog-search-btn').setAttribute('onclick',
            "myBoard.recursiveGetBoardList(" + memberNo + "," +
            "'https://myblog.xasquatch.net/members/" + memberNo + "/boards?'" +
            "page-limit=" + pageLimit + "&" +
            searchTarget + "=" + searchValue + "&" +
            ")");

    },

    boardListDecoration: function (data, boardListContainerQuery) {
        var boardList = JSON.parse(data).data.boardList;
        // console.log(JSON.stringify(boardList,null,2));
        var boardListContainer = document.querySelector(boardListContainerQuery);
        boardListContainer.style.display = 'flex';
        boardListContainer.style.flexDirection = 'row';
        boardListContainer.style.flexWrap = 'wrap';
        boardListContainer.style.justifyContent = 'space-evenly';
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
                document.querySelector('#myblog-main-section').innerHTML = e.state;
            }
            console.dir(e);
        }
    },
    pushState: function (data, url) {
        window.history.pushState(data, 'My Blog By Xasquatch', url);
        myHistory.autoSetting();
    },
    replaceState: function (data) {
        window.history.replaceState(data, 'My Blog By Xasquatch', window.location.href);
        myHistory.autoSetting();
    }

}