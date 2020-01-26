$.get('/user',(data,status) =>{
    if(data){document.getElementById('sign').innerText = data;}
})