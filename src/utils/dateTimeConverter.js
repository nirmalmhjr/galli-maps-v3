import NepaliDate from "nepali-datetime";

export function formatTime(isoString, value = "date") {
  const date = new Date(isoString);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  // The hour '0' should be '12' const minutesStr = minutes < 10 ? '0' + minutes : minutes;

  // for Date
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  const formattedMinutes =
    minutes == 0 ? "" : minutes < 10 ? `0${minutes}` : minutes;

  // const formattedTime = hours + " " + ampm;
  const formattedTime = hours + ":" + formattedMinutes + " " + ampm;
  // const formattedDate = year + "/" + month + "/" + day;

  const nepaliDate = new NepaliDate(date).format("YYYY/MM/DD");

  // return value === "date" ? formattedDate : formattedTime;
  return value === "date" ? nepaliDate : formattedTime;
}
