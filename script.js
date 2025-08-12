// Create animated stars
function createStars() {
  const starsContainer = document.getElementById("stars");
  const numberOfStars = 100;

  for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.animationDelay = Math.random() * 3 + "s";
    star.style.animationDuration = Math.random() * 3 + 2 + "s";
    starsContainer.appendChild(star);
  }
}

// Show ball text
function showBallText(text) {
  const ballText = document.getElementById("ballText");
  ballText.textContent = text;
  ballText.classList.add("show");
  setTimeout(() => {
    ballText.classList.remove("show");
  }, 3000);
}

// Initialize stars
createStars();

//Token generieren
const CLIENT_ID = "5f060b9ffac84a669e636a50f45f4ee5";
const CLIENT_SECRET = "24a3dac8356d4c17b2a4554d68a8277b"; //nur Testing

async function getSpotifyToken() {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
    },
    body: "grant_type=client_credentials",
  });
  const data = await response.json();
  return data.access_token; //Diese Token für API Anfragen
}

async function getSpotifyTrack(token) {
  const response = await fetch(
    "https://api.spotify.com/v1/search?q=year:2024&type=track&market=DE&limit=50",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Spotify API error: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();

  if (!data.tracks || !data.tracks.items || data.tracks.items.length === 0) {
    throw new Error("No tracks found");
  }

  // Return a random track from the results
  const randomIndex = Math.floor(Math.random() * data.tracks.items.length);
  return {
    items: [{ track: data.tracks.items[randomIndex] }],
  };
}

document.getElementById("generate").addEventListener("click", async () => {
  try {
    showBallText("Die Kristallkugel erwacht...");
    // Added missing try block
    //1.Advice API
    const adviceResponse = await fetch("https://api.adviceslip.com/advice");
    const data = await adviceResponse.json();

    //2.Nager.Date API
    const today = new Date().toISOString().split("T")[0];
    const holidayResponse = await fetch(
      `https://date.nager.at/api/v3/PublicHolidays/${new Date().getFullYear()}/DE` // Removed extra space
    );
    const holidays = await holidayResponse.json();
    const todayHoliday = holidays.find((h) => h.date === today);

    //3.Spotify API
    const token = await getSpotifyToken();
    const spotifyData = await getSpotifyTrack(token);

    // Better check for track data
    const track =
      spotifyData.items && spotifyData.items.length > 0
        ? spotifyData.items[0]?.track
        : null;

    const resultsHTML = `
      <div class="content-section show">
        <h3>💡 Ratschlag des Tages</h3>
        <p>${data.slip.advice}</p>
      </div>
      <div class="content-section show">
        <h3>🌞 Feiertag des Tages</h3>
        <p>${todayHoliday ? todayHoliday.name : "Kein Feiertag heute😐"}</p>
      </div>
      ${
        track
          ? `
        <div class="content-section show">
          <h3>♬⋆.˚ Lied des Tages</h3>
          <p>${track.name}</p>
          <p>🎤 Artist: ${track.artists[0].name}</p>
          <a href="${track.external_urls.spotify}" class="spotify-link" target="_blank">🔗 In Spotify öffnen</a>
        </div>
      `
          : '<div class="content-section show"><p>😔 Kein Lied gefunden</p></div>'
      }
    `;

    document.getElementById("results").innerHTML = resultsHTML;
    showBallText("Deine Inspiration ist bereit!");
  } catch (error) {
    console.error("Fehler:", error);
    document.getElementById("results").innerHTML = `
      <div class="content-section show error">
        <p>Es gab einen Fehler beim Laden der Daten. Bitte versuche es später erneut.</p>
      </div>
    `;
    showBallText("Ups! Versuche es nochmal.");
  }
});
async function generateSnapshot() {
  const results = document.getElementById("results");

  // Временен елемент за скрийншот
  const tempElement = document.createElement("div");
  tempElement.className = "snapshot-container";

  // Копиране на стиловете и съдържанието
  tempElement.innerHTML = `
    <div class="snapshot-header">
      <h2>✨ Daily Inspiration ✨</h2>
      <p>${new Date().toLocaleDateString("de-DE")}</p>
    </div>
    ${results.innerHTML}
  `;

  // Добавяне на звезди в snapshot
  const starsSnapshot = document.createElement("div");
  starsSnapshot.id = "snapshot-stars";
  tempElement.prepend(starsSnapshot);

  // Временно добавяне към DOM
  document.body.appendChild(tempElement);

  // Генериране на звезди в snapshot
  createStars("snapshot-stars");

  // Използване на html2canvas за създаване на изображение
  const canvas = await html2canvas(tempElement, {
    backgroundColor: "#0f0f1a",
    scale: 2, // По-високо качество
  });

  // Премахване на временния елемент
  document.body.removeChild(tempElement);

  return canvas.toDataURL("image/png");
}
