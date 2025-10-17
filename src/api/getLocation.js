export const getLocationCoords = async locationName => {
  const res = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      locationName
    )}&key=${import.meta.env.VITE_OPENCAGE_API_KEY}`
  );
  const data = await res.json();
  return data?.results?.[0]?.geometry || null;
};
