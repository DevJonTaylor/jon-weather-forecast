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

/**
 * This class was created because of an issue with access token not loading properly into the SDK.
 * @property {{types: string[], autocomplete: boolean, language: string, accessToken: string}}
 */
class MapboxOptions {
  constructor() {
    this.options = {
      types: [],
      autocomplete: true,
      language: 'en',
      accessToken: ''
    }
  }

  /**
   * If no argument is passed it will return a string separating the types with a comma.
   * Other wise it will assign the strings passed as the types and return this for chaining.
   * @param  {...string} type Use one of the constant Mapbox DataTypes created.
   * @returns {this|string}
   */
  types(...type) {
    if(type.length === 0) return this.options.types.join(',');
    this.options.types.push(...type);

    return this;
  }

  /**
   * If no argument is passed this will return the value of autocomplete.
   * Otherwise assigns the new value and returns this object for chaining.
   * @param {boolean} isTrue 
   * @returns {this|boolean}
   */
  autocomplete(isTrue) {
    if(isTrue === undefined) return this.options.autocomplete;
    this.options.autocomplete = isTrue;

    return this;
  }

  /**
   * If no argument is passed returns the value of language.
   * Otherwise it assigns the new value and returns this for chaining.
   * @param {string} langString 
   * @returns {this|string}
   */
  language(langString) {
    if(langString === undefined) return this.options.language;
    this.options.language = langString;

    return this;
  }

  /**
   * If no argument is passed the value from mapboxgl.accessToken is returned.
   * Otherwise the new value is set and this object is returned for chaining.
   * @param {string} accessToken 
   * @returns {this|string}
   */
  accessToken(accessToken) {
    if(accessToken === undefined) return mapboxgl.accessToken;
    mapboxgl.accessToken = accessToken;

    return this;
  }

  /**
   * @return {{types: string[], autocomplete: boolean, language: string, accessToken: string}}
   */
  get toObject() {
    return {
      types: this.types(),
      autocomplete: this.autocomplete(),
      language: this.language(),
      accessToken: mapboxgl.accessToken
    }
  }

  /**
   * @returns {string} Serialized string of this object.
   */
  toString() {
    return JSON.stringify(this.toObject);
  }
}

/**
 * This class was created to maintain the MapBox SDK.
 * @property {MapboxGeocoder} geocoderObject The Mapbox SDK needed for autocomplete.
 */
class MapboxController {
  /**
   * @param {string} containerSelector CSS Selector to access the container for the MapBox search box..
   */
  constructor(containerSelector, mapboxOptions) {
    this.geocoderObject = new MapboxGeocoder(mapboxOptions);
    this.geocoderObject.addTo(document.querySelector(containerSelector));
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