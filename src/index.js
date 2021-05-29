var currentTime;
var eventTime;
var diference;

let dia;
let hora;
let minutos;
let segundos;

let toggleBtn = false;
var intervalId;
/* constructor Date() */
/* year, month, day, hours, minutes, seconds, milliseconds */

let x = new Date();


let id = 0
let countdownListData = [
  {
    id: 0, 
    name: 'nao tem eevento', 
    date: '2020-00-00', 
    time: '00:00'
  }
];

/* MODAL FUNCIONALITY */
document.querySelector('#add-event').addEventListener('click', function(){
  console.log('click')
    document.querySelector('.modal-bg').classList.add('modal-open');
});

document.querySelector('.modal-close').addEventListener('click', function(){
    document.querySelector('.modal-bg').classList.remove('modal-open');
});

/* TOOLTIP FUNCTIONALITY */
document.querySelector('#tooltip').addEventListener('click', function() { 
  document.querySelector('.tooltip-bg').classList.add('modal-open');
  console.log('open')
})

document.querySelector('.close').addEventListener('click', function() {
  document.querySelector('.tooltip-bg').classList.remove('modal-open');
  console.log('close')
});



/* CLOSE MODAL */
document.querySelector('.modal-bg').classList.remove('modal-open');

/* REGISTER FUNCTION */
function registerNewEvent () {

  //Get values from user iput
  let eventName = document.getElementById('input-event-name').value;
  let eventDate = document.getElementById('input-event-date').value;
  let eventTime = document.getElementById('input-event-time').value;

  id +=1;
  countdownListData.push({
    id,
    eventName,
    eventDate,
    eventTime,
  })
      
  //Create Element
  document.getElementById('main-container').innerHTML = `
    <section class="event-block" id="${id}">             
    <div class="event-header">
      <h1>${eventName}</h1>
      <div class="img-group">
        <img src="./assets/edit.svg" alt="">
        <img src="./assets/trash-2.svg" alt="">                
      </div>                
    </div> 
    
    <div class="event-section">
      <div class="event-info">
        <div class="date-info">
          <strong>Data do evento</strong>
          <p>${eventDate}</p>
        </div>
        <div class="time-info">
          <strong>As:</strong>
          <p>${eventTime} - hrs</p>
        </div>              
      </div>

      <button 
        class="start-btn" 
        value="${id}"
        onClick="countDown(this.value)">Start</button>
        
        <div class="countdown-timer">
            <table>
                <tr>
                  <th>Dia</th>
                  <th>Hora</th>
                  <th>Min</th>
                  <th>Sec</th>
                </tr>
                <tr>
                  <td>00</td>
                  <td>00</td>
                  <td>00</td>
                  <td>00</td>
                </tr>
            </table>
        </div>
    </div>        
</section> 
`
}


function countDown(passedId) {  
  
  const data = countdownListData.find(element => element.id === passedId);
  
  if(data === undefined) return alert("There is nothing here")
  
  if (!toggleBtn) {
    document.querySelector(data.id).innerHTML = 'Stop';
    toggleBtn = true;
    
    let [year, month, day] = data.date.split('-');
    let [hour, minute] = data.time.split(':');
    
    /* Janeiro ta na posição zero do array */
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

      hora = hora < 10 ? "0" + hora: hora; 
      minutos = minutos < 10 ? "0" + minutos: minutos; 
      segundos = segundos < 10 ? "0" + segundos: segundos; 
      
      coutdownelemtn[0].innerHTML = dia
      coutdownelemtn[1].innerHTML = hora
      coutdownelemtn[2].innerHTML = minutos
      coutdownelemtn[3].innerHTML = segundos
    }

    intervalId = setInterval(renderTime, 1000);

  } else {
    document.querySelector(`button#${idontknow[passedId].event}`).innerHTML = 'Start';
    toggleBtn = false;
    clearInterval(intervalId)
  }
    
}
