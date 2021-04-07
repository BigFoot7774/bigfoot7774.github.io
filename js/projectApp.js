var project = {
    explainMyBlog: function (element, interval) {
        text.insert(element.parentNode, 'My Blog', interval);
        element.remove();
    },
    explainGithub: function (element, interval) {
        text.insert(element.parentNode, 'Github Page', interval);
        element.remove();
    },


}