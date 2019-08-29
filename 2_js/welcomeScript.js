function welcomeEffect() {
    const welcomeBox = document.createElement('div');
    const div1 = document.createElement('div');
    const divLine = document.createElement('div');
    const div2 = document.createElement('div');
    const ParentBody = document.body;
    
    
//금방 지울꺼지만 한번 넣어보고 싶었어
    const tesla = document.createElement('img');
    const johnvonNeumann = document.createElement('img');

    tesla.src = '/4_img/Tesla_Sarony.jpg';
    tesla.style.width = '200px';
    tesla.style.animation = '2s tinkleContents';
    johnvonNeumann.src = '/4_img/JohnvonNeumann-LosAlamos.gif';
    johnvonNeumann.style.width = '200px';
    johnvonNeumann.style.animation = '2s tinkleContents';
    div1.appendChild(tesla);
    div2.appendChild(johnvonNeumann);
// 여기까지임시

    welcomeBox.classList.add('welcome-box');
    divLine.classList.add('welcome-line');

    welcomeBox.appendChild(div1);
    welcomeBox.appendChild(divLine);
    welcomeBox.appendChild(div2);
   
    ParentBody.insertBefore(welcomeBox,ParentBody.childNodes[0]);
    
}

function welcome_init() {
    welcomeEffect();

}

welcome_init();