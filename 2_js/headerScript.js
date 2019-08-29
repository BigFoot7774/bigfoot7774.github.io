const header = document.querySelector('header');
const aside = document.querySelector('aside');

function AsideFocus(event) {
    const headerLogo = header.querySelector('#headerLogo');
    const headereye = header.querySelector('.header-eye');
    const headerArrow = header.querySelector('.arrow');
    
// TODO: 임시로 토글 메소드 달아놓음
// 조건문 훑은 후 한번 더 확장하게 할 예정
    
    headereye.classList.toggle('opacity-1');
    headereye.classList.toggle('z-index-100');
    headerArrow.classList.toggle('arrow-reverse');
    
    const asideChilden = aside.querySelectorAll('aside>*');

    aside.classList.toggle('aside-focus');

    for (let index = 0; index < asideChilden.length; index++) {
        asideChilden[index].classList.toggle('opacity-1');
    }
    
}

function mouseXY(event){
    const pupil = header.querySelector('.header-eye-pupil');
// eyelidInfo의 getBoundingClientRect()메소드를 호출하여 이 태그의 위치를 기준으로
// 좌표 정보값을 가지는 객체를 리턴받음
    const eyelidInfo = header.querySelector('.header-eye-eyelid').getBoundingClientRect();
// eventLocation: 현재 마우스 좌표값
    const eventLocation = {X: event.clientX, Y: event.clientY};
// center: 좌표값 기준이 될 header-eye-eyelid클래스의 X Y좌표 중앙 값
    const center = {
                    X: (eyelidInfo.left + eyelidInfo.right)/2,
                    Y: (eyelidInfo.top + eyelidInfo.bottom)/2
                    };

    let locationX = eventLocation.X;
    let locationY = eventLocation.Y;

//pupil의 위치가 eyelid의 범위에서 벗어나지 않게 
// 조건문으로 위치 조정
    if (eventLocation.X > eyelidInfo.right-10) {
        locationX = center.X+2
    }
    if (eventLocation.X < eyelidInfo.left+10) {
        locationX = center.X-5
    }
    if (eventLocation.Y > eyelidInfo.bottom-5) {
        locationY = center.Y+3
    }
    if (eventLocation.Y < eyelidInfo.top+5) {
        locationY = center.Y-5
    }

//좌표값 반영
    pupil.style.left = String(locationX)+'px';
    pupil.style.top = String(locationY)+'px';
}

function headerInit() {
    headerLogo.addEventListener('click',AsideFocus);
    window.addEventListener('mousemove',mouseXY);
}

// init();