document.addEventListener("DOMContentLoaded", function () {
  const usernameInput = document.querySelector("input[name='username']");
  const checkButton = document.querySelector(".check-btn");

  checkButton.addEventListener("click", fetchUserNameData);

  async function fetchUserNameData(event) {
    event.preventDefault();
    const username = usernameInput.value;

    try {
      const response = await fetch(`/user/checkUsername/${username}`);
      const data = await response.json();
      const msgArea = document.querySelector("p.error-message.username");
      if (!data.usernameExists) {
        msgArea.textContent = "사용가능한 유저아이디 입니다";
        msgArea.classList.add("valid-username");
      } else if (data.usernameExists) {
        msgArea.textContent = "유저 아이디가 이미 사용되었습니다.";
      } else {
        msgArea.textContent = "";
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
});
