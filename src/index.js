let eventsData = [
  //{id, eventName, eventDate, eventTime} data structure
];
let id = eventsData.length;

function registerNewEvent() {  
  //get user input | string type 
  const eventName = document.getElementById("input-event-name").value;//"string name"
  const eventDate = document.getElementById("input-event-date").value;//"yyyy-mm-dd"
  const eventTime = document.getElementById("input-event-time").value;//"hh:mm"

  //data validation
  if(isNameEmpty(eventName)){
    return alert("Informe o nome do evento");
  };

  if (isOutOfDate(eventDate, eventTime)){
    return alert("Tente preencher uma data válida");
  };

  //format data
  //code here

  //store data
  id++; //id for each countdown
  eventsData.push({id, eventName, eventDate, eventTime});
   
  //create element
  let main = document.getElementById("container");

  let child = document.createElement("div")
  child.setAttribute("class", "event-container")
  /* troll.setAttribute("id", "event-container") */
  child.innerHTML = `        
    <div class="time-container">        
      <strong class="timer">00</strong>         
      <span>Dia</span>
    </div>   

    <div class="time-container">        
      <strong class="timer">00</strong>         
      <span>Hora</span>
    </div>      

    <div class="time-container">        
      <strong class="timer">00</strong>         
      <span>Minuto</span>
    </div>      

    <div class="time-container">        
      <strong class="timer">00</strong>         
      <span>Segundo</span>
    </div>  
  ` 
  main.appendChild(child)
  document.querySelector('.modal-bg').classList.remove('modal-open');
}

function initCount() {
  //retorna um array|htmlcollection
  const outputs = document.getElementsByClassName("timer");
  
  const data = {       
    eventDate: '2021-06-12', 
    time: '10:00'
  }
  
  let [year, month, day] = data.eventDate.split('-');
  let [hour, minute] = data.time.split(':');
  
  month-=1;

  function renderTime(){        
    currentTime = new Date().getTime();            
    eventTime = new Date(year, month, day, hour, minute).getTime();

    diference = eventTime - currentTime;

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

  setInterval(renderTime, 1000);  
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