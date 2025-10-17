export const getPlaceImage = async (placeName) => {
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        placeName
      )}&per_page=1&client_id=${accessKey}`
    );

    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].urls.regular;
    } else {
      return "https://via.placeholder.com/600x400?text=No+Image+Found"; // fallback
    }
  } catch (error) {
    console.error("Image fetch error:", error);
    return "https://via.placeholder.com/600x400?text=Error+Fetching+Image";
  }
};
