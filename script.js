const hamburger = document.getElementById("hamburger");
const sidebar = document.getElementById("sidebar");

hamburger.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

document.addEventListener("DOMContentLoaded", () => {
  const player = document.getElementById("player");
  let currentCard = null;

  function setBtn(card, playing) {
    const btn = card.querySelector(".play-btn");
    if (!btn) return;
    btn.textContent = playing ? "⏸" : "▶";
  }

  document.querySelectorAll(".card .play-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const card = e.currentTarget.closest(".card");
      const src = card?.dataset.song;
      if (!src) {
        alert("Missing data-song on this card");
        return;
      }

      // same card → toggle
      if (currentCard === card) {
        if (player.paused) {
          player.play();
          setBtn(card, true);
        } else {
          player.pause();
          setBtn(card, false);
        }
        return;
      }

      // switch to a new card
      if (currentCard) setBtn(currentCard, false);
      currentCard = card;
      player.src = src;
      player
        .play()
        .then(() => setBtn(card, true))
        .catch((err) => {
          console.error(err);
          alert(
            "Could not play. Check the MP3 path or use a local server (e.g., VS Code Live Server)."
          );
          setBtn(card, false);
          currentCard = null;
        });
    });
  });

  player.addEventListener("ended", () => {
    if (currentCard) setBtn(currentCard, false);
  });
  player.addEventListener("pause", () => {
    if (currentCard) setBtn(currentCard, false);
  });
  player.addEventListener("play", () => {
    if (currentCard) setBtn(currentCard, true);
  });
});
