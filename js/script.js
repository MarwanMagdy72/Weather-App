async function search(a) {
  let t = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${a}&days=3`
  );
  if (t.ok && 400 != t.status) {
    let a = await t.json();
    displayCurrent(a.location, a.current),
      displayAnother(a.forecast.forecastday);
  }
}
document.getElementById("search").addEventListener("keyup", (a) => {
  search(a.target.value);
});
var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
function displayCurrent(a, t) {
  if (null != t) {
    var e = new Date(t.last_updated.replace(" ", "T"));
    let todayContent = `
        <div class="today    me-3 col-md-4 col-sm-12  rounded   mb-1  px-3">
            <div class="today-header pt-2 rounded " >
                <p>${days[e.getDay()]}</p>
                <p>${e.getDate() + monthNames[e.getMonth()]}</p>
            </div>
            <div class="today-details ms-4 mt-3 text-center ">
                <p id="governorate" > ${a.name} </p>
                <h1 id="weather-degree"  class='mb-5'>
                ${t.temp_c}<sup>o</sup>C

                </h1>
                <p  class="text-primary ">${t.condition.text}</p>
                
                <ul class="d-flex justify-content-evenly mt-5">
                    <li><i class="fa-solid fa-umbrella"></i>20%</li>
                    <li><i class="fa-solid fa-wind"></i>18km/h</li>
                    <li><i class="fa-solid fa-earth-africa"></i>East</li>
                </ul>
            </div>

        </div>


        `;
    document.getElementById("weather-content").innerHTML = todayContent;
  }
}
function displayAnother(a) {
  let t = "";
  for (let e = 1; e < a.length; e++)
    t += `
   
    
    <div class="tomorrow col-md-4 col-sm-12 my-1   rounded me-3 px-5 ">
    <div class="tomorrow-header pt-2 rounded">
        <p>${days[new Date(a[e].date.replace(" ", "T")).getDay()]}</p>
    </div>
    <div class="tomorrow-details text-center mt-3">
        <img src="https:${a[e].day.condition.icon}" alt="" class="mb-4">

        <h4 id="max" class="text-white fw-bolder">${
          a[e].day.maxtemp_c
        }<sup>o</sup>C</h4>
        <p id="min"> <small>${a[e].day.mintemp_c}<sup>o</sup></small></p>
        <p class="text-primary mt-5">${a[e].day.condition.text}</p>
        <ul class="d-flex justify-content-evenly text-light">
        <li><i class="fa-solid fa-umbrella"></i>23%</li>
        <li><i class="fa-solid fa-wind"></i>25km/h</li>
        <li><i class="fa-solid fa-earth-africa"></i>East</li>
    </ul>


    </div>
</div>
    
    `;
  document.getElementById("weather-content").innerHTML += t;
}
search("tanta");
