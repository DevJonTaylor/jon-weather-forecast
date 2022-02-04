/**
 * Created this to properly control the URL needed to make a call.
 * @property {boolean} isSecure Used to check if we use http or https.
 * @property {string[]} domainParts An array used to contain the sub, main, and top level domain parts.
 * @property {string[]} uriParts An array used to contain the path of the URL after the domain.
 * @property {object} parameters This literal object is used to create the query string.  
 */
class UrlCreator {
  constructor() {
    this.isSecure = true;
    this.domainParts = [];
    this.uriParts = [];
    this.parameters = {};
  }

  /**
   * If no argument is passed then it will return the current protocol as a string.
   * If a boolean is passed it will assign it to the isSecure property and return itself.
   * @param {boolean|undefined} isSecure 
   * @returns {this|string} Returning itself for chaining.
   */
  protocol(isSecure) {
    if(isSecure === undefined) return this.isSecure === true ? 'https://' : 'http://';
    this.isSecure = isSecure;
    return this;
  }

  /**
   * If no argument is passed it will return the domain as a string.
   * Takes the arguments and pushes them to the domainParts.  Returns itself.
   * @param  {...string} args 
   * @returns {this|string}
   */
  domain(...args) {
    if(args === undefined) return this.domainParts.join('.');
    this.domainParts.push(...args);
    return this;
  }

  /**
   * If no argument is passed it will return the uri as a string.
   * Takes arguments passed and pushes them to uriParts.  Returns itself.
   * @param  {...string} args 
   * @returns {this|string}
   */
  uri(...args) {
    if(args === undefined) return this.uriParts.join('/');
    this.uriParts.push(...args);
    return this;
  }

  /**
   * Adds the key to the object if it is not present and assigns the value to it.
   * If the key already exists then it replaces the value.
   * @param {string} key 
   * @param {string} val 
   * @returns {this}
   */
  param(key, val) {
    this.parameters[key] = val;
    return this;
  }

  /**
   * Takes the current parameters and return them as a query string.
   * @return {string}
   */
  getParams() {
    let keys = Object.keys(this.parameters);
    let vals = Object.values(this.parameters);
    let params = [];

    for(let i in keys) {
      params.push(`${keys[i]}=${vals[i]}`);
    }

    return params.join('&');
  }

  /**
   * Returns the entire url as one.
   * @return {string}
   */
  get url() {
    let urlParts = [this.isSecure === true ? 'https://' : 'http://'];
    
    urlParts.push(this.domainParts.join('.'));
    
    if(this.uriParts.length > 0) urlParts.push('/' + this.uriParts.join('/'));
    
    if(Object.keys(this.parameters).length > 0) urlParts.push('?' + this.getParams())

    return urlParts.join('');
  }
}

/**
 * This class was created to manipulate the OpenWeatherMap API One Call.
 * @extends {UrlCreator} 
 */
class WeatherOptions extends UrlCreator {
  /**
   * Takes the OpenWeatherApi API key.
   * @param {string} apiKey 
   */
  constructor(apiKey) {
    super();
    this.domain('api', 'openweathermap', 'org')
      .uri('data', '2.5', 'onecall')
      .lang('en')
      .exclude('minutely', 'hourly', 'current')
      .units('imperial')
      .apiKey(apiKey);
  }

  /**
   * If no argument is passed it returns the value for lang parameter.
   * The lang argument is used to update the lang parameter then returns itself for chaining.
   * @param {string|undefined} lang 
   * @returns {this|string} 
   */
  lang(lang) {
    if(lang === undefined) return this.parameters.lang;
    return this.param('lang', lang);
  }

  /**
   * If no argument is passed it returns the value for exclude.
   * Updates the exclude parameter.  Takes all the arguments and joins them with ','.
   * @param {string|undefined} toExclude 
   * @returns {string|this}
   */
  exclude(...toExclude) {
    if(toExclude === undefined) return this.parameters.exclude;
    return this.param('exclude', toExclude.join(','));
  }

  /**
   * If no argument is passed it returns the units value.
   * Updates the units value and returns itself for chaining.
   * @param {string} units
   * @returns {string|this}
   */
  units(units) {
    if(units === undefined) return this.parameters.units;
    return this.param('units', units);
  }

  /**
   * If no argument is passed it returns the appid value.
   * Updates the appid parameter and returns itself for chaining.
   * @param {string} apiKey 
   * @returns {this|string}
   */
  apiKey(apiKey) {
    if(apiKey === undefined) return this.parameters.appid;
    return this.param('appid', apiKey);
  }

  /**
   * If no argument is passed it returns the latitude value.
   * Sets the value for lat in the parameters.
   * @param {string} lat 
   * @returns {this|string}
   */
  latitude(lat) {
    if(lat === undefined) return this.parameters.lat;
    return this.param('lat', lat);
  }

  /**
   * If no argument is passed it returns the latitude value.
   * Sets the value for lat in the parameters.
   * @param {string} lat 
   * @returns {this|string}
   */
  lat(lat) {
    return this.latitude(lat);
  }

  /**
   * If no argument is passed it returns the longitude value.
   * Sets the value for lon in the parameters.
   * @param {string} lon
   * @returns {this|string}
   */
  longitude(lon) {
    if(lon === undefined) return this.parameters.lon;
    return this.param('lon', lon);
  }

  /**
   * If no argument is passed it returns the longitude value.
   * Sets the value for lon in the parameters.
   * @param {string} lon
   * @returns {this|string}
   */
  lon(lon) {
    return this.longitude(lon);
  }
}

/**
 * This class was created to control the calls being made to OpenWeatherMap's API.
 * @property {WeatherOptions} options
 */
class WeatherApi {

  /**
   * @param {WeatherOptions} weatherOptions 
   */
  constructor(weatherOptions) {
    this.options = weatherOptions;
  }

  /**
   * Performs the fetch and returns a JSON object.
   * @returns Promise<object>
   */
  async get() {
    let response = await fetch(this.options.url);
    let json = await response.json();

    return json;
  }
}

/**
 * This class was created to handle Weather data to html.
 * @static @property {string} card An html string with keywords to be replaced.
 * @static @property {string} title An html string with keywords to be replaced.
 * @static @property {string} location An html string with keywords to be replaced.
 * @static @property {string} date An html string with keywords to be replaced.
 * @static @property {string} icon An html string with keywords to be replaced.
 * @static @property {string} tempature An html string with keywords to be replaced.
 * @static @property {string} wind An html string with keywords to be replaced.
 * @static @property {string} humidity An html string with keywords to be replaced.
 * @static @property {string} uvi An html string with keywords to be replaced.
 * 
 * @property {string} id This is used to quickly located the container card element and make adjustments.
 * @property {string} location Representation of where we are looking.
 * @property {string} date Using the Date object's toLocaleDateString we create the date.
 * @property {number} tempature Tempature in fahrenheit.
 * @property {number} humidity Percentage measurement of Humidity.
 * @property {number} wind Wind speed in miles per hour(MPH)
 * @property {number} uvi The measurement of UV Index.
 * @property {string} icon the variable used to complete the url for the weather icon.
 * @property {boolean} isLocation Is this a current date, if so then present location.
 * @property {boolean} isDateRound Is this a current date, if so then present date with prarentheses.
 */ 
class Weather {
  
  static html = {
    card: `<div class="card mt-3$notToday" data-id="$id"><div class="card-body">$title$temp$wind$humidity$uvi</div></div>`,
    title: `<h3 class="card-title">$location$date $icon</h3>`,
    location: `<span class="location">$text</span>`,
    date: `<span class="date">$text</span>`,
    icon: `<span class="weather-icon"><img src="//openweathermap.org/img/wn/$icon@2x.png" /></span>`,
    tempature: `<p>Temp: <span class="temp">$text</span> ºF</p>`,
    wind: `<p>Wind: <span class="wind">$text</span> MPH</p>`,
    humidity: `<p>Humidity: <span class="humidity">$text</span>%</p>`,
    uvi: `<p>UV Index: <span class="uvi badge $uviColor>$text</span></p>`
  }

  /**
   * @param {weatherObj} weatherObj This is the JSON converted to a literal object from the OpenWeatherMap.
   */
  constructor(weatherObj) {
    this.id = this.generateId();
    this.location = weatherObj.location;
    this.date = new Date(weatherObj.dt * 1000)
      .toLocaleDateString('en-US', {month:'2-digit', day:'2-digit', year:'numeric'});
    this.tempature = weatherObj.temp.day;
    this.humidity = weatherObj.humidity;
    this.wind = weatherObj.wind_speed;
    this.uvi = weatherObj.uvi;
    this.icon = weatherObj.weather[0].icon;

    this.isLocation = this.isToday;
    this.isDateRound = this.isToday;
  }

  /**
   * @return {boolean} Is the date today?
   */
  get isToday() {
    return this.date === new Date().toLocaleDateString('en-US', {month:'2-digit', day:'2-digit', year:'numeric'})
  }

  /**
   * A 5 hex password.
   * @returns {string}
   */
  generateId() {
    let characters = '123456790abcdef';
    let id = [];

    const randomCharacter = () => {
      let min = 0;
      let max = characters.length;
      return characters[Math.floor(Math.random() * (max - min) + min)];
    }

    for(let i = 0; i < 10; i++) {
      id.push(randomCharacter());
    }

    return id.sort(() => Math.random() - .5).join('');
  }

  /**
   * If regex is empty then it will return the html without running the replace method.
   * If value is empty it will replace using the variableName for this object.
   * If all arguments are passed then it will get the html string from the static object
   * and replace the regex found with the value.
   * @param {string} variableName The variable name to get from the static object's property html.
   * @param {string|null} regex The keyword to find and replace.
   * @param {string|null} value The value to replace regex with.
   * @returns {string}
   */
  getHtml(variableName, regex = null, value = null) {
    let html = Weather.html[variableName];
    return regex === null ? html : html.replace(regex, value === null ? this[variableName] : value);
  }

  /**
   * returns an array of two strings.  Find and replace.
   * @returns {string[]}
   */
  getLocationHtml() {
    if(this.isLocation === false) return ['$location', ''];
    
    return ['$location', this.getHtml('location', '$text')]
  }

  /**
   * returns an array of two strings.  Find and replace.
   * @returns {string[]}
   */
  getDateHtml() {
    let date = '';
    if(this.isToday) date = ` (${this.getHtml('date', '$text')})`;
    else date = this.getHtml('date', '$text');

    return ['$date', date];
  }

  /**
   * returns an array of two strings.  Find and replace.
   * @returns {string[]}
   */
  getIconHtml() {
    return ['$icon', this.getHtml('icon', '$icon')]
  }

  /**
   * returns an array of two strings.  Find and replace.
   * @param {string[]} $location An array with two strings.  Find and replace.
   * @param {string[]} $date An array with two strings.  Find and replace.
   * @param {string[]} $icon An array with two strings.  Find and replace.
   * @returns {string[]}
   */
  getTitleHtml($location, $date, $icon) {
    return ['$title', this.getHtml('title')
      .replace(...$location)
      .replace(...$date)
      .replace(...$icon)];
  }

  /**
   * Returns a string containing the classes and attributes for UVI.
   * @returns {string}
   */
  getUviColor() {
    if(this.uvi < 3) return 'bg-success" data-bs-toggle="tooltip" data-bs-placement="right" title="UV is at a low level."';
    if(this.uvi < 6) return 'bg-warning" data-bs-toggle="tooltip" data-bs-placement="right" title="UV is at a moderate level."';
    return 'bg-danger pointer" data-bs-toggle="tooltip" data-bs-placement="right" title="UV is at a high level."';
  }

  /**
   * Returns the HTML String for the card and children that go inside.
   * @returns {string}
   */
  toHtml() {
    let $location = this.getLocationHtml();
    let $date = this.getDateHtml();
    let $icon = this.getIconHtml();
    let $title = this.getTitleHtml($location, $date, $icon);
    let $temp = ['$temp', this.getHtml('tempature', '$text')];
    let $wind = ['$wind', this.getHtml('wind', '$text')];
    let $humidity = ['$humidity', this.getHtml('humidity', '$text')]
    let $uvi = ['$uvi', this.isToday ? this.getHtml('uvi', '$text').replace('$uviColor', this.getUviColor()) : ''];

    return Weather.html.card
      .replace(...$title)
      .replace(...$temp)
      .replace(...$wind)
      .replace(...$humidity)
      .replace(...$uvi)
      .replace('$id', this.id)
      .replace('$notToday', this.isToday === true ? ' text-white bg-secondary' : ' text-white bg-dark');
  }
}

/**
 * The class controls the elements needed to update the weather cards.
 */
class Forecast {
  constructor() {
    this.container = document.querySelector('#forecast');
  }

  /**
   * Creates the Weather object to render the cards needed.
   * @param {string} location The location that is being searched.
   * @param {HTMLElement[]} forecast An Array or NodeContainer that will allow you to 
   * iterate through the elements.
   */
  updateForecast(location, forecast) {
    let forecastEl = this.container.querySelectorAll('article');
    for(let i in forecast) {
      let obj = forecast[i];
      let el = forecastEl[i];
      if(el === undefined) break;
      obj.location = location;
      let weather = new Weather(obj);
      el.innerHTML = '';
      el.insertAdjacentHTML('beforeend', weather.toHtml());
    }
  }
}