import "./style.css";

const btnReq = document.querySelector(".btn");
const image = document.getElementById("image");
const prompt = document.getElementById("prompt");
const emoji = document.querySelector(".emoji");

btnReq.addEventListener("click", async (e) => {
  e.preventDefault();
  if (prompt.length <= 0) return;
  const message = prompt.value;
  startEmoji();

  try {
    const fetchingImage = await fetch(`https://dream2.onrender.com/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: message }),
    });

    if (!fetchingImage.ok) {
      const err = await fetchingImage.text();
      alert(err);
      console.error(err);
    }

    const responseFromAi = await fetchingImage.json();
    image.src = responseFromAi[0].url;
  } catch (error) {
    console.error("Fetching failed", error);
    alert("Something went wrong. Please try again later");
  } finally {
    stopEmoji();
    prompt.value = "";
  }
});

function startEmoji() {
  emoji.classList.add("active");
  btnReq.disabled = true;
}

function stopEmoji() {
  emoji.classList.remove("active");
  btnReq.disabled = false;
}
