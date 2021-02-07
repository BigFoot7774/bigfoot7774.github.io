function toggleActivate(toggleTarget) {
    toggleTarget.classList.toggle('unactivate');
    toggleTarget.classList.toggle('activate');
}

function ShowSelectedContents(data) {
    var projectSectionSelected = document.querySelector('#project-section-selected');
    toggleActivate(projectSectionSelected);
    projectSectionSelected.innerHTML = '<section>' + data.innerHTML + '</section>';
    window.scrollTo(0, 0);
}

function makeProjectSection(data) {
    var projectSectionContents = document.querySelector('#project-section-contents');
    var parsedData = JSON.parse(data);
    for (var parsedDataKey in parsedData) {
        var tagSection = document.createElement('section');
        var tagH2 = document.createElement('h2');
        var tagH5 = document.createElement('h5');
        var tagThumbnailDiv = document.createElement('div');
        var tagOutDiv = document.createElement('div');
        var tagInDiv = document.createElement('div');

        tagH2.innerHTML = parsedDataKey;
        if (parsedData[parsedDataKey]['thumbnail'] === null || parsedData[parsedDataKey]['thumbnail'] === "") {
            tagThumbnailDiv.innerHTML = '<img src="4_img/icon/Xasquatch.ico"/>';

        } else {
            tagThumbnailDiv.innerHTML = parsedData[parsedDataKey]['thumbnail'];
        }
        tagInDiv.innerHTML = parsedData[parsedDataKey]['detail'];
        tagH5.innerHTML = 'CLICK TO CLOSE';

        tagH2.setAttribute('align', 'center');
        tagH5.setAttribute('align', 'center');
        tagThumbnailDiv.setAttribute('align', 'center')

        tagSection.append(tagH2);
        tagSection.append(tagH5);
        tagOutDiv.append(tagThumbnailDiv);
        tagOutDiv.append(tagInDiv);
        tagSection.append(tagOutDiv);

        tagH5.setAttribute('onclick', 'toggleActivate(this.parentNode.parentNode);this.parentNode.parentNode.innerHTML = ""')
        tagSection.setAttribute('onclick', 'ShowSelectedContents(this)');

        projectSectionContents.append(tagSection);
    }

}