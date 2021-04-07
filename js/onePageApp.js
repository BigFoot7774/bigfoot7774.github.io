var onePage = {
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
    }

}