let cols = document.querySelectorAll('.col');
const NewWorkoutCard = `<div class="card red darken-1">
<div class="card-content white-text center">
  <div class="row">
    <a class="btn-floating btn-large waves-effect waves-light red lighten-3"><i class="material-icons">add</i></a>
  </div>
</div>
</div>`;

const card = (form) =>{
    let cahd = document.createElement('div');
    cahd.className = 'card red darken-1';
    let innerCard = document.createElement('div');
    innerCard.className = 'card-content white-text center';
    if(form){
        innerCard.appendChild(form);
    }
    cahd.appendChild(innerCard);
    return cahd;
}

cols.forEach(col =>{
    let card = document.createElement('div');
    card.className ='add';
    card.innerHTML = NewWorkoutCard;
    col.appendChild(card);
});


let btn = document.querySelectorAll('.btn-floating');

function createCard(body,form,userInfo){
    body.removeChild(form);
    let Cards = card();
    let content = Cards.querySelector('.card-content');
    let time = document.createElement('SPAN');
    time.className ='card-title';
    //parse time input into 12 hour clock
    let [h,m] = userInfo['time'].split(':');
    time.innerText = (h%12+12*(h%12==0))+":"+m; 
    time.innerText += (h >= 12 ? ' PM' : ' AM');
    content.appendChild(time);

    let pTag = document.createElement('p');
    pTag.innerText = userInfo['workout'];
    content.appendChild(pTag);
    let pTag2 = document.createElement('p');
    pTag2.innerText = `${userInfo['sets']} X ${userInfo['reps']}`;
    content.appendChild(pTag2);
    Cards.appendChild(content)
    body.appendChild(Cards);
}

function AddWorkoutEvent(e){
    let parent = e.currentTarget.closest('.col');
    let addBtn = e.currentTarget.closest('.add');
    let cardBody = addBtn.parentElement;
    addBtn.remove();

    //create Workout input
    let workout = document.createElement('div');
    workout.className = "input-field";
    let label = document.createElement('label');
    label.htmlFor = 'name';
    label.innerText = 'Workout';
    let name = document.createElement('input');
    name.type = 'text';
    name.class = 'validate';
    name.id = 'workout';

    workout.appendChild(label);
    workout.appendChild(name);

    //create time input
    let getTime = document.createElement('div');
    getTime.className = "input-field";
    let time = document.createElement('input');
    time.type = 'time';
    time.id = 'time';
    getTime.appendChild(time);

    let form = document.createElement('form');
    //form.method = 'post';
    form.appendChild(getTime);
    form.appendChild(workout);

    let RepsField = document.createElement('div');
    RepsField.className = 'input-field';

    let RepsLabel = document.createElement('label');
    RepsLabel.htmlFor = 'reps';
    RepsLabel.innerText = 'Reps';
    let Reps = document.createElement('input');
    Reps.type = 'number';
    Reps.min = '1';
    Reps.id = 'reps';

    let SetsField = document.createElement('div');
    SetsField.className = 'input-field';

    let SetsLabel = document.createElement('label');
    SetsLabel.htmlFor = 'sets';
    SetsLabel.innerText = 'Sets';
    let Sets = document.createElement('input');
    Sets.type = 'number';
    Sets.min = '1';
    Sets.id = 'sets';

    RepsField.appendChild(SetsLabel);
    RepsField.appendChild(Sets);
    SetsField.appendChild(RepsLabel);
    SetsField.appendChild(Reps);

    form.appendChild(RepsField);
    form.appendChild(SetsField);

    let btn = document.createElement('a');
    btn.className = 'waves-effect waves-light btn red lighten-3';
    let icon = document.createElement('i');
    icon.className = 'material-icons';
    icon.innerText = 'add';
    btn.appendChild(icon);


    form.appendChild(btn);
    let cardTemp = card(form);
    cardBody.appendChild(cardTemp);

    btn.addEventListener('click',(e) =>{
        let userInput = {};
        let input = document.querySelectorAll('input');
        let go = true;
        input.forEach(value =>{
            if(value.value == ''){
                go = false;
            }
            let newPropety = value.id;
            userInput[newPropety] = value.value;
        });
        if(go){
            createCard(cardBody,cardTemp,userInput);
            let newCard = document.createElement('div');
            newCard.className = 'add';
            newCard.innerHTML = NewWorkoutCard;
            newCard.addEventListener('click',(e) =>{AddWorkoutEvent(e)});
            //console.log(parent);
            parent.appendChild(newCard);
        }
        else{
           userInput = {};
        }
    });
}

for(let button = 0; button < btn.length; button++){
    btn.item(button).addEventListener('click',(e) =>{AddWorkoutEvent(e)});
}