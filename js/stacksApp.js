var skill = {

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
        titleImg.setAttribute('onload', 'skill.levelLoading(' + level + ',\"#' + language + '\",\"#' + language + 'Description\")');
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
        return resultElement;
    }
}