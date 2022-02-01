class UrlCreator {
  constructor() {
    this.isSecure = true;
    this.domainParts = [];
    this.uriParts = [];
    this.parameters = {};
  }

  protocol(isSecure) {
    this.isSecure = isSecure;
    return this;
  }

  domain(...args) {
    this.domainParts.push(...args);
    return this;
  }

  uri(...args) {
    this.uriParts.push(...args);
    return this;
  }

  param(key, val) {
    this.parameters[key] = val;
    return this;
  }

  getParams() {
    let keys = Object.keys(this.parameters);
    let vals = Object.values(this.parameters);
    let params = [];

    for(let i in keys) {
      params.push(`${keys[i]}=${vals[i]}`);
    }

    return params.join('&');
  }

  get url() {
    let urlParts = [this.isSecure === true ? 'https://' : 'http://'];
    
    urlParts.push(this.domainParts.join('.'));
    
    if(this.uriParts.length > 0) urlParts.push('/' + this.uriParts.join('/'));
    
    if(Object.keys(this.parameters).length > 0) urlParts.push('?' + this.getParams())

    return urlParts.join('');
  }
}

class WeatherOptions extends UrlCreator {
  constructor(apiKey) {
    super();
    this.domain('api', 'openweathermap', 'org')
      .uri('data', '2.5', 'onecall')
      .param('lang', 'en')
      .param('exclude', 'minutely,hourly,current')
      .param('units', 'imperial')
      .param('appid', apiKey);
  }

  lang(lang) {
    if(lang === undefined) return this.parameters.lang;
    return this.param('lang', lang);
  }

  exclude(toExclude) {
    if(toExclude === undefined) return this.parameters.exclude;
    return this.param('exclude', toExclude);
  }

  units(units) {
    if(units === undefined) return this.parameters.units;
    return this.param('units', units);
  }

  apiKey(apiKey) {
    if(apiKey === undefined) return this.parameters.appid;
    return this.param('appid', apiKey);
  }

  latitude(lat) {
    if(lat === undefined) return this.parameters.lat;
    return this.param('lat', lat);
  }

  lat(lat) {
    return this.latitude(lat);
  }

  longitude(lon) {
    if(lon === undefined) return this.parameters.lon;
    return this.param('lon', lon);
  }

  lon(lon) {
    return this.longitude(lon);
  }
}

class WeatherApi {
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
      obj.location = location;
      let weather = new Weather(obj);
      el.innerHTML = '';
      el.insertAdjacentHTML('beforeend', weather.toHtml());
    }
  }
}