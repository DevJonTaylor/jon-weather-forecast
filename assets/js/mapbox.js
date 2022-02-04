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

// Setting the MapBox options
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

/**
 * This class was created to maintain the MapBox SDK.
 * @property {MapboxGeocoder} geocoderObject The Mapbox SDK needed for autocomplete.
 */
class MapboxController {
  /**
   * Sets the access token to the MapboxGeocoder SDK.
   * @param {string} accessToken
   */
  static accessToken(accessToken) {
    mapboxgl.accessToken = accessToken;
  }

  /**
   * @param {string} containerSelector CSS Selector to access the container for the MapBox search box..
   */
  constructor(containerSelector) {
    this.geocoderObject = new MapboxGeocoder(MB_OPTIONS);
    this.geocoderObject.addTo(containerSelector);
  }

  /**
   * A method to set the the needed event handler.  
   * It also clears the search box as it passes an object
   * @param {EventListener<{name: string, latitude: float, longitude: float}>} eventHandler 
   */
  onResultsClear(eventHandler) {
    this.geocoderObject.on('result', event => {
      this.geocoderObject.clear();
      eventHandler.bind(this)(event, {
        name: event.result.place_name,
        latitude: event.result.geometry.coordinates[1],
        longitude: event.result.geometry.coordinates[0],
      });
    })
  }
}