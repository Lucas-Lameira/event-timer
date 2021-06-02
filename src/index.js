let currentTime = 0;
let diference = 0;
let segundos = 0;
let minutos = 0;
let hora = 0;
let dia = 0;


let eventsData = [
  //{id, eventName, eventDate, eventTime, toggle} //data structure
]; 
let id = -1;

function registerNewEvent() {  
  //get user input | string type 
  const eventName = document.getElementById("input-event-name").value;//"string name"
  const eventDate = document.getElementById("input-event-date").value;//"yyyy-mm-dd"
  const eventTime = document.getElementById("input-event-time").value;//"hh:mm"

  //console.log(`${typeof eventDate}:${eventDate} ${typeof eventTime}:${eventTime}`)

  //data validation
  if(isNameEmpty(eventName)){
    return alert("Informe o nome do evento");
  };

  if (isOutOfDate(eventDate, eventTime)){
    return alert("Tente preencher uma data válida");
  };

  //format data
  let eventDay = formatEventDate(eventDate, eventTime); 
  console.log(eventDay);
  
  //store data
  id++; //id for each countdown
  eventsData.push({
    id,
    eventName,
    eventDay,
    toggle: false, 
    intervalId: null
  });     
  
  //create element
  let child = document.createElement("div")
  child.setAttribute("class", "event-container")
  child.setAttribute("id", `${id}`)
  child.innerHTML = `
  <aside class="event-info">
    <h2 class="event-title">${eventName}</h2>
    
    <div class="info">
      <h2>Data</h2>
      <strong>${eventDate}</strong>
    </div>
    
    <div class="info">
      <h2>Hora</h2>
      <strong>${eventTime}</strong>
    </div>
  </aside>

  <section class="times-square">
    <div class="time-container">        
      <strong class="timer timer${id}" >00</strong>         
      <span>Dia</span>
    </div>   
    
    <div class="time-container">        
      <strong class="timer timer${id}">00</strong>         
      <span>Hora</span>
    </div>      

    <div class="time-container">        
      <strong class="timer timer${id}">00</strong>         
      <span>Minuto</span>
    </div>      

    <div class="time-container">        
      <strong class="timer timer${id}">00</strong>         
      <span>Segundo</span>
    </div>
  </section>

  <button     
    onclick = "initCount(this.value)"    
    value="${id}"
  >
    <img src="../images/play.png" alt="play icon">
  </button>
  `
  let main = document.getElementById("timer-container");
  main.appendChild(child)    
  document.querySelector('.modal-bg').classList.remove('modal-open');
}


/* eventsData.push({
  id,
  eventName,
  eventDay,
  toggle: false, 
  intervalId: 0
}); */   

function initCount(identifier) {
  //retorna um array|htmlcollection  
  eventsData[identifier].toggle = !eventsData[identifier].toggle;
  let {eventDay, toggle} = eventsData[identifier];
  
  console.log(toggle)

  if(toggle){    
    //get the parent
    let parent = document.getElementById(identifier);
    
    //get the third child      
    let btn = parent.children[2];
    btn.innerHTML = `<img src="../images/pause.png" alt="play icon">` 
    
    //get inputs for timer
    let outputs = document.getElementsByClassName(`timer${identifier}`)    
    
    function renderTime(){        
      
      currentTime = new Date().getTime();                  
  
      diference = eventDay - currentTime;      

      segundos = Math.floor(diference / 1000);
      minutos = Math.floor(segundos / 60);
      hora = Math.floor(minutos / 60);
      dia = Math.floor(hora / 24);
  
      hora %= 24;
      minutos %= 60;
      segundos %= 60;
  
      hora = hora < 10 ? "0" + hora : hora; 
      minutos = minutos < 10 ? "0" + minutos : minutos; 
      segundos = segundos < 10 ? "0" + segundos : segundos; 
      
      outputs[0].innerHTML = dia
      outputs[1].innerHTML = hora
      outputs[2].innerHTML = minutos
      outputs[3].innerHTML = segundos
    }
    
    eventsData[identifier].intervalId = setInterval(renderTime, 1000);
    
  } else{    
    //get the parent
    let parent = document.getElementById(identifier);
  
    //get the third child      
    let btn = parent.children[2];
    btn.innerHTML = `<img src="../images/play.png" alt="play icon">`
    
    clearInterval(eventsData[identifier].intervalId)
  }
}

//name validation
function isNameEmpty(name){
  if(name === ''){
    return true
  }
}

//Date validation
function isOutOfDate (date, time){
  if(date === ''){    
    return true;
  } 
  
  let check = 0;
  
  time = validateTime(time)

  let [year, month, day] = date.split('-');
  let [hour, minute] = time.split(':');
  month-=1;  
      
  let current = new Date().getTime();
  let event = new Date(year, month, day, hour, minute).getTime();

  check = event - current;
  
  if(check <= 0 || isNaN(check)) {
    alert('Data ou Hora Inválida!');
    return true
  } 
  else return false
}

//check if time is empty
function validateTime(time){        
  if(time === '') return "00:00"
  else return time  
}

function formatEventDate(date, time){
  let [year, month, day] = date.split('-');
  let [hour, minute] = time.split(':');
  month-=1

  let x = new Date(year, month, day, hour, minute).getTime();
  
  console.log(`Formated:${typeof x}:${x}`);
  return x;
}