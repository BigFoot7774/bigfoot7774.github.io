var project = {
    explainMyBlog: function (element, interval) {
        text.insert(element.parentNode, '<h3>Project: My Blog (Stand Alone Project)</h3><BR>' +
            'REST API를 제공하며 API를 이용하여 블로그를 꾸밀 수 있습니다.<BR>' +
            '(클릭 시 상세보기)', interval);
        element.remove();
    },
    explainGithub: function (element, interval) {
        text.insert(element.parentNode, '<h3>Github Page (No Library, No Framework)</h3><BR>' +
            '프레임워크나 라이브러리의 도움없이 css와 javascript만으로 만든 페이지입니다<BR>' +
            '(클릭 시 상세보기)', interval);
        element.remove();
    },
    viewDetail: function (element, url) {
        navJs.active(element.querySelector('legend').innerText, url + '<BR>정보를 받아오는 중입니다.')
        request.submit('GET', url, function (data) {
            console.log(data);

            setTimeout(navJs.inactive, 500);
        });

    }

}