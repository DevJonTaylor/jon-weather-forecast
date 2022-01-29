const WEATHER_APP_ID = '6acede01c67250672b90e28d885879dd';

async function getWeatherData(latitude, longitude) {
  const endpoint = `https://api.openweathermap.org/data/2.5/onecall?`;
  const arguments = {
    lat: latitude,
    lon: longitude,
    appid: WEATHER_APP_ID,
    lang: 'en',
    exclude: 'minutely',
    units: 'imperial'
  }
  const query = [];
  const paramKeys = Object.keys(arguments);
  const paramValues = Object.values(arguments);

  for(let i in paramKeys) {
    query.push(`${paramKeys[i]}=${paramValues[i]}`);
  }

  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  let response = await fetch(`${endpoint}${query.join('&')}`, requestOptions);

  return await response.json();
}


let testData = {
  "lat": 30.53,
  "lon": -97.69,
  "timezone": "America/Chicago",
  "timezone_offset": -21600,
  "current": {
    "dt": 1643485613,
    "sunrise": 1643462612,
    "sunset": 1643501045,
    "temp": 64.08,
    "feels_like": 61.41,
    "pressure": 1026,
    "humidity": 26,
    "dew_point": 28.94,
    "uvi": 3.29,
    "clouds": 0,
    "visibility": 10000,
    "wind_speed": 1.99,
    "wind_deg": 198,
    "wind_gust": 10,
    "weather": [
      {
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01d"
      }
    ]
  },
  "hourly": [
    {
      "dt": 1643482800,
      "temp": 63.3,
      "feels_like": 60.51,
      "pressure": 1026,
      "humidity": 25,
      "dew_point": 27.52,
      "uvi": 4.05,
      "clouds": 1,
      "visibility": 10000,
      "wind_speed": 8.14,
      "wind_deg": 232,
      "wind_gust": 10.36,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1643486400,
      "temp": 64.08,
      "feels_like": 61.41,
      "pressure": 1026,
      "humidity": 26,
      "dew_point": 28.94,
      "uvi": 3.29,
      "clouds": 0,
      "visibility": 10000,
      "wind_speed": 7.85,
      "wind_deg": 230,
      "wind_gust": 10.38,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1643490000,
      "temp": 63.88,
      "feels_like": 61.14,
      "pressure": 1026,
      "humidity": 25,
      "dew_point": 27.95,
      "uvi": 2.06,
      "clouds": 6,
      "visibility": 10000,
      "wind_speed": 8.01,
      "wind_deg": 226,
      "wind_gust": 10.67,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1643493600,
      "temp": 63.7,
      "feels_like": 60.89,
      "pressure": 1025,
      "humidity": 24,
      "dew_point": 26.92,
      "uvi": 0.9,
      "clouds": 17,
      "visibility": 10000,
      "wind_speed": 8.66,
      "wind_deg": 221,
      "wind_gust": 11.14,
      "weather": [
        {
          "id": 801,
          "main": "Clouds",
          "description": "few clouds",
          "icon": "02d"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1643497200,
      "temp": 62.71,
      "feels_like": 59.81,
      "pressure": 1024,
      "humidity": 24,
      "dew_point": 26.19,
      "uvi": 0.23,
      "clouds": 22,
      "visibility": 10000,
      "wind_speed": 7.83,
      "wind_deg": 214,
      "wind_gust": 11.54,
      "weather": [
        {
          "id": 801,
          "main": "Clouds",
          "description": "few clouds",
          "icon": "02d"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1643500800,
      "temp": 57.43,
      "feels_like": 54.19,
      "pressure": 1024,
      "humidity": 28,
      "dew_point": 25.47,
      "uvi": 0,
      "clouds": 27,
      "visibility": 10000,
      "wind_speed": 7.65,
      "wind_deg": 195,
      "wind_gust": 9.4,
      "weather": [
        {
          "id": 802,
          "main": "Clouds",
          "description": "scattered clouds",
          "icon": "03d"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1643504400,
      "temp": 53.44,
      "feels_like": 49.95,
      "pressure": 1023,
      "humidity": 31,
      "dew_point": 23.04,
      "uvi": 0,
      "clouds": 27,
      "visibility": 10000,
      "wind_speed": 8.9,
      "wind_deg": 183,
      "wind_gust": 14,
      "weather": [
        {
          "id": 802,
          "main": "Clouds",
          "description": "scattered clouds",
          "icon": "03n"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1643508000,
      "temp": 51.84,
      "feels_like": 48.27,
      "pressure": 1023,
      "humidity": 33,
      "dew_point": 23.23,
      "uvi": 0,
      "clouds": 23,
      "visibility": 10000,
      "wind_speed": 9.48,
      "wind_deg": 190,
      "wind_gust": 18.12,
      "weather": [
        {
          "id": 801,
          "main": "Clouds",
          "description": "few clouds",
          "icon": "02n"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1643511600,
      "temp": 50.81,
      "feels_like": 47.14,
      "pressure": 1024,
      "humidity": 33,
      "dew_point": 22.78,
      "uvi": 0,
      "clouds": 46,
      "visibility": 10000,
      "wind_speed": 9.69,
      "wind_deg": 201,
      "wind_gust": 20.36,
      "weather": [
        {
          "id": 802,
          "main": "Clouds",
          "description": "scattered clouds",
          "icon": "03n"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1643515200,
      "temp": 50.49,
      "feels_like": 46.78,
      "pressure": 1024,
      "humidity": 33,
      "dew_point": 21.92,
      "uvi": 0,
      "clouds": 59,
      "visibility": 10000,
      "wind_speed": 10.6,
      "wind_deg": 211,
      "wind_gust": 25.28,
      "weather": [
        {
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04n"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1643518800,
      "temp": 49.71,
      "feels_like": 45.57,
      "pressure": 1024,
      "humidity": 32,
      "dew_point": 21.2,
      "uvi": 0,
      "clouds": 67,
      "visibility": 10000,
      "wind_speed": 10.33,
      "wind_deg": 214,
      "wind_gust": 23.67,
      "weather": [
        {
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04n"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1643522400,
      "temp": 48.81,
      "feels_like": 44.58,
      "pressure": 1023,
      "humidity": 33,
      "dew_point": 20.79,
      "uvi": 0,
      "clouds": 73,
      "visibility": 10000,
      "wind_speed": 9.93,
      "wind_deg": 217,
      "wind_gust": 24.32,
      "weather": [
        {
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04n"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1643526000,
      "temp": 46.99,
      "feels_like": 42.73,
      "pressure": 1023,
      "humidity": 35,
      "dew_point": 20.43,
      "uvi": 0,
      "clouds": 11,
      "visibility": 10000,
      "wind_speed": 8.88,
      "wind_deg": 219,
      "wind_gust": 19.73,
      "weather": [
        {
          "id": 801,
          "main": "Clouds",
          "description": "few clouds",
          "icon": "02n"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1643529600,
      "temp": 46.18,
      "feels_like": 41.36,
      "pressure": 1023,
      "humidity": 36,
      "dew_point": 20.46,
      "uvi": 0,
      "clouds": 18,
      "visibility": 10000,
      "wind_speed": 9.86,
      "wind_deg": 217,
      "wind_gust": 23.6,
      "weather": [
        {
          "id": 801,
          "main": "Clouds",
          "description": "few clouds",
          "icon": "02n"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1643533200,
      "temp": 45.34,
      "feels_like": 40.51,
      "pressure": 1023,
      "humidity": 38,
      "dew_point": 21.22,
      "uvi": 0,
      "clouds": 14,
      "visibility": 10000,
      "wind_speed": 9.35,
      "wind_deg": 213,
      "wind_gust": 21.3,
      "weather": [
        {
          "id": 801,
          "main": "Clouds",
          "description": "few clouds",
          "icon": "02n"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1643536800,
      "temp": 44.62,
      "feels_like": 39.92,
      "pressure": 1022,
      "humidity": 41,
      "dew_point": 22.55,
      "uvi": 0,
      "clouds": 10,
      "visibility": 10000,
      "wind_speed": 8.66,
      "wind_deg": 217,
      "wind_gust": 17.76,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01n"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1643540400,
      "temp": 43.77,
      "feels_like": 39.02,
      "pressure": 1022,
      "humidity": 44,
      "dew_point": 23.11,
      "uvi": 0,
      "clouds": 8,
      "visibility": 10000,
      "wind_speed": 8.34,
      "wind_deg": 221,
      "wind_gust": 15.82,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01n"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1643544000,
      "temp": 43.27,
      "feels_like": 38.3,
      "pressure": 1022,
      "humidity": 45,
      "dew_point": 23.31,
      "uvi": 0,
      "clouds": 7,
      "visibility": 10000,
      "wind_speed": 8.59,
      "wind_deg": 223,
      "wind_gust": 16.42,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01n"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1643547600,
      "temp": 42.8,
      "feels_like": 37.92,
      "pressure": 1022,
      "humidity": 46,
      "dew_point": 23.59,
      "uvi": 0,
      "clouds": 0,
      "visibility": 10000,
      "wind_speed": 8.16,
      "wind_deg": 221,
      "wind_gust": 14.29,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01n"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1643551200,
      "temp": 43.65,
      "feels_like": 38.88,
      "pressure": 1023,
      "humidity": 47,
      "dew_point": 24.73,
      "uvi": 0.21,
      "clouds": 2,
      "visibility": 10000,
      "wind_speed": 8.32,
      "wind_deg": 221,
      "wind_gust": 20.11,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1643554800,
      "temp": 48.81,
      "feels_like": 44.55,
      "pressure": 1023,
      "humidity": 41,
      "dew_point": 26.17,
      "uvi": 0.83,
      "clouds": 3,
      "visibility": 10000,
      "wind_speed": 10.07,
      "wind_deg": 214,
      "wind_gust": 20.69,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1643558400,
      "temp": 53.62,
      "feels_like": 50.41,
      "pressure": 1023,
      "humidity": 37,
      "dew_point": 27.9,
      "uvi": 1.86,
      "clouds": 4,
      "visibility": 10000,
      "wind_speed": 12.06,
      "wind_deg": 212,
      "wind_gust": 19.53,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1643562000,
      "temp": 57.56,
      "feels_like": 54.72,
      "pressure": 1022,
      "humidity": 36,
      "dew_point": 30.63,
      "uvi": 2.99,
      "clouds": 8,
      "visibility": 10000,
      "wind_speed": 12.44,
      "wind_deg": 202,
      "wind_gust": 18.14,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1643565600,
      "temp": 60.87,
      "feels_like": 58.3,
      "pressure": 1021,
      "humidity": 35,
      "dew_point": 32.95,
      "uvi": 3.74,
      "clouds": 16,
      "visibility": 10000,
      "wind_speed": 12.97,
      "wind_deg": 200,
      "wind_gust": 16.98,
      "weather": [
        {
          "id": 801,
          "main": "Clouds",
          "description": "few clouds",
          "icon": "02d"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1643569200,
      "temp": 63.18,
      "feels_like": 60.8,
      "pressure": 1020,
      "humidity": 34,
      "dew_point": 34.74,
      "uvi": 3.85,
      "clouds": 74,
      "visibility": 10000,
      "wind_speed": 13.62,
      "wind_deg": 194,
      "wind_gust": 16.75,
      "weather": [
        {
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04d"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1643572800,
      "temp": 64.63,
      "feels_like": 62.44,
      "pressure": 1018,
      "humidity": 35,
      "dew_point": 36.48,
      "uvi": 3.13,
      "clouds": 40,
      "visibility": 10000,
      "wind_speed": 15.14,
      "wind_deg": 194,
      "wind_gust": 18.37,
      "weather": [
        {
          "id": 802,
          "main": "Clouds",
          "description": "scattered clouds",
          "icon": "03d"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1643576400,
      "temp": 65.12,
      "feels_like": 63.07,
      "pressure": 1017,
      "humidity": 37,
      "dew_point": 38.08,
      "uvi": 1.97,
      "clouds": 29,
      "visibility": 10000,
      "wind_speed": 13.73,
      "wind_deg": 187,
      "wind_gust": 16.55,
      "weather": [
        {
          "id": 802,
          "main": "Clouds",
          "description": "scattered clouds",
          "icon": "03d"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1643580000,
      "temp": 65.05,
      "feels_like": 63.09,
      "pressure": 1016,
      "humidity": 39,
      "dew_point": 39.54,
      "uvi": 0.89,
      "clouds": 22,
      "visibility": 10000,
      "wind_speed": 13.15,
      "wind_deg": 180,
      "wind_gust": 16.04,
      "weather": [
        {
          "id": 801,
          "main": "Clouds",
          "description": "few clouds",
          "icon": "02d"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1643583600,
      "temp": 64.06,
      "feels_like": 62.24,
      "pressure": 1016,
      "humidity": 44,
      "dew_point": 41.65,
      "uvi": 0.23,
      "clouds": 18,
      "visibility": 10000,
      "wind_speed": 11.01,
      "wind_deg": 173,
      "wind_gust": 15.48,
      "weather": [
        {
          "id": 801,
          "main": "Clouds",
          "description": "few clouds",
          "icon": "02d"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1643587200,
      "temp": 59.38,
      "feels_like": 57.51,
      "pressure": 1016,
      "humidity": 53,
      "dew_point": 42.17,
      "uvi": 0,
      "clouds": 15,
      "visibility": 10000,
      "wind_speed": 8.86,
      "wind_deg": 166,
      "wind_gust": 15.23,
      "weather": [
        {
          "id": 801,
          "main": "Clouds",
          "description": "few clouds",
          "icon": "02d"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1643590800,
      "temp": 56.97,
      "feels_like": 55.18,
      "pressure": 1017,
      "humidity": 60,
      "dew_point": 42.93,
      "uvi": 0,
      "clouds": 1,
      "visibility": 10000,
      "wind_speed": 7.38,
      "wind_deg": 158,
      "wind_gust": 9.28,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01n"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1643594400,
      "temp": 55.8,
      "feels_like": 54.12,
      "pressure": 1017,
      "humidity": 65,
      "dew_point": 44.04,
      "uvi": 0,
      "clouds": 1,
      "visibility": 10000,
      "wind_speed": 7.02,
      "wind_deg": 152,
      "wind_gust": 9.53,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01n"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1643598000,
      "temp": 55.53,
      "feels_like": 54.07,
      "pressure": 1018,
      "humidity": 70,
      "dew_point": 45.72,
      "uvi": 0,
      "clouds": 13,
      "visibility": 10000,
      "wind_speed": 8.72,
      "wind_deg": 155,
      "wind_gust": 18.68,
      "weather": [
        {
          "id": 801,
          "main": "Clouds",
          "description": "few clouds",
          "icon": "02n"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1643601600,
      "temp": 58.01,
      "feels_like": 56.84,
      "pressure": 1017,
      "humidity": 71,
      "dew_point": 48.42,
      "uvi": 0,
      "clouds": 34,
      "visibility": 10000,
      "wind_speed": 10.6,
      "wind_deg": 170,
      "wind_gust": 24.02,
      "weather": [
        {
          "id": 802,
          "main": "Clouds",
          "description": "scattered clouds",
          "icon": "03n"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1643605200,
      "temp": 57.99,
      "feels_like": 57.02,
      "pressure": 1016,
      "humidity": 75,
      "dew_point": 50.09,
      "uvi": 0,
      "clouds": 47,
      "visibility": 10000,
      "wind_speed": 12.66,
      "wind_deg": 165,
      "wind_gust": 25.39,
      "weather": [
        {
          "id": 802,
          "main": "Clouds",
          "description": "scattered clouds",
          "icon": "03n"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1643608800,
      "temp": 57.15,
      "feels_like": 56.41,
      "pressure": 1016,
      "humidity": 82,
      "dew_point": 51.67,
      "uvi": 0,
      "clouds": 56,
      "visibility": 10000,
      "wind_speed": 10.31,
      "wind_deg": 173,
      "wind_gust": 24.27,
      "weather": [
        {
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04n"
        }
      ],
      "pop": 0
    },
    {
      "dt": 1643612400,
      "temp": 56.91,
      "feels_like": 56.35,
      "pressure": 1016,
      "humidity": 86,
      "dew_point": 52.75,
      "uvi": 0,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 8.75,
      "wind_deg": 185,
      "wind_gust": 22.15,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04n"
        }
      ],
      "pop": 0.15
    },
    {
      "dt": 1643616000,
      "temp": 56.7,
      "feels_like": 56.25,
      "pressure": 1016,
      "humidity": 89,
      "dew_point": 53.47,
      "uvi": 0,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 5.93,
      "wind_deg": 181,
      "wind_gust": 17.4,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04n"
        }
      ],
      "pop": 0.36
    },
    {
      "dt": 1643619600,
      "temp": 56.08,
      "feels_like": 55.81,
      "pressure": 1016,
      "humidity": 94,
      "dew_point": 54.32,
      "uvi": 0,
      "clouds": 100,
      "visibility": 8714,
      "wind_speed": 3.71,
      "wind_deg": 169,
      "wind_gust": 6.13,
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10n"
        }
      ],
      "pop": 0.86,
      "rain": {
        "1h": 0.65
      }
    },
    {
      "dt": 1643623200,
      "temp": 55.63,
      "feels_like": 55.51,
      "pressure": 1015,
      "humidity": 98,
      "dew_point": 55.04,
      "uvi": 0,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 5.01,
      "wind_deg": 140,
      "wind_gust": 8.97,
      "weather": [
        {
          "id": 501,
          "main": "Rain",
          "description": "moderate rain",
          "icon": "10n"
        }
      ],
      "pop": 0.99,
      "rain": {
        "1h": 3.27
      }
    },
    {
      "dt": 1643626800,
      "temp": 55.45,
      "feels_like": 55.35,
      "pressure": 1015,
      "humidity": 99,
      "dew_point": 55.09,
      "uvi": 0,
      "clouds": 100,
      "visibility": 2091,
      "wind_speed": 6.06,
      "wind_deg": 97,
      "wind_gust": 8.41,
      "weather": [
        {
          "id": 501,
          "main": "Rain",
          "description": "moderate rain",
          "icon": "10n"
        }
      ],
      "pop": 1,
      "rain": {
        "1h": 1.54
      }
    },
    {
      "dt": 1643630400,
      "temp": 55.42,
      "feels_like": 55.31,
      "pressure": 1015,
      "humidity": 99,
      "dew_point": 54.93,
      "uvi": 0,
      "clouds": 100,
      "visibility": 302,
      "wind_speed": 9.89,
      "wind_deg": 117,
      "wind_gust": 15.57,
      "weather": [
        {
          "id": 501,
          "main": "Rain",
          "description": "moderate rain",
          "icon": "10n"
        }
      ],
      "pop": 1,
      "rain": {
        "1h": 1.16
      }
    },
    {
      "dt": 1643634000,
      "temp": 55.38,
      "feels_like": 55.27,
      "pressure": 1015,
      "humidity": 99,
      "dew_point": 54.91,
      "uvi": 0,
      "clouds": 100,
      "visibility": 504,
      "wind_speed": 6.15,
      "wind_deg": 108,
      "wind_gust": 11.05,
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10n"
        }
      ],
      "pop": 0.99,
      "rain": {
        "1h": 0.92
      }
    },
    {
      "dt": 1643637600,
      "temp": 55.11,
      "feels_like": 54.93,
      "pressure": 1016,
      "humidity": 98,
      "dew_point": 54.39,
      "uvi": 0.05,
      "clouds": 100,
      "visibility": 6189,
      "wind_speed": 3.89,
      "wind_deg": 147,
      "wind_gust": 6.93,
      "weather": [
        {
          "id": 501,
          "main": "Rain",
          "description": "moderate rain",
          "icon": "10d"
        }
      ],
      "pop": 0.99,
      "rain": {
        "1h": 2.32
      }
    },
    {
      "dt": 1643641200,
      "temp": 56.12,
      "feels_like": 55.94,
      "pressure": 1016,
      "humidity": 96,
      "dew_point": 54.84,
      "uvi": 0.22,
      "clouds": 100,
      "visibility": 5081,
      "wind_speed": 2.55,
      "wind_deg": 146,
      "wind_gust": 4.85,
      "weather": [
        {
          "id": 501,
          "main": "Rain",
          "description": "moderate rain",
          "icon": "10d"
        }
      ],
      "pop": 0.98,
      "rain": {
        "1h": 1.78
      }
    },
    {
      "dt": 1643644800,
      "temp": 56.3,
      "feels_like": 56.1,
      "pressure": 1016,
      "humidity": 95,
      "dew_point": 54.79,
      "uvi": 0.94,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 4.32,
      "wind_deg": 94,
      "wind_gust": 6.58,
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10d"
        }
      ],
      "pop": 0.98,
      "rain": {
        "1h": 0.94
      }
    },
    {
      "dt": 1643648400,
      "temp": 57.34,
      "feels_like": 57,
      "pressure": 1016,
      "humidity": 90,
      "dew_point": 54.36,
      "uvi": 1.51,
      "clouds": 100,
      "visibility": 10000,
      "wind_speed": 5.91,
      "wind_deg": 82,
      "wind_gust": 7.29,
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10d"
        }
      ],
      "pop": 0.98,
      "rain": {
        "1h": 0.28
      }
    },
    {
      "dt": 1643652000,
      "temp": 61.23,
      "feels_like": 60.73,
      "pressure": 1014,
      "humidity": 78,
      "dew_point": 54.19,
      "uvi": 1.89,
      "clouds": 99,
      "visibility": 10000,
      "wind_speed": 6.06,
      "wind_deg": 95,
      "wind_gust": 6.55,
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10d"
        }
      ],
      "pop": 0.98,
      "rain": {
        "1h": 0.11
      }
    }
  ],
  "daily": [
    {
      "dt": 1643479200,
      "sunrise": 1643462612,
      "sunset": 1643501045,
      "moonrise": 1643454600,
      "moonset": 1643491140,
      "moon_phase": 0.9,
      "temp": {
        "day": 61.66,
        "min": 39.9,
        "max": 64.08,
        "night": 49.71,
        "eve": 57.43,
        "morn": 40.23
      },
      "feels_like": {
        "day": 58.8,
        "night": 45.57,
        "eve": 54.19,
        "morn": 35.8
      },
      "pressure": 1027,
      "humidity": 27,
      "dew_point": 27.91,
      "wind_speed": 10.6,
      "wind_deg": 211,
      "wind_gust": 25.28,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ],
      "clouds": 0,
      "pop": 0,
      "uvi": 4.05
    },
    {
      "dt": 1643565600,
      "sunrise": 1643548980,
      "sunset": 1643587499,
      "moonrise": 1643544840,
      "moonset": 1643581560,
      "moon_phase": 0.94,
      "temp": {
        "day": 60.87,
        "min": 42.8,
        "max": 65.12,
        "night": 57.99,
        "eve": 59.38,
        "morn": 43.27
      },
      "feels_like": {
        "day": 58.3,
        "night": 57.02,
        "eve": 57.51,
        "morn": 38.3
      },
      "pressure": 1021,
      "humidity": 35,
      "dew_point": 32.95,
      "wind_speed": 15.14,
      "wind_deg": 194,
      "wind_gust": 25.39,
      "weather": [
        {
          "id": 801,
          "main": "Clouds",
          "description": "few clouds",
          "icon": "02d"
        }
      ],
      "clouds": 16,
      "pop": 0,
      "uvi": 3.85
    },
    {
      "dt": 1643652000,
      "sunrise": 1643635347,
      "sunset": 1643673952,
      "moonrise": 1643634720,
      "moonset": 1643672280,
      "moon_phase": 0,
      "temp": {
        "day": 61.23,
        "min": 53.29,
        "max": 63.63,
        "night": 53.29,
        "eve": 56.55,
        "morn": 55.42
      },
      "feels_like": {
        "day": 60.73,
        "night": 52.74,
        "eve": 56.28,
        "morn": 55.31
      },
      "pressure": 1014,
      "humidity": 78,
      "dew_point": 54.19,
      "wind_speed": 11.79,
      "wind_deg": 118,
      "wind_gust": 24.27,
      "weather": [
        {
          "id": 501,
          "main": "Rain",
          "description": "moderate rain",
          "icon": "10d"
        }
      ],
      "clouds": 99,
      "pop": 1,
      "rain": 18.2,
      "uvi": 2.98
    },
    {
      "dt": 1643738400,
      "sunrise": 1643721711,
      "sunset": 1643760406,
      "moonrise": 1643724000,
      "moonset": 1643762880,
      "moon_phase": 0.02,
      "temp": {
        "day": 62.46,
        "min": 50.38,
        "max": 66.63,
        "night": 58.51,
        "eve": 62.4,
        "morn": 50.67
      },
      "feels_like": {
        "day": 61.83,
        "night": 57.97,
        "eve": 61.72,
        "morn": 50.04
      },
      "pressure": 1012,
      "humidity": 73,
      "dew_point": 53.44,
      "wind_speed": 8.34,
      "wind_deg": 163,
      "wind_gust": 18.41,
      "weather": [
        {
          "id": 803,
          "main": "Clouds",
          "description": "broken clouds",
          "icon": "04d"
        }
      ],
      "clouds": 61,
      "pop": 0.19,
      "uvi": 4.07
    },
    {
      "dt": 1643824800,
      "sunrise": 1643808075,
      "sunset": 1643846859,
      "moonrise": 1643812920,
      "moonset": 1643853360,
      "moon_phase": 0.06,
      "temp": {
        "day": 63.88,
        "min": 53.67,
        "max": 64.72,
        "night": 56.68,
        "eve": 62.74,
        "morn": 53.67
      },
      "feels_like": {
        "day": 64.33,
        "night": 56.55,
        "eve": 63.28,
        "morn": 53.2
      },
      "pressure": 1009,
      "humidity": 93,
      "dew_point": 61.59,
      "wind_speed": 14.76,
      "wind_deg": 9,
      "wind_gust": 23.35,
      "weather": [
        {
          "id": 500,
          "main": "Rain",
          "description": "light rain",
          "icon": "10d"
        }
      ],
      "clouds": 100,
      "pop": 1,
      "rain": 5.99,
      "uvi": 1.17
    },
    {
      "dt": 1643911200,
      "sunrise": 1643894437,
      "sunset": 1643933312,
      "moonrise": 1643901480,
      "moonset": 1643943540,
      "moon_phase": 0.09,
      "temp": {
        "day": 33.53,
        "min": 21.7,
        "max": 46.54,
        "night": 21.7,
        "eve": 25.97,
        "morn": 39.13
      },
      "feels_like": {
        "day": 20.93,
        "night": 9.1,
        "eve": 13.37,
        "morn": 29.53
      },
      "pressure": 1024,
      "humidity": 71,
      "dew_point": 25.05,
      "wind_speed": 26.42,
      "wind_deg": 350,
      "wind_gust": 39.91,
      "weather": [
        {
          "id": 616,
          "main": "Snow",
          "description": "rain and snow",
          "icon": "13d"
        }
      ],
      "clouds": 100,
      "pop": 1,
      "rain": 17.58,
      "snow": 1.52,
      "uvi": 2
    },
    {
      "dt": 1643997600,
      "sunrise": 1643980798,
      "sunset": 1644019764,
      "moonrise": 1643989800,
      "moonset": 1644033600,
      "moon_phase": 0.13,
      "temp": {
        "day": 29.7,
        "min": 20.08,
        "max": 34.29,
        "night": 23.05,
        "eve": 28.2,
        "morn": 20.32
      },
      "feels_like": {
        "day": 17.1,
        "night": 11.07,
        "eve": 16.38,
        "morn": 7.72
      },
      "pressure": 1037,
      "humidity": 44,
      "dew_point": 10.56,
      "wind_speed": 22.15,
      "wind_deg": 352,
      "wind_gust": 35.46,
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "clouds": 94,
      "pop": 0,
      "uvi": 2
    },
    {
      "dt": 1644084000,
      "sunrise": 1644067157,
      "sunset": 1644106216,
      "moonrise": 1644077940,
      "moonset": 1644123480,
      "moon_phase": 0.16,
      "temp": {
        "day": 37.76,
        "min": 22.62,
        "max": 43.7,
        "night": 33.75,
        "eve": 39.33,
        "morn": 22.98
      },
      "feels_like": {
        "day": 33.82,
        "night": 29.34,
        "eve": 34.84,
        "morn": 13.05
      },
      "pressure": 1032,
      "humidity": 40,
      "dew_point": 15.82,
      "wind_speed": 11.95,
      "wind_deg": 348,
      "wind_gust": 19.89,
      "weather": [
        {
          "id": 800,
          "main": "Clear",
          "description": "clear sky",
          "icon": "01d"
        }
      ],
      "clouds": 3,
      "pop": 0,
      "uvi": 2
    }
  ]
}