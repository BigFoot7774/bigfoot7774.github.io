welcomejs = {

    create : function() {
        var welcomeBox = document.createElement('div');
        var divLeft = document.createElement('div');
        var divLine = document.createElement('div');
        var divRight = document.createElement('div');
        var divRightContents = document.createElement('div');
        var divRightList = document.createElement('ul');
        var ParentBody = document.body;
        
        welcomeBox.classList.add('welcome-box');
        divLine.classList.add('welcome-line');
        divLeft.id = 'welcomeLeftText';
        divRight.id = 'welcomeRightText';
        divLeft.innerHTML = 'Now Loading...';
        divRightContents.id = 'divRightContents';
        divRightList.id = 'divRightList';


        welcomeBox.appendChild(divLeft);
        welcomeBox.appendChild(divLine);
        welcomeBox.appendChild(divRight);

        divRight.appendChild(divRightContents);
        divRight.appendChild(divRightList);
        
        ParentBody.insertBefore(welcomeBox,ParentBody.childNodes[0]);

        setTimeout(function () {
            document.querySelector('.welcome-line').style.height = '100vh';
            new Textjs.insertText('#divRightContents','Welcome To my Page // 제 홈페이지에 오신 것을// 진심으로 환영합니다!', 10);
        }, 10);
    },

    remove : function (callback) {
        
        setTimeout(function () {
            welcomejs.welcomeBye();
            
            setTimeout(function () {
                document.body.removeChild(document.querySelector('.welcome-box'));
                callback();
            },2000);
        },2000);
    },

    welcomeBye : function () {
        document.querySelector('#welcomeLeftText').style.left = '-100vw';
        document.querySelector('#welcomeRightText').style.right = '-100vw';
        document.querySelector('.welcome-line').style.display = 'none';
    }



};

function browserCheck() {
    if(navigator.userAgent.toLowerCase().indexOf("chrome") === -1 ){
        requestjs.ajax('GET', '/1_app/browserCheck.json',function (data) {
            var parsedData = JSON.parse(data);
            modaljs.create(parsedData.title, parsedData.contents);
        },true);
    }
}

function welcome_init() {
    welcomejs.create();
    loadingjs.plus('#welcomeLeftText');
    
    document.addEventListener('DOMContentLoaded', function(){
        welcomejs.remove(loadingjs.stop);
    });
    
}

welcome_init();
browserCheck();