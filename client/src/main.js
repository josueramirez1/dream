import "./style.css";

const API_URL = import.meta.env.VITE_API_URL;

const btnReq = document.querySelector(".btn");
const image = document.getElementById("image");
const prompt = document.getElementById("prompt");
const emoji = document.querySelector(".emoji");

//when the button is clicked a request is sent

btnReq.addEventListener("click", async (e) => {
  e.preventDefault();
  if (prompt.length <= 0) return;
  const message = prompt.value;

  try {
    startEmoji();

    const fetchingImage = await fetch(`${API_URL}/dream`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: message }),
    });
    const responseFromAi = await fetchingImage.json();
    image.src = responseFromAi[0].url;
    stopEmoji();
  } catch (error) {
    stopEmoji();
    console.error(`Unable to fetch item: ${error}`);
  }

  prompt.value = "";
});

function startEmoji() {
  emoji.classList.add("active");
  btnReq.disabled = true;
}

function stopEmoji() {
  emoji.classList.remove("active");
  btnReq.disabled = false;
}
