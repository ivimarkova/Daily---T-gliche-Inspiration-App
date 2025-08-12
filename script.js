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
  // Simple search for popular tracks - much more reliable!
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

    document.getElementById("results").innerHTML = `
      <p>💡Ratschlag: ${data.slip.advice}</p>
      <p>🌞Feiertag: ${
        todayHoliday ? todayHoliday.name : "Kein Feiertag heute😐"
      }</p>
      ${
        track
          ? `
        <p>♬⋆.˚Lied des Tages: ${track.name}</p>
        <p>🎤Artist: ${track.artists[0].name}</p>
        <a href="${track.external_urls.spotify}" target="_blank">🔗In Spotify öffnen</a>
      `
          : "<p>😔Kein Lied gefunden</p>"
      }
    `; // Properly closed template literal
  } catch (error) {
    console.error("Fehler:", error);
    document.getElementById(
      "results"
    ).innerHTML = `<p style="color: red;">Es gab einen Fehler beim Laden der Daten. Bitte versuche es später erneut.</p>`;
  }
});
