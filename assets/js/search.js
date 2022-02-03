/**
 * A node for the SearchHistory class.
 * @static @property {{container: string, button: string}} html Quick access to the html ensuring it never changes.
 * 
 * @property {string} id An identifier.
 * @property {string} name The name of the search.
 * @property {float} latitude The latitude of the search.
 * @property {float} lat This is shortcut to latitude.
 * @property {float} longitude The longitude of the search.
 * @property {float} lon This is a shortcut to longitude.
 */
 class Search {
    static html = {
      container: `<div class="col-12 my-2">$html</div>`,
      button: `<button class="btn btn-success w-100" data-lat="$lat" data-lon="$lon" data-id="$id">$name</button>`
    }

    /**
     * A factory for Search object when we are loading from localStorage.
     * @param {string} id
     * @param {float} latitude
     * @param {float} longitude
     * @param {string} name
     * @returns {Search}
     */
    static loadSearch({id, latitude, longitude, name}) {
      return new Search(name, latitude, longitude, id);
    }
  
    /**
     * @param {string} name 
     * @param {float} latitude 
     * @param {float} longitude 
     * @param {string} id 
     */
    constructor(name, latitude, longitude, id = null) {
      this.id = id === null ? this.generateId() : id;
      this.name = name;
      this.latitude = latitude;
      this.longitude = longitude;
    }

    /**
     * A simple 5 hex password.
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
     * Shortcut to latitude.
     * @return {float}
     */
    get lat() {
      return this.latitude
    }
  
    /**
     * Shortcut to longitude
     * @return {float}
     */
    get lon() {
      return this.longitude;
    }
  
    /**
     * An HTML string to render the search history button.
     * @returns {string}
     */
    toHtml() {
      let buttonContainer = Search.html.container
        .replace('$html', Search.html.button)
        .replace('$lat', this.lat)
        .replace('$lon', this.lon)
        .replace('$id', this.id)
        .replace('$name', this.name);
  
      return buttonContainer;
    }
  
    /**
     * An object literal for a Search object.
     * @returns {{ id: string, name: string, latitude: float, longitude: float }}
     */
    toObject() {
      return {
        id: this.id,
        name: this.name, 
        latitude: this.latitude, 
        longitude: this.longitude
      }
    }
  
    /**
     * A JSON.stringify version of this object.
     * @returns {string}
     */
    toString() {
      return JSON.stringify(this.toObject());
    }
  }
  
  /**
   * This class handles the iteration and localStorage for the Search buttons.
   * @property {[id:string]: number} history This is historyArray indexed.  Taking the id from Search object.
   * @property {Search[]} historyArray An array of Search objects.
   * @property {HTMLElement} container The container element that controls the Search History visually.
   */
  class SearchHistory {
    /**
     * @param {string} container The CSS Selector for the container element.
     */
    constructor(container) {
      this.history = {};
      this.historyArray = [];
      this.container = document.querySelector(container);
    }

    /**
     * Gets the ID for the Search object and uses it for the key with the array index for fast searches.
     * @returns {this} Chaining purposes.
     */
    indexSearches() {
      let history = {};
      for(let i in this.historyArray) {
        let search = this.historyArray[i];
        history[search.id] = i;
      }

      this.history = history;
      this.setLocalStorage();
      return this;
    }

    /**
     * Gets a serialized string of this object to be stored in localStorage.
     * @returns {this} Chaining purposes.
     */
    setLocalStorage() {
      localStorage.setItem('weather-search', `${this}`);
      
      return this;
    }

    /**
     * Gets the serialized version of this object and loads the Search objects.
     * If it is empty or does not exists it will assign an empty array.
     * @returns {this} Chaining purposes.
     */
    getLocalStorage() {
      let searchHistoryStringify = localStorage.getItem('weather-search');

      if(searchHistoryStringify === null) return this;

      let searchHistory = JSON.parse(searchHistoryStringify);

      for(let i in searchHistory) {
        let search = searchHistory[i];
        this.historyArray[i] = Search.loadSearch(search);
      }

      this.indexSearches();
      this.render();

      return this;
    }

    /**
     * Returns an array with Search objects.
     * @returns {Search[]}
     */
    toObject() {
      return this.historyArray;
    }

    /**
     * A serialized version of this object.
     * @returns {string}
     */
    toString() {
      return JSON.stringify(this.toObject());
    }

    /**
     * Returns the Search object assigned to the index requested.
     * @param {number} i The index you are looking for in the array.
     * @returns {Search}
     */
    getByIndex(i) {
      return this.historyArray[i];
    }

    /**
     * Looks up the index that the Search object is assigned to using the Search object's id.
     * @param {string} id A 5 character hex string.
     * @returns {Search}
     */
    getById(id) {
      return this.getByIndex(this.history[id]);
    }

    /**
     * Looks up the requested Search object, removes it from the array and returns the Search object.
     * @param {string} id A 5 character hex string.
     * @returns {Search}
     */
    removeById(id) {
      let search = this.historyArray.splice(this.history[id], 1)[0];
      this.indexSearches();

      return search;
    }

    /**
     * Looks up the requested Search object, removes it from the array and returns the Search object.
     * @param {number} i The index that the needed Search object is assigned to.
     * @returns {Search}
     */
    removeByIndex(i) {
      let search = this.historyArray.splice(i, 1)[0];
      this.indexSearches();

      return search;
    }
  
    /**
     * Adds a new Search object to the array, updates the indexing object and returns itself.
     * @param {Search} search 
     * @returns {this} Chaining purposes.
     */
    addSearch(search) {
      if(this.history.length === 10) this.history.pop();
      this.historyArray.unshift(search);
      return this.indexSearches();
    }

    /**
     * Finds the requested Search object, adds it to the top of the search, 
     * and returns the Search object.
     * @param {string} id A 5 character hex string.
     * @returns {Search}
     */
    searchById(id) {
      let search = this.removeById(id);
      this.addSearch(search);

      return search;
    }

    /**
     * Finds the requested Search object, adds it to the top of the search,
     * and returns the Search object.
     * @param {number} i Index for the Search object in the array.
     * @returns {Search}
     */
    searchByIndex(i) {
      let search = this.removeByIndex(i);
      this.addSearch(search);

      return search;
    }
  
    /**
     * Updates the HTML that is being displayed.
     * @return {this} Chaining purposes.
     */
    render() {
      this.container.innerHTML = '';
      for(let search of this.historyArray) {
        this.container.insertAdjacentHTML('beforeend', search.toHtml())
      }

      return this;
    }
  }