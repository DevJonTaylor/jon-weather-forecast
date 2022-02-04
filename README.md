# Weather Forecast
![HTML 10.6%](https://img.shields.io/badge/HTML-10.6%25-%23dd4b25?logo=html5&style=plastic)
![CSS 0.5%](https://img.shields.io/badge/CSS-0.5%25-%23146eb0?logo=css3&style=plastic)
![JAVASCRIPT 88.9%](https://img.shields.io/badge/JavaScript-88.9%25-%23e9d44d?logo=javascript&style=plastic)
![Mapbox v2.6.1](https://img.shields.io/badge/Mapbox-v2.6.1-%230769ad?logo=mapbox&style=plastic)
![Bootstrap v5.1.3](https://img.shields.io/badge/Bootstrap-v5.1.3-%238211f9?logo=bootstrap&style=plastic)

Taking a chance to use Bootstrap 5 out for a spin as well as OpenWeatherMap's API.  I created classes to control the create URLs, fetch data, render HTML dynamically, as well as use localStorage to allow search histories to be searched again.  I created a nice responsive UI while utilizing the screen space to the maximum.  I implemented a second API from Mapbox to provide an autocomplete experience while they type out the location.  This worked out really well as it provides the GeoCodes so that we can use OpenWeatherMap's data to the its fullest!

## Goals
- [x] Weather conditions are presented by searched
- [x] Searched locations are added to a history to be reselected
- [x] Data presented is City name, date, icon representation of weather conditions, tempature, humidity, wind speeds, and UVI
- [x] UVI is highlighted based on favorable, moderate, or severe conditions
- [x] Provide a five day forecast conditions.
- [x] five day forecast provides date, icon conditions, temperature, wind speeds, and humidity
- [x] When history is reselected current and future conditions are shown.
- [x] History is saved to localStorage

## Demo
You can find a demo at [GitHub Pages](https://devjontaylor.github.io/jon-weather-forecast/).
## Deployment

The dependencies are for:
- [Bootstrap v5.1.3](https://getbootstrap.com/)
- [Mapbox v2.6.1](https://docs.mapbox.com/)  

A CDN is used so no direct installation or setup needed. You only need an internet connection when opening the page.

### Clone
You can clone the repo using the following command

```bash
git clone https://github.com/DevJonTaylor/jon-weather-forecast.git
```
### Download Zip

1. Go to GitHub [Repository](https://github.com/DevJonTaylor/jon-weather-forecast)
2. Click green Code button
3. Select download zip button at the bottom.

![Code Button](./assets/images/code_button.png)

![Download Zip](./assets/images/download_zip.png)


## Examples

### Search with Autocomplete

![autocomplete](./assets/images/autocomplete.png)

### Responsive Search and Weather
![Responsive Search](./assets/images/responsive_search.png)
![Responsive Weather](./assets/images/responsive_weather.png)

### Search History

![Search History](./assets/images/search_history.png)

## License

[MIT](./LICENSE)