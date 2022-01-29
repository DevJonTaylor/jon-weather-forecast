const geocode = new MapboxController('#geocoder');
geocode.onResultsClear((event, locates) => {
  getWeather(locates.latitude, locates.longitude)
    .then(json => console.log(json))
});

function createURL(latitude, longitude) {
  const WEATHER_APP_ID = '6acede01c67250672b90e28d885879dd';
  let url = [
    'https:/',
    'api.openweathermap.org',
    'data',
    '2.5',
    'onecall'
  ].join('/');

  let params = [
    `?lat=${latitude}`,
    `lon=${longitude}`,
    `appid=${WEATHER_APP_ID}`,
    `lang=en`,
    `exclude=hourly,minutely`,
    `units=imperial`
  ].join('&')

  return `${url}${params}`;
}

async function getWeather(latitude, longitude) {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  const url = createURL(latitude, longitude);

  let response = await fetch(url, requestOptions)
  return await response.json();

}