const headerModal = document.querySelector("#headerModal");
const headerModalTitle = document.querySelector(".header-modal-title");
const headerModalClose = document.querySelector(".header-modal-title-close");

//w3s 인용
//출처 : https://www.w3schools.com/howto/howto_js_draggable.asp

const modal = {dragElement: function (element) {

                                let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

                                if (headerModalTitle) {
                                    headerModalTitle.onmousedown = dragMouseDown;
                                } else {
                                    element.onmousedown = dragMouseDown;
                                }

                                function dragMouseDown(event) {
                                    event = event || window.event;
                                    event.preventDefault();
                                    pos3 = event.clientX;
                                    pos4 = event.clientY;
                                    document.onmouseup = closeDragElement;
                                    document.onmousemove = elementDrag;
                                }

                                function elementDrag(event) {
                                    event = event || window.event;
                                    event.preventDefault();
                                    pos1 = pos3 - event.clientX;
                                    pos2 = pos4 - event.clientY;
                                    pos3 = event.clientX;
                                    pos4 = event.clientY;
                                    element.style.top = (element.offsetTop - pos2) + "px";
                                    element.style.left = (element.offsetLeft - pos1) + "px";
                                }

                                function closeDragElement() {
                                    document.onmouseup = null;
                                    document.onmousemove = null;
                                }

                            },

                    close: function (event) {
                        headerModal.classList.toggle('hidden');
                    }
                };

function modalInit() {
    headerModalClose.addEventListener('click',modal.close);
    modal.dragElement(headerModal);
}

modalInit();