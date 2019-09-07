function welcomeEffect() {
    const welcomeBox = document.createElement('div');
    const div1 = document.createElement('div');
    const divLine = document.createElement('div');
    const div2 = document.createElement('div');
    const ParentBody = document.body;
    
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