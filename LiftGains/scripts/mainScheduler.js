let Calender = {
    'January': [[]],
    'February': [[]],
    'March': [[]],
    'April': [[]],
    'May': [[]],
    'June': [[]],
    'July': [[]],
    'August': [[]],
    'September': [[]],
    'October': [[]],
    'November': [[]],
    'December': [[]]
}

class items {
    constructor(time,exercise,repsAndSets){
        this.time = time;
        this.exercise = exercise;
        this.repsAndSets = repsAndSets;
    }
}

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const monthOffsets = [3,6,0,3,5,1,3,5,2,4,0,2];

let calender = document.querySelector(".days");

// change Februrary days to 29 if leap year
let days = [31,28,31,30,31,30,31,31,30,31,30,31];
let dt = new Date();
if(dt.getFullYear() % 4 == 0){
    days = [31,29,31,30,31,30,31,31,30,31,30,31];
}

let month = document.getElementById('month');
month.innerText = monthNames[dt.getMonth()];
let monthShown = dt.getMonth();

let CalDay = document.getElementsByClassName('num');

let offset = monthOffsets[monthShown];

const selectCurrentDay = () =>{
    let dt = new Date();
    let dom = document.querySelectorAll('.num');
    dom.forEach(element => {
        if(element.innerText === dt.getDate().toString()){
            element.style.backgroundColor = '#ef5350';
            element.style.borderRadius = '50%';
        }
    });
    let month = document.getElementById('month');
    month.innerText = monthNames[dt.getMonth()];
}

const addCalenderDays = (month,offset) =>{
    for(let i = 0; i < days[month] + offset; i++){
        if(i < offset){
            calender.innerHTML += '<p>&nbsp</p>';
        }else{
            calender.innerHTML += `<p class="num">${i - (offset) + 1}</p>`;
        }
    }
}

const addCalenderListners = () => {
    let Calenderdays = document.querySelectorAll('.num');
    for (const day of Calenderdays) {
        day.addEventListener('click',(e) =>{
            let dom = document.querySelectorAll('.num');
            dom.forEach(element => {
                if(element.style.backgroundColor != ''){
                    element.style.backgroundColor = '';
                }
            });
            e.currentTarget.style.backgroundColor = '#ef5350';
            e.currentTarget.style.borderRadius = '50%';

            //Clear Schedule  of items
            let schedule = document.querySelector('.schedule');
            for (let index = 1; index < schedule.children.length; index++) {
                schedule.removeChild(schedule.children[index]);
            }
        })
    }
}

addCalenderDays(monthShown,offset);

addCalenderListners();

selectCurrentDay();

//arrow event listners

let rightArrow = document.getElementById('right');
rightArrow.addEventListener('click',(e) =>{
    monthShown++;
    if(monthShown < 12) {
        month.innerText = monthNames[monthShown];
        let days = document.querySelector('.days');
        let child = days.lastElementChild;
        while(child){
            days.removeChild(child);
            child = days.lastElementChild;
        }
        addCalenderDays(monthShown,monthOffsets[monthShown]);
        addCalenderListners();

    }else{
        monthShown--;
    }
});

let leftArrow = document.getElementById('left');
leftArrow.addEventListener('click',(e) =>{
    monthShown--;
    if(monthShown >= 0) {
        month.innerText = monthNames[monthShown];
        let days = document.querySelector('.days');
        let child = days.lastElementChild;
        while(child){
            days.removeChild(child);
            child = days.lastElementChild;
        }
        addCalenderDays(monthShown,monthOffsets[monthShown]);
        addCalenderListners();
    }else{
        monthShown++;
    }
});

//Save button event
let SaveBtn = document.querySelector('#save');
SaveBtn.addEventListener('click', (e) =>{
    let monthSelected = document.getElementById('month').innerText;
    let daySelected = '';
    let Calenderdays = document.querySelectorAll('.num');
    for (const day of Calenderdays) {
        if(day.style.backgroundColor === 'rgb(239, 83, 80)'){
            daySelected = day.innerText;
        }
    }

    let ItemArr = Array();
    let workouts = document.querySelectorAll('.item');
    workouts.forEach(element =>{
        let item = element.querySelector('.card-content');
        let ItemContainer = new items(item.children[0].innerText,item.children[1].innerText,item.children[2].innerText);
        ItemArr.push(ItemContainer);
    })
    Calender[monthSelected][Number.parseInt(daySelected)] = ItemArr;
});



//adding items to list


const InfoGetterCard = `
<div class="card red darken-1">
<div class="card-content white-text center">
<form>
    <div class="input-field">
        <input type="time" id="time">
    </div>
    <div class="input-field">
        <label for="name" class="">Workout</label>
        <input type="text" id="workout">
    </div>
    <div class="input-field">
        <label for="sets">Sets</label>
        <input type="number" min="1" id="sets">
    </div>
    <div class="input-field">
        <label for="reps">Reps</label>
        <input type="number" min="1" id="reps">
    </div>
    <a class="waves-effect waves-light btn red lighten-3">
        <i class="material-icons">add</i>
    </a>
</form>
</div>
</div>`

function createCard(exercise,reps, sets, time){
    return `
    <div class="card red darken-1">
        <div class="card-content white-text center">
            <span class="card-title">${time}</span>
            <p>${exercise}</p>
            <p>${sets} X ${reps}</p>
        </div>
        <div class="card-action">
            <a href="#">Complete</a>
        </div>
    </div>`;
}


let schedule = document.querySelector('.schedule');
schedule.innerHTML += InfoGetterCard;

let btn = document.querySelectorAll('.btn');
    for (let index = 0; index < btn.length; index++) {
        btn[index].addEventListener('click',(e)=>{
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
                let [h,m] = userInput['time'].split(':');
                let times = (h%12+12*(h%12==0))+":"+m; 
                times += (h >= 12 ? ' PM' : ' AM');
                let divs = document.createElement('div');
                divs.className = 'item';
                divs.innerHTML = createCard(userInput['workout'],userInput['reps'],userInput['sets'],times);
                schedule.appendChild(divs);
            }else{
                userInput = {};
            }
        })   
    }