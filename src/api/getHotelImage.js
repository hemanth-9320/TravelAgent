import getGooglePlaceImage from './getGooglePlaceImage';
import getUnsplashImage from './getUnsplashImage';
import getWikipediaImage from './getWikipediaImage';

export default async function getHotelImage(hotelName) {
  try {
    const googleImg = await getGooglePlaceImage(hotelName);
    if (googleImg) return googleImg;

    const unsplashImg = await getUnsplashImage(hotelName);
    if (unsplashImg) return unsplashImg;

    const wikiImg = await getWikipediaImage(hotelName);
    if (wikiImg) return wikiImg;

    return "/default-hotel.png";
  } catch (err) {
    console.error("Error fetching hotel image:", err);
    return "/default-hotel.png";
  }
}
