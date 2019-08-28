function clickLogo(){
    document.querySelector('#headerLogo').addEventListener('click',AsideFocus)
}
function AsideFocus(event) {
    document.querySelector('.header-eye').classList.toggle('opacity-1');
    document.querySelector('aside').classList.toggle('aside-focus');
    
    
    
}


function mouseXY(event){
    const pupil = document.querySelector('.header-eye-pupil');
    const maxTop = 9;
    const maxLeft = 10;
    const minTop = 2;
    const minLeft = 2;
    const maxY = maxTop - minTop;
    const maxX = maxLeft - minTop;

    let top = maxY+'px';
    let left = maxX+'px';
    let targetY = event.clientY;
    let targetX = event.clientX;

    top = String(targetY/window.innerHeight*maxY)+'px';
    left = String(targetX/window.innerWidth*maxX)+'px';

    pupil.style.top = top;
    pupil.style.left = left;
    // console.log(`${event.clientX}  ${event.clientY}`);
    // console.log(`${typeof top}  ${left}`);
}








function init() {
    window.addEventListener('mousemove',mouseXY);
    clickLogo();
}

init();