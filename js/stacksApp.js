var skill = {

    levelLoading: function (level, tagName, description) {
        var count = 0;
        var levelPercent = 0;
        var targetTag = document.querySelector(tagName);
        var levelBar = '';
        var percent;
        var interval = setInterval(function () {
                try {



                    if (count < level) {
                        levelBar += '<img src="img/language%20icon/square-full.png" style="width: 1em;height: 1em;">';
                        levelPercent += 10;
                    } else if (count < 10) {
                        levelBar += '<img src="img/language%20icon/square-blank.png" style="width: 1em;height: 1em;">';
                    }

                    switch (levelBar) {
                        case '<img src="img/language%20icon/square-full.png" style="width: 1em;height: 1em;">':
                            percent = '% (하)';
                            break;
                        case '<img src="img/language%20icon/square-full.png" style="width: 1em;height: 1em;">' +
                        '<img src="img/language%20icon/square-full.png" style="width: 1em;height: 1em;">' +
                        '<img src="img/language%20icon/square-full.png" style="width: 1em;height: 1em;">':
                            percent = '% (중하)';
                            break;
                        case '<img src="img/language%20icon/square-full.png" style="width: 1em;height: 1em;">' +
                        '<img src="img/language%20icon/square-full.png" style="width: 1em;height: 1em;">' +
                        '<img src="img/language%20icon/square-full.png" style="width: 1em;height: 1em;">' +
                        '<img src="img/language%20icon/square-full.png" style="width: 1em;height: 1em;">' +
                        '<img src="img/language%20icon/square-full.png" style="width: 1em;height: 1em;">':
                            percent = '% (중)';
                            break;
                        case '<img src="img/language%20icon/square-full.png" style="width: 1em;height: 1em;">' +
                        '<img src="img/language%20icon/square-full.png" style="width: 1em;height: 1em;">' +
                        '<img src="img/language%20icon/square-full.png" style="width: 1em;height: 1em;">' +
                        '<img src="img/language%20icon/square-full.png" style="width: 1em;height: 1em;">' +
                        '<img src="img/language%20icon/square-full.png" style="width: 1em;height: 1em;">' +
                        '<img src="img/language%20icon/square-full.png" style="width: 1em;height: 1em;">' +
                        '<img src="img/language%20icon/square-full.png" style="width: 1em;height: 1em;">':
                            percent = '% (중상)';
                            break;
                        case '<img src="img/language%20icon/square-full.png" style="width: 1em;height: 1em;">' +
                        '<img src="img/language%20icon/square-full.png" style="width: 1em;height: 1em;">' +
                        '<img src="img/language%20icon/square-full.png" style="width: 1em;height: 1em;">' +
                        '<img src="img/language%20icon/square-full.png" style="width: 1em;height: 1em;">' +
                        '<img src="img/language%20icon/square-full.png" style="width: 1em;height: 1em;">' +
                        '<img src="img/language%20icon/square-full.png" style="width: 1em;height: 1em;">' +
                        '<img src="img/language%20icon/square-full.png" style="width: 1em;height: 1em;">' +
                        '<img src="img/language%20icon/square-full.png" style="width: 1em;height: 1em;">' +
                        '<img src="img/language%20icon/square-full.png" style="width: 1em;height: 1em;">':
                            percent = '% (상)';
                            break;
                        case '<img src="img/language%20icon/square-full.png" style="width: 1em;height: 1em;">' +
                        '<img src="img/language%20icon/square-full.png" style="width: 1em;height: 1em;">' +
                        '<img src="img/language%20icon/square-full.png" style="width: 1em;height: 1em;">' +
                        '<img src="img/language%20icon/square-full.png" style="width: 1em;height: 1em;">' +
                        '<img src="img/language%20icon/square-full.png" style="width: 1em;height: 1em;">' +
                        '<img src="img/language%20icon/square-full.png" style="width: 1em;height: 1em;">' +
                        '<img src="img/language%20icon/square-full.png" style="width: 1em;height: 1em;">' +
                        '<img src="img/language%20icon/square-full.png" style="width: 1em;height: 1em;">' +
                        '<img src="img/language%20icon/square-full.png" style="width: 1em;height: 1em;">' +
                        '<img src="img/language%20icon/square-full.png" style="width: 1em;height: 1em;">':
                            percent = '% (최상)';
                            break;
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
        titleImg.style.maxWidth = '70px';
        titleImg.style.maxHeight = '70px';
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