const WEATHER_API_KEY = '6acede01c67250672b90e28d885879dd';
let searchContainer = new SearchHistory('#search-container');
let offcanvasSearches = null;
let forecastObj = new Forecast();

document.onreadystatechange = function(event) {
  if(document.readyState === 'complete') {
    searchContainer.getLocalStorage();
    offcanvasSearches = new bootstrap.Offcanvas(document.querySelector('#searches'));
    offcanvasSearches.toggle();
  }
}

function onSelectedLocation(event, selected) {
  let search = new Search(selected.name, selected.latitude, selected.longitude);
  searchContainer
    .addSearch(search)
    .render();

  showWeather(search);
}

function onSearchAgain(event) {
  let el = event.target;
  if(el.dataset.id === undefined) return;

  let search = searchContainer.searchById(el.dataset.id);
  searchContainer.render();
  showWeather(search);
}

function showWeather(search) {
  let weatherOptions = new WeatherOptions(WEATHER_API_KEY);
  weatherOptions
    .lon(search.longitude)
    .lat(search.latitude);

  let weatherApi = new WeatherApi(weatherOptions);
  
  weatherApi.get()
    .then(json => {
      let daily = json.daily;
      daily.pop();
      
      forecastObj.updateForecast(search.name, daily);
    });

  offcanvasSearches.toggle();
}

searchContainer.container.addEventListener('click', onSearchAgain)

const geocode = new MapboxController('#geo-location');
geocode.onResultsClear(onSelectedLocation);