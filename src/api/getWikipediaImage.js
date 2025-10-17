export const getWikipediaImage = async (query) => {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
    );
    const data = await response.json();
    return data?.thumbnail?.source || null;
  } catch (error) {
    console.error("Wikipedia fetch error for:", query, error);
    return null;
  }
};
