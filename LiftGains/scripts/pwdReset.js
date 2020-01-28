let btn = document.getElementById('log');
btn.addEventListener('click',(e)=>{
    let orig = document.getElementById('pwd').value;
    let retype = document.getElementById('password').value;
    if(orig == retype){
        $.post('/reset',{pwd: orig});
        window.location.href = '/pages/login.html';
    }
    else{
        alert('Passwords must match');
    }
})