const addCoverBox = document.querySelector(".add-cover-box");

const clickUploadInput = () => {
  console.log("click");
  document.getElementById("playlist_cover_input").click();
};

addCoverBox.addEventListener("click", clickUploadInput);
