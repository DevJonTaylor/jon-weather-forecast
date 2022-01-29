const geocode = new MapboxController('#geo-location');
geocode.onResultsClear(onSelectedLocation);

function onSelectedLocation(event, selected) {
  console.log(selected.name)
  getWeatherData(selected.latitude, selected.longitude)
    .then(json => console.log(json))
}

function addSearchHistory(selectedObject) {
  let lat = selectedObject.latitude;
  let lon = selectedObject.longitude;
  let name = selectedObject.name;
  document.querySelector('#geo-location')
    .insertAdjacentHTML('beforeend',
      `<button class='btn btn-dark' data-lat="${}">${selectedObject.name}</button>`)
}

