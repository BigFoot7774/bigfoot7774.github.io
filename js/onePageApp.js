var onePage = {

    squareFull: '<img src="/img/language%20icon/square-full.png" style="width: 1.5em; height: 1.5em; margin: 1px;">',
    squareBlank: '<img src="/img/language%20icon/square-blank.png" style="width: 1.5em; height: 1.5em; margin: 1px;">',

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
    parseSkillList: function (data) {
        var resultElement = document.createElement('div');
        var parsedData = JSON.parse(data);

        for (var key in parsedData) {
            if (parsedData.hasOwnProperty(key)) {
                var language = key;
                var img = '/' + parsedData[key].imgURL;
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
    },
    typeBar: function (element, level, interval) {
        var resultLevel = '';
        for (var i = 0; i < 10; i++) {
            if (i < level) {
                resultLevel += salary.squareFull;
            } else {
                resultLevel += salary.squareBlank;
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