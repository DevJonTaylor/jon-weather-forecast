/**
 * A node for the SearchHistory class.
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

    static loadSearch({id, latitude, longitude, name}) {
      return new Search(name, latitude, longitude, id);
    }
  
    constructor(name, latitude, longitude, id = null) {
      this.id = id === null ? this.generateId() : id;
      this.name = name;
      this.latitude = latitude;
      this.longitude = longitude;
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
  
    get lat() {
      return this.latitude
    }
  
    get lon() {
      return this.longitude;
    }
  
    toHtml() {
      let buttonContainer = Search.html.container
        .replace('$html', Search.html.button)
        .replace('$lat', this.lat)
        .replace('$lon', this.lon)
        .replace('$id', this.id)
        .replace('$name', this.name);
  
      return buttonContainer;
    }
  
    toObject() {
      return {
        id: this.id,
        name: this.name, 
        latitude: this.latitude, 
        longitude: this.longitude
      }
    }
  
    toString() {
      return JSON.stringify(this.toObject());
    }
  }
  
  class SearchHistory {
    constructor(container) {
      this.history = {};
      this.historyArray = [];
      this.container = document.querySelector(container);
    }

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

    setLocalStorage() {
      localStorage.setItem('weather-search', `${this}`);
      
      return this;
    }

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
    }

    toObject() {
      return this.historyArray;
    }

    toString() {
      return JSON.stringify(this.toObject());
    }

    getByIndex(i) {
      return this.historyArray[i];
    }

    getById(id) {
      return this.getByIndex(this.history[id]);
    }

    removeById(id) {
      let search = this.historyArray.splice(this.history[id], 1)[0];
      this.indexSearches();

      return search;
    }

    removeByIndex(i) {
      let search = this.historyArray.splice(i, 1)[0];
      this.indexSearches();

      return search;
    }
  
    addSearch(search) {
      if(this.history.length === 10) this.history.pop();
      this.historyArray.unshift(search);
      return this.indexSearches();
    }

    searchById(id) {
      let search = this.removeById(id);
      this.addSearch(search);

      return search;
    }

    searchByIndex(i) {
      let search = this.removeByIndex(i);
      this.addSearch(search);

      return search;
    }
  
    render() {
      this.container.innerHTML = '';
      for(let search of this.historyArray) {
        this.container.insertAdjacentHTML('beforeend', search.toHtml())
      }
    }
  }