var skill = {

    levelLoading: function (level, tagElement) {
        var count = 0;
        var levelPercent = 0;
        var levelBar = '';
        var percent;
        var squareFull = '<img src="img/language%20icon/square-full.png" style="width: 1em; height: 1em; margin: 1px;">';
        var squareBlank = '<img src="img/language%20icon/square-blank.png" style="width: 1em; height: 1em; margin: 1px;">';
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
    expandDescription: function (element, descriptionMsg) {
        var description = element.querySelector('.stacks-description');
        if (element.querySelector('.stacks-description .description') !== null) return;

        var msgContainer = document.createElement('div');
        msgContainer.className = 'description';
        msgContainer.innerHTML = descriptionMsg;
        description.appendChild(msgContainer);

        element.style.background = 'silver';

        setTimeout(function () {
            element.style.background = '';
        },500);

        function maxWidth(tagElement) {
            try {
                if (tagElement.parentNode.classList.contains('command-max-width')) return;
                tagElement.querySelector('.command-btn-square').click();
            } catch (e) {
                maxWidth(tagElement.parentNode)
            }

        }
        maxWidth(element);

    },
    expandDescriptionClickIcon: function (element, key) {
        var parentComponent = element.parentNode.parentNode.parentNode.parentNode;
        var keyElement = parentComponent.querySelector(key + '-stacks-container');
        keyElement.click();
    },
    create: function (language, imgURL, level, description) {
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
            'skill.levelLoading(' + level + ',this.parentNode.parentNode.querySelector(\'#' + language + '\'),' +
            'this.parentNode.parentNode.querySelector(\'#' + language + 'Description\'))');
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

    parseList: function (data) {
        var resultElement = document.createElement('div');
        var parsedData = JSON.parse(data);

        for (var key in parsedData) {
            if (parsedData.hasOwnProperty(key)) {
                var language = key;
                var img = parsedData[key].imgURL;
                var skillLevel = parsedData[key].level;
                var skillDescription = parsedData[key].description;

                var contents = skill.create(language, img, skillLevel, skillDescription);
                resultElement.appendChild(contents);
            }
        }
        var notice = document.createElement('h3');
        notice.innerHTML = '위의 등급은 작성자 본인의 주관적인 판단으로 다소 편차가 있을 수도 있습니다.'
        resultElement.appendChild(notice);


        return resultElement;
    }
}