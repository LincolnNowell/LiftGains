
let days = [31,28,31,30,31,30,31,31,30,31,30,31];
let dt = new Date();
if(dt.getFullYear() % 4 == 0){
    days = [31,29,31,30,31,30,31,31,30,31,30,31];
}

const displayCalender = (days) =>{
    let row = document.getElementsByClassName("row");
    for(let month = 0; month < days; month++){
        let col = document.createElement('div');
        col.className = "col s2"; 
        let card = document.createElement('div');
        card.className = 'card red darken-1';
        let content = document.createElement('div');
        content.className = 'card-content white-text';
        let title = document.createElement('SPAN');
        title.className = 'card-title';
        title.innerText = month + 1;
        let action = document.createElement('div');
        action.className = "card-action";
        let btn = document.createElement('a');
        btn.className = "btn-floating btn-large waves-effect waves-light red lighten-3";
        let image = document.createElement('i');
        image.className = "material-icons";
        image.innerText = 'add';
        btn.appendChild(image);
        action.appendChild(btn);
        content.appendChild(title);
        card.appendChild(content);
        card.appendChild(action);
        col.appendChild(card);
    
        row.item(0).appendChild(col);
    }
};

const setEventListners = () =>{
    displayCalender(31);
    let tags = document.getElementsByClassName('tabs').item(1).getElementsByClassName('tab s1');

    for(let tab = 0; tab < tags.length; tab++){
        tags.item(tab).id = days[tab];
        tags.item(tab).addEventListener('click',(e) =>{     
            let NumberOfDays = Number.parseInt(event.currentTarget.id);
            let cards = document.querySelector('.row');
            let child = cards.lastElementChild;
            while(child){
                cards.removeChild(child);
                child = cards.lastElementChild;
            }
            displayCalender(NumberOfDays);       
        });
    }
}

$(document).ready(function(){
    $('.tabs').tabs();
});


setEventListners();

let btns = document.querySelector('.row').querySelectorAll('.material-icons');
for(let i = 0; i < btns.length; i++){
    btns.item(i).id = i + 1;
    btns.item(i).addEventListener('click',(e) =>{
        let tgt = e.currentTarget.id;
        let got = document.getElementById(tgt).parentElement.parentElement.parentElement.parentElement;
        got = got.querySelector('.card-content');

    })
}
