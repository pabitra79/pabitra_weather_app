const API_KEY = "70e3f28627ba8863e53ad155a7bedd9d";
const makeIconURl = (iconid) =>
  `https://openweathermap.org/img/wn/${iconid}@2x.png`;
const getFormattedWeatherData = async (city, units = "metric") => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;
  const data = await fetch(URL)
    .then((res) => res.json())
    .then((data) => data);

  if (!data || !data.weather || data.weather.length === 0) {
    return null; // Return null or handle the error as needed
  }
  const {
    weather,
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    wind: { speed },
    sys: { country },
    name,
  } = data;
  const { description, icon } = weather[0];
  return {
    description,
    iconURL: makeIconURl(icon),
    temp,
    temp_max,
    temp_min,
    speed,
    country,
    pressure,
    humidity,
    name,
    feels_like,
  };
};
export { getFormattedWeatherData };
