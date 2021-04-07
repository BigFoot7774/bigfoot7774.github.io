var onePage = {

    squareFull: '<img src="/img/language%20icon/black-square-full.png" style="width: 1.5em; height: 1.5em; margin: 1px;">',
    squareBlank: '<img src="/img/language%20icon/black-square-blank.png" style="width: 1.5em; height: 1.5em; margin: 1px;">',

    viewProject: function (element, url) {
        request.submit('GET', url, function (data) {
            var board = JSON.parse(data)['data']['board'];
            element.parentNode.innerHTML = '<fieldset>' +
                '<legend style="font-weight: bold; font-size: 30px; text-align: center;">'
                + board['title']
                + '</legend>'
                + '<div style="text-align: center;">' + board['thumbnail'] + '</div>'
                + board['contents'] + '</fieldset>';
            element.remove();
        });
    },
    createSkill: function (language, imgURL, level, description) {
        var skillContainer = document.createElement('div');
        var title = document.createElement('div');
        var titleImg = document.createElement('img');
        var skillSet = document.createElement('div');
        var skillLevel = document.createElement('div');
        var skillDescription = document.createElement('div');

        skillContainer.id = language + '-stacks-container';
        skillContainer.className = 'stacks-container';
        skillContainer.setAttribute('onclick', 'skill.expandDescription(this,"' + description + '");');
        title.className = 'stacks--title flex';
        titleImg.src = imgURL;
        titleImg.style.maxWidth = '60px';
        titleImg.style.maxHeight = '60px';
        titleImg.style.padding = '5px';
        titleImg.setAttribute('onload',
            'onePage.levelLoading(' + level + ',this.parentNode.parentNode.querySelector(\'#' + language + '\'),' +
            'this.parentNode.parentNode.querySelector(\'#' + language + 'Description\');' +
            'skill.expandDescription(this.parentNode,"' + description + '");)');
        skillSet.className = 'profile-skill-set';
        skillLevel.id = language;
        skillDescription.id = language + 'Description';
        skillDescription.className = 'stacks-description';
        skillDescription.innerHTML = '<h2 style="margin: 0;">' + language + "</h2>";

        skillContainer.appendChild(title);
        skillContainer.appendChild(skillSet);

        title.appendChild(titleImg);
        skillSet.appendChild(skillLevel);
        skillSet.appendChild(skillDescription);

        return skillContainer;
    },
    levelLoading: function (level, tagElement) {
        var count = 0;
        var levelPercent = 0;
        var levelBar = '';
        var percent;
        var squareFull = '<img src="/img/language%20icon/black-square-full.png" style="width: 1em; height: 1em; margin: 1px;">';
        var squareBlank = '<img src="/img/language%20icon/black-square-blank.png" style="width: 1em; height: 1em; margin: 1px;">';
        var interval = setInterval(function () {
                try {
                    if (count < level) {
                        levelBar += squareFull;
                        levelPercent += 10;
                    } else if (count < 10) {
                        levelBar += squareBlank;
                    }

                    switch (levelBar) {
                        case squareFull:
                            percent = '% (하)';
                            break;
                        case squareFull + squareFull + squareFull:
                            percent = '% (중하)';
                            break;
                        case squareFull + squareFull + squareFull + squareFull + squareFull:
                            percent = '% (중)';
                            break;
                        case squareFull + squareFull + squareFull + squareFull + squareFull
                        + squareFull + squareFull:
                            percent = '% (중상)';
                            break;
                        case squareFull + squareFull + squareFull + squareFull + squareFull
                        + squareFull + squareFull + squareFull + squareFull:
                            percent = '% (상)';
                            break;
                        case  squareFull + squareFull + squareFull + squareFull + squareFull
                        + squareFull + squareFull + squareFull + squareFull + squareFull:
                            percent = '% (최상)';
                            break;
                    }
                    tagElement.innerHTML = 'Level : ' + levelBar + '<BR>' + levelPercent + percent;
                    count++;

                    if (count === 10) {
                        clearInterval(interval);
                    }
                } catch (error) {
                    clearInterval(interval);
                }
            }, 100
        );
    },
    parseSkillList: function (data) {
        var resultElement = document.createElement('div');
        var parsedData = JSON.parse(data);

        for (var key in parsedData) {
            if (parsedData.hasOwnProperty(key)) {
                var language = key;
                var img = '/' + parsedData[key].imgURL;
                var skillLevel = parsedData[key].level;
                var skillDescription = parsedData[key].description;

                var contents = onePage.createSkill(language, img, skillLevel, skillDescription);
                resultElement.appendChild(contents);
            }
        }
        var notice = document.createElement('h3');
        notice.innerHTML = '위의 등급은 작성자 본인의 주관적인 판단으로 다소 편차가 있을 수도 있습니다.'
        resultElement.appendChild(notice);


        return resultElement;
    },
    typeBar: function (element, level, interval) {
        var resultLevel = '';
        for (var i = 0; i < 10; i++) {
            if (i < level) {
                resultLevel += onePage.squareFull;
            } else {
                resultLevel += onePage.squareBlank;
            }
        }
        var levelExplain;
        if (level >= 8) {
            levelExplain = '%<BR> (철야 모드)';

        } else {
            levelExplain = '%<BR> (개발자 모드)';

        }

        resultLevel += (level * 10) + levelExplain;
        text.insert(element.parentNode, resultLevel + '<BR>', interval);
        element.remove();
    }

}