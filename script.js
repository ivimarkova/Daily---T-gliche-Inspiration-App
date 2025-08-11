document.getElementById("generate").addEventListener("click", async () => {
  const response = await fetch("https://api.adviceslip.com/advice");
  const data = await response.json();
  document.getElementById(
    "results"
  ).innerHTML = `<p>💡 ${data.slip.advice}</p>`;
});
