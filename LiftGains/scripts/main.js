$(document).ready(function(){
    $('.parallax').parallax();
});

$.get('/user',(data,status) =>{
    if(data){document.getElementById('sign').innerText = data;}
})