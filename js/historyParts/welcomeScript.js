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
            new Textjs.insertText('#divRightContents','Welcome To my Page <BR><BR> Developer 고태흥입니다.', 10);
        }, 10);
    },

    remove : function (callback) {
        
        setTimeout(function () {
            welcomejs.welcomeBye();
            
            setTimeout(function () {
                document.body.removeChild(document.querySelector('.welcome-box'));
                callback();
            },1000);
        },1000);
    },

    welcomeBye : function () {
        document.querySelector('#welcomeLeftText').style.left = '-100vw';
        document.querySelector('#welcomeRightText').style.right = '-100vw';
        document.querySelector('.welcome-line').style.display = 'none';
    }



};



function welcome_init() {
    // defaultScript.foward('/app/list/profile.html', 'Profile', 'Profile : 저를 소개합니다');
}
    

welcome_init();