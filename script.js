// ===============================
// TEHALKA MUSIC SEARCH SYSTEM
// ===============================

function searchSong() {

  let song = document
    .getElementById("searchInput")
    .value
    .trim()
    .toLowerCase();


  // Empty search

  if (song === "") {

    alert(
      "Please enter a song name."
    );

    return;

  }


  // Song pages

  const songs = {

    "kamar kamar":
      "kamar-kamar.html",

    "parindey":
      "parindey.html",

    "sukoon":
      "sukoon.html",

    "chundadi":
      "Chundadi.html",

    "patli kamar":
      "Patali-Kamar.html",

    "patali kamar":
      "Patali-Kamar.html"

  };


  // Exact song search

  if (
    songs[song]
  ) {

    window.location.href =
      songs[song];

    return;

  }


  // Partial search

  for (
    let name in songs
  ) {

    if (
      name.includes(song)
    ) {

      window.location.href =
        songs[name];

      return;

    }

  }


  // Song not found

  alert(
    "❌ Song not found. Please try another song."
  );

}


// ===============================
// ENTER KEY SEARCH
// ===============================

document
  .getElementById("searchInput")
  ?.addEventListener(
    "keypress",
    function(event) {

      if (
        event.key === "Enter"
      ) {

        searchSong();

      }

    }
  );


// ===============================
// WEBSITE SHARE
// ===============================

const websiteUrl =
  "https://tehalkamusic.website/";

const websiteText =
  "🎵 Tehalka Music - Listen and Download Latest Songs";


// ===============================
// WHATSAPP SHARE
// ===============================

function shareWhatsApp() {

  const whatsappUrl =
    "https://wa.me/?text=" +
    encodeURIComponent(
      websiteText +
      "\n\n" +
      websiteUrl
    );


  window.open(
    whatsappUrl,
    "_blank"
  );

}


// ===============================
// INSTAGRAM
// ===============================

function openInstagram() {

  window.open(
    "https://www.instagram.com/",
    "_blank"
  );

}


// ===============================
// YOUTUBE
// ===============================

function openYouTube() {

  window.open(
    "https://www.youtube.com/",
    "_blank"
  );

}


// ===============================
// MORE SHARE
// ===============================

function shareWebsite() {

  if (
    navigator.share
  ) {

    navigator.share({

      title:
        "Tehalka Music",

      text:
        websiteText,

      url:
        websiteUrl

    });

  }

  else {

    copyWebsiteLink();

  }

}


// ===============================
// COPY WEBSITE LINK
// ===============================

function copyWebsiteLink() {

  if (
    navigator.clipboard
  ) {

    navigator.clipboard
      .writeText(
        websiteUrl
      )
      .then(
        function() {

          alert(
            "✅ Tehalka Music website link copied!"
          );

        }
      )
      .catch(
        function() {

          alert(
            "Please copy this link manually: " +
            websiteUrl
          );

        }
      );

  }

  else {

    alert(
      "Please copy this link manually: " +
      websiteUrl
    );

  }

}
