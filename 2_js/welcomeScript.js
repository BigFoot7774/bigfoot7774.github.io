function welcomeEffect() {
    var welcomeBox = document.createElement('div');
    var div1 = document.createElement('div');
    var divLine = document.createElement('div');
    var div2 = document.createElement('div');
    var ParentBody = document.body;
    
    welcomeBox.classList.add('welcome-box');
    divLine.classList.add('welcome-line');
    div1.id = 'welcomeRightText';
    div2.id = 'welcomeLeftText';

    welcomeBox.appendChild(div1);
    welcomeBox.appendChild(divLine);
    welcomeBox.appendChild(div2);

    ParentBody.insertBefore(welcomeBox,ParentBody.childNodes[0]);
    
}

function welcome_init() {
    welcomeEffect();
}

welcome_init();