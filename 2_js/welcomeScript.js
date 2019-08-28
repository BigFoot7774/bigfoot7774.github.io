
function welcomeEffect() {
    const welcomeBox = document.createElement('div');
    const div1 = document.createElement('div');
    const divLine = document.createElement('div');
    const div2 = document.createElement('div');
    
    welcomeBox.classList.add('welcome-box');
    divLine.classList.add('welcome-line');


    welcomeBox.appendChild(div1);
    welcomeBox.appendChild(divLine);
    welcomeBox.appendChild(div2);
    document.body.appendChild(welcomeBox);
    
}

function welcome_init() {
    welcomeEffect();

}

welcome_init();