// Access Token
const MB_ACCESS_TOKEN = accessToken = 'pk.eyJ1Ijoic2hlbGx2aW5pIiwiYSI6ImNreXpienA0ZjB6NjIyenRiZGxqemZ1ajAifQ.LlOs0gTr_lC9xHG9HGrvpQ';

// Mapbox data-types.
const MB_COUNTRY = 'country';
const MB_REGION = 'region';
const MB_POSTAL_CODE = 'postcode';
const MB_DISTRICT = 'district';
const MB_PLACE = 'place';
const MB_LOCALITY = 'locality';
const MB_NEIGHBORHOOD = 'neighborhood';
const MB_ADDRESS = 'address';
const MB_POINTS_OF_INTEREST = 'poi';


mapboxgl.accessToken = MB_ACCESS_TOKEN;
const MB_OPTIONS = {
  accessToken: mapboxgl.accessToken,
  types: [
    MB_COUNTRY,
    MB_REGION,
    MB_PLACE,
    MB_POSTAL_CODE,
    MB_LOCALITY,
    MB_NEIGHBORHOOD
  ].join(','),
  autocomplete: true,
  language: 'en'
}

class MapboxController {
  constructor(containerSelector, options = {}) {
    this.container = document.querySelector(containerSelector);
    this.geocoderObject = new MapboxGeocoder(MB_OPTIONS);
    this.geocoderObject.addTo(containerSelector);
  }

  onResultsClear(eventHandler) {
    this.geocoderObject.on('result', event => {
      this.geocoderObject.clear();
      eventHandler.bind(this)(event, {
        latitude: event.result.geometry.coordinates[1],
        longitude: event.result.geometry.coordinates[0],
      });
    })
  }

  onClear(eventHandler) {
    this.geocoderObject.on('results', eventHandler.bind(this));

  }
}