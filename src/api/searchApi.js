export const fetchSearchData = async (keyword) => {
  console.log("key", keyword);

  try {
    const response = await fetch(`/playlist/add/search-results/${keyword}`);
    return await response.json();
  } catch (error) {
    console.log("error", error);
  }
};

