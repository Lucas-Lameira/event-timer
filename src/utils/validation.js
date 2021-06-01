//esmodules - variaveis não ficam global


//name validation
export const isNameEmpty = (name) => {
  name ? true : false
}

//Date validation
export const isOutOfDate = (date, time) =>  {
  if(date === ''){
    alert('Empty date');
    return true;
  } 
  
  let check = 0;
  
  time = validateTime(time)

  const [year, month, day] = date.split('-');
  const [hour, minute] = time.split(':');
  month-=1;  
      
  const current = new Date().getTime();
  const event = new Date(year, month, day, hour, minute).getTime();

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