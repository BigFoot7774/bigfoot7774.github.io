function includeAjax(filedir,querySelector){
    var xhr = new XMLHttpRequest;
    xhr.onreadystatechange = function(){
        if (this.readyState === 4 && this.status === 200) {
            document.querySelector(querySelector).innerHTML = this.responseText;
        }

        
    }
    xhr.open('GET',filedir, true);
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send();
}