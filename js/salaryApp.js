var salary = {

    squareFull: '<img src="img/language%20icon/square-full.png" style="width: 1.5em; height: 1.5em; margin: 1px;">',
    squareBlank: '<img src="img/language%20icon/square-blank.png" style="width: 1.5em; height: 1.5em; margin: 1px;">',

    meant1: function (element, interval) {
        text.insert(element.parentNode, '저의 <span style="color: red;">기술</span>과 ' +
            '<span style="color: red;">열정</span>으로' +
            ' <span style="color: red;">몇 배의 부가가치</span>를 돌려 드리겠습니다' +
            '<BR>탁월한 <span style="color: red;">투자 대상</span>이 되겠습니다', interval);
        element.remove();
    },
    meant2: function (element, interval) {
        text.insert(element.parentNode, '<BR><BR>두가지 타입 중 골라서 투자해주세요', interval);
        element.remove();
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
    },
    normalType: function (element, interval) {
        text.insert(element.parentNode, '<BR>⠀⠀⠀⠀⣴⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⣿⣿⣿⣦⠀⠀⠀⠀⠀', interval);
        text.insert(element.parentNode, '<BR>⠀⠀⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⡿⠀⠀⠀⠀⠀', interval);
        text.insert(element.parentNode, '<BR>⠀⠀⠀⠀⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣷⡀⠀⠀⠀⠀', interval);
        text.insert(element.parentNode, '<BR>⠀⠀⠀⠀⢻⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⣿⣿⣦⠀⠀⠀', interval);
        text.insert(element.parentNode, '<BR>⠀⠀⠀⠀⢨⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⣿⣿⣿⣧⠀⠀', interval);
        text.insert(element.parentNode, '<BR>⠀⠀⠀⣠⣿⣟⣛⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣶⡆', interval);
        text.insert(element.parentNode, '<BR>⢰⣶⣾⣿⣿⣿⣿⣷⣶⡄⠀⠀⡀⠀⠀⣠⣤⣤⣀⣀⣸⣿⣿⣿⣿⣿⣿⣿⣿⡷', interval);
        text.insert(element.parentNode, '<BR>⣼⣿⣿⣿⣿⣿⣿⣿⣿⣥⣤⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇', interval);
        text.insert(element.parentNode, '<BR>⠛⣿⡟⠛⠛⠛⠛⠛⠛⢻⣿⠛⠛⠛⣛⣛⣛⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⣿', interval);
        text.insert(element.parentNode, '<BR>⠀⣿⡇⠀⠀⠀⠀⠀⠀⢸⣿⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⠀⢿', interval);
        text.insert(element.parentNode, '<BR>⠀⣿⡇⠀⠀⠀⠀⠀⠀⢸⣿⠀⠘⣿⣿⣿⣿⡿⠿⠿⣿⣿⣿⣿⣿⣿⣿⣿⡷⣼', interval);
        text.insert(element.parentNode, '<BR>⠀⣿⡇⠀⠀⠀⠀⠀⠀⢸⣿⠀⠀⠹⣿⣿⣿⡇⠀⠀⠛⠿⠿⣿⣿⣿⣿⡿⠟⠋<BR>', interval);
        element.remove();
    },
    hardType: function (element, interval) {
        text.insert(element.parentNode, '<BR>⠀⠀⠀⠀⣴⣿⡇⠀⠀⠀⠀<span style="color: red">⠀⠀⠀⠀⣴⣿⣿⣿⣦⠀⠀</span>⠀⠀⠀', interval);
        text.insert(element.parentNode, '<BR>⠀⠀⠀⠀⣿⣿⡇⠀⠀⠀⠀<span style="color: red">⠀⠀⠀⢠⣿⣿⣿⣿⡿⠀⠀</span>⠀⠀⠀', interval);
        text.insert(element.parentNode, '<BR>⠀⠀⠀⠀⣿⣿⡇⠀⠀⠀⠀<span style="color: red">⠀⠀⠀⠀⣿⣿⣿⣿⣷⡀⠀</span>⠀⠀⠀', interval);
        text.insert(element.parentNode, '<BR>⠀⠀⠀⠀⢻⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⣿⣿⣦⠀⠀⠀', interval);
        text.insert(element.parentNode, '<BR>⠀⠀⠀⠀⢨⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⣿⣿⣿⣧⠀⠀', interval);
        text.insert(element.parentNode, '<BR>⠀⠀⠀⣠⣿⣟⣛⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣶⡆', interval);
        text.insert(element.parentNode, '<BR>⢰⣶⣾⣿⣿⣿⣿⣷⣶⡄⠀⠀⡀⠀⠀⣠⣤⣤⣀⣀⣸⣿⣿⣿⣿⣿⣿⣿⣿⡷', interval);
        text.insert(element.parentNode, '<BR>⣼⣿⣿⣿⣿⣿⣿⣿⣿⣥⣤⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇', interval);
        text.insert(element.parentNode, '<BR>⠛⣿⡟⠛⠛⠛⠛⠛⠛⢻⣿⠛⠛⠛⣛⣛⣛⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⣿', interval);
        text.insert(element.parentNode, '<BR>⠀⣿⡇⠀⠀⠀⠀⠀⠀⢸⣿⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⠀⢿', interval);
        text.insert(element.parentNode, '<BR>⠀⣿⡇⠀⠀⠀⠀⠀⠀⢸⣿⠀⠘⣿⣿⣿⣿⡿⠿⠿⣿⣿⣿⣿⣿⣿⣿⣿⡷⣼', interval);
        text.insert(element.parentNode, '<BR>⠀⣿⡇⠀⠀⠀⠀⠀⠀⢸⣿⠀⠀⠹⣿⣿⣿⡇⠀⠀⠛⠿⠿⣿⣿⣿⣿⡿⠟⠋<BR>', interval);
        element.remove();
    }
}



