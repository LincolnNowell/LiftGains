let Calender = {
    'January': [],
    'February': [],
    'March': [],
    'April': [],
    'May': [],
    'June': [],
    'July': [],
    'August': [],
    'September': [],
    'October': [],
    'November': [],
    'December': []
}

$.get('/items', (data, status) =>{
    if(data != 0){
        for(let i of data){
            for(index of i.arr){
                Calender[i.month].push(index);
            }
        }
    }
});

console.log(Calender);

class items {
    constructor(day,time,exercise,repsAndSets){
        this.day = day;
        this.time = time;
        this.exercise = exercise;
        this.repsAndSets = repsAndSets;
    }
}

class container {
    constructor(month,arr){
        this.month = month;
        this.arr = arr;
    }
}
let daySelected = 0;

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const monthOffsets = [3,6,0,3,5,1,3,5,2,4,0,2];

function createCards(exercise,reps_sets, time){
    return `
    <div class="card red darken-1">
        <div class="card-content white-text center">
            <span class="card-title">${time}</span>
            <p>${exercise}</p>
            <p>${reps_sets}</p>
        </div>
        <div class="card-action">
            <a href="#" class="complete">Complete</a>
        </div>
    </div>`;
}

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
            daySelected = Number.parseInt(element.innerText);
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

            daySelected = Number.parseInt(e.currentTarget.innerText);

            //Clear Schedule  of items
            let schedule = document.querySelectorAll('.item');
            schedule.forEach(element =>{
                element.remove();
            })
            
            let month = document.getElementById('month');
            let CurrentItems = Calender[month.innerText].filter(element =>{
                console.log(element.day);
                if(element.day === daySelected.toString()){
                    return element;
                }
            })

            if(CurrentItems.length > 0){
                CurrentItems.forEach(element =>{
                    let Sched = document.querySelector('.schedule');
                    let div = document.createElement('div');
                    div.className = 'item';
                    div.innerHTML = createCards(element.exercise,element.repsAndSets,element.time);
                    div.addEventListener('click',(e)=>{
                        e.currentTarget.remove();
                    })
                    Sched.append(div);
                })
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

//Save button
let saveBtn = document.querySelector('#saveContent');
saveBtn.addEventListener('click',(e)=>{
    let monthSelected = document.getElementById('month').innerText;
    let daySelected = '';
    let Calenderdays = document.querySelectorAll('.num');
    for (const day of Calenderdays) {
        if(day.style.backgroundColor === 'rgb(239, 83, 80)'){
            daySelected = day.innerText;
        }
    }

    let workouts = document.querySelectorAll('.item');
    workouts.forEach(element =>{
        let item = element.querySelector('.card-content');
        if(!daySelected) daySelected = dt.getDate().toString();
        let ItemContainer = new items(daySelected,item.children[0].innerText,item.children[1].innerText,item.children[2].innerText);
        Calender[monthSelected].push(ItemContainer);
    })
})

//Submit button event
let SubBtn = document.querySelector('#save');
SubBtn.addEventListener('click', (e) =>{
    $.post('/clear');
    for(let month = 0; month < monthNames.length; month++){
        if(Calender[monthNames[month]].length){
            let contain = new container(monthNames[month],Calender[monthNames[month]]);
            $.post('/Save',contain);
        }
    }
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
            <a href="#" class="complete">Complete</a>
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
                divs.addEventListener('click',(e)=>{
                    e.currentTarget.remove();
                })
                schedule.appendChild(divs);
            }else{
                userInput = {};
            }
        })   
    }