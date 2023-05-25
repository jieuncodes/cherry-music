export const fetchSearchData = async (keyword) => {
  try {
    const response = await fetch(`/playlist/add/search-results/${keyword}`);
    return await response.json();
  } catch (error) {
    console.log("error", error);
  }
};
