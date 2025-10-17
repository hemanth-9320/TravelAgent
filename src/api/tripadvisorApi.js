// src/api/tripadvisorApi.js
import axios from 'axios';

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '79cae902eamshe353214eb6977d8p18dd45jsn3adcf680d8f5',
    'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
  }
};

export const getHotels = async (locationId) => {
  const url = `https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels?geoId=${locationId}&checkIn=2024-12-14&checkOut=2024-12-15&pageNumber=1`;
  const response = await axios.get(url, options);
  return response.data;
};

export const getAttractions = async (locationId) => {
  const url = `https://tripadvisor16.p.rapidapi.com/api/v1/attractions/searchAttractions?geoId=${locationId}&category=attractions`;
  const response = await axios.get(url, options);
  return response.data;
};
