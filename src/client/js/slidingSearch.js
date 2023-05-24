export const slidingSearchBox = document.querySelector(".sliding-search-area");

export const showSlidingSearchBox = (event) => {
  if (event) {
    event.stopPropagation();
  }
  slidingSearchBox.style.right = "0";
};

export const hideSlidingSearchBox = (event) => {
  if (event) {
    event.stopPropagation();
  }
  slidingSearchBox.style.right = "-100%";
};

document.addEventListener("DOMContentLoaded", () => {
  const searchIcon = document.getElementById("search");
  const backIcon = document.querySelector(".close-search ");
  const micIcon = document.querySelector(".mic");
  const searchInput = document.querySelector(".typing-area");

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";

  recognition.onstart = () => console.log("Voice search started...");

  recognition.onresult = (event) => {
    let finalTranscript = "";

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscript += event.results[i][0].transcript;
      }
    }

    console.log("Final transcript:", finalTranscript);

    searchInput.value = finalTranscript;
  };

  recognition.onerror = (event) => {
    window.alert("마이크를 사용하려면 크롬브라우저를 이용해주세요.");
    console.log("Recognition error:", event.error);
  };

  recognition.onend = () => console.log("Recognition ended");

  const startVoiceSearch = (event) => {
    event.preventDefault();
    recognition.start();
    recognition.addEventListener("end", recognition.onresult);
  };

  searchIcon.addEventListener("click", showSlidingSearchBox);
  backIcon.addEventListener("click", hideSlidingSearchBox);
  micIcon.addEventListener("click", startVoiceSearch);
});
