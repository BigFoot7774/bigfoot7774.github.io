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
function toggleActivate(toggleTarget) {
    toggleTarget.classList.toggle('unactivate');
    toggleTarget.classList.toggle('activate');
}

function ShowSelectedContents(data) {
    var projectSectionSelected = document.querySelector('#project-section-selected');
    toggleActivate(projectSectionSelected);
    projectSectionSelected.innerHTML = '<section>' + data.innerHTML + '</section>';
    window.scrollTo(0, 0);
}

function makeProjectSection(data) {
    var projectSectionContents = document.querySelector('#project-section-contents');
    var parsedData = JSON.parse(data);
    for (var parsedDataKey in parsedData) {
        var tagSection = document.createElement('section');
        var tagH2 = document.createElement('h2');
        var tagH5 = document.createElement('h5');
        var tagThumbnailDiv = document.createElement('div');
        var tagOutDiv = document.createElement('div');
        var tagInDiv = document.createElement('div');

        tagH2.innerHTML = parsedDataKey;
        if (parsedData[parsedDataKey]['thumbnail'] === null || parsedData[parsedDataKey]['thumbnail'] === "") {
            tagThumbnailDiv.innerHTML = '<img src="img/icon/Xasquatch.ico"/>';

        } else {
            tagThumbnailDiv.innerHTML = parsedData[parsedDataKey]['thumbnail'];
        }
        tagInDiv.innerHTML = parsedData[parsedDataKey]['detail'];
        tagH5.innerHTML = 'CLICK TO CLOSE';

        tagH2.setAttribute('align', 'center');
        tagH5.setAttribute('align', 'center');
        tagThumbnailDiv.setAttribute('align', 'center')

        tagSection.append(tagH2);
        tagSection.append(tagH5);
        tagOutDiv.append(tagThumbnailDiv);
        tagOutDiv.append(tagInDiv);
        tagSection.append(tagOutDiv);

        tagH5.setAttribute('onclick', 'toggleActivate(this.parentNode.parentNode);this.parentNode.parentNode.innerHTML = ""')
        tagSection.setAttribute('onclick', 'ShowSelectedContents(this)');

        projectSectionContents.append(tagSection);
    }

}
