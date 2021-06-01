/* const oi ={
 id,
 eventName: "dia legal",
 eventDate: {
  year: 2021,
  month: 05,
  day: 31
 },
 eventTime: {
  hour: 16,
  minute: 51
 }
} */

export const formatDate = (date) => {
  //yyyy-mm-dd
  let [year, month, day] = date.split('-');
}

export const formatTime = (time) => {
  //hh:mm
  let [hour, minute] = time.split(':');
}