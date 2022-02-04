// API Keys
const WEATHER_API_KEY = '6acede01c67250672b90e28d885879dd';
const MB_ACCESS_TOKEN = 'pk.eyJ1Ijoic2hlbGx2aW5pIiwiYSI6ImNreXpienA0ZjB6NjIyenRiZGxqemZ1ajAifQ.LlOs0gTr_lC9xHG9HGrvpQ';

// Setting up SearchHistory object.
const searchContainer = new SearchHistory('#search-container');

// Setting up offcanvas component from Bootstrap.
let offcanvasSearches = new bootstrap.Offcanvas(document.querySelector('#searches'));

// Setting up Forecast object.
let forecastObj = new Forecast();

// Loading localStorage.
searchContainer.getLocalStorage();

// Opening Offcanvas.  There was an issue when you just have it open.  
// The backdrop does not fade when toggling to close.  Triggering it using JS to resolve.
offcanvasSearches.toggle();

/**
 * Creates a new Search object, adds it to SearchHistory object, renders Search History and weather.
 * @param {Event} event Event passed by MapBox.  It is not used.  Passed it for scability.
 * @param {{name: string, latitude: float, longitude: float}} selected Object passed by MapboxController.
 */
function onSelectedLocation(event, selected) {
  let search = new Search(selected.name, selected.latitude, selected.longitude);
  searchContainer
    .addSearch(search)
    .render();

  showWeather(search);
}

/**
 * Triggered when a previously searched location is clicked.
 * Takes the Search object and renders the history and weather again.
 * @param {Event} event Event object passed by the EventListener.
 * @returns {void}
 */
function onSearchAgain(event) {
  let el = event.target;
  if(el.dataset.id === undefined) return;

  let search = searchContainer.searchById(el.dataset.id);
  searchContainer.render();
  showWeather(search);
}

/**
 * Takes a Search object and performs the fetch for weather data.
 * Then it renders the weather HTML cards.
 * @param {Search} search 
 */
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

// Setting Mapbox Options
const mbOptions = new MapboxOptions();
mbOptions.accessToken(MB_ACCESS_TOKEN)
  .types(MB_COUNTRY, MB_REGION, MB_PLACE, MB_POSTAL_CODE, MB_LOCALITY, MB_NEIGHBORHOOD);

  // Creating MapboxController object.
const geocode = new MapboxController('#geo-location', mbOptions.toObject);

// Setting the two EventListeners needed.
geocode.onResultsClear(onSelectedLocation);
searchContainer.container.addEventListener('click', onSearchAgain)