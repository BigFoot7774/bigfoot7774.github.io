welcomejs = {

    create : function() {
        var welcomeBox = document.createElement('div');
        var div1 = document.createElement('div');
        var divLine = document.createElement('div');
        var div2 = document.createElement('div');
        var ParentBody = document.body;
        
        welcomeBox.classList.add('welcome-box');
        divLine.classList.add('welcome-line');
        div1.id = 'welcomeLeftText';
        div2.id = 'welcomeRightText';
        div1.innerHTML = 'Now Loading...';
        
        welcomeBox.appendChild(div1);
        welcomeBox.appendChild(divLine);
        welcomeBox.appendChild(div2);
        
        ParentBody.insertBefore(welcomeBox,ParentBody.childNodes[0]);
        
    },
    remove : function (callback) {
        setTimeout(function () {
            
            document.body.removeChild(document.querySelector('.welcome-box'));
            callback();
        }, 4000);
    }
};

function welcome_init() {
    welcomejs.create();
    loadingjs.plus('#welcomeLeftText');
    new Textjs.insertText('#welcomeRightText','Welcome To my Page // 제 홈페이지에 오신 것을// 진심으로 환영합니다!', 10);

    welcomejs.remove(loadingjs.stop);
}

welcome_init();