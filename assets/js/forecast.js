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

  
  async get() {
    let response = await fetch(this.options.url);
    let json = await response.json();

    return json;
  }
}

class Weather {
  static html = {
    card: `<div class="card mt-3$notToday" data-id="$id"><div class="card-body">$title$temp$wind$humidity$uvi</div></div>`,
    title: `<h3 class="card-title">$location$date $icon</h3>`,
    location: `<span class="location">$text</span>`,
    date: `<span class="date">$text</span>`,
    icon: `<span class="weather-icon"><img src="http://openweathermap.org/img/wn/$icon@2x.png" /></span>`,
    tempature: `<p>Temp: <span class="temp">$text</span> ºF</p>`,
    wind: `<p>Wind: <span class="wind">$text</span> MPH</p>`,
    humidity: `<p>Humidity: <span class="humidity">$text</span>%</p>`,
    uvi: `<p>UV Index: <span class="uvi badge $uviColor>$text</span></p>`
  }

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

  get isToday() {
    return this.date === new Date().toLocaleDateString('en-US', {month:'2-digit', day:'2-digit', year:'numeric'})
  }

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

  getHtml(variableName, regex = null, value = null) {
    let html = Weather.html[variableName];
    return regex === null ? html : html.replace(regex, value === null ? this[variableName] : value);
  }

  getLocationHtml() {
    if(this.isLocation === false) return ['$location', ''];
    
    return ['$location', this.getHtml('location', '$text')]
  }

  getDateHtml() {
    let date = '';
    if(this.isToday) date = ` (${this.getHtml('date', '$text')})`;
    else date = this.getHtml('date', '$text');

    return ['$date', date];
  }

  getIconHtml() {
    return ['$icon', this.getHtml('icon', '$icon')]
  }

  getTitleHtml($location, $date, $icon) {
    return ['$title', this.getHtml('title')
      .replace(...$location)
      .replace(...$date)
      .replace(...$icon)];
  }

  getUviColor() {
    if(this.uvi < 3) return 'bg-success" data-bs-toggle="tooltip" data-bs-placement="right" title="UV is at a low level."';
    if(this.uvi < 6) return 'bg-warning" data-bs-toggle="tooltip" data-bs-placement="right" title="UV is at a moderate level."';
    return 'bg-danger pointer" data-bs-toggle="tooltip" data-bs-placement="right" title="UV is at a high level."';
  }

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

class Forecast {
  constructor() {
    this.container = document.querySelector('#forecast');
  }

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